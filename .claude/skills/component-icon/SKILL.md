---
name: component-icon
description: 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인으로 그린다. <i class="ico-xxx"> 마크업과 색상 파라미터 사용법, 접근성 규칙을 안내한다.
---

# Icon

아이콘은 별도 SVG 파일을 참조하지 않는다. `src/assets/styles/abstracts/_svg.scss`에 정의된
`@mixin ico-{이름}($color: $default-icon-color)`가 인라인 `data:image/svg+xml` 배경 이미지를
생성하고, `src/assets/styles/components/_ico.scss`가 이 믹스인을 `.ico-{이름}` 클래스로
감싼다.

## 마크업

```html
<i class="ico-close ico-normal" aria-hidden="true"></i>
```

- `.ico-{이름}`: 아이콘 모양(예: `ico-close`, `ico-search`, `ico-arrow-down`)
- `.ico-normal`: 크기(24×24, `icon-size` 믹스인)

## 색상 바꾸기 (SCSS에서)

마크업에서 색을 바꾸는 게 아니라, 그 아이콘을 쓰는 SCSS 쪽에서 믹스인을 다시 호출해 색을
지정한다. 마크업의 클래스 자체는 그대로 둔다.

```scss
.some-button {
  .ico-close {
    @include ico-x('%23ffffff'); // 흰색. #은 %23으로 인코딩해서 전달한다.
  }
}
```

## 이미 클래스가 없는 믹스인(직접 `@include`)

일부 아이콘은 `.ico-*` 클래스 없이 해당 컴포넌트 SCSS에서 바로 `@include`해서 쓴다. 새로 마크업할
때 이런 아이콘은 클래스를 임의로 만들지 않는다.

- `ico-check`(체크박스 체크 표시), `ico-password-show`/`ico-password-hide`(비밀번호 토글),
  `ico-login-id`/`ico-login-pw`(로그인 아이콘), `ico-nav-first`/`ico-nav-prev`/`ico-nav-next`/
  `ico-nav-last`(페이지네이션 이동 버튼)

## 접근성 가이드

- **순수 장식용 아이콘**: `aria-hidden="true"`만 추가한다.
- **아이콘만으로 의미를 전달할 때**: `aria-label`을 추가한다.
- **텍스트와 함께 쓸 때**: 아이콘에는 `aria-hidden="true"`를 두고 텍스트로 의미를 전달한다.
- **상태를 나타내는 아이콘**: `role="img"`와 `aria-label`을 함께 사용한다.

## 새 아이콘이 필요할 때

기존 `.ico-*` 클래스나 위 목록의 믹스인으로 해결되지 않는 새 아이콘은 SVG 파일을 추가하는 게
아니라 `_svg.scss`에 같은 패턴의 새 믹스인을 추가해야 한다. 자세한 절차는 `icon-asset-naming`
스킬을 따른다.
