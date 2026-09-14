/**
 * lottie
 */
function Lottie() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      loop: true,
      autoplay: true,
      scroll: false,
      // props
    },
    {
      // state
    },
    render,
  );

  // constant
  const MARGIN = 20;

  // variable
  const name = 'lottie';
  // eslint-disable-next-line prefer-const
  let component = {};
  // element, selector
  let $target;
  let lottieInstance;

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
    // template, selector, element, actions
    setupTemplate();
    setupSelector();
    setupElement();
    setupActions();

    // state
    // setState({ state: props.state });
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

  function setupSelector() {}

  function setupElement() {
    lottieInstance = lottie.loadAnimation({
      container: $target, // the dom element that will contain the animation
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.scroll ? false : props.autoplay,
      path: `${etUI.config.lottie.basePath}/${props.name}.json`, // the path to the animation json
    });

    if (props.scroll) {
      ScrollTrigger.create({
        trigger: $target,
        start: 'top bottom',
        end: 'bottom top',
        markers: false,
        onEnter: () => {
          lottieInstance.play();
        },
        onEnterBack: () => {
          lottieInstance.play();
        },
        onLeave: () => {
          lottieInstance.pause();
        },
        onLeaveBack: () => {
          lottieInstance.pause();
        },
      });
    }
  }

  function setupActions() {}

  function setEvent() {}

  function render() {
    // render
  }

  function play() {
    lottieInstance.play();
  }

  function stop() {
    lottieInstance.stop();
  }

  component = {
    core: {
      state,
      props,
      init,
      removeEvent,
      destroy,
    },

    // callable
    update,
    play,
    stop,
    getLottieInstance: () => lottieInstance,
  };

  return component;
}
