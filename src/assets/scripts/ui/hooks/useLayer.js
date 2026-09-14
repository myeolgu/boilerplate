function useLayer(type = 'modal') {
  function getVisibleLayer() {
    const $layerComponents = Array.from(document.querySelector('.layer-wrap').children).filter(($el) => {
      const isModalComponent = $el.classList.contains('component-modal');
      const isDialogComponent = $el.classList.contains('component-dialog');

      return isModalComponent || isDialogComponent;
    });

    return $layerComponents.filter(($el) => {
      const style = window.getComputedStyle($el);
      return style.display !== 'none';
    });
  }

  function getTopDepth() {
    const $visibleLayerComponents = getVisibleLayer();
    return 100 + $visibleLayerComponents.length;
  }

  function setLayerOpacity(defaultOpacity = 0.5) {
    const $visibleLayerComponents = getVisibleLayer();
    $visibleLayerComponents.forEach(($el, index) => {
      const opacity = etUI.utils.getBlendOpacity(defaultOpacity, $visibleLayerComponents.length);

      if ($el.querySelector('.modal-dimm')) {
        $el.querySelector('.modal-dimm').style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }

      if ($el.querySelector('.dialog-dimm')) {
        $el.querySelector('.dialog-dimm').style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }
    });
  }

  /**
   * 레이어(모달/다이얼로그) 열릴 때 배경 스크롤 방지
   */
  function enableScrollLock() {
    document.documentElement.style.overflow = 'hidden';
    // const scrollY = window.scrollY;
    // document.documentElement.style.overflowY = 'scroll';
    // document.body.style.position = 'fixed';
    // document.body.style.top = `-${scrollY}px`;
    // document.body.style.width = '100%';
  }

  function disableScrollLock() {
    const $visibleLayerComponents = getVisibleLayer();
    // console.log('$visibleLayerComponents', $visibleLayerComponents);
    // if ($visibleLayerComponents.length === 0) {
    //   document.documentElement.style.overflow = null;
    // }
    document.documentElement.style.overflow = null;

    // const scrollY = parseInt(document.body.style.top || '0') * -1;
    // document.documentElement.style.overflowY = '';
    // document.body.style.position = '';
    // document.body.style.top = '';
    // document.body.style.width = '';
    // window.scrollTo(0, scrollY);
  }

  return {
    getVisibleLayer,
    getTopDepth,
    setLayerOpacity,
    enableScrollLock,
    disableScrollLock,
  };
}
