/**
 * Tooltip
 */
function Tooltip() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      type: 'default',
      duration: 0.2,
      height: 'auto',
      transform: {
        scale: {
          x: 1,
          y: 1,
        },
        translate: {
          x: 0,
          y: 0,
        },
        delay: 0,
        easing: 'power4.out',
      },
    },
    {
      state: 'close',
    },
    render,
  );
  const { firstNodeFocusOut, lastNodeFocusOut } = etUI.hooks.useA11yKeyEvent();
  const { mediaQueryAction } = etUI.hooks.useMediaQuery();

  // state 변경 시 랜더 재호출
  const name = 'tooltip';
  let component = {};
  const cleanups = [];

  // 요소관련 변수들
  let $target, $tooltipContainer, $openBtn, $closeBtn;
  let tooltipCloseBtn, tooltipTriggerBtn, tooltipDim;
  let focusTrapInstance;
  let tooltipContainerX;
  let callback;
  let bodyWidth;
  let resizeCleanup, bodyClickCleanup;

  // 반응형
  let isMobile = window.matchMedia('(max-width: 1024px)').matches;

  /**
   * init
   * @param _$target
   * @param _props
   */
  function init(_$target, _props) {
    if (typeof _$target === 'string') {
      $target = document.querySelector(_$target);
    } else {
      $target = _$target;
    }

    if (!$target) {
      throw Error('Target does not exist.');
    }

    setTarget($target);
    setProps({ ...props, ..._props });

    if ($target.ui) {return;}
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
    setupTemplate();
    setupSelector();
    setupElement();
    setupActions();

    // focus trap
    focusTrapInstance = focusTrap.createFocusTrap($target, {
      escapeDeactivates: props.esc,
      onActivate: actions.focusActivate,
      onDeactivate: actions.focusDeactivate,
    });
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) {return;}
    destroy();

    setProps({ ...props, ..._props });
    setup();
    setEvent();
  }

  function destroy() {
    if (resizeCleanup) resizeCleanup();
    if (bodyClickCleanup) bodyClickCleanup();
    etUI.utils.allCleanups(cleanups);
    removeEvent();
    $target.ui = null;
    $target.removeAttribute('data-init');
  }

  // frequency
  function setupTemplate() {}

  function setupSelector() {
    // element
    $tooltipContainer = $target.querySelector('.tooltip-container');
    // selector
    tooltipTriggerBtn = '.tooltip-btn-trigger';
    tooltipCloseBtn = '.tooltip-btn-close';
    tooltipDim = $target.querySelector('.dim');
    $openBtn = $target.querySelector(tooltipTriggerBtn);
    $closeBtn = $target.querySelector(tooltipCloseBtn);
  }

  function setupElement() {
    // set id
    const id = etUI.utils.getRandomUIID(name);
    const titleId = etUI.utils.getRandomUIID(`${name}-tit`);

    // a11y
    $target.setAttribute('id', id);
    $target.setAttribute('aria-expanded', 'false');
    $target.setAttribute('aria-controls', titleId);
  }

  function setupActions() {
    actions.open = () => {
      if (isMobile && tooltipDim) {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
        });
      }

      const checkOverflow = () => {
        bodyWidth = $tooltipContainer.getBoundingClientRect().width - 30;
        tooltipContainerX = $tooltipContainer.getBoundingClientRect().x;
        if (tooltipContainerX < 0) {
          $tooltipContainer.classList.add('overflow-left');
        } else if (tooltipContainerX > bodyWidth) {
          $tooltipContainer.classList.add('overflow-right');
        }
      };

      const setAnimation = { duration: 0, display: 'none', opacity: 0 };
      if (props.type === 'default') {
        gsap
          .timeline()
          .to($tooltipContainer, setAnimation)
          .to($tooltipContainer, {
            duration: props.duration,
            display: 'block',
            opacity: 1,
            onUpdate: () => {
              checkOverflow();
            },
          });
      }

      if (props.type === 'custom') {
        gsap
          .timeline()
          .to($tooltipContainer, setAnimation)
          .to($tooltipContainer, {
            duration: props.duration,
            scale: 1,
            display: 'block',
            opacity: 1,
            onUpdate: () => {
              checkOverflow();
            },
          });
      }

      $closeBtn && $closeBtn.setAttribute('aria-expanded', 'true');
      $tooltipContainer.setAttribute('aria-hidden', 'false');

      if ($closeBtn) {
        $closeBtn.focus();
      }
    };

    actions.close = () => {
      const containerClass = $tooltipContainer.classList;
      const scale = props.transform.scale.x;
      const { type } = props;

      document.body.style.overflow = null;

      gsap.timeline().to($tooltipContainer, {
        duration: props.duration,
        display: 'none',
        opacity: 0,
        onComplete: () => {
          containerClass.contains('overflow-left') && containerClass.remove('overflow-left');
          containerClass.contains('overflow-right') && containerClass.remove('overflow-right');

          setTimeout(() => {
            $closeBtn && $closeBtn.setAttribute('aria-expanded', 'false');
            $tooltipContainer.setAttribute('aria-hidden', 'true');
          });
        },
      });

      type === 'custom' && gsap.timeline().to($tooltipContainer, { duration: props.duration, scale: scale, display: 'none', opacity: 0 });
      type === 'default' && gsap.timeline().to($tooltipContainer, { duration: props.duration, display: 'none', opacity: 0 });
    };

    actions.focusActivate = () => {};

    actions.focusDeactivate = () => {
      if (!state.trigger) {
        callback = props.negativeCallback;
      }
      actions.close();
      focusTrapInstance.deactivate();
    };
  }

  function setEvent() {
    resizeCleanup = etUI.hooks.useEventListener(window, 'resize', () => {
      isMobile = window.matchMedia('(max-width: 1024px)').matches;
    });

    bodyClickCleanup = etUI.hooks.useEventListener(document.body, 'click', (e) => {
      if (state.state === 'open') {
        const { target } = e;

        if (target === $tooltipContainer || target === $openBtn) {return;}
        if (tooltipDim) {tooltipDim.style.display = 'none';}
        actions.close();
        $openBtn.classList.remove('on');
      }
    });

    if (tooltipDim) {
      addEvent('touchmove', '.dim', (e) => {
        e.preventDefault();
      });
    }

    addEvent('click', tooltipTriggerBtn, () => {
      actions.open();

      $openBtn.classList.add('on');
      // 0616 dim type 추가
      if (tooltipDim) {
        tooltipDim.style.display = 'block';
      }
    });

    if ($closeBtn) {
      cleanups.push(firstNodeFocusOut($closeBtn, actions.close));
      cleanups.push(lastNodeFocusOut($closeBtn, actions.close));
      addEvent('click', tooltipCloseBtn, () => {
        actions.close();
        if (tooltipDim) {
          tooltipDim.style.display = 'none';
        }
      });
    } else {
      cleanups.push(firstNodeFocusOut($openBtn, actions.open));
      cleanups.push(lastNodeFocusOut($openBtn, actions.close));
    }
  }

  function render() {
    const isShow = state.state === 'open';
    const expanded = $tooltipContainer.getAttribute('aria-expanded') === 'true';
    $tooltipContainer.setAttribute('aria-expanded', !expanded);
    $tooltipContainer.setAttribute('aria-hidden', expanded);

    if (isShow) {
      actions.open();
      focusTrapInstance.activate();
    } else {
      focusTrapInstance.deactivate();
    }

  }

  function open() {
    setState({ state: 'open' });
  }

  function close() {
    setState({ state: 'close' });
  }

  component = {
    core: {
      state,
      props,
      init,
      destroy,
      removeEvent,
    },

    update,
    open,
    close,
  };

  return component;
}
