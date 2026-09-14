/**
 * Tab
 */
function Tab() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
    },
    {
      // state
    },
    render,
  );

  // variable
  const name = 'tab';
  // eslint-disable-next-line prefer-const
  let component = {};
  // element, selector
  let $target, tabHead, $tabHeadEl, tabBtn, $tabBtnEl, tabContent, $tabContentEl;

  /**
   * init
   * @param _$target
   * @param _props
   */
  function init(_$target, _props) {
    if (typeof _$target === 'string') {
      $target = document.querySelector(_$target);
    } else {
      $target = _$target;
    }

    if (!$target) {
      throw Error('Target does not exist.');
    }

    setTarget($target);
    setProps({ ...props, ..._props });

    if ($target.ui) {return;}
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
    setupTemplate();
    setupSelector();
    setupElement();
    setupActions();

    // effect
    props.sticky && stickyTab();

    // state
    setState({ activeValue: state.active ?? $tabBtnEl[0].getAttribute('data-tab-value') });
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) {return;}
    destroy();

    setProps({ ...props, ..._props });
    setup();
    setEvent();
  }

  function destroy() {
    removeEvent();
    $target.ui = null;
    $target.removeAttribute('data-init');
  }

  // frequency
  function setupTemplate() {
    // $target.innerHTML = ``;
  }

  function setupSelector() {
    // selector
    tabHead = '.tab-head';
    tabBtn = '.tab-label';
    tabContent = '.tab-content';

    // element
    $tabHeadEl = $target.querySelector(tabHead);
    $tabBtnEl = $target.querySelectorAll(tabBtn);
    $tabContentEl = $target.querySelectorAll(tabContent);
  }

  function setupElement() {
    // id
    // a11y
    etUI.utils.setProperty($target, tabHead, 'role', 'tablist');

    // component custom element
    $tabHeadEl.style.touchAction = 'none';
    $tabBtnEl.forEach((tab, index) => {
      const tabBtnId = etUI.utils.getRandomUIID(name);
      const tabContentId = etUI.utils.getRandomUIID('tabpanel');

      tab.setAttribute('id', tabBtnId);
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', false);

      if ($tabContentEl[index]) {
        $tabContentEl[index].setAttribute('id', tabContentId);
        $tabContentEl[index].setAttribute('role', 'tabpanel');

        const tabContentValue = $tabContentEl[index].getAttribute('data-tab-value');
        etUI.utils.setProperty($target, `${tabBtn}[data-tab-value="${tabContentValue}"]`, 'aria-controls', $tabContentEl[index].id);
      }

      const tabValue = tab.getAttribute('data-tab-value');
      etUI.utils.setProperty($target, `${tabContent}[data-tab-value="${tabValue}"]`, 'aria-labelledby', tab.id);
    });
  }

  function setupActions() {
    let startX = 0;
    let endX = 0;
    let moveX = 0;
    let scrollLeft = 0;
    let isReadyMove = false;
    let clickable = true;

    actions.select = (e) => {
      e.stopPropagation();
      const targetBtn = e.target.closest(tabBtn);
      if (!targetBtn) {return;}
      if (!clickable) {return;}
      setState({ activeValue: targetBtn.getAttribute('data-tab-value') });
      gsap.to($tabHeadEl, {
        duration: 0.5,
        scrollLeft: targetBtn.offsetLeft - 24,
        overwrite: true,
      });
    };

    actions.dragStart = (e) => {
      e.stopPropagation();
      if (isReadyMove) {return;}
      isReadyMove = true;
      startX = e.x;
      scrollLeft = $tabHeadEl.scrollLeft;
    };
    actions.dragMove = (e) => {
      e.stopPropagation();
      if (!isReadyMove) {return;}
      moveX = e.x;
      $tabHeadEl.scrollLeft = scrollLeft + (startX - moveX);
    };
    actions.dragEnd = (e) => {
      e.stopPropagation();
      if (!isReadyMove) {return;}
      endX = e.x;
      if (Math.abs(startX - endX) < 10) {clickable = true;}
      else {clickable = false;}
      isReadyMove = false;
    };
    actions.dragLeave = (e) => {
      e.stopPropagation();
      if (!isReadyMove) {return;}

      // gsap.to($tabHeadEl, {
      //   scrollLeft: $target.querySelector('[aria-selected="true"]').offsetLeft,
      //   overwrite: true,
      // });

      clickable = true;
      isReadyMove = false;
    };

    actions.up = (e) => {
      if (!e.target.previousElementSibling) {return;}
      setState({ activeValue: e.target.previousElementSibling.getAttribute('data-tab-value') });
      focusTargetValue(tabBtn, state.activeValue);
    };
    actions.down = (e) => {
      if (!e.target.nextElementSibling) {return;}
      setState({ activeValue: e.target.nextElementSibling.getAttribute('data-tab-value') });
      focusTargetValue(tabBtn, state.activeValue);
    };
    actions.first = () => {
      setState({ activeValue: $tabBtnEl[0].getAttribute('data-tab-value') });
      focusTargetValue(tabBtn, state.activeValue);
    };
    actions.last = () => {
      setState({ activeValue: $tabBtnEl[$tabBtnEl.length - 1].getAttribute('data-tab-value') });
      focusTargetValue(tabBtn, state.activeValue);
    };

    function focusTargetValue(el, value) {
      const focusTarget = $target.querySelector(`${el}[data-tab-value="${value}"]`);
      focusTarget?.focus();
    }
  }

  function setEvent() {
    const actionList = {
      up: ['ArrowLeft'],
      down: ['ArrowRight'],
      first: ['Home'],
      last: ['End'],
      select: ['Enter', ' '],
    };

    addEvent('click', tabHead, actions.select);
    addEvent('pointerdown', tabHead, actions.dragStart);
    addEvent('pointermove', tabHead, actions.dragMove);
    addEvent('pointerup', tabHead, actions.dragEnd);
    addEvent('pointerleave', tabHead, actions.dragLeave);

    addEvent('keydown', tabHead, (e) => {
      const { key } = e;
      const action = Object.entries(actionList).find(([_, keys]) => keys.includes(key));

      if (action) {
        e.preventDefault();
        e.stopPropagation();
        const [actionName] = action;
        actions[actionName]?.(e);
      }
    });
  }

  function render() {
    const getId = $target.querySelector(`${tabBtn}[aria-selected="true"]`)?.id;

    etUI.utils.setProperty($target, '[aria-selected="true"]', 'aria-selected', false);
    etUI.utils.setProperty($target, `${tabBtn}[data-tab-value="${state.activeValue}"]`, 'aria-selected', true);

    $target.querySelector(`${tabContent}[aria-labelledby="${getId}"]`)?.classList.remove('show');
    $target.querySelector(`${tabContent}[data-tab-value="${state.activeValue}"]`)?.classList.add('show');
  }

  // custom
  function stickyTab() {
    const { bottom } = etUI.hooks.useGetClientRect(document, props.sticky);

    $target.style.position = 'relative';
    $tabHeadEl.style.position = 'sticky';
    if (!bottom) {$tabHeadEl.style.top = `${0}px`;}
    else {$tabHeadEl.style.top = `${bottom}px`;}
  }

  function setOffsetLeft() {
    const targetBtn = $target.querySelector('[aria-selected="true"]');
    if (!targetBtn) {return;}

    gsap.set($tabHeadEl, {
      scrollLeft: targetBtn.offsetLeft - 24,
      overwrite: true,
    });
  }

  component = {
    core: {
      state,
      props,
      init,
      removeEvent,
      destroy,
    },
    setOffsetLeft,
    update,
  };

  return component;
}
