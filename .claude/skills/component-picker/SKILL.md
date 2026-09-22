---
name: component-picker
description: 날짜 선택(component-datepicker) 마크업 구조를 안내한다. "picker" 또는 날짜 입력 요청 시 사용한다.
---

# Picker (날짜 선택)

이 프로젝트에서 실제로 구현된 "picker"는 날짜 선택기 하나뿐이다. 클래스는
`.component-datepicker`이고 `initUI()`가 자동 초기화한다(`fn: etUI.components.DatepickerComp`,
`src/assets/scripts/ui/components/DatepickerComp.js`). 가이드:
`src/guide/pages/components/date-picker.html`. 스타일 파일 `_picker.scss`는 비어 있지만, 달력
팝업은 vendor CSS(`src/assets/styles/vendors/_datepicker.min.css`, `vendors/_index.scss`에서
`@forward`)로 스타일이 적용된다.

이전에 "calendar"라는 이름으로 다루려던 컴포넌트가 바로 이것이다. 요청에 "달력", "캘린더",
"날짜 선택", "picker"가 나오면 전부 이 컴포넌트를 가리킨다.

## 기본 구조

`.component-datepicker`는 안에 `component-input` 패턴을 그대로 품고, 트리거 입력에
`datepicker-btn-trigger` 클래스를 추가한다.

```html
<div class="component-datepicker">
  <div class="component-input">
    <div class="input-field">
      <input
        type="text"
        class="datepicker-btn-trigger"
        id="temp_write_004"
        aria-label="시작일"
        placeholder="시작일을 입력해주세요"
      />
      <span class="input-field-btn datepicker-state">
        <span class="hide-txt">달력</span>
        <i class="ico-calendar ico-normal" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</div>
```

## 기간(range) 선택

시작일·종료일은 `.component-rangepicker` 래퍼 안에 `data-props-type="range"`를 준
`.component-datepicker`를 두 개 두고, 각 input의 `name`을 `range-start` / `range-end`로 준다.
JS는 `$target.closest('.component-rangepicker')`로 래퍼를 찾고 `[name="range-start"]`,
`[name="range-end"]`로 input을 찾는다(`DatepickerComp.js:58-60`, `110-111`, `123-124`). 래퍼가 없으면
초기화 중 `TypeError: Cannot read properties of null (reading 'ui')`로 실패한다.

```html
<div class="component-rangepicker">
  <div class="component-datepicker" data-props-type="range">
    <div class="component-input">
      <div class="input-field">
        <input
          type="text"
          class="datepicker-btn-trigger"
          id="temp_range_start_001"
          name="range-start"
          aria-label="시작일"
          placeholder="시작일을 입력해주세요"
        />
        <span class="input-field-btn datepicker-state">
          <span class="hide-txt">달력</span>
          <i class="ico-calendar ico-normal" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
  <div class="component-datepicker" data-props-type="range">
    <div class="component-input">
      <div class="input-field">
        <input
          type="text"
          class="datepicker-btn-trigger"
          id="temp_range_end_001"
          name="range-end"
          aria-label="종료일"
          placeholder="종료일을 입력해주세요"
        />
        <span class="input-field-btn datepicker-state">
          <span class="hide-txt">달력</span>
          <i class="ico-calendar ico-normal" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</div>
```

## 클래스·속성 구조

- 단일: `.component-datepicker` > `.component-input` > `.input-field` >
  `input.datepicker-btn-trigger` + `.input-field-btn.datepicker-state`(`ico-calendar` 아이콘)
- 기간: `.component-rangepicker` > `.component-datepicker[data-props-type="range"]` × 2, 각 input에
  `name="range-start"` / `name="range-end"`
- 달력은 input(`datepicker-btn-trigger`)에 연결된다. `.datepicker-state`는 버튼이 아니라 장식용
  `span`이며 별도 클릭 동작이 없다.
- 입력 필드의 라벨·`id`/`for` 연결은 `component-input` 스킬 규칙을 그대로 따른다.
- `input` 스킬의 `.input-field-btn.calendar` 버튼에는 동작이 없으므로 날짜 입력에는 이 컴포넌트를 쓴다.

## 참고

- 프로젝트 전용 스타일(`_picker.scss`)은 비어 있고 vendor 기본 스타일만 적용된다. 디자인과 다르게
  보이더라도 임의로 새 스타일 체계를 만들지 말고, 먼저 팀에 스타일 정리 여부를 확인한다.
- 단일 값 선택(범위가 아닌 경우)의 구체적인 옵션은 `src/guide/pages/components/date-picker.html`의
  다른 예시를 추가로 확인한다.
