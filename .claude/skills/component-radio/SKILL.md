---
name: component-radio
description: 라디오 버튼 마크업 구조, 상태, 접근성 규칙을 안내한다. 라디오 버튼을 마크업하기 전에 사용한다.
---

# Radio

라디오 버튼은 React 컴포넌트가 아니라 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 구조

```html
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="radio_id" name="radio_group_name" />
  </label>
</div>
```

## 텍스트가 있는 라디오

```html
<div class="component-input">
  <label class="radio-inner">
    <input type="radio" id="temp_radio_0201" name="temp_radio_0200" />
    <span class="radio-item">
      <span class="radio-txt">Radio default</span>
    </span>
  </label>
</div>
```

## 상태

- 선택: `input`에 `checked` 속성을 추가한다.
- 비활성화: `input`에 `disabled` 속성을 추가한다.
- 선택 + 비활성화: 둘 다 추가한다.

## 클래스 구조

- `.radio-inner`: 라디오와 라벨을 감싸는 컨테이너
- `.radio-item`: 라디오와 텍스트를 함께 그룹화하는 컨테이너
- `.radio-txt`: 라디오 옆 텍스트

## 접근성

- 각 라디오에 고유한 `id`를 부여한다.
- 같은 그룹의 라디오는 동일한 `name`을 공유한다.
- `label`로 감싸 클릭 영역을 넓히고, 텍스트가 있으면 `.radio-txt`로 시각적 라벨을 제공한다.
- 포커스 상태는 `:focus-visible { outline: -webkit-focus-ring-color auto 1px; }`로 표시한다.

## 참고

실제 프로젝트(`src/assets/styles/components/_radio.scss`)를 확인한 결과 기본 클래스는
`.component-input`이 맞다. 체크박스와 같은 래퍼를 `Input.js`가 함께 처리한다(`component-checkbox`
스킬 참고). `.component-radio`라는 클래스는 만들지 않는다.
