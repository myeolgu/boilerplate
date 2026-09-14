function useToast() {
  const show = (message, opts) => {
    const $layerWrap = document.querySelector('.layer-wrap');
    const toast = new etUI.components.Toast();

    // 이벤트 핸들러 내부에서 툴팁 생성
    etUI.config.toastWrap = document.querySelector('.layer-toast-wrap');
    if (!etUI.config.toastWrap) {
      etUI.config.toastWrap = document.createElement('div');
      etUI.config.toastWrap.classList.add('layer-toast-wrap');
      $layerWrap.append(etUI.config.toastWrap);
    }
    etUI.config.toastWrap.role = 'alert';

    toast.core.init(etUI.config.toastWrap);

    toast.show(message, opts);
    return toast;
  };

  return {
    show,
  };
}
