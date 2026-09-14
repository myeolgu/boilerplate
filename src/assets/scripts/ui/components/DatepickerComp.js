function DatepickerComp() {
  const { actions, props, state, setProps, setState, setTarget, addEvent, removeEvent } = etUI.hooks.useCore(
    {
      // props
      language: 'ko',
      daysOfWeekHighlighted: [0, 6],
      autohide: true,
    },
    {
      // state
    },
    render,
  );

  // constant
  const MARGIN = 20;

  // variable
  const name = 'datepicker';
  // eslint-disable-next-line prefer-const
  let component = {};
  // element, selector
  let $target, $datepicker, $datepickerTrigger, $rangeStart, $rangeEnd;
  let rangeStart, rangeEnd, datepickerTrigger;

  Datepicker.locales.ko = {
    days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    daysShort: ['일', '월', '화', '수', '목', '금', '토'],
    daysMin: ['일', '월', '화', '수', '목', '금', '토'],
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    today: '오늘',
    clear: '삭제',
    format: 'yyyy-mm-dd',
    titleFormat: 'y년 m월',
    weekStart: 0,
  };

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

    if (props.type === 'range') {
      $target = $target.closest('.component-rangepicker');
    }

    if ($target.ui) {
      return;
    }
    $target.ui = component;

    setup();
    setEvent();

    $target.setAttribute('data-init', 'true');
  }

  function setup() {
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
    if (_props && etUI.utils.shallowCompare(props, _props) && !$target.getAttribute('data-init')) {
      return;
    }
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
  }

  function setupSelector() {
    datepickerTrigger = '.datepicker-btn-trigger';
    rangeStart = 'range-start';
    rangeEnd = 'range-end';
  }

  function setupElement() {
    const { type } = props;
    // id
    const labelId = etUI.utils.getRandomUIID(name);

    // a11y
    etUI.utils.setProperty($target, 'id', labelId);

    if (props.type === 'range') {
      $rangeStart = $target.querySelector(`[name="${rangeStart}"]`);
      $rangeEnd = $target.querySelector(`[name="${rangeEnd}"]`);
    } else {
      $datepickerTrigger = $target.querySelector(datepickerTrigger);
    }

    // $datepicker 정의
    if (type === 'range') {
      $datepicker = new DateRangePicker($target, { ...props });
    } else {
      $datepicker = new Datepicker($datepickerTrigger, { ...props });
    }
  }

  function setupActions() {
    actions.open = () => {};

    actions.close = () => {};
  }

  function setEvent() {
  }

  function render() {
  }

  function open() {}

  function close() {}

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
    getDatepickerInstance() {
      return $datepicker;
    },
  };

  return component;
}
