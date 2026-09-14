/**
 * useDebounceResize
 * @param listener  {function}
 * @param options {object}
 * @returns {function(): *}
 */
function useDebounceResize(listener, options = {}) {
  const { debounce } = etUI.hooks.useDebounce();
  let isDestroy;
  listener();

  const debounceListener = debounce(() => {
    if (isDestroy) return;
    listener();
  }, 150);

  window.addEventListener('resize', debounceListener, options);

  return () => {
    isDestroy = true;
    window.removeEventListener('resize', debounceListener, options);
  };
}
