/**
 *  Modal
 */
function Modal() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
      dimmClick: true,
      clickOutside: false,
      esc: true,
      type: 'default',
    },
    {
      // state
    },
    render,
  );

  const { mediaQueryAction } = etUI.hooks.useMediaQuery();
  // constant
  const DIMM_OPACITY = etUI.config.layer.dimmOpacity;

  // variable
  const name = 'modal';
  let component = {};

  let focusTrapInstance, modalDimmSelector, modalCloseBtnSelector, clickOutsideCleanup;
  let $target, $modalTitle, $modalContainer, $modalDimm, $modalContent;
  let _callback;

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
      allowOutsideClick: props.clickOutside ? true : false,
    });

    // state
    // setState({ state: props.state });

    if (state.state === 'open') {
      actions.open();
    }
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
    removeEvent();
    $target.ui = null;
    $target.removeAttribute('data-init');
  }

  // frequency
  function setupTemplate() {
    // $target.innerHTML = ``;
  }

  function setupSelector() {
    // selector
    modalCloseBtnSelector = '.modal-close';
    modalDimmSelector = '.modal-dimm';

    // element
    $modalTitle = $target.querySelector('.modal-tit');
    $modalDimm = $target.querySelector(modalDimmSelector);
    $modalContainer = $target.querySelector('.modal-container');
    $modalContent = $target.querySelector('.modal-content');
  }

  function setupElement() {
    // set id
    const id = etUI.utils.getRandomUIID(name);
    const titleId = etUI.utils.getRandomUIID(`${name}-tit`);

    // a11y
    etUI.utils.setProperty($target, 'role', 'dialog');
    etUI.utils.setProperty($target, 'aria-modal', 'true');
    etUI.utils.setProperty($target, 'id', id);
    if ($modalTitle) {etUI.utils.setProperty($modalTitle, 'id', titleId);}
    etUI.utils.setProperty($target, 'aria-labelledby', titleId);
    etUI.utils.setProperty($target, 'tabindex', '-1');

  }

  function setupActions() {
    const { getTopDepth, setLayerOpacity, enableScrollLock, disableScrollLock } = etUI.hooks.useLayer();

    actions.focusActivate = () => {};

    actions.focusDeactivate = () => {
      close();
    };

    actions.open = () => {
      $target.style.display = 'block';

      setLayerOpacity(DIMM_OPACITY);
      enableScrollLock();

      if ($modalDimm) {gsap.timeline().to($modalDimm, { duration: 0, display: 'block', opacity: 0 }).to($modalDimm, { duration: 0.15, opacity: 1 });}

      gsap
        .timeline()
        .to($modalContainer, { duration: 0, display: 'flex' })
        .to($modalContainer, {
          duration: 0.15,
          opacity: 1,
          ease: 'Power2.easeOut',
          onComplete() {
            const clientHeight = $modalContent.clientHeight;
            const scrollHeight = $modalContent.scrollHeight;

            // a11y: 스크롤할 컨텐츠가 있을 경우 tabindex 추가
            if (clientHeight < scrollHeight) {
              $modalContent.setAttribute('tabindex', '0');
            } else {
              $modalContent.removeAttribute('tabindex');
            }
          },
        });

      if (_callback) {
        _callback();
      }

      if (props.clickOutside) {
        clickOutsideCleanup = etUI.hooks.useClickOutside($target, () => {
          setState({ state: 'close' });
        }, [props.triggerBtn]);
      }
    };

    actions.close = () => {
      if (clickOutsideCleanup) {
        clickOutsideCleanup();
      }

      // input 있을 때 value값 초기화
      if ($target.querySelector('input')) {
        const inputs = $target.querySelectorAll('input');
        inputs.forEach(($input) => {
          $input.value = '';
        });
      }

      if ($modalDimm) {
        gsap.timeline().to($modalDimm, {
          duration: 0.15,
          opacity: 0,
          onComplete() {
            $modalDimm.style.display = 'none';
          },
        });
      }

      gsap.timeline().to($modalContainer, {
        duration: 0.15,
        opacity: 0,
        ease: 'Power2.easeOut',
        onComplete() {
          $modalContainer.style.display = 'none';
          $target.style.display = 'none';

          setLayerOpacity(DIMM_OPACITY);
          disableScrollLock();
        },
      });
    };
  }

  function setEvent() {
    addEvent('click', modalCloseBtnSelector, close);

    if (props.dimmClick) {
      addEvent('click', modalDimmSelector, close);
    }
  }

  function render() {
    const isOpened = state.state === 'open';
    const { type } = props;

    if (isOpened) {
      actions.open();
      focusTrapInstance.activate();
    } else {
      actions.close();
      focusTrapInstance.deactivate();
    }
  }

  function open(callback) {
    _callback = callback;
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
      removeEvent,
      destroy,
    },
    update,
    open,
    close,
  };

  return component;
}
