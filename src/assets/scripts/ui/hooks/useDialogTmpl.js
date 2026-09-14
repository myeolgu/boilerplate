function dialogTmpl() {
  const $templateHTML = ({ dialogType, type, title, message, positiveText, negativeText }) => `
      <div class="component-dialog">
        <div class="dialog-dimm"></div>
        <div class="dialog-frame">
          <div class="dialog-container">
            <div class="dialog-header">
              ${title ? `<h3 class="dialog-tit">${title}</h3>` : ''}
            </div>
            <div class="dialog-content">
              ${dialogType === 'alert' ? `<span class="${type}">icon</span>` : ''}

              <p class="dialog-info">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="btn-group">
              ${dialogType === 'confirm' ? `<button type="button" class="btn btn-square btn-white dialog-negative">${negativeText}</button>` : ''}
              ${positiveText ? `<button type="button" class="btn dialog-positive btn-primary">${positiveText}</button>` : ''}
            </div>

            ${dialogType === 'alert' ? '<button type="button" class="dialog-close"><span class="hide-txt">팝업 닫기</span></button>' : ''}

          </div>
        </div>
      </div>
    `;

  const $templatePreviewImageHTML = ({ dialogType, images, title }) => `
      <div class="component-dialog dialog-preview-image">
        <div class="dialog-dimm"></div>
        <div class="dialog-frame">
          <div class="dialog-container">
            <div class="dialog-header">
              ${title ? `<h3 class="dialog-tit">${title}</h3>` : ''}
            </div>
            <div class="dialog-content">
              <div class="component-swiper">
                <!-- Additional required wrapper -->
                <div class="swiper-wrapper">
                  ${images
    .map(
      (image) => `
                    <div class="swiper-slide">
                      <img src="${image.src}" alt="${image.alt}" />
                    </div>
                  `,
    )
    .join('')}
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-square btn-white dialog-negative">닫기</button>
          </div>
        </div>
      </div>
    `;
  return {
    $templateHTML,
    $templatePreviewImageHTML,
  };
}
