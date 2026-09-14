/**
 * etUI - Enterprise UI Framework
 * @namespace etUI
 * @description 커스텀 UI 컴포넌트 프레임워크. 전역 네임스페이스로 모든 컴포넌트, 유틸리티, 설정을 관리합니다.
 */
const etUI = {};

/**
 * etUI 전역 설정 객체
 * @namespace etUI.config
 * @property {Object} media - 미디어 쿼리 설정
 * @property {Object} animation - 애니메이션 기본 설정
 * @property {Object} layer - 레이어/다이얼로그 설정
 * @property {Object} lenis - 스무스 스크롤 설정
 * @property {Object} locale - 다국어 설정
 * @property {Object} lottie - Lottie 애니메이션 설정
 */
etUI.config = {
  media: {
    names: ['isMobile', 'isDesktop'],
    points: [1023],
  },
  animation: {
    duration: 0.4,
    durationFast: 0.15,
    durationSlow: 0.7,
    stagger: 0.1,
    easing: 'Power2.easeOut',
  },
  layer: {
    dimmOpacity: 0.6,
  },
  spacing: {
    margin: 20,
    defaultDelay: 250,
  },
  initDefault() {
    gsap.defaults({
      ease: this.animation.easing,
      duration: this.animation.duration,
    });
  },
  lenis: {
    enable: false,
    options: {},
    speed: 2000,
    lagSmoothing: 0,
  },
  locale: {
    default: 'ko',
  },
  lottie: {
    basePath: location.pathname.startsWith('/p/') ? '/p/assets/images/lottie' : '/assets/images/lottie',
  },
};
etUI.config.initDefault();

// pages
etUI.pages = {};

etUI.locales = {};
etUI.locales.ko = {
  input: {
    password_hide: '비밀번호 숨기기',
    password_show: '비밀번호 표시',
    clear: '내용 지우기',
  },
  swiper: {
    navigation: {
      prev: '이전 슬라이드',
      next: '다음 슬라이드',
    },
    pagination: {
      page: '페이지',
    },
    autoplay: {
      play: '재생',
      pause: '정지',
    },
  },
  dialog: {
    positive: '확인',
    negative: '취소',
  },
};

etUI.$t = function (key, defaultText = '') {
  const locale = etUI.locales[etUI.config.locale.default];
  return etUI.utils.getValueFromNestedObject(locale, key) || defaultText;
};

window.etUI = etUI;
