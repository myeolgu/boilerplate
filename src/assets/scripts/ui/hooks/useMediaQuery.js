function useMediaQuery() {
  function mediaQueryAction(...args) {
    const gsapMediaQuery = gsap.matchMedia();

    if (gsapMediaQuery) {
      gsapMediaQuery.kill();
    }

    const mediaQueryCondition = etUI.utils.getMediaQueryCondition(etUI.config.media.names, etUI.config.media.points);

    gsapMediaQuery.add(mediaQueryCondition, ...args);

    return gsapMediaQuery;
  }

  return {
    mediaQueryAction,
  };
}
