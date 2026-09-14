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
- 상태: 열림 `.is-open`(옵션 목록), 선택됨 `.is-selected`(옵션), 비활성화 `.disabled`(커스텀 셀렉트 전체)

## 데이터 속성 (커스텀 셀렉트)

- `data-props-default`: 기본 표시 텍스트
- `data-props-type="bottomSheet"`: 바텀시트 타입으로 전환
- `data-value`: 옵션 값

## 접근성

- 기본 셀렉트는 네이티브 `select`를 사용해 키보드·스크린 리더 지원을 기본으로 받는다. 필수 입력이면 `required`를 추가한다.
- 커스텀 셀렉트는 `button` 요소로 트리거를 만들고, 화살표 키로 옵션을 탐색할 수 있어야 하며 `aria-expanded`, `aria-activedescendant` 등으로 상태를 전달해야 한다.
