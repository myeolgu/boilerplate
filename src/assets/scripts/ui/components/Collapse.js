/**
 * Collapse
 */
function Collapse() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent, cleanups } = etUI.hooks.useCore(
    {
      // props
      animation: {
        duration: 0.5,
        easing: 'power2.out',
      },

      clickOutside: false,
      a11yTab: false,
    },
    {
      // state
    },
    render,
  );

  // constant

  // variable
  const name = 'collapse';
  let component = {};
  // element, selector
  let collapseTrigger, collapseContent, closeTimeline, clickOutsideCleanup;
  let $target, $collapseTrigger, $collapseContent;

  // hooks
  const { firstNodeFocusOut, lastNodeFocusOut } = etUI.hooks.useA11yKeyEvent();

  function init(_$target, _props) {
    if (typeof _$target === 'string') {
      $target = document.querySelector(_$target);
    } else {
      $target = _$target;
    }

    if (!$target) {
      throw Error('Target does not exist.');
    }

    try {
      setTarget($target, { stateCallback: _props?.stateCallback });
      setProps({ ...props, ..._props });

      if ($target.ui) return;
      $target.ui = component;

      setup();
      setEvent();

      $target.setAttribute('data-init', 'true');
    } catch (error) {
      console.error('Error initializing Collapse component:', error);
      // 오류가 발생해도 기본적인 UI 상태는 설정
      if (!$target.ui) {
        $target.ui = component;
      }
    }
  }

  function setup() {
    setupTemplate();
    setupSelector();
    setupElement();
    setupActions();

    // state
    // setState({ setting: 'custom' });
    render(true);
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) return;
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

  function setupTemplate() {}

  function setupSelector() {
    // selector
    collapseTrigger = '.collapse-tit';
    collapseContent = '.collapse-content';

    // element
    $collapseTrigger = $target.querySelector(collapseTrigger);
    $collapseContent = $target.querySelector(collapseContent);
  }

  function setupElement() {
    // id
    const id = etUI.utils.getRandomId();

    const collapseId = `id-collapse-${id}`;
    const collapseTriggerId = `id-collapse-title-${id}`;
    const collapseContentId = `id-collapse-content-${id}`;

    $target.setAttribute('aria-expanded', false);
    $target.setAttribute('id', collapseId);
    if ($collapseTrigger) {
      $collapseTrigger.setAttribute('controls', collapseContentId);
      $collapseTrigger.setAttribute('id', collapseTriggerId);
    }
    if ($collapseContent) {
      $collapseContent.setAttribute('aria-hidden', true);
      $collapseContent.setAttribute('role', 'region');
      $collapseContent.setAttribute('id', collapseContentId);
      $collapseContent.setAttribute('aria-labelledby', collapseTriggerId);
    }
  }

  function setupActions() {
    const { duration, easing } = props.animation;

    const a11yCleanup = [];

    actions.open = (immediate = false) => {
      $collapseTrigger.setAttribute('aria-expanded', true);
      $collapseContent.setAttribute('aria-hidden', false);

      if (closeTimeline) {
        closeTimeline.kill();
      }

      gsap.set($collapseContent, { height: 'auto', display: 'block', paddingTop: null, paddingBottom: null });
      gsap.timeline().from($collapseContent, {
        duration: immediate ? 0 : duration,
        ease: easing,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overwrite: true,
        onComplete() {
          if (props.scrollTo) {
            gsap.to(window, {
              scrollTo: {
                y: $target,
                offsetY: 2 * ($collapseContent.offsetTop - $collapseTrigger.offsetTop),
              },
            });
          }

          if (props.a11yTab) {
            a11yCleanup.push(
              lastNodeFocusOut(etUI.utils.lastNode(tabbable.tabbable($collapseContent)), () => {
                setState({ state: 'close' });
              }),
            );
          }
          if (props.afterOpen) {
            props.afterOpen({
              target: $target,
            });
          }
        },
      });

      if (props.clickOutside) {
        clickOutsideCleanup = useClickOutside($target, () => {
          setState({ state: 'close' });
        });
      }
    };

    actions.close = (immediate = false) => {
      if (clickOutsideCleanup) {
        clickOutsideCleanup();
      }

      $collapseTrigger.setAttribute('aria-expanded', false);
      $collapseContent.setAttribute('aria-hidden', true);

      closeTimeline = gsap.timeline().to($collapseContent, {
        duration: immediate ? 0 : duration,
        ease: easing,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        overwrite: true,
        onComplete() {
          $collapseContent.style.display = 'none';
          etUI.utils.allCleanups(a11yCleanup);
          if (props.afterClose) {
            props.afterClose({
              target: $target,
            });
          }
        },
      });
    };
  }

  function setEvent() {
    addEvent('click', collapseTrigger, ({ target }) => {
      try {
        if (state.state === 'open') {
          setState({ state: 'close' });
        } else {
          setState({ state: 'open' });
        }
      } catch (error) {
        console.error('Error handling collapse click event:', error);
      }
    });

    if (props.a11yTab) {
      firstNodeFocusOut($collapseTrigger, () => {
        setState({ state: 'close' });
      });
    }
  }

  function render(immediate = false) {
    const isShow = state.state === 'open';
    isShow ? actions.open(immediate) : actions.close(immediate);
  }

  function open(immediate = false) {
    setState({ state: 'open' }, { immediate });
  }

  function close(immediate = false) {
    setState({ state: 'close' }, { immediate });
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
