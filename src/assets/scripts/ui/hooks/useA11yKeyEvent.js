function useA11yKeyEvent() {
  function firstNodeFocusOut(target, handler) {
    return etUI.hooks.useEventListener(target, 'keydown', (e) => {
      if (e.key === 'Tab' && e.shiftKey) {
        handler();
      }
    });
  }

  function lastNodeFocusOut(target, handler) {
    return etUI.hooks.useEventListener(target, 'keydown', (e) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        handler();
      }
    });
  }

  return {
    firstNodeFocusOut,
    lastNodeFocusOut,
  };
}
