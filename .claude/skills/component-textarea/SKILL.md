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

- `data-props-count`: 최대 글자 수. `Input.js`가 이 값을 `.textarea-count-total`에 넣고 입력 길이와
  비교한다(`Input.js:136-141`, `170-184`). 이 값이 없거나 `0`이면 카운트 기능 전체가 꺼진다.
- `data-props-count-limit`: 값이 있으면(truthy) `data-props-count`를 넘는 입력을 막는다. 없으면
  입력은 허용하고 초과 시 `.textarea-count-num`에 `.over` 클래스만 붙인다. 숫자 자체는 쓰이지 않으므로
  가이드처럼 `data-props-count`와 같은 값을 넣는다.
- `data-props-multibyte="true"`: 글자 수 대신 `etUI.utils.countCharacters` 기준(바이트)으로 센다
  (`Input.js:164-165`).
- `data-props-clear="true"`: 지우기 동작 활성화(`Input.js`가 `textarea` 뒤에 지우기 버튼을 삽입한다)

## 클래스 구조

- `.input-textarea-field` (컨테이너) > `textarea.textarea` + `.textarea-count`
  (`.textarea-count-num`, `.textarea-count-total`)
- 그 외 라벨·정보 영역 클래스는 `component-input` 스킬과 동일(`.input-label`, `.input-info` 등).

## 참고

이 프로젝트에는 별도의 `component-textarea` 가이드 페이지가 없다. 새로운 변형이 필요하면
`src/guide/pages/components/input.html`의 다른 예시를 먼저 확인하고, 없는 옵션은 추측으로
만들지 않는다.
