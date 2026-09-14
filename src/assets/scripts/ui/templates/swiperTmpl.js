function swiperTmpl() {
  const $templateHTML = {
    navigation(className = '') {
      return `
        <div class="swiper-navigation ${className}">
          <button type="button" class="swiper-button-prev"><span class="hide-txt">${etUI.$t('swiper.navigation.prev', '이전 슬라이드')}</span></button>
          <button type="button" class="swiper-button-next"><span class="hide-txt">${etUI.$t('swiper.navigation.next', '다음 슬라이드')}</span></button>
        </div>
      `;
    },
    pagination(className = '') {
      return `
        <div class="swiper-pagination ${className}"></div>
      `;
    },
    autoplay() {
      return `
        <div class="swiper-autoplay-wrap">
          <button type="button" class="swiper-autoplay play"><span class="hide-txt">${etUI.$t('swiper.autoplay.stop', '정지')}</span></button>
        </div>
      `;
    },
    swiperControls() {
      return `
        <div class="swiper-controls"></div>
      `;
    },
    prevEl(className = null) {
      return `
      <div class="swiper-navigation ${className}">
        <button type="button" class="swiper-button-prev"><span class="hide-txt">${etUI.$t('swiper.navigation.prev', '이전 슬라이드')}</span></button>
      </div>
      `;
    },
    nextEl(className = null) {
      return `
      <div class="swiper-navigation ${className}">
        <button type="button" class="swiper-button-next"><span class="hide-txt">${etUI.$t('swiper.navigation.next', '다음 슬라이드')}</span></button>
      </div>
      `;
    },
  };

  return {
    $templateHTML,
  };
}
