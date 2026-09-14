function toastTmpl() {
  const $templateHTML = ({ message }) => `
      <div class="toast-container">
        <div class="toast-content">
          <p class="toast-txt">${message}</p>
        </div>
      </div>
    `;
  const $templatCloseHTML = ({ message, closeText }) => `
      <div class="toast-container">
        <div class="toast-content">
          <p class="toast-txt">${message}</p>
          <button class="toast-close-btn">${closeText}<span class="hide-txt">팝업 닫기</span></button>
        </div>
      </div>
    `;

  const $templateLinkHTML = ({ message, link }) => `
      <div class="toast-container">
        <div class="toast-content">
          <p class="toast-txt">${message}</p>
          <a href="${link}" class="toast-link-btn">링크</a>
        </div>
      </div>
    `;

  return {
    $templateHTML,
    $templatCloseHTML,
    $templateLinkHTML,
  };
}
