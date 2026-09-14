function chipsTmpl() {
  const $chipsHTML = () => {
    // <div class="chips-btn-mask"></div>
    return `
        <div class="btn-box">
          <button type="button" class="btn toggle-btn" aria-expanded="false"></button>
        </div>
      `;
  };

  return {
    $chipsHTML,
  };
}
