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
    <span class="label-util">텍스트,버튼등등 위치</span>
    <div class="input-sub-txt">서브 텍스트</div>
  </label>
  <div class="input-field">
    <input type="text" id="temp_input_0001" placeholder="input text">
  </div>
  <div class="input-info">유틸리티 Info 영역</div>
</div>
```

- 필수 입력 필드에는 `<i class="ico-required-mark" role="img" aria-label="필수">*</i>`를 사용한다.
- `input`의 `id`는 고유해야 하고, `label`의 `for`와 일치해야 한다.

## 버튼이 포함된 입력 필드

```html
<div class="input-field">
  <input type="text" id="temp_input_btn_0001" placeholder="버튼">
  <button type="button" class="input-field-btn search">
    <span class="hide-txt">검색</span>
    <i class="ico-search ico-normal" aria-hidden="true"></i>
  </button>
  <button type="button" class="input-field-btn calendar">
    <span class="hide-txt">캘린더</span>
    <i class="ico-calendar ico-normal" aria-hidden="true"></i>
  </button>
  <button type="button" class="input-field-btn clear">
    <span class="hide-txt">내용 지우기</span>
    <i class="ico-clear ico-normal" aria-hidden="true"></i>
  </button>
  <button type="button" class="input-field-btn password-state">
    <span class="hide-txt hide">비밀번호 숨기기</span>
    <span class="hide-txt show">비밀번호 표시</span>
    <i class="ico-password-state ico-normal" aria-hidden="true"></i>
  </button>
</div>
```

버튼 유형 클래스: `.search`, `.calendar`, `.clear`, `.password-state` (공통 클래스 `.input-field-btn`).

## 아이콘이 포함된 입력 필드

```html
<div class="input-field">
  <i class="input-field-ico ico-search ico-normal" aria-hidden="true"></i>
  <input type="text" id="temp_input_ico_0001" placeholder="아이콘">
</div>
```

## 파일 첨부

`input-field`가 아니라 `input-file-field`를 쓰고, `label`로 감싸 파일 선택 영역 전체를 클릭
가능하게 한다.

```html
<div class="component-input">
  <label class="input-file-field">
    <input type="file" aria-label="파일 첨부">
    <span class="input-file-txt">선택된 파일 없음</span>
    <span class="input-file-btn">찾아보기</span>
  </label>
</div>
```

- 공통 버튼 클래스는 `.input-field-btn`이 아니라 `.input-file-btn`이다.
- 선택한 파일명 표시는 `.input-file-txt`에 JS로 채운다.

## 고정 텍스트가 붙는 입력 필드

접두/접미 텍스트(단위, 도메인 등)가 필요하면 `.input-field-txt`를 입력 앞뒤에 둔다.

```html
<div class="input-field">
  <span class="input-field-txt">https://</span>
  <input type="text" placeholder="도메인">
</div>
```

## 상태

- 비활성화: `.component-input.input-disabled` + `input`에 `disabled`
- 읽기 전용: `.component-input.input-readonly` + `input`에 `readonly`
- 필수: `.component-input.input-required` (`.ico-required-mark`에 강조 색이 적용된다)
- 유효: `.component-input.input-valid`
- 유효하지 않음: `.component-input.input-invalid`

```html
<div class="component-input input-valid">
  <label for="temp_input_valid_0001" class="input-label">
    <span class="label-txt">Label</span>
  </label>
  <div class="input-field">
    <input type="text" id="temp_input_valid_0001">
  </div>
  <div class="input-info">유효성 검사 메시지</div>
</div>
```

## 클래스 구조

- 기본 클래스: `.component-input`
- `.input-label`(`.label-txt`, `.label-util`, `.input-sub-txt`)
- `.input-field`(`.input-field-btn`, `.input-field-ico`, `.input-field-txt`) — 텍스트류 input
- `.input-file-field`(`.input-file-btn`, `.input-file-txt`) — `type="file"` 전용
- `.input-textarea-field` — `textarea` 전용(`component-textarea` 스킬 참고)
- `.input-info`

## 접근성

- 모든 입력 필드에 적절한 `label`을 연결한다.
- `placeholder`로 입력 지침을 제공하되 라벨을 대신하지 않는다.
- 숨겨진 텍스트에는 `.hide-txt`를 사용해 시각적으로는 숨기고 스크린 리더에는 읽히게 한다.
