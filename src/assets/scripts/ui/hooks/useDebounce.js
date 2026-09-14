function useDebounce() {
  function debounce(func, delay = 250, scope = undefined) {
    let timeoutId;

    return function (...args) {
      if (scope) {
        args.unshift(scope);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  return {
    debounce,
  };
}
