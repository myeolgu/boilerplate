/**
 * useEventListener
 * @param target  {HTMLElement|HTMLElement[]}
 * @param type  {string}
 * @param listener  {function}
 * @param options {object}
 * @returns {function(): *}
 */
function useEventListener(target, type, listener, options = {}) {
  if (NodeList.prototype.isPrototypeOf(target)) {
    target.forEach((element) => element.addEventListener(type, listener, options));
    return () => target.forEach((element) => element.removeEventListener(type, listener, options));
  }

  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}
