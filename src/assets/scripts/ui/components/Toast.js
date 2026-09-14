function Toast() {
  const {
    actions, props, state, setProps, setState, setTarget, addEvent, removeEvent,
  } = etUI.hooks.useCore({
    // props
    type: 'basic',
    message: '메세지를 지정해 주세요.',
  }, {
    // state

  }, render);

  // variable
  const name = 'toast';
  let component = {};
  // element, selector
  let $target, $toast;
  let toastTriggerBtn, toastCloseBtn;

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
      throw Error('target이 존재하지 않습니다.');
    }

    setTarget($target );
    setProps({ ...props, ..._props });

    if ($target.ui) {return;}
    $target.ui = component;

    setup();
    setEvent();

    // $target.setAttribute('data-init', 'true');
  }

  function setup() {
    // setupTemplate();
    setupSelector();
    setupElement();
    setupActions();
  }

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

  }

  function setupSelector() {
    toastTriggerBtn = '.toast-trigger-btn';
    toastCloseBtn = '.toast-close-btn';
  }

  function setupElement() {
    // id는 actions.open()에서 $toast 생성 시 설정
  }

  function setAnimation (newToast, innerToast) {
    // 개별 타임라인 생성
    const tl = gsap.timeline();

    tl.fromTo(newToast, {
      opacity: 0,
      height: 0,
      marginBottom: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      height: innerToast.clientHeight,
      marginBottom: '0.8rem',
    })
      .to(newToast, {
        delay: 3,
        duration: 0.5,
        opacity: 0,
        onComplete: () => {
          newToast.remove();
        },
      });
  }

  function setupActions() {
    const { $templateHTML, $templatCloseHTML, $templateLinkHTML } = etUI.templates.toastTmpl();
    actions.open = () => {
      const container = document.createElement('div');
      container.classList.add('component-toast');

      const id = etUI.utils.getRandomUIID(name);

      if (props.type === 'basic') {
        container.innerHTML = $templateHTML(props);
      } else if (props.type === 'close') {
        container.innerHTML = $templatCloseHTML(props);
      } else if (props.type === 'link') {
        container.innerHTML = $templateLinkHTML(props);
      }
      $target.appendChild(container);
      $toast = container;

      etUI.utils.setProperty($toast, 'id', id);

      setAnimation($toast, $toast.querySelector('.toast-container'));
    };

    actions.close = ({ target }) => {
      target.closest('.component-toast').remove();
    };
  }

  function setEvent() {
    addEvent('click', toastCloseBtn, actions.close);
  }

  function render() {
    // render
  }

  function open() {
    setupActions();
    actions.open();
  }

  function close() {
    if ($toast) {
      $toast.remove();
    }
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
    open,
    close,
  };

  return component;
}
