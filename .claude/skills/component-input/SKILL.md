---
name: component-input
description: 입력 필드(component-input) 마크업 구조, 버튼/아이콘 포함형, 상태 클래스를 안내한다. 입력 필드를 마크업하기 전에 사용한다.
---

# Input

입력 필드는 React 컴포넌트가 아니라 `.component-input` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 구조

```html
<div class="component-input">
  <label for="temp_input_0001" class="input-label">
    <span class="label-txt">
      <i class="ico-required-mark" role="img" aria-label="필수">*</i>
      Label
    </span>
    <span class="label-util">보조 텍스트 위치</span>
    <span class="input-sub-txt">서브 텍스트</span>
  </label>
  <div class="input-field">
    <input type="text" id="temp_input_0001" placeholder="input text" />
  </div>
  <div class="input-info">유틸리티 Info 영역</div>
</div>
```

- 필수 입력 필드에는 `<i class="ico-required-mark" role="img" aria-label="필수">*</i>`를 사용한다.
- `input`의 `id`는 고유해야 하고, `label`의 `for`와 일치해야 한다.
- `label` 안에는 phrasing 요소(`span` 등)만 둔다. `div`나 버튼 같은 인터랙티브 요소는 `label` 안에
  넣지 않는다(`.input-sub-txt`도 `span`으로 쓴다).

## 버튼이 포함된 입력 필드

직접 마크업하는 버튼(검색 등)은 `.input-field-btn`을 공통 클래스로 쓴다. 아이콘은
`aria-hidden="true"`로 숨기고 `.hide-txt`로 버튼 이름을 준다.

```html
<div class="input-field">
  <input type="text" id="temp_input_btn_0001" placeholder="버튼" />
  <button type="button" class="input-field-btn search">
    <span class="hide-txt">검색</span>
    <i class="ico-search ico-normal" aria-hidden="true"></i>
  </button>
</div>
```

지우기·비밀번호 표시 버튼은 직접 마크업하지 않고 `.component-input`의 `data-props-*`로 켠다.
`Input.js`가 `input` 바로 뒤에 버튼을 삽입하고 이벤트를 연결한다(`Input.js:89-94`,
`inputTmpl.js`). 같은 버튼을 정적으로 함께 쓰면 중복된다.

```html
<!-- 지우기: 입력값이 있을 때만 .input-field-btn.clear가 보인다(CSS 기본 display: none) -->
<div class="component-input" data-props-clear="true">
  <div class="input-field">
    <input type="text" id="temp_input_clear_0001" placeholder="입력" />
  </div>
</div>

<!-- 비밀번호 표시/숨기기: type="password"일 때만 동작한다 -->
<div class="component-input" data-props-toggle-password="true">
  <div class="input-field">
    <input type="password" id="temp_input_pw_0001" placeholder="비밀번호" />
  </div>
</div>
```

- 버튼 유형 클래스: `.search`, `.clear`, `.password-state` (공통 클래스 `.input-field-btn`).
- 가이드의 `.input-field-btn.calendar`에는 연결된 동작이 없다. 날짜 입력은 `component-picker`
  스킬(`.component-datepicker`)을 쓴다.

## 아이콘이 포함된 입력 필드

`.input-field-ico`의 변형은 `_input.scss`에 정의된 `.login-id`, `.login-pw`, `.spinner`다.

```html
<div class="input-field">
  <i class="input-field-ico login-id" aria-hidden="true"></i>
  <input type="text" id="temp_input_ico_0001" placeholder="아이콘" />
</div>
```

- 로딩 스피너는 `data-props-loading="true"`로 켜면 `Input.js`가 `.input-field-ico.spinner`를
  삽입하고, `$target.ui.showLoading(true/false)`로 표시를 전환한다(`Input.js:95-97`, `313-319`).

## 파일 첨부

`input-field`가 아니라 `input-file-field`를 쓰고, `label`로 감싸 파일 선택 영역 전체를 클릭
가능하게 한다.

```html
<div class="component-input">
  <label class="input-file-field">
    <input type="file" aria-label="파일 첨부" />
    <span class="input-file-txt">선택된 파일 없음</span>
    <span class="input-file-btn">찾아보기</span>
  </label>
</div>
```

- 공통 버튼 클래스는 `.input-field-btn`이 아니라 `.input-file-btn`이다.
- `Input.js`에는 파일명 표시 로직이 없다. 선택한 파일명을 `.input-file-txt`에 보여 주려면 화면
  스크립트에서 직접 처리한다.

## 고정 텍스트가 붙는 입력 필드

접두/접미 텍스트(단위, 도메인 등)가 필요하면 `.input-field-txt`를 입력 앞뒤에 둔다.

```html
<div class="input-field">
  <span class="input-field-txt">https://</span>
  <input type="text" placeholder="도메인" />
</div>
```

## 상태

- 비활성화: `input`에 `disabled` → `Input.js`가 `.component-input`에 `.input-disabled`를 자동으로 붙인다
- 읽기 전용: `input`에 `readonly` → `Input.js`가 `.input-readonly`를 자동으로 붙인다
  (`Input.js:146-151`)
- 필수: `.component-input.input-required` (`.ico-required-mark`에 강조 색이 적용된다)
- 유효: `.component-input.input-valid`
- 유효하지 않음: `.component-input.input-invalid`

```html
<div class="component-input input-valid">
  <label for="temp_input_valid_0001" class="input-label">
    <span class="label-txt">Label</span>
  </label>
  <div class="input-field">
    <input type="text" id="temp_input_valid_0001" />
  </div>
  <div class="input-info">유효성 검사 메시지</div>
</div>
```

## 클래스 구조

- 기본 클래스: `.component-input`
- `.input-label`(`.label-txt`, `.label-util`, `.input-sub-txt`)
- `.input-field`(`.input-field-btn`, `.input-field-ico`, `.input-field-txt`) — 텍스트류 input
- 데이터 속성: `data-props-clear`, `data-props-toggle-password`, `data-props-loading`
- `.input-file-field`(`.input-file-btn`, `.input-file-txt`) — `type="file"` 전용
- `.input-textarea-field` — `textarea` 전용(`component-textarea` 스킬 참고)
- `.input-info`

## 접근성

- 모든 입력 필드에 적절한 `label`을 연결한다.
- `placeholder`로 입력 지침을 제공하되 라벨을 대신하지 않는다.
- 숨겨진 텍스트에는 `.hide-txt`를 사용해 시각적으로는 숨기고 스크린 리더에는 읽히게 한다.
