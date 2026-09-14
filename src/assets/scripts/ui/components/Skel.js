/**
 * Skel
 * 새 UI 컴포넌트를 만들 때 참고하는 보일러플레이트 템플릿이다. 실제 화면에서 초기화해 쓰는
 * 컴포넌트가 아니므로 `.component-skel` 같은 실제 클래스나 마크업 가이드는 없다.
 * // init, setup, update, destroy
 * // setupTemplate, setupSelector, setupElement, setupActions,
 *      setEvent, render, customFn, callable
 *
 *      dom만 이용해서 ui 초기화
 *        data-props-opt1, data-props-opt2, data-props-opt3
 *      고급옵션
 *        data-init=false
 *        const instance = new Skel();
 *        instance.core.init('.selector', { opt1: 'value' })
 *
 *      data-init 처리
 */
function Skel() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent, cleanups } = etUI.hooks.useCore(
    {
      // props
    },
    {
      // state
    },
    render
  );

  // constant
  const MARGIN = 20;

  // variable
  const name = 'skel';
  // eslint-disable-next-line prefer-const
  let component = {};
  // element, selector
  let $target, someSelector, otherSelector;
  let targetEls1, targetEls2;

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
      throw Error('target이 존재하지 않습니다.');
    }

    setTarget($target, { stateCallback: _props?.stateCallback });
    setProps({ ...props, ..._props });

    if ($target.ui) return;
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
    // template, selector, element, actions
    setupSelector();
    setupTemplate();
    setupElement();
    setupActions();

    // state
    setState({ state: props.state });
  }

  /**
   * update
   * @param _props
   */
  function update(_props) {
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) return;
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

  function setupSelector() {
    targetEls1 = '.el1';
    targetEls2 = '.el2';
  }

  // frequency
  function setupTemplate() {
    // const { $templateHTML } = etUI.templates.dialogTmpl();
    // $target.innerHTML = ``;
  }

  function setupElement() {
    // id
    const labelId = etUI.utils.getRandomUIID(name);

    // a11y
    etUI.utils.setProperty($target, 'id', labelId);

    // component custom element
  }

  function setupActions() {
    actions.open = () => { };

    actions.close = () => { };
  }

  function setEvent() {
    addEvent('click', targetEls1, ({ target }) => {
      // handler
    });
  }

  function render() {
    // render
  }

  function open() { }

  function close() { }

  component = {
    core: {
      state,
      props,
      init,
      removeEvent,
      destroy,
    },

    // callable
    update,
    open,
    close,
  };

  return component;
}