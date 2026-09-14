function useDialog() {
  let $layerWrapBox;

  function createLayerWrap() {
    $layerWrapBox = document.createElement('div');
    $layerWrapBox.classList.add('layer-wrap');
    document.body.appendChild($layerWrapBox);
  }

  const alert = (...opts) => {
    let $layerWrap = document.querySelector('.layer-wrap');
    const dialog = new etUI.components.Dialog();

    if (!$layerWrap) {
      createLayerWrap();
      $layerWrap = $layerWrapBox;
    }

    if (typeof opts[0] === 'string') {
      dialog.core.init($layerWrap, { dialogType: 'alert', message: opts[0], callback: opts[1] });
    } else if (typeof opts[0] === 'object') {
      dialog.core.init($layerWrap, { dialogType: 'alert', ...opts[0] });
    }

    dialog.open();
  };

  const confirm = (...opts) => {
    let $layerWrap = document.querySelector('.layer-wrap');
    const dialog = new etUI.components.Dialog();

    if (!$layerWrap) {
      createLayerWrap();
      $layerWrap = $layerWrapBox;
    }

    if (typeof opts[0] === 'string') {
      dialog.core.init($layerWrap, { dialogType: 'confirm', message: opts[0], positiveCallback: opts[1] });
    } else if (typeof opts[0] === 'object') {
      dialog.core.init($layerWrap, { dialogType: 'confirm', ...opts[0] });
    }

    dialog.open();
  };

  const previewImage = (...opts) => {
    let $layerWrap = document.querySelector('.layer-wrap');
    const dialog = new etUI.components.Dialog();

    if (!$layerWrap) {
      createLayerWrap();
      $layerWrap = $layerWrapBox;
    }

    dialog.core.init($layerWrap, { dialogType: 'previewImage', ...opts[0] });

    dialog.open();
  };

  const toastBasic = (...opts) => {
    const $toastWrap = document.querySelector('.toast-wrap');
    const toast = new etUI.components.Toast();

    if (!$toastWrap) {return;}

    toast.core.init($toastWrap, { type: 'basic', ...opts[0] });
    toast.open();
  };

  const toastCloseBtn = (...opts) => {
    const $toastWrap = document.querySelector('.toast-wrap');
    const toast = new etUI.components.Toast();

    if (!$toastWrap) {return;}

    toast.core.init($toastWrap, { type: 'close', ...opts[0] });
    toast.open();
  };

  const toastLinkBtn = (...opts) => {
    const $toastWrap = document.querySelector('.toast-wrap');
    const toast = new etUI.components.Toast();

    if (!$toastWrap) {return;}

    toast.core.init($toastWrap, { type: 'link', ...opts[0] });
    toast.open();
  };

  return {
    alert,
    confirm,
    previewImage,
    toastBasic,
    toastCloseBtn,
    toastLinkBtn,
  };
}
