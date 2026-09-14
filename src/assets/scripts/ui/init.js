// init js
function initUI() {
  const { mediaQueryAction } = etUI.hooks.useMediaQuery();
  const componentList = [
    {
      selector: '.component-input',
      fn: etUI.components.Input,
    },
    {
      selector: '.component-modal',
      fn: etUI.components.Modal,
    },
    {
      selector: '.component-collapse',
      fn: etUI.components.Collapse,
    },
    {
      selector: '.component-accordion',
      fn: etUI.components.Accordion,
    },
    {
      selector: '.component-tooltip',
      fn: etUI.components.Tooltip,
    },
    {
      selector: '.component-tab',
      fn: etUI.components.Tab,
    },
    {
      selector: '.component-select',
      fn: etUI.components.SelectBox,
    },
    {
      selector: '.component-swiper',
      fn: etUI.components.SwiperComp,
    },
    {
      selector: '.component-datepicker',
      fn: etUI.components.DatepickerComp,
    },
  ];

  mediaQueryAction((context) => {
    const { isDesktop, isMobile } = context.conditions;

    componentList.forEach(({ selector, fn }) => {
      document.querySelectorAll(selector).forEach((el) => {
        const { desktopOnly, mobileOnly } = el.dataset;
        if (mobileOnly || desktopOnly) {
          const shouldInit = (mobileOnly && isMobile) || (desktopOnly && isDesktop);

          if (shouldInit) {
            // 초기화
            fn().core.init(el);
          } else if (el.ui) {
            // 파괴
            el.ui.core.destroy();
          }

          return;
        }

        if (el.dataset.init) {
          return;
        }

        try {
          const component = fn();
          document.fonts.ready.then(() => {
            try {
              if (component && component.core) {
                component.core.init(el, {}, selector);
              } else {
                console.warn('Component initialization failed: component or component.core is undefined', selector);
              }
            } catch (error) {
              console.error('Error initializing component:', selector, error);
            }
          });
        } catch (error) {
          console.error('Error creating component instance:', selector, error);
        }
      });
    });
  });

  etUI.dialog = etUI.hooks.useDialog();
}

etUI.initUI = initUI;

(function autoInit() {
  const $scriptBlock = document.querySelector('[data-init]');
  if ($scriptBlock) {
    document.addEventListener('DOMContentLoaded', () => {
      initUI();
    });
  }
})();
