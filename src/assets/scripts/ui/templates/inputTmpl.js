function inputTmpl() {
  const $templateHTML = {
    togglePassword() {
      return `
        <button type="button" class="input-field-btn password-state">
          <span class="hide-txt hide">${etUI.$t('input.password_hide', '비밀번호 숨기기')}</span>
          <span class="hide-txt show">${etUI.$t('input.password_show', '비밀번호 표시')}</span>
          <i class="ico-password-state ico-normal" aria-hidden="true"></i>
        </button>
      `;
    },
    clearButton() {
      return `
        <button type="button" class="input-field-btn clear">
          <span class="hide-txt">${etUI.$t('input.clear', '내용 지우기')}</span>
          <i class="ico-clear ico-normal" aria-hidden="true"></i>
        </button>
      `;
    },
    loading() {
      return `
        <i class="input-field-ico spinner" aria-hidden="true"></i>
      `;
    },
  };

  return {
    $templateHTML,
  };
}
