/**
 * SwiperComp
 */
function SwiperComp() {
  const { actions, props, state, setState, setProps, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      loop: false,
      observer: true,
      // updateOnWindowResize: false,
      on: {
        slideChangeTransitionEnd() {
          setState({ activeIndex: this.realIndex + 1 });
        },
      },
    },
    {
      state: '',
      running: '',
      activeIndex: 0,
    },
    render,
  );

  /**
   * data-props 리스트
   */

  // constant
  const MARGIN = 20;

  // variable
  const name = 'swiper';
  let component = {};
  const className = '';
  // element, selector
  let $target, $swiper, $swiperNavigation, $swieprProgress;
  let swiperButtonPrev, swiperButtonNext, swiperPagination, swiperAutoplay, $swiperSlideToButton;
  let exceptionClassName, swiperLength, swiperPerView;

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
    setupSelector();
    setupTemplate();
    setupElement();
    setupActions();

    // state
    setState({ state: props.state });
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) {return;}
    destroy();
    $target.ui = component;
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
    const { navigation, pagination, paginationType, paginationClass, navigationClass ,autoplay, freeMode, indicatorTexts } = props; // Add indicatorTexts here
    const { $templateHTML } = etUI.templates.swiperTmpl();
    let swiperControls;

    const $swiperControls = document.createElement('div');
    $swiperControls.classList.add('swiper-controls');

    if ($target.querySelector('.swiper-controls')) {
      swiperControls = $target.querySelector('.swiper-controls');
    } else {
      swiperControls = $swiperControls;
      $target.appendChild(swiperControls);
    }

    if ($target.querySelectorAll('.swiper-slide').length < 2 && !$target.classList.contains('flow')) {
      swiperControls.style.opacity = 0;
      swiperControls.style.visibility = 'hidden';
      return;
    }

    if (navigation) {
      swiperControls.insertAdjacentHTML('beforeend', $templateHTML.navigation(navigationClass));
      // if (typeof navigation === 'boolean' && !$target.querySelector(swiperButtonPrev) && !$target.querySelector(swiperButtonNext)) {
      //   swiperControls.insertAdjacentHTML('beforeend', $templateHTML.navigation(navigationClass));
      // }

      // if (navigation === 'exception') {
      //   const exceptionControl = document.querySelector(exceptionClassName);
      //   setProps({
      //     navigation: {
      //       prevEl: exceptionControl.querySelector(swiperButtonPrev),
      //       nextEl: exceptionControl.querySelector(swiperButtonNext),
      //     },
      //   });
      // } else {
      //   setProps({
      //     navigation: {
      //       prevEl: $target.querySelector(swiperButtonPrev),
      //       nextEl: $target.querySelector(swiperButtonNext),
      //     },
      //   });
      // }
    }

    if (freeMode) {
      setProps({
        slidesPerView: 'auto',
      });
    }

    if (pagination) {
      !$target.querySelector(swiperPagination) && swiperControls.insertAdjacentHTML('beforeend', $templateHTML.pagination(paginationClass));
      setProps({
        pagination: {
          el: $target.querySelector(swiperPagination),
          type: paginationType ? paginationType : 'fraction',
          clickable: paginationType === 'bullets' ? true : false,
        },
      });
    }

    if (autoplay) {
      !$target.querySelector(swiperAutoplay) && swiperControls.insertAdjacentHTML('beforeend', $templateHTML.autoplay());
    }

    if (indicatorTexts && indicatorTexts.length > 0) {
      const indicatorsHTML = '<div class="swiper-indicators"></div>';
      $target.insertAdjacentHTML('beforeend', indicatorsHTML);
      const indicatorsEl = $target.querySelector('.swiper-indicators');
      setProps({
        pagination: {
          el: indicatorsEl,
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className}">${indicatorTexts[index]}</span>`;
          },
        },
      });
    }

    // breakpoints
    if (props.breakpoints) {
      const $breakpoints = Object.values(props.breakpoints)[0];
      const $key = Object.keys($breakpoints);
      const $value = Object.values($breakpoints);

      const newBreakpoints = {};

      $key.forEach((_key, idx) => {
        if (!isNaN(Number($value[idx]))) {
          newBreakpoints[_key] = Number($value[idx]);
        } else {
          newBreakpoints[_key] = $value[idx];
        }
      });

      setProps({
        breakpoints: {
          1024: { ...newBreakpoints },
        },
      });
    }
  }

  function setupSelector() {
    swiperPagination = '.swiper-pagination';
    swiperButtonPrev = '.swiper-button-prev';
    swiperButtonNext = '.swiper-button-next';
    swiperAutoplay = '.swiper-autoplay';
    exceptionClassName = $target?.dataset?.exceptionClass;
  }

  function setupElement() {
    // id

    // a11y

    // new Swiper 생성
    $swiper = new Swiper($target.querySelector('.swiper-container'), { ...props });

    $swiperNavigation = $target.querySelector('.swiper-navigation');
    $swieprProgress = $target.querySelector('.swiper-progress');

    swiperLength = $swiper.slides.length;
    swiperPerView = $swiper.params.slidesPerView;

    if (swiperLength <= swiperPerView) {
      if ($swiperNavigation) {$swiperNavigation.style.display = 'none';}
      if ($swieprProgress) {$swieprProgress.style.display = 'none';}
    }
  }

  function setupActions() {
    // actions.start = () => {
    //   play();
    // };
    //
    // actions.stop = () => {
    //   stop();
    // };
  }

  function setEvent() {
    // autoplay 버튼
    if (props.autoplay) {
      addEvent('click', swiperAutoplay, (event) => {
        const $eventTarget = event.target.closest(swiperAutoplay);
        handleAutoplay($eventTarget);
      });
    }
  }

  function render() {
    // render
  }

  // autoplay 관련 커스텀 함수
  function handleAutoplay($target) {
    $target.classList.toggle('play');
    $target.classList.toggle('stop');

    if ($target.classList.contains('stop')) {
      stop();
    } else if ($target.classList.contains('play')) {
      play();
    }
  }

  function play() {
    $swiper.autoplay.start();
  }

  function stop() {
    $swiper.autoplay.stop();
  }

  // 특정 슬라이드로 이동
  // function moveToSlide(index, speed, runCallbacks) {
  //   if (props.loop) {
  //     $swiper.slideToLoop(index, speed, runCallbacks);
  //   } else {
  //     $swiper.slideTo(index);
  //   }
  // }

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
    handleAutoplay,
    getSwiperInstance() {
      return $swiper; // $swiper 인스턴스 반환
    },
  };

  return component;
}
