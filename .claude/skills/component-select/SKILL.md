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
`fn: etUI.components.SelectBox`). 별도의 `data-component` 속성은 필요 없다. 내부에 `.select-list`가
있으면(기본 셀렉트) JS는 초기화하지 않는다(`Selectbox.js:53-55`).

> **주의(현재 JS 버그)**: 커스텀·바텀시트형은 초기화 중 `Selectbox.js:214`의
> `component.open = actions.open`이 getter 전용 속성(`Selectbox.js:340`)에 대입하면서 TypeError가
> 나 이벤트가 연결되지 않는다. 가이드 예시도 클릭해도 열리지 않는다. 기본 셀렉트(`.select-list`)는
> 영향이 없다. 커스텀/바텀시트형을 쓰기 전에 이 버그가 해결됐는지 먼저 확인한다.

```html
<div class="component-select type-custom" data-props-default="선택해주세요">
  <div class="combo-label">셀렉트 라벨</div>
  <button type="button" class="select-box">
    <span style="pointer-events: none">선택해주세요</span>
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
  <button type="button" class="select-box">
    <span class="select-txt">선택</span>
  </button>
  <div class="select-options">
    <div class="select-header">
      <p>바텀시트 셀렉트 헤더</p>
      <button type="button" class="select-close">
        <span class="hide-txt">닫기</span>
      </button>
    </div>
    <div class="select-scroll">
      <ul>
        <li class="option" data-value="option1">option1</li>
        <li class="option" data-value="option2">option2</li>
      </ul>
    </div>
  </div>
</div>
```

- 바텀시트형의 `.select-options`는 `div`이고, 그 안에 `.select-header`(`.select-close` 닫기 버튼)와
  `.select-scroll` > `ul`을 둔다(기본 커스텀 셀렉트는 `.select-options`가 바로 `ul`이다).
  `.select-dimm`은 JS가 자동으로 추가하고, `.select-close`·dimm 클릭 시 닫힌다(`Selectbox.js:100`, `262-265`).
- `.select-box`에는 반드시 텍스트용 자식 요소(`span`)를 둔다. JS가 `.select-box :last-child`에 선택
  텍스트를 쓰므로 비어 있으면 닫기·선택 시 TypeError가 난다(`Selectbox.js:181`, `189`, `314`).

## 클래스 구조

- 기본 클래스: `.component-select` / 커스텀 타입: `.type-custom` / 바텀시트 타입: `.bottom-sheet`
- `.select-list`: 기본 `select` 요소
- `.combo-label`: 커스텀 셀렉트의 라벨(선택, `aria-labelledby` 대상)
- `.select-box`: 커스텀 셀렉트의 트리거 버튼(안에 텍스트용 `span`, 바텀시트형은 `span.select-txt`)
- `.select-options`: 커스텀 셀렉트의 옵션 목록
- `.option`: 개별 옵션
- 바텀시트형 전용: `.select-header`, `.select-close`, `.select-scroll`, `.select-dimm`(JS 생성)
- 상태(`is-` 접두어가 아니다. JS·SCSS가 실제로 쓰는 이름을 그대로 쓴다):
  - 열림: 옵션 목록은 GSAP이 인라인 `display: block`/`none`으로 열고 닫는다
    (`useTransition.js:31-46`). `_selectbox.scss:47,101`에 `.component-select.show` 규칙이 있지만
    JS는 이 클래스를 붙이지 않고, 닫힐 때 `.show`를 제거하고 `.hide`를 붙이기만 한다
    (`useTransition.js:44-45`). 열림 상태를 마크업에 미리 `.show`로 쓰지 않는다.
  - 선택됨: `.option.current` + `aria-selected="true"`. JS가 선택 시 전환한다
    (`Selectbox.js:297-298`, `310-313`). `.current` 스타일은 바텀시트형에만 정의되어 있다
    (`_selectbox.scss:193`).
  - 비활성화: `.component-select.select-disabled`. JS가 이 클래스가 있으면 열지 않는다
    (`Selectbox.js:219`). 전용 스타일은 `_selectbox.scss`에 없다. 가이드(`select.html:48`)에는
    `.disabled`로 적혀 있지만 실제 코드는 `.select-disabled`다. 기본 셀렉트는 `select`에 `disabled`를 준다.

## 데이터 속성 (커스텀 셀렉트)

- `data-props-default`: 선택 전 표시 텍스트. 정적 마크업에서는 JS가 초기에 이 값을 트리거에 넣지
  않으므로(`Selectbox.js:167`, `189`) `.select-box` 안 `span`에 같은 텍스트를 직접 적는다.
- `data-props-type="bottomSheet"`: 바텀시트 타입으로 전환
- `data-value`: 옵션 값

## 접근성

- 기본 셀렉트는 네이티브 `select`를 사용해 키보드·스크린 리더 지원을 기본으로 받는다. 필수 입력이면 `required`를 추가한다.
- 커스텀 셀렉트는 `button` 요소로 트리거를 만든다. ARIA 속성은 `Selectbox.js`가 자동으로 넣으므로 마크업에 직접 쓰지 않는다.
  - `aria-labelledby`가 가리키는 id는 `.combo-label` 요소에만 부여된다(`Selectbox.js:125`, `140`). 라벨
    텍스트가 필요하면 `.combo-label`을 둔다. 없으면 트리거·목록이 없는 id를 참조해 접근 가능한 이름이 없다.
  - 초기화 시: 트리거에 `role="combobox"`, `aria-labelledby`, `aria-controls`, 목록에 `role="listbox"`, `aria-labelledby`, `tabindex="-1"`(`Selectbox.js:140-148`), 각 옵션에 `id`, `role="option"`, `aria-selected="false"`(`Selectbox.js:157-159`)
  - 열고 닫을 때: 트리거의 `aria-expanded`, `aria-activedescendant`(`Selectbox.js:277-281`)
