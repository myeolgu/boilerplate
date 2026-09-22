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
          <input type="text" id="input_id" placeholder="입력 안내 텍스트" />
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
        <option value="" selected disabled hidden>통신사</option>
        <option value="value1">Option 1</option>
      </select>
    </div>
    <div class="component-input">
      <div class="input-field">
        <input type="text" id="temp_input_0001" placeholder="'-' 제외하고 숫자만 입력해주세요" />
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
        <input type="text" id="temp_input_0002" />
        <span class="type-time">01:22</span>
      </div>
    </div>
    <button type="button" class="btn-confirm">
      <span class="btn-txt">재전송</span>
    </button>
  </div>
</div>
```

- `.form-group` 안의 확인·인증·재전송 버튼은 가이드대로 `button.btn-confirm` + `.btn-txt`를 쓴다
  (`_form.scss`의 `.form-element button[class*='btn-']`가 스타일을 준다). 그 외 버튼은 `component-button`
  스킬(`.btn`)을 따른다.

## 여러 입력 조합(구분선 포함)

여러 입력 필드를 나열할 때는 필드 사이에 `.bar`를 둔다.

```html
<div class="form-element">
  <label for="temp_input_0003" class="input-label">
    <span class="label-txt">휴대폰 번호</span>
  </label>
  <div class="form-group">
    <div class="component-input">
      <div class="input-field"><input type="text" id="temp_input_0003" placeholder="앞자리" /></div>
    </div>
    <div class="bar"></div>
    <div class="component-input">
      <div class="input-field"><input type="text" aria-label="휴대폰 번호 가운데 자리" placeholder="가운데 자리" /></div>
    </div>
    <div class="bar"></div>
    <div class="component-input">
      <div class="input-field"><input type="text" aria-label="휴대폰 번호 끝자리" placeholder="끝자리" /></div>
    </div>
  </div>
</div>
```

## 특수 입력(주민등록번호 등 분할 입력)

```html
<div class="form-element">
  <label for="temp_input_0004" class="input-label">
    <span class="label-txt">주민등록번호</span>
  </label>
  <div class="form-group">
    <div class="component-input">
      <div class="input-field"><input type="text" id="temp_input_0004" placeholder="앞 6자리" /></div>
    </div>
    <div class="bar"></div>
    <div class="resident-number">
      <div class="component-input resident-input">
        <div class="input-field"><input type="text" aria-label="주민등록번호 뒷자리 첫 숫자" maxlength="1" /></div>
      </div>
      <ul class="hidden-list">
        <li><span class="hide-txt">hidden-number</span></li>
        <li><span class="hide-txt">hidden-number</span></li>
        <li><span class="hide-txt">hidden-number</span></li>
        <li><span class="hide-txt">hidden-number</span></li>
        <li><span class="hide-txt">hidden-number</span></li>
        <li><span class="hide-txt">hidden-number</span></li>
      </ul>
    </div>
  </div>
</div>
```

- 위 조합 예시는 모두 `.component-form` 안에 둔다. `.bar`, `.resident-number`, `.type-time`,
  `.btn-confirm` 스타일은 `.component-form .form-element` 하위에만 정의되어 있다(`_form.scss:168-273`).
- `.hidden-list`의 점은 `li` 자체에 스타일이 적용된다. 가이드의 `li.hiddeb-num`은 오타이며 스타일에
  쓰이지 않으므로 옮겨 쓰지 않는다.

## 클래스 구조

- 기본 클래스: `.component-form`
- `.form-element`(요소 컨테이너) > `.input-label`(`.label-txt`) + `.form-group`(입력 그룹 컨테이너)
- 그룹 안: `.component-input`, `.component-select`, `.bar`(구분선), `.btn-confirm`(확인 버튼),
  `.type-time`(타이머 표시), `.resident-number`(`.resident-input`, `.hidden-list`)

## 레거시: form-row 그리드 시스템

`_form.scss`에는 위 `.form-element` 패턴("new form"으로 주석 표기됨)과 별개로 더 오래된
`.form-row` 다단 그리드 시스템도 남아 있다. 실제 가이드 페이지에 살아있는 예시는 없어 정확한
전체 마크업은 확인되지 않았지만, 클래스 존재는 실제 스타일 파일로 확인했다.

- `.form-label`(`.label-txt`, `.label-util`) + `.form-sub-txt`
- `.form-row`(`[class^="form-col"]`) 변형: `.two-col`, `.three-col`, `.four-col`, `.five-col`,
  `.ratio-2-1`, `.ratio-3-3-1`, `.ratio-4-3-2-1`
- 정렬: `.align-center`, `.align-right` / 정보: `.form-info`
- 상태: `.form-disabled`, `.form-readonly`, `.form-valid`, `.form-invalid`, `.form-required`

새 화면은 위 "기본 구조"의 `.form-element`/`.form-group` 패턴을 기본으로 쓴다. 기존
`.form-row` 화면을 수정해야 하거나 다단 그리드가 명시적으로 필요하면, 정확한 마크업 조합을
추측하지 말고 실제 사용 중인 화면(있다면)을 먼저 찾아 확인한다.

## 접근성

- 필수 입력 필드는 `<i class="ico-required-mark" role="img" aria-label="필수">*</i>`로 표시한다.
- 모든 입력 필드에 적절한 `label`을 연결한다(`for`/`id` 일치).
- 숨겨진 텍스트는 `.hide-txt`로 시각적으로만 숨긴다.

## 참고

React `FormLayout`/`FormLayout.Row`/`FormSection` 컴포넌트는 이 프로젝트에 존재하지 않는다. 모달이나 상세 화면의 폼도 이 `.component-form` 패턴으로 마크업한다.
