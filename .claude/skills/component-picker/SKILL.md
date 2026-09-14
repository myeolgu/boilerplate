---
name: component-picker
description: 날짜 선택(component-datepicker) 마크업 구조를 안내한다. "picker" 또는 날짜 입력 요청 시 사용한다.
---

# Picker (날짜 선택)

이 프로젝트에서 실제로 구현된 "picker"는 날짜 선택기 하나뿐이다. 클래스는
`.component-datepicker`이고 `initUI()`가 자동 초기화한다(`fn: etUI.components.DatepickerComp`,
`src/assets/scripts/ui/components/DatepickerComp.js`). 가이드:
`src/guide/pages/components/date-picker.html`. 스타일 파일 `_picker.scss`는 비어 있고, 실제
스타일은 아직 정리되지 않았다.

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

시작일·종료일 두 트리거를 묶을 때는 `.component-datepicker`에 `data-props-type="range"`를 준다.

```html
<div class="component-datepicker" data-props-type="range">
  <!-- 시작일 component-input, 종료일 component-input을 함께 둔다 -->
</div>
```

## 클래스·속성 구조

- `.component-datepicker`(`data-props-type="range"` 옵션) > `.component-input` >
  `.input-field` > `input.datepicker-btn-trigger` + `.input-field-btn.datepicker-state`
  (`ico-calendar` 아이콘)
- 입력 필드의 라벨·`id`/`for` 연결은 `component-input` 스킬 규칙을 그대로 따른다.

## 참고

- `_picker.scss`가 비어 있어 실제 화면에 적용될 스타일이 확정되지 않았다. 디자인과 다르게
  보이더라도 임의로 새 스타일 체계를 만들지 말고, 먼저 팀에 스타일 정리 여부를 확인한다.
- 단일 값 선택(범위가 아닌 경우)의 구체적인 옵션은 `src/guide/pages/components/date-picker.html`의
  다른 예시를 추가로 확인한다.
