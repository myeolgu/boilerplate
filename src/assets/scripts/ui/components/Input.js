/**
 * Input
 */
function Input() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
    },
    {
      // state
    },
    render,
  );

  // constant
  const MARGIN = 20;

  // variable
  const name = 'input';
  // eslint-disable-next-line prefer-const
  let component = {};
  // element, selector
  let $target, $inputTarget, $checkboxs, $checkboxLength;
  let inputType, checkboxs;

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

    if ($target.ui) return;
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
    // template, selector, element, actions
    setupSelector();
    setupElement();
    setupTemplate(); // element에서 요소를 체크해서 템플릿에 들어가므로 순서가 바뀜
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

  // frequency
  function setupTemplate() {
    const { $templateHTML } = etUI.templates.inputTmpl();
    // $target.innerHTML = ``;
    // etUI.locales[etUI.config.locale.default]
    if (props.clear) {
      $inputTarget.insertAdjacentHTML('afterend', $templateHTML.clearButton());
    }
    if (props.togglePassword) {
      $inputTarget.insertAdjacentHTML('afterend', $templateHTML.togglePassword());
    }
    if (props.loading) {
      $inputTarget.insertAdjacentHTML('afterend', $templateHTML.loading());
    }
    if (props.searchBox) {
      $inputTarget.insertAdjacentHTML('afterend', $templateHTML.searchBox());
    }
  }

  function setupSelector() {
    if ($target.querySelector('input[type="checkbox"]')) {
      checkboxs = 'input[type="checkbox"]';
    }
  }

  function setupElement() {
    // id
    const labelId = etUI.utils.getRandomUIID(name);

    // a11y
    // etUI.utils.setProperty($target, $selectLabel, 'id', labelId);

    $inputTarget = $target.querySelector('input');

    // if (!$inputTarget) return;

    if ($target.querySelector('input[type="file"]')) {
      inputType = 'file';
    } else if ($target.querySelector('input[type="checkbox"]')) {
      inputType = 'checkbox';
    } else if ($target.querySelector('input[type="radio"]')) {
      inputType = 'radio';
    } else if ($target.querySelector('input[type="password"]')) {
      inputType = 'password';
    } else if ($target.querySelector('textarea')) {
      inputType = 'textarea';
      $inputTarget = $target.querySelector('textarea');
    } else {
      inputType = 'text';
    }

    // component custom element
    if (props.count) {
      const $countTotal = $target.querySelector('.textarea-count-total');
      const $count = $target.querySelector('.textarea-count');
      if ($countTotal) $countTotal.textContent = props.count;
      if ($count) $count.style.opacity = 1;
    }
    if (props.allCheck) {
      $checkboxLength = $target.querySelectorAll('.agree-area input').length;
      $checkboxs = [...$target.querySelectorAll('input[type="checkbox"]')];
    }
    if ($inputTarget && $inputTarget.hasAttribute('disabled')) {
      $target.classList.add('input-disabled');
    }
    if ($inputTarget && $inputTarget.hasAttribute('readonly')) {
      $target.classList.add('input-readonly');
    }
  }

  let v = '';

  function setupActions() {
    actions.open = () => {};

    actions.close = () => {};

    actions.checkBytes = (e) => {
      const { target } = e;
      let length = 0;
      if (props.multibyte) {
        length = etUI.utils.countCharacters(target.value);
      } else {
        length = target.value.length;
      }

      if (props.countLimit) {
        if (length > props.count) {
          target.value = v;
        } else {
          v = target.value;
          $target.querySelector('.textarea-count-num').textContent = length;
        }
      } else {
        $target.querySelector('.textarea-count-num').textContent = length;

        if (length > props.count) {
          $target.querySelector('.textarea-count-num').classList.add('over');
        } else {
          $target.querySelector('.textarea-count-num').classList.remove('over');
        }
      }
    };

    actions.showClearButton = (e) => {
      if ($inputTarget.value.length > 0) {
        $target.querySelector('.input-field-btn.clear').style.display = 'block';
      } else {
        $target.querySelector('.input-field-btn.clear').style.display = 'none';
      }
    };

    // 자동검색 영역
    actions.searchBox = (e) => {
      if (!$target.querySelector('.search-bar-box')) return;

      if ($inputTarget.value.length > 0) {
        $target.querySelector('.search-bar-box').style.display = 'block';
      } else {
        $target.querySelector('.search-bar-box').style.display = 'none';
      }
    }

    actions.clearText = ({ target }) => {
      $inputTarget.value = '';
      $inputTarget.focus();
      actions.showClearButton();
      actions.searchBox();
    };

    actions.togglePassword = ({ currentTarget }) => {
      if ($inputTarget.type === 'password') {
        $inputTarget.type = 'text';
        currentTarget.querySelector('.password-state').classList.add('show');
      } else {
        $inputTarget.type = 'password';
        currentTarget.querySelector('.password-state').classList.remove('show');
      }
    };

    // 전체 체크 버튼
    actions.allCheck = ({target}) => {
      const allCheckBtn = $target.querySelectorAll('.all-agree-item input[type="checkbox"]')[0];
      let checkboxEls = target === allCheckBtn ? $target.querySelector('.agree-area') : target.closest('.agree-item').querySelector('.sub-agree-item');
      checkboxEls.querySelectorAll('input[type="checkbox"]').forEach($checkbox => $checkbox.checked = target.checked);
    }

    // 전체 checkbox의 checked 확인
    actions.checkAllAgree = () => {
      const allCheckBtn = $target.querySelector('.all-agree-item input[type="checkbox"]');
      const checkboxList = [...$target.querySelectorAll('.agree-area input')];

      requestAnimationFrame(() => {
        allCheckBtn.checked = checkboxList.every((item) => item.checked);
      });
    };

    // 서브 checkbox의 checked 확인
    actions.checkAllSubAgree = ({ target }) => {
      const agreeItem = target.closest('.agree-item');
      if (!agreeItem) return;

      const subAllCheckBtn = agreeItem.querySelector('.sub-all-agree input[type="checkbox"]');
      const subCheckboxList = [...agreeItem.querySelectorAll('.sub-agree-item input[type="checkbox"]')];

      if (!subAllCheckBtn) return;

      if (target === subAllCheckBtn) {
        subCheckboxList.forEach((checkbox) => {
          checkbox.checked = subAllCheckBtn.checked;
        });
      } else {
        subAllCheckBtn.checked = subCheckboxList.every((checkbox) => checkbox.checked);
      }
    };
  }

  function setEvent() {
    const { allCheck, subCheck } = props;

    if (props.clear) {
      addEvent('input', 'input', actions.showClearButton);
      addEvent('input', 'textarea', actions.showClearButton);
      addEvent('click', '.input-field-btn.clear', actions.clearText);
    }

    if (props.search) {
      addEvent('input', 'input', actions.searchBox);
    }

    if (inputType === 'textarea') {
      if (props.count) addEvent('input', 'textarea', actions.checkBytes);
    } else if (inputType === 'text') {
    } else if (inputType === 'password') {
      if (props.togglePassword) {
        addEvent('click', '.input-field-btn.password-state', actions.togglePassword);
      }
    } else if (inputType === 'checkbox') {
      if (allCheck) {
        addEvent('change', '.all-agree-item input[type="checkbox"]', actions.allCheck);
        addEvent('change', '.agree-area input', actions.checkAllAgree);
      }
      if (subCheck) {
        addEvent('change', '.sub-agree-item input', actions.checkAllSubAgree);
        addEvent('change', '.sub-all-agree input[type="checkbox"]', actions.checkAllSubAgree);
      }
    }
  }

  function render() {
    // render
  }

  function getLength() {
    if (inputType.match(/text|textarea|password/g)) {
      return $inputTarget.value.length;
    }
  }

  function getByteLength() {
    if (inputType.match(/text|textarea|password/g)) {
      return etUI.utils.countCharacters($inputTarget.value);
    }
  }

  function updateClearButton() {
    etUI.utils.triggerEvent($inputTarget, 'input');
  }

  function showLoading(bool = true) {
    if (bool) {
      $target.querySelector('.input-field-ico.spinner').style.display = 'block';
    } else {
      $target.querySelector('.input-field-ico.spinner').style.display = 'none';
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

    // callable
    update,
    getLength,
    getByteLength,
    updateClearButton,
    showLoading,
  };

  return component;
}
