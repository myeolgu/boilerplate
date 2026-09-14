---
name: component-checkbox
description: 체크박스는 component-input 클래스를 쓴다(Input.js 동작 전제). 체크박스·스위치·약관 동의 그룹 마크업 구조와 상태를 안내한다. 체크박스를 마크업하기 전에 사용한다.
---

# Checkbox

체크박스는 `.component-checkbox`가 아니라 **`.component-input`**을 기본 클래스로 쓴다. 실제 가이드
(`src/guide/pages/components/checkbox.html`)에 "Checkbox 컴포넌트는 `Input.js`의 동작을 위해
반드시 `component-input` 클래스를 사용합니다"라고 명시되어 있다. 스타일:
`src/assets/styles/components/_checkbox.scss`.

## 기본 구조

```html
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="checkbox_id" name="checkbox_group_name">
  </label>
</div>
```

## 텍스트가 있는 체크박스

```html
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0201" name="temp_checkbox_0200">
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox default</span>
    </span>
  </label>
</div>
```

## 스위치(토글) 변형

같은 `.component-input` 안에서 `.checkbox-inner` 대신 `.switch-inner`를 쓰면 토글 스위치
스타일이 된다.

```html
<div class="component-input">
  <label class="switch-inner">
    <input type="checkbox" id="switch_id">
    <span class="switch-item">
      <span class="switch-handle"></span>
      <span class="switch-txts">
        <span class="txt">ON</span>
        <span class="txt">OFF</span>
      </span>
    </span>
    <span class="switch-label">라벨</span>
  </label>
</div>
```

## 상태

- 선택: `input`에 `checked` / 비활성화: `input`에 `disabled` / 둘 다 가능.

## 클래스 구조

- 기본 클래스: `.component-input` (체크박스·스위치 공용)
- 체크박스: `.checkbox-inner`(`.checkbox-item`, `.checkbox-txt`)
- 스위치: `.switch-inner`(`.switch-item`, `.switch-handle`, `.switch-txts`, `.switch-label`)

## 약관 동의 그룹은 별도 컴포넌트

여러 체크박스를 들여쓰기 구조로 묶는 약관 동의 화면은 체크박스 자체가 아니라
**`.component-agreement`**(`.agree-area` > `.agree-item`, 하위 항목은 `.sub-agree-area` >
`.sub-agree-item`)로 감싼다. 각 항목 안에는 위 기본 체크박스 구조를 그대로 넣는다.

```html
<div class="component-agreement">
  <div class="agree-area">
    <div class="agree-item">
      <div class="component-input">
        <label class="checkbox-inner">
          <input type="checkbox" id="agree_all">
          <span class="checkbox-item"><span class="checkbox-txt">전체 동의</span></span>
        </label>
      </div>
      <div class="sub-agree-area">
        <div class="sub-agree-item">
          <div class="component-input">
            <label class="checkbox-inner">
              <input type="checkbox" id="agree_1">
              <span class="checkbox-item"><span class="checkbox-txt">이용약관 동의</span></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 접근성

- 각 체크박스에 고유한 `id`를 부여한다.
- 같은 그룹의 체크박스는 동일한 `name`을 공유한다.
- `label`로 감싸 클릭 영역을 넓히고, 텍스트가 있으면 `.checkbox-txt`/`.switch-label`로 시각적
  라벨을 제공한다.
- 포커스 상태는 `:focus-visible`로 표시된다(스타일에 이미 정의되어 있다).
