---
name: component-checkbox
description: 체크박스(component-checkbox) 마크업 구조, 상태, 접근성 규칙을 안내한다. 체크박스를 마크업하기 전에 사용한다.
---

# Checkbox

체크박스는 React 컴포넌트가 아니라 `.component-checkbox` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 구조

```html
<div class="component-checkbox">
  <label class="checkbox-inner">
    <input type="checkbox" id="checkbox_id" name="checkbox_group_name">
  </label>
</div>
```

## 텍스트가 있는 체크박스

```html
<div class="component-checkbox">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0201" name="temp_checkbox_0200">
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox default</span>
    </span>
  </label>
</div>
```

## 상태

- 선택: `input`에 `checked` 속성을 추가한다.
- 비활성화: `input`에 `disabled` 속성을 추가한다.
- 선택 + 비활성화: 둘 다 추가한다.

## 클래스 구조

- 기본 클래스: `.component-checkbox`
- `.checkbox-inner`: 체크박스와 라벨을 감싸는 컨테이너
- `.checkbox-item`: 체크박스와 텍스트를 함께 그룹화하는 컨테이너
- `.checkbox-txt`: 체크박스 텍스트

## 접근성

- 각 체크박스에 고유한 `id`를 부여한다.
- 같은 그룹의 체크박스는 동일한 `name`을 공유한다.
- `label`로 감싸 클릭 영역을 넓히고, 텍스트가 있으면 `.checkbox-txt`로 시각적 라벨을 제공한다.
- 포커스 상태는 `:focus-visible { outline: -webkit-focus-ring-color auto 1px; }`로 표시한다.
