/**
 * @typedef {Object} PropsConfig
 * @property {boolean} disabled - 요소가 비활성화 상태인지를 나타냅니다.
 * @property {boolean} once - 이벤트나 액션을 한 번만 실행할지 여부를 결정합니다.
 * @property {false | number} duration - 애니메이션 또는 이벤트 지속 시간을 밀리초 단위로 설정합니다. 'false'일 경우 지속 시간을 무시합니다.
 * @property {Object} origin - 원점 또는 시작 지점을 나타내는 객체입니다.
 */

/**
 * @typedef {Object} StateConfig
 * @property {'close' | 'open'} state - 아코디언의 상태값. close, open 둘 중에 하나입니다.
 */

/** @type {PropsConfig} */
/** @type {StateConfig} */

function Accordion() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      //props
      index: -1,
      animation: {
        duration: 0.5,
        easing: 'power4.out',
      },
      type: 'multiple',
    },
    {
      //state
      index: -1,
    },
    render,
  );

  // constant

  // variable
  const name = 'accordion';
  let component = {};
  // element, selector
  let accordionItem;
  let $target, $accordionItem, $accordionItems;

  function init(_$target, _props) {
    if (typeof _$target === 'string') {
      $target = document.querySelector(_$target);
    } else {
      $target = _$target;
    }

    if (!$target) {
      throw Error('Target does not exist.');
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
    setupSelector();
    setupElement();
    setupActions();

    // state
    render(true);
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
    // selector
    accordionItem = '.accordion-item';

    // element
    $accordionItem = $target.querySelectorAll(accordionItem);
  }

  function setupElement() {
    $accordionItems = Array.from($accordionItem);
    const items = $accordionItems.map(($collapse, i) => {
      const collapse = etUI.components.Collapse();
      collapse.core.init($collapse, {
        afterOpen: props.afterOpen,
        afterClose: props.afterClose,
      });

      if (props.type === 'separate' || props.type === 'single') {
        if ($collapse.dataset.state === 'open') {
          // 안전하게 open 함수 호출
          try {
            open(i);
          } catch (error) {
            console.warn('Failed to open accordion item:', error);
          }
        }
      }

      return collapse;
    });

    if (state.index > -1) {
      setState({ index: state.index }, { immediate: true });
    }
  }

  function setupActions() {
    actions.open = () => {};

    actions.close = () => {};
  }

  function setEvent() {
    addEvent('click', accordionItem, ({ target }) => {
      if (props.type === 'single') {
        const collapse = target.closest(accordionItem);
        const _state = collapse.ui.core.state.state;

        if (_state === 'open') {
          const index = $accordionItems.indexOf(collapse);
          setState({ index });
        }
      }
    });
  }

  function render(immediate = false) {
    open(state.index, immediate);
  }

  function open(index, immediate) {
    index = +index;
    if (props.type === 'single') {
      $accordionItems.forEach(($item, i) => {
        if (!$item || !$item.ui) {
          console.warn('Accordion item or UI not initialized:', i);
          return;
        }
        
        if (i !== index) {
          if ($item.ui.core && $item.ui.core.state && $item.ui.core.state.state === 'open') {
            $item.ui.close(immediate);
          }
        } else {
          $item.ui.open(immediate);
        }
      });
    } else {
      if (index !== -1 && $accordionItems[index] && $accordionItems[index].ui) {
        $accordionItems[index].ui.open(immediate);
      } else if (index !== -1) {
        console.warn('Accordion item or UI not initialized for index:', index);
      }
    }
  }

  function close(index, immediate) {
    if (index >= 0 && $accordionItems[index] && $accordionItems[index].ui) {
      $accordionItems[index].ui.close(immediate);
    } else if (index >= 0) {
      console.warn('Cannot close accordion item: UI not initialized for index:', index);
    }
  }

  component = {
    core: {
      state,
      props,
      init,
      removeEvent,
      destroy,
    },

    update,
    open,
    close,
  };

  return component;
}
