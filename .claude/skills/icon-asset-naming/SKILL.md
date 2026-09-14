---
name: icon-asset-naming
description: 이 프로젝트의 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인이다. 새 아이콘을 추가하기 전에 기존 믹스인 재사용 여부와 새 믹스인 작성 절차를 안내한다.
---

# 아이콘 지침

## 새 아이콘 추가 전 확인

새 아이콘이 필요하면 SVG 파일부터 만들지 않는다. 먼저 `src/assets/styles/abstracts/_svg.scss`와
`src/assets/styles/components/_ico.scss`에서 같은 glyph의 믹스인·클래스가 이미 있는지 확인한다.
있으면 재사용한다. 색만 다르면 새 아이콘을 추가하지 않고 기존 믹스인을 색 인자만 바꿔 호출한다
(`component-icon` 스킬의 "색상 바꾸기" 참고).

## 새 아이콘을 추가할 때 (기본 방법: 인라인 SVG 믹스인)

1. SVG를 24×24 기준으로 준비하고, 색상이 들어가는 속성(`stroke`/`fill`)을 `#{$color}`로
   치환한 문자열을 만든다.
2. `_svg.scss`에 같은 패턴으로 새 믹스인을 추가한다.

   ```scss
   @mixin ico-새이름($color: $default-icon-color) {
     $ico-새이름: "data:image/svg+xml,...stroke='#{$color}'...";
     background-image: url($ico-새이름);
   }
   ```

3. 화면에서 `.ico-*` 클래스로 바로 쓸 아이콘이면 `_ico.scss`에 클래스를 추가한다.

   ```scss
   .ico-새이름 {
     @include ico-새이름;
   }
   ```

   특정 컴포넌트(체크박스 체크 표시, 페이지네이션 이동 버튼 등)에서만 쓰는 아이콘이면 `.ico-*`
   클래스를 만들지 않고 해당 컴포넌트 SCSS에서 바로 `@include ico-새이름;`로 쓴다.
4. 믹스인 이름은 `ico-` 접두어의 kebab-case로 짓는다. 예: `ico-close`, `ico-arrow-down`,
   `ico-nav-first`.

## 파일 기반 아이콘 (예외, 확인 필요)

`_svg.scss`에는 인라인으로 만들기 어려운 아이콘을 위한 `@include ico-bg($filename)` 믹스인도
있다(`background-image: url('../images/icon/#{$filename}')`). 다만 저장소 어디에도 이 경로에
실제 파일이 없고 실제로 쓰인 사례도 없다. 사진처럼 인라인 SVG로 만들기 어려운 아이콘이 필요하면
이 방식을 쓸지, 파일명 규칙을 어떻게 할지 먼저 사용자에게 확인한다. 추측으로 새 폴더 구조나
네이밍 규칙을 만들지 않는다.

## 마크업

- 아이콘은 `<i class="ico-{이름} ico-normal" aria-hidden="true"></i>` 형태로 마크업한다. 자세한
  사용법과 접근성 규칙은 `component-icon` 스킬을 따른다.
- 직접 `<img>` 태그나 `<svg>` 인라인 마크업을 사용하지 않는다.
