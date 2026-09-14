---
name: component-form
description: 폼(component-form) 마크업 구조, form-element/form-group 조합 패턴을 안내한다. 모달·상세 화면의 입력 폼을 마크업하기 전에 사용한다.
---

# Form

폼은 React `FormLayout`/`FormLayout.Row` 컴포넌트가 아니라 `.component-form` 클래스와 `.form-element`/`.form-group` 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 구조

```html
<div class="component-form">
  <div class="form-element">
    <label for="input_id" class="input-label">
      <span class="label-txt">
        <i class="ico-required-mark" role="img" aria-label="필수">*</i>
        Label
      </span>
    </label>
    <div class="form-group">
      <div class="component-input">
        <div class="input-field">
          <input type="text" id="input_id" placeholder="입력 안내 텍스트">
        </div>
      </div>
    </div>
  </div>
</div>
```

## 셀렉트 + 입력 조합

```html
<div class="form-element">
  <label for="temp_input_0001" class="input-label">
    <span class="label-txt">휴대폰 번호</span>
  </label>
  <div class="form-group">
    <div class="component-select">
      <select class="select-list" required>
        <option value="" selected hidden>통신사</option>
        <option value="value1">Option 1</option>
      </select>
    </div>
    <div class="component-input">
      <div class="input-field">
        <input type="text" id="temp_input_0001" placeholder="'-' 제외하고 숫자만 입력해주세요">
      </div>
    </div>
  </div>
</div>
```

## 입력 + 버튼 조합(인증번호 등)

```html
<div class="form-element">
  <label for="temp_input_0002" class="input-label">
    <span class="label-txt">
      <i class="ico-required-mark" role="img" aria-label="필수">*</i>
      인증번호
    </span>
  </label>
  <div class="form-group">
    <div class="component-input">
      <div class="input-field">
        <input type="text" id="temp_input_0002">
        <span class="type-time">01:22</span>
      </div>
    </div>
    <button class="btn-confirm">
      <span class="btn-txt">재전송</span>
    </button>
  </div>
</div>
```

## 여러 입력 조합(구분선 포함)

여러 입력 필드를 나열할 때는 필드 사이에 `.bar`를 둔다.

```html
<div class="form-group">
  <div class="component-input">
    <div class="input-field"><input type="text" placeholder="휴대폰 번호를 입력해주세요."></div>
  </div>
  <div class="bar"></div>
  <div class="component-input">
    <div class="input-field"><input type="text" placeholder="휴대폰 번호를 입력해주세요."></div>
  </div>
</div>
```

## 클래스 구조

- 기본 클래스: `.component-form`
- `.form-element`(요소 컨테이너) > `.input-label`(`.label-txt`) + `.form-group`(입력 그룹 컨테이너)
- 그룹 안: `.component-input`, `.component-select`, `.bar`(구분선), `.btn-confirm`(확인 버튼), `.type-time`(타이머 표시)

## 접근성

- 필수 입력 필드는 `<i class="ico-required-mark" role="img" aria-label="필수">*</i>`로 표시한다.
- 모든 입력 필드에 적절한 `label`을 연결한다(`for`/`id` 일치).
- 숨겨진 텍스트는 `.hide-txt`로 시각적으로만 숨긴다.

## 참고

React `FormLayout`/`FormLayout.Row`/`FormSection` 컴포넌트는 이 프로젝트에 존재하지 않는다. 모달이나 상세 화면의 폼도 이 `.component-form` 패턴으로 마크업한다.
