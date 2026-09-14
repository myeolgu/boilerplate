# 프로젝트 작업 지침

이 규칙은 사용자의 명시적인 재정의가 없는 한 이 프로젝트의 모든 작업에 적용한다. 비자명한 작업은 속도보다 신중함을 우선하고, 단순한 작업은 필요한 범위 안에서 판단해 처리한다.

이 프로젝트(`uxg-lgwf-front`)는 Gulp 기반 정적 HTML·SCSS 퍼블리싱 보일러플레이트다. React/TSX가 아니라 `@@include` 파셜을 사용하는 정적 HTML 페이지와 SCSS로 화면을 만든다.

## 작업 원칙

- 작업 전 요청 범위, 성공 기준, 가정을 확인한다. 불확실하거나 여러 해석이 가능한 내용은 추측으로 구현하지 말고 필요한 사항을 사용자에게 확인한다.
- 문제 해결에 필요한 최소 코드만 작성한다. 요청되지 않은 기능, 미래를 위한 추상화, 인접 코드의 임의 리팩터링을 추가하지 않는다.
- 변경은 외과적으로 수행한다. 반드시 필요한 파일만 수정하고 기존 코드의 스타일과 관행을 따른다.
- 코드를 추가하거나 변경하기 전 관련 컴포넌트 가이드(`src/guide/pages/components`)와 공통 SCSS 파셜을 먼저 확인한다.
- 충돌하는 구현 관행이 있으면 더 최신이고 프로젝트에서 검증된 방식을 하나 선택하고, 판단 근거를 알린다. 두 방식을 임의로 섞지 않는다.
- 완료라고 말하기 전 변경 범위에 맞는 검증을 수행한다. 검증하지 못한 항목이나 남은 불확실성은 완료로 표현하지 않는다.
- 중요한 구현 단계에서는 무엇을 변경했고 무엇을 검증했는지 간단히 공유한다.

## 커밋 메시지

- 사용자가 "커밋 내용"을 요청하면 `commit` 스킬을 불러와 그 지침에 따라 안내한다.

## 페이지 작성 범위

- 새 페이지는 `src/pages/<도메인>/` 아래 정적 HTML 파일로 작성한다.
- 모든 페이지는 `src/pages/sample/sample.html`의 구조를 기준으로 작성한다.
  - `head` 태그는 임의로 수정하지 않는다.
  - `@@include('pathPagesInclude/_header.html', ...)`, `@@include('pathPagesInclude/_footer.html')`로 공통 헤더·푸터를 포함하고 직접 마크업하지 않는다.
  - `<div id="content" role="main">` 안에서만 코딩하며, 그 안의 `<!-- ai가 코딩해줄 부분 -->` 주석 바로 아래에 코딩한다.
  - `#content` 안의 페이지 전용 클래스(`<div class="해당 페이지-wrap">`)의 자식에는 항상 `<div class="content-inner">`를 사용한다.
- 새 페이지마다 목적을 드러내는 고유한 kebab-case 최상위 클래스 하나를 둔다(예: `notice-wrap`, `signup-page`). 기존 페이지의 최상위 클래스와 같은 이름을 재사용하지 않는다.
- Figma 기반 작업은 사용자가 전달한 대상 node를 먼저 확인한다. node-id 또는 화면 범위가 불명확하면 임의로 다른 화면을 기준으로 구현하지 않는다.
- Figma의 여백·정렬·타이포그래피·색상·상태를 따르되, 기존 컴포넌트 가이드에 맞는 패턴이 있으면 새 마크업보다 그 패턴을 우선 사용한다.
- 변환 전 코드의 스타일 구조는 깨지지 않게 수정한다.

## 시맨틱 마크업과 접근성

- 의미에 맞는 시맨틱 태그(`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`/`figcaption`, `time`)를 사용한다. 의미 없이 `div`로만 구조를 만들지 않는다.
- `h1`~`h6`은 계층적으로 사용하고 한 페이지에 `h1`은 하나만 둔다. 스타일링 목적으로 헤딩 태그를 쓰지 않는다.
- `<a href="">`의 `href`는 기획서에 URL이 있으면 그 값을, 없으면 빈 값으로 둔다. `href="javascript:void(0)"`는 사용하지 않는다.
- 아이콘은 `<i class="ico-xxx" aria-hidden="true"></i>` 형태로 마크업한다. 아이콘만으로 의미를 전달하면 `aria-label`(또는 `role="img"` + `aria-label`)을 추가하고, 텍스트와 함께 쓰면 아이콘에 `aria-hidden="true"`만 둔다.
- 아이콘 전용 버튼에는 시각적으로 숨긴 `<span class="hide-txt">설명</span>`을 추가해 스크린 리더에 목적을 전달한다.
- HTML 주석은 `<!-- 주석 -->`, 수정 표시는 `<!-- 20240228 수정 -->` ~ `<!-- // 20240228 수정 -->` 형태로 시작·끝을 표시한다.
- `br`, `img`, `input`, `hr` 같은 void 요소는 자체 닫힘으로 작성한다(`<br />`, `<input />`). 닫지 않은 형태(`<br>`)는 `npm run checkhtml`에서 오류로 처리된다.

## 컴포넌트 사용 원칙

- 모든 UI 요소는 새로 만들기 전에 `src/guide/pages/components`의 컴포넌트 가이드와 관련 스킬을 먼저 확인하고, 있으면 직접 마크업 대신 그 컴포넌트를 사용한다. 예: 버튼은 `component-button`, 입력 필드는 `component-input`, 폼 레이아웃은 `component-form`, 체크박스는 `component-checkbox`, 라디오는 `component-radio`, 셀렉트는 `component-select`, 탭은 `component-tabs`, 아코디언은 `component-accordion`, 단독 접기/펼치기 패널은 `component-collapse`, 표는 `component-table`, 페이지네이션은 `component-pagination`, 아이콘은 `component-icon`.
- 모달은 `component-modal`, 스와이퍼는 `component-swiper`, 글자 수 카운트가 있는 텍스트영역은 `component-textarea`, 날짜 선택은 `component-picker`를 따른다. 이 넷은 `initUI()`가 자동 초기화하는 실제 JS 컴포넌트(`src/assets/scripts/ui/components`)와 연결되어 있으므로 클래스와 `data-props-*` 속성을 임의로 바꾸지 않는다.
- 확인·경고 팝업("alert"으로 요청받아도)은 `component-dialog`를 따른다. 마크업을 직접 쓰지 않고 `etUI.dialog.alert`/`.confirm`/`.previewImage` 호출로 연다. 하단 알림은 `component-toast`(`etUI.dialog.toastBasic` 등)를 기본으로 쓴다. `component-snackbar`는 공용 JS가 없는 레거시 패턴이므로 새 화면에는 쓰지 않는다.
- `component-carousel`은 스타일과 공용 JS 초기화가 아직 없는 프로토타입 단계다. 필요하면 먼저 `component-swiper`로 대체 가능한지 검토하고, 스킬의 확인 절차를 따른다.
- 같은 기능의 UI는 항상 같은 컴포넌트로 구현해 일관된 사용자 경험을 유지한다.
- 컴포넌트를 확장할 때는 기존 구조와 클래스를 유지하면서 필요한 부분만 수정한다.
- 설계 단계의 특별한 UX 요청이나 개발 제약이 없다면, 각 컴포넌트 가이드의 검증된 마크업을 그대로 복사해 사용하는 것을 기본으로 한다.
- 컴포넌트 사용 시 컴포넌트 예시의 HTML 구조를 따르고, 전달받은 디자인과 일치하도록 구현한다.

## SCSS 작성

- 모든 SCSS는 상위(페이지 또는 컴포넌트) 클래스를 중심으로 그 안에 중첩해 작성한다. 개별 요소 스타일을 최상위에 독립적으로 정의하지 않는다.
- 중첩은 2~3단계를 넘지 않도록 하고, 컴파일된 CSS도 5단계 이상 중첩되지 않는지 `dist/assets/styles/style.css`에서 확인한다. 깊은 중첩 대신 클래스 기반 선택자를 사용한다.
- 클래스명은 kebab-case를 사용한다. `mainContainer`, `main_container`, `main__container` 형태는 사용하지 않는다.
- 직접 mixin을 정의하지 않고 `_mixins.scss`에 정의된 mixin만 사용한다.
- 2px 이상의 수치가 있는 속성에는 모두 `@include rem(속성, 값)`을 사용한다. `calc()` 계산식이 포함된 값에는 mixin을 적용하지 않는다.
  - `margin: 20px;` x
  - `@include rem(margin, 20);` o
- 배경색·폰트색·테두리색은 `_variables.scss`에 정의된 변수(`$bg-XXXXXX`, `$font-XXXXXX`, `$line-XXXXXX`)가 있으면 그 변수를 사용하고, 정의된 변수가 없으면 직접 hex 값을 지정한다. 임의로 새 색상 변수를 만들지 않는다.
- Hex 색상은 항상 6자리로 쓴다. 축약형은 사용하지 않는다.
  - `#666` x
  - `#666666` o
- `gap` 속성은 사용하지 않는다. 요소 간 간격은 `margin`으로 조정한다.
- 상태·토글 클래스는 `is-`, `has-` 접두어를 사용하고 기본 클래스에 중첩해 결합한다(`&.is-active`, `&.is-open`).
- 스타일링이 필요한 요소는 태그만 두지 않고 목적을 드러내는 고유 클래스를 부여한다. 스타일은 태그 선택자가 아니라 클래스 선택자로 작성한다.
- 폰트 스타일(글꼴, 크기, 두께 등)은 기본값을 그대로 사용한다. 커스텀 폰트 스타일은 별도 작업으로 지정하며, 이번 작업 범위에서 임의로 커스텀하지 않는다.
- `stylelint`가 다음 조합을 오류로 처리하므로 지킨다(`npm run checkstyle`로 검증).
  - `display: block`인 요소에 `vertical-align`을 함께 쓰지 않는다.
  - `display: inline`인 요소에 `margin-top`/`margin-bottom`을 함께 쓰지 않는다.
  - `position`을 지정하지 않은(`static`) 요소에 `top`/`left`/`right`/`bottom`을 쓰지 않는다. 오프셋이 필요하면 먼저 `position: relative`(또는 `absolute`/`fixed`)를 지정한다.

## 아이콘·이미지 자산

- 아이콘은 SVG 파일이 아니라 `src/assets/styles/abstracts/_svg.scss`의 인라인 `data-URI` 믹스인(`@mixin ico-이름($color)`)으로 그린다. `.ico-이름` 클래스는 `src/assets/styles/components/_ico.scss`가 이 믹스인을 감싼 것이다.
- 새 아이콘이 필요하면 SVG 파일을 추가하는 게 아니라 같은 패턴의 믹스인을 `_svg.scss`에 추가한다. 새 아이콘을 추가하기 전에 같은 glyph의 믹스인이 이미 있는지 먼저 확인하고, 있으면 재사용한다.
- 상세 규칙은 `icon-asset-naming`, 마크업·색상 변경 방법은 `component-icon` 스킬을 따른다.

## 검증

- HTML을 변경한 뒤에는 `npm run checkhtml`을 실행한다.
- SCSS를 변경한 뒤에는 `npm run checkstyle`과 `npm run prettier`를 실행한다.
- 컴포넌트 가이드 페이지(`src/guide/pages/components/*.html`)가 있는 요소는 그 예시와 마크업 구조가 일치하는지 비교해 확인한다.
- `npm run dev`(gulp) 첫 실행 직후에는 `etUI.components`가 비어 있어 모든 인터랙션 컴포넌트가 초기화 실패할 수 있다(`src/assets/scripts/ui/{components,hooks,utils,templates}/index.cjs` 생성과 JS 번들 합치기 사이의 레이스 컨디션). 콘솔에 `Cannot read properties of undefined (reading 'Input')` 같은 에러가 보이면 dev 서버를 껐다 다시 켠다.
- 실제 동작(클릭, 열림/닫힘 등) 확인이 필요하면 Playwright(MCP가 연결되어 있으면)로 dev 서버를 띄운 페이지를 열어 검증한다. 코드만 읽고 동작을 추측하지 않는다. Playwright가 만드는 `.playwright-mcp/`(스크린샷·스냅샷·콘솔 로그)는 검증에 다 쓰고 나면 삭제한다. git에는 잡히지 않지만(`.gitignore`) 로컬에 쌓아둘 필요가 없다.
- 검증하지 못한 항목이나 남은 불확실성은 완료로 표현하지 않는다.
