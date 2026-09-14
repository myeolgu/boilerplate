/**
 *  Modal
 */
function Dialog() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
      dimmClick: true,
      esc: true,
      title: null,
      message: '',
      type: 'alert',
      positiveText: etUI.$t('dialog.positive', '확인'),
      negativeText: etUI.$t('dialog.negative', '취소'),
    },
    {
      state: 'close',
      trigger: null,
    },
    render,
    {
      dataset: false,
    },
  );

  // constant
  const DIMM_OPACITY = etUI.config.layer.dimmOpacity;

  // variable
  const name = 'dialog';
  let component = {};
  let modalDimmSelector, modalCloseBtnSelector, modalBtnPositive, modalBtnNegative;
  let $target, $modal, $modalTitle, $modalContainer, $modalDimm, $modalBtnPositive, $modalBtnNegative, focusTrapInstance, callback;

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

    setTarget($target, { stateCallback: _props?.stateCallback });
    setProps({ ...props, ..._props });

    if ($target.ui) {
      return;
    }
    $target.ui = component;

    setup();
    setEvent();

    // $target.setAttribute('data-init', 'true');
  }

  function setup() {
    setupTemplate();
    setupSelector();
    setupElement();
    setupActions();

    // focus trap
    focusTrapInstance = focusTrap.createFocusTrap($modal, {
      escapeDeactivates: props.esc,
      onActivate: actions.focusActivate,
      onDeactivate: actions.focusDeactivate,
    });

    // state
    // setState({ state: props.state });
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) {
      return;
    }
    destroy();

    setProps({ ...props, ..._props });
    setup();
    setEvent();
  }

  function destroy() {
    removeEvent();
    $target.ui = null;
  }

  // frequency
  function setupTemplate() {
    const { $templateHTML, $templatePreviewImageHTML } = etUI.templates.dialogTmpl();

    if (props.dialogType === 'alert' || props.dialogType === 'confirm') {
      $target.insertAdjacentHTML('beforeend', $templateHTML(props));
    } else if (props.dialogType === 'previewImage') {
      $target.insertAdjacentHTML('beforeend', $templatePreviewImageHTML(props));
    }

    $modal = $target.querySelector('.component-dialog');
  }

  function setupSelector() {
    // selector
    modalCloseBtnSelector = '.dialog-close';
    modalDimmSelector = '.dialog-dimm';

    // element
    $modalTitle = $modal.querySelector('.dialog-tit');
    $modalDimm = $modal.querySelector(modalDimmSelector);
    $modalContainer = $modal.querySelector('.dialog-container');

    modalBtnPositive = '.dialog-positive';
    modalBtnNegative = '.dialog-negative';
    $modalBtnPositive = $modal.querySelector('.dialog-positive');
    $modalBtnNegative = $modal.querySelector('.dialog-negative');
  }

  function setupElement() {
    // set id
    const id = etUI.utils.getRandomUIID(name);
    const titleId = etUI.utils.getRandomUIID(`${name}-tit`);
    // // a11y

    if (props.dialogType === 'alert' || props.dialogType === 'confirm') {
      etUI.utils.setProperty($modal, 'role', 'alertdialog');
    } else if (props.dialogType === 'previewImage') {
      etUI.utils.setProperty($modal, 'role', 'dialog');

      const $swiper = $modal.querySelector('.component-swiper');
      const swiper = new etUI.components.SwiperComp();
      swiper.core.init($swiper, {
        navigation: true,
        pagination: true,
      });
    }

    etUI.utils.setProperty($modal, 'aria-modal', 'true');
    etUI.utils.setProperty($modal, 'id', id);
    if ($modalTitle) {
      etUI.utils.setProperty($modalTitle, 'id', titleId);
    }
    etUI.utils.setProperty($modal, 'aria-labelledby', titleId);
    etUI.utils.setProperty($modal, 'tabindex', '-1');
  }

  function setupActions() {
    const { getTopDepth, setLayerOpacity, enableScrollLock, disableScrollLock } = etUI.hooks.useLayer();

    actions.focusActivate = () => {};

    actions.focusDeactivate = () => {
      if (!state.trigger) {
        callback = props.negativeCallback;
      }
      actions.close();
    };

    actions.open = () => {
      const zIndex = getTopDepth();

      $modal.style.display = 'block';
      $modal.style.zIndex = zIndex;

      // if (props.dialogType === 'youtube') {
      // }
      enableScrollLock();

      setLayerOpacity(DIMM_OPACITY);

      gsap.timeline().to($modalDimm, { duration: 0, display: 'block', opacity: 0 }).to($modalDimm, {
        duration: 0.15,
        opacity: 1,
      });

      gsap
        .timeline()
        .to($modalContainer, {
          duration: 0,
          display: 'block',
          opacity: 0,
          scale: 0.95,
          yPercent: 2,
        })
        .to($modalContainer, { duration: 0.15, opacity: 1, scale: 1, yPercent: 0, ease: 'Power2.easeOut' });

      // 스크롤 위치 저장 및 스크롤 잠금
      // component.scrollY = window.scrollY;
      // document.body.classList.add('no-scroll');
      // document.body.style.top = `-${component.scrollY}px`;
    };

    actions.close = () => {
      gsap.timeline().to($modalDimm, {
        duration: 0.15,
        opacity: 0,
        onComplete() {
          $modalDimm.style.display = 'none';
        },
      });

      gsap.timeline().to($modalContainer, {
        duration: 0.15,
        opacity: 0,
        scale: 0.95,
        yPercent: 2,
        ease: 'Power2.easeOut',
        onComplete() {
          $modalContainer.style.display = 'none';
          $modal.style.display = 'none';
          $modal.style.zIndex = null;

          setLayerOpacity(DIMM_OPACITY);

          destroy();

          if ($modal && $modal.parentNode === $target) {
            $target.removeChild($modal);
          }

          // 스크롤 잠금 해제 및 위치 복원
          // document.body.classList.remove('no-scroll');
          // window.scrollTo(0, component.scrollY);
          // document.body.style.top = '';

          if (callback) {
            callback();
          }
        },
      });

      disableScrollLock();


    };
  }

  function setEvent() {
    addEvent('click', modalCloseBtnSelector, () => {
      close();
    });

    if (props.dimmClick) {
      addEvent('click', modalDimmSelector, close);
    }

    addEvent('click', modalBtnPositive, () => {
      if (props.callback) {
        callback = props.callback;
      } else if (props.positiveCallback) {
        callback = props.positiveCallback;
      }

      close('btnPositive');
    });
    addEvent('click', modalBtnNegative, () => {
      callback = props.negativeCallback;

      close('btnNegative');
    });
  }

  function render() {
    const isOpened = state.state === 'open';

    if (isOpened) {
      actions.open();

      focusTrapInstance.activate();
    } else {
      focusTrapInstance.deactivate();
    }
  }

  function open() {
    setState({ state: 'open' });
  }

  function close(trigger) {
    setState({ state: 'close', trigger });
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
