---
name: component-icon
description: 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인으로 그린다. <i class="ico-xxx"> 마크업과 색상 파라미터 사용법, 접근성 규칙을 안내한다.
---

# Icon

아이콘은 별도 SVG 파일을 참조하지 않는다. `src/assets/styles/abstracts/_svg.scss`에 정의된
`@mixin ico-{이름}($color: $default-icon-color)`가 인라인 `data:image/svg+xml` 배경 이미지를
생성하고, `src/assets/styles/components/_ico.scss`가 이 믹스인을 `.ico-*` 클래스로 감싼다.

클래스명과 믹스인명이 항상 같지는 않다. `.ico-close`·`.ico-clear` → `ico-x`,
`.ico-go-back` → `ico-back`이고, 나머지는 같은 이름이다(`_ico.scss` 기준).

## 마크업

```html
<i class="ico-close ico-normal" aria-hidden="true"></i>
```

- `.ico-{이름}`: 아이콘 모양(예: `ico-close`, `ico-search`, `ico-arrow-down`)
- `.ico-normal`: 크기(24×24, `icon-size` 믹스인)
- `ico-*` 클래스를 `class` 속성 **맨 앞**에 둔다. 공통 속성(`display: inline-block`,
  `background-repeat: no-repeat`, 가운데 정렬)은 `_base.scss`의 `[class^='ico-']` 선택자로
  붙는데, 이 선택자는 `class` 값이 `ico-`로 시작할 때만 적용된다.

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

일부 아이콘은 `_ico.scss`의 `.ico-*` 클래스 없이 해당 컴포넌트 SCSS에서 바로 `@include`해서
쓴다. 새로 마크업할 때 이런 아이콘은 클래스를 임의로 만들지 않는다.

- `ico-check`(체크박스 체크 표시, `_checkbox.scss`), `ico-circle`(라디오 선택 표시, `_radio.scss`),
  `ico-login-id`/`ico-login-pw`(로그인 아이콘, `_input.scss`), `ico-nav-first`/`ico-nav-prev`/
  `ico-nav-next`/`ico-nav-last`(페이지네이션 이동 버튼, `_pagination.scss`)
- `ico-password-show`/`ico-password-hide`(비밀번호 토글)는 `_input.scss`가 컴포넌트 전용 클래스
  `.ico-password-state`에 붙여 쓴다. 마크업은 `component-input` 스킬의
  `<i class="ico-password-state ico-normal" aria-hidden="true"></i>`를 그대로 쓴다.
- `ico-nav-*` 4종은 `$color`에 기본값이 없다. 인자 없이 `@include ico-nav-first;`로 부르면
  컴파일 에러가 나므로 항상 색을 넘긴다(예: `@include ico-nav-first(black);`).

## 접근성 가이드

- 아이콘(`<i class="ico-*">`)에는 항상 `aria-hidden="true"`를 둔다.
- 의미 전달이 필요하면(아이콘만 있는 버튼 등) 아이콘 옆에 `<span class="hide-txt">설명</span>`을
  함께 둔다(`component-button`, `component-input`, `component-pagination` 스킬과 동일).
- `<i>`에 `aria-label`이나 `role="img"`를 주지 않는다. (이 규칙은 `_svg.scss` 믹스인 아이콘에
  한정한다. 텍스트 `*`로 표시하는 필수 표시 `.ico-required-mark`는 `component-form`/
  `component-input` 스킬을 따른다.)

```html
<button type="button" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="hide-txt">검색</span>
</button>
```

## 새 아이콘이 필요할 때

기존 `.ico-*` 클래스나 위 목록의 믹스인으로 해결되지 않는 새 아이콘은 SVG 파일을 추가하는 게
아니라 `_svg.scss`에 같은 패턴의 새 믹스인을 추가해야 한다. 자세한 절차는 `icon-asset-naming`
스킬을 따른다.
