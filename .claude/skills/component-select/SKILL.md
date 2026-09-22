---
name: component-select
description: 셀렉트(component-select) 마크업 구조(기본 select, 커스텀 셀렉트)를 안내한다. 셀렉트 박스를 마크업하기 전에 사용한다.
---

# Select

셀렉트는 React 컴포넌트가 아니라 `.component-select` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다. 기본 HTML `select`를 쓰는 기본형과 JS로 동작하는 커스텀형이 있다.

## 기본 셀렉트

```html
<div class="component-select">
  <select class="select-list" required>
    <option value="" selected disabled hidden>선택해주세요.</option>
    <option value="value1">Option 1</option>
    <option value="value2">Option 2</option>
  </select>
</div>
```

## 커스텀 셀렉트

`.component-select` 클래스를 `initUI()`가 자동 초기화한다(`Selectbox.js`,
`fn: etUI.components.SelectBox`). 별도의 `data-component` 속성은 필요 없다.

```html
<div class="component-select type-custom" data-props-default="선택해주세요">
  <button type="button" class="select-box">
    <span style="pointer-events: none"></span>
  </button>
  <ul class="select-options">
    <li class="option" data-value="option1">Option 1</li>
    <li class="option" data-value="option2">Option 2</li>
  </ul>
</div>
```

## 바텀시트형 셀렉트 (모바일)

옵션이 많거나 모바일 화면에서는 `.bottom-sheet` + `data-props-type="bottomSheet"`를 추가한다.

```html
<div class="component-select bottom-sheet" data-props-default="선택" data-props-type="bottomSheet">
  <button type="button" class="select-box"></button>
  <div class="select-options">
    <ul>
      <li class="option" data-value="option1">option1</li>
      <li class="option" data-value="option2">option2</li>
    </ul>
  </div>
</div>
```

- 바텀시트형은 `.select-options`가 `ul` 없이 `div` 래퍼 하나를 더 감싸는 구조를 쓴다(기본
  커스텀 셀렉트는 `.select-options`가 바로 `ul`이다).

## 클래스 구조

- 기본 클래스: `.component-select` / 커스텀 타입: `.type-custom` / 바텀시트 타입: `.bottom-sheet`
- `.select-list`: 기본 `select` 요소
- `.select-box`: 커스텀 셀렉트의 트리거 버튼
- `.select-options`: 커스텀 셀렉트의 옵션 목록
- `.option`: 개별 옵션
- 상태(`is-` 접두어가 아니다. JS·SCSS가 실제로 쓰는 이름을 그대로 쓴다):
  - 열림: 옵션 목록은 GSAP이 인라인 `display: block`/`none`으로 열고 닫는다
    (`useTransition.js:31-46`). `_selectbox.scss:47,101`에 `.component-select.show` 규칙이 있지만
    JS는 이 클래스를 붙이지 않고, 닫힐 때 `.show`를 제거하고 `.hide`를 붙이기만 한다
    (`useTransition.js:44-45`). 열림 상태를 마크업에 미리 `.show`로 쓰지 않는다.
  - 선택됨: `.option.current` + `aria-selected="true"`. JS가 선택 시 전환한다
    (`Selectbox.js:297-298`, `310-313`). `.current` 스타일은 바텀시트형에만 정의되어 있다
    (`_selectbox.scss:193`).
  - 비활성화: `.component-select.select-disabled`. JS가 이 클래스가 있으면 열지 않는다
    (`Selectbox.js:219`). 전용 스타일은 `_selectbox.scss`에 없다.

## 데이터 속성 (커스텀 셀렉트)

- `data-props-default`: 기본 표시 텍스트
- `data-props-type="bottomSheet"`: 바텀시트 타입으로 전환
- `data-value`: 옵션 값

## 접근성

- 기본 셀렉트는 네이티브 `select`를 사용해 키보드·스크린 리더 지원을 기본으로 받는다. 필수 입력이면 `required`를 추가한다.
- 커스텀 셀렉트는 `button` 요소로 트리거를 만든다. ARIA 속성은 `Selectbox.js`가 자동으로 넣으므로 마크업에 직접 쓰지 않는다.
  - 초기화 시: 트리거에 `role="combobox"`, `aria-labelledby`, `aria-controls`, 목록에 `role="listbox"`, `aria-labelledby`, `tabindex="-1"`(`Selectbox.js:140-148`), 각 옵션에 `id`, `role="option"`, `aria-selected="false"`(`Selectbox.js:157-159`)
  - 열고 닫을 때: 트리거의 `aria-expanded`, `aria-activedescendant`(`Selectbox.js:277-281`)
