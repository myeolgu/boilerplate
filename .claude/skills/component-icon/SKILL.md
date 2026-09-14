---
name: component-icon
description: 아이콘(<i class="ico-xxx">) 마크업 구조와 접근성 규칙을 안내한다. 화면에 아이콘을 추가하기 전에 사용한다.
---

# Icon

아이콘은 React 컴포넌트가 아니라 `<i>` 태그에 클래스로 배경 이미지를 지정하는 정적 HTML 패턴이다. 자산 파일명·경로 규칙은 `icon-asset-naming` 스킬을 따른다.

## 기본 마크업

```html
<i class="ico-close ico-normal" aria-hidden="true"></i>
```

## 접근성 가이드

- **순수 장식용 아이콘**: `aria-hidden="true"`만 추가한다.
- **아이콘만으로 의미를 전달할 때**: `aria-label`을 추가한다.
  ```html
  <button type="button">
    <i class="ico-search ico-normal" aria-label="검색"></i>
  </button>
  ```
- **텍스트와 함께 쓸 때**: 아이콘에는 `aria-hidden="true"`를 두고 텍스트로 의미를 전달한다.
  ```html
  <button type="button">
    <i class="ico-search ico-normal" aria-hidden="true"></i>
    <span>검색</span>
  </button>
  ```
- **상태를 나타내는 아이콘**: `role="img"`와 `aria-label`을 함께 사용한다.
  ```html
  <i class="ico-required-mark" role="img" aria-label="필수">*</i>
  ```

## 크기

- `.ico-normal`: 기본 크기(24×24)

## SCSS

```scss
[class^="ico-"] {
  display: inline-block;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.ico-normal {
  @include rem(width, 24);
  @include rem(height, 24);
}

.ico-close {
  background-image: url('../assets/images/icons/ico-close.svg');
}
```

- 개별 아이콘은 `.ico-{이름}`에 `background-image`로 SVG를 지정한다.
- 아이콘 파일은 `src/assets/images/icons/`에 두고, 새 아이콘을 추가하기 전에 같은 glyph가 이미 있는지 먼저 확인한다.
