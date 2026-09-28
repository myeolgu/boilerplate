---
name: icon-asset-naming
description: 이 프로젝트의 아이콘은 SVG 파일이 아니라 _svg.scss의 인라인 data-URI 믹스인이다. 새 아이콘을 추가하기 전에 기존 믹스인 재사용 여부와 새 믹스인 작성 절차를 안내한다.
---

# 아이콘 지침

## 새 아이콘 추가 전 확인

새 아이콘이 필요하면 SVG 파일부터 만들지 않는다. 먼저 `src/assets/styles/abstracts/_svg.scss`와
`src/assets/styles/components/_ico.scss`에서 같은 glyph의 믹스인·클래스가 이미 있는지 확인한다.
삼각형 화살표는 `src/assets/styles/abstracts/_mixins.scss`의 border 기반
`ico-triangle-up/down/left/right($w1, $w2, $w3, $color)`도 확인한다.
있으면 재사용한다. 색만 다르면 새 아이콘을 추가하지 않고 기존 믹스인을 색 인자만 바꿔 호출한다
(`component-icon` 스킬의 "색상 바꾸기" 참고).

## 새 아이콘을 추가할 때 (기본 방법: 인라인 SVG 믹스인)

`_svg.scss`는 전역 파일이므로 새 믹스인·클래스 추가는 **사용자에게 먼저 확인한 뒤에만** 한다.

1. **Figma 아이콘 레이어(박스) 단위로 내보낸 SVG를 그대로 쓴다.** 받는 방법은 아래
   "Figma에서 아이콘 SVG 받기"를 따른다.
   - 캔버스(`width`·`height`·`viewBox`)는 Figma 아이콘 레이어 박스 크기다(18×18 레이어면
     `width='18' height='18' viewBox='0 0 18 18'`). 24×24로 맞추거나 크기를 바꾸지 않는다.
   - path 좌표, `fill`·`stroke` 색, 선 굵기, 아이콘 안의 글자 path까지 **아무것도 고치지 않는다.**
   - `get_design_context`의 개별 에셋(`/api/mcp/asset/…`)은 도형 하나를 경계에 맞춰 자른 SVG라
     크기가 소수점으로 나온다(예: 18×18 뱃지의 육각형만 15.5885×17.6906, 글자 "N"은 빠짐). 이
     에셋을 캔버스로 쓰거나 여러 에셋을 조립해 아이콘을 만들지 않는다.
2. 기존 `ico-x`와 같은 인코딩 방식으로 data-URI를 만든다. **인코딩 외의 변경은 하지 않는다.**
   - `<` → `%3c`, `>` → `%3e`(소문자)
   - 속성 값은 작은따옴표(`'`)로 감싼다(바깥 SCSS 문자열이 큰따옴표).
   - `xmlns='http://www.w3.org/2000/svg'`는 인코딩하지 않고 그대로 둔다.
   - 색은 SVG에 적힌 Figma 색 그대로 두고 `#`만 `%23`으로 쓴다(예: `fill='%23EB4054'`,
     `fill='white'`는 그대로).
   - 색을 `#{$color}`로 바꿔 인자로 받는 건 **같은 아이콘을 Figma에서 여러 색으로 쓸 때만** 한다.
     이때도 `$color` 기본값은 Figma 색으로 두고, 색이 여러 개인 SVG(뱃지 배경 + 글자 등)는 바꿀
     색만 인자로 뺀다.
3. `_svg.scss`에 같은 패턴으로 새 믹스인을 추가한다. 색 인자가 없는 아이콘은 `@mixin ico-새이름`처럼
   인자 없이 정의한다(기존 믹스인의 `$default-icon-color` 기본값은 색 인자가 있는 경우에만 해당한다).

   ```scss
   @mixin ico-새이름($color: $default-icon-color) {
     $ico-새이름: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'%3e%3cpath stroke='#{$color}' d='...'/%3e%3c/svg%3e";
     background-image: url($ico-새이름);
   }
   ```

4. 화면에서 `.ico-*` 클래스로 바로 쓸 아이콘이면 `_ico.scss`에 클래스를 추가한다.

   ```scss
   .ico-새이름 {
     @include ico-새이름;
   }
   ```

   특정 컴포넌트(체크박스 체크 표시, 페이지네이션 이동 버튼 등)에서만 쓰는 아이콘이면 `.ico-*`
   클래스를 만들지 않고 해당 컴포넌트 SCSS에서 바로 `@include ico-새이름;`로 쓴다.

5. 믹스인 이름은 `ico-` 접두어의 kebab-case로 짓는다. 예: `ico-close`, `ico-arrow-down`,
   `ico-nav-first`.

## Figma에서 아이콘 SVG 받기

사용자가 SVG를 직접 주지 않아도 직접 받는다. Figma의 "Copy as SVG"와 같은 결과를 MCP로 받는 방법이다.

1. `get_metadata`로 아이콘 **레이어 노드**(예: 18×18 Frame/Instance/Group)의 id를 찾는다. 안쪽의
   Vector·Polygon·Text 노드가 아니라 아이콘 박스 크기를 가진 바깥 노드다.
2. `download_assets`를 그 노드 id와 `defaultFormat: "svg"`로 호출하고, 응답의 **`export`**(노드 전체
   렌더)를 받는다. `svgAssets`는 도형 단위 에셋이라 `get_design_context` 에셋과 같은 문제가 있으므로
   쓰지 않는다.
3. 받은 SVG의 `width`·`height`·`viewBox`가 `get_metadata`의 노드 width·height와 같은지 확인한다.
   다르면 잘못된 노드를 받은 것이다.
4. 이 방법으로 받지 못하면 추측으로 SVG를 조립하지 말고 사용자에게 알린다.

## `npm run svg`는 쓰지 않는다

`npm run svg`(`gulp/tasks/svgToScssMixin.js`)는 `src/assets/scripts/uiComp/svgIcons.json`을 읽는데
이 파일이 없어 지금은 동작하지 않는다. 입력 파일이 생기면 `_svg.scss`를 통째로 덮어써 기존
변수·`icon-size`·믹스인이 사라지므로 새 아이콘 추가에 쓰지 않는다. 위 절차대로 직접 추가한다.

## 파일 기반 아이콘 (예외, 확인 필요)

`_svg.scss`에는 인라인으로 만들기 어려운 아이콘을 위한 `@include ico-bg($filename)` 믹스인도
있다(`background-image: url('../images/icon/#{$filename}')`). 다만 저장소 어디에도 이 경로에
실제 파일이 없고 실제로 쓰인 사례도 없다. 사진처럼 인라인 SVG로 만들기 어려운 아이콘이 필요하면
이 방식을 쓸지, 파일명 규칙을 어떻게 할지 먼저 사용자에게 확인한다. 추측으로 새 폴더 구조나
네이밍 규칙을 만들지 않는다.

## 마크업

- 새로 마크업하는 화면·컴포넌트는 `<i class="ico ico-{이름}" data-size="24" aria-hidden="true"></i>`
  형태(신규 컨벤션)로 쓴다. `button`/`input`/`pagination` 등 아직 옮기지 않은 기존 컴포넌트를
  그대로 복사해 쓸 때만 레거시 형태(`<i class="ico-{이름} ico-normal" ...></i>`)를 따른다. 두 형태를
  같은 아이콘에 섞어 쓰지 않는다. 자세한 사용법·크기 값 목록·접근성 규칙은 `component-icon`
  스킬을 따른다.
- 직접 `<img>` 태그나 `<svg>` 인라인 마크업을 사용하지 않는다.
