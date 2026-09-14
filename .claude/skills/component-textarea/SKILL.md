---
name: component-textarea
description: 텍스트영역(component-input의 textarea 변형) 마크업 구조와 글자 수 카운트(data-props-count) 사용법을 안내한다. 텍스트영역을 마크업하기 전에 사용한다.
---

# Textarea

텍스트영역은 독립된 컴포넌트가 아니라 `component-input` 스킬의 `.component-input`을 그대로 쓰는
변형이다. 같은 `Input.js`(`src/assets/scripts/ui/components/Input.js`)가 처리하며, 스타일은
`src/assets/styles/components/_input.scss`의 `.input-textarea-field` 규칙을 따른다. 가이드:
`src/guide/pages/components/input.html`.

## 기본 구조 (글자 수 카운트 포함)

```html
<div class="component-input" data-props-count="300" data-props-count-limit="300" data-props-clear="true">
  <label for="temp_textarea_0001" class="input-label">
    <span class="label-txt">Label</span>
  </label>
  <div class="input-textarea-field">
    <textarea id="temp_textarea_0001" class="textarea" placeholder="텍스트를 입력해주세요."></textarea>
    <span class="textarea-count">(<em class="textarea-count-num">0</em>/<em class="textarea-count-total">300</em>)</span>
  </div>
</div>
```

- `label`은 `component-input`의 `.input-label`/`.label-txt` 구조를 그대로 쓴다. `for`는 `textarea`의
  `id`와 일치해야 한다.
- 글자 수 카운트가 필요 없으면 `data-props-count*` 속성과 `.textarea-count`를 생략한다.

## 데이터 속성

- `data-props-count`: 현재 표시할 초기 글자 수(보통 `0`으로 시작)
- `data-props-count-limit`: 최대 글자 수
- `data-props-clear="true"`: 지우기 동작 활성화

## 클래스 구조

- `.input-textarea-field` (컨테이너) > `textarea.textarea` + `.textarea-count`
  (`.textarea-count-num`, `.textarea-count-total`)
- 그 외 라벨·정보 영역 클래스는 `component-input` 스킬과 동일(`.input-label`, `.input-info` 등).

## 참고

이 프로젝트에는 별도의 `component-textarea` 가이드 페이지가 없다. 새로운 변형이 필요하면
`src/guide/pages/components/input.html`의 다른 예시를 먼저 확인하고, 없는 옵션은 추측으로
만들지 않는다.
