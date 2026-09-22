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

- 새 페이지 코딩을 시작하기 전에 코딩리스트(`src/guide/cl.csv`)에 해당 페이지 행을 먼저 추가하거나 기존 행을 갱신한다. 컬럼은 `no,카테고리명,Depth 1,Depth 2,Depth 3,Depth 4,Depth 5,화면경로,담당자,진행상태,완료일,비고` 순서를 그대로 따른다.
  - 실제 코딩리스트 화면(`src/guide/cl.html`)은 구글시트(`codinglist.js`의 `mySpreadsheet`)를 우선 데이터 소스로 쓰고, `cl.csv`는 그 로컬 폴백이다. 구글시트는 AI가 직접 수정할 수 없으므로 `cl.csv`만 갱신하고, 구글시트 쪽도 갱신이 필요한지는 사용자에게 확인한다.
  - `화면경로` 값은 실제 파일 경로가 아니라 `gulp/config/paths.js`의 `pathPages<도메인>` 별칭(예: `pathPagesMain/main.html`)을 그대로 쓴다. 새 도메인 폴더(`src/pages/<도메인>/`)를 처음 만들 때는 `gulp/config/paths.js`의 `projectReplacePaths`에 `pathPages<도메인>: getBuildPath(...)` 항목을 함께 추가해야 코딩리스트 미리보기 링크가 정상적으로 열린다(추가 위치는 파일의 "// 필요한 경로를 추가 합니다." 주석 바로 위).
- 새 페이지는 `src/pages/<도메인>/` 아래 정적 HTML 파일로 작성한다.
- 모든 페이지는 `src/pages/sample/sample.html`의 구조를 기준으로 작성한다.
  - `head` 태그는 임의로 수정하지 않는다.
  - `@@include('pathPagesInclude/_header.html', ...)`, `@@include('pathPagesInclude/_footer.html')`로 공통 헤더·푸터를 포함하고 직접 마크업하지 않는다.
  - `<div id="content" role="main">` 안에서만 코딩하며, 그 안의 `<!-- ai가 코딩해줄 부분 -->` 주석 바로 아래에 코딩한다.
  - `#content` 안의 페이지 전용 클래스(`<div class="해당 페이지-wrap">`)의 자식에는 항상 `<div class="content-inner">`를 사용한다.
- 새 페이지마다 목적을 드러내는 고유한 kebab-case 최상위 클래스 하나를 둔다(예: `notice-wrap`, `signup-page`). 기존 페이지의 최상위 클래스와 같은 이름을 재사용하지 않는다.
- Figma 기반 작업은 사용자가 전달한 대상 node를 먼저 확인한다. node-id 또는 화면 범위가 불명확하면 임의로 다른 화면을 기준으로 구현하지 않는다.
- Figma의 여백·정렬·타이포그래피·색상·상태를 따르되, 기존 컴포넌트 가이드에 맞는 패턴이 있으면 새 마크업보다 그 패턴을 우선 사용한다.
- Figma MCP가 연결되어 있으면(링크만 줘도 디자인을 직접 읽을 수 있으면) `figma-to-page` 스킬을 따른다. `get_design_context`가 돌려주는 코드는 React·Tailwind 참고 코드이므로 그대로 쓰지 않고, 이 프로젝트의 실제 컴포넌트·SCSS 토큰 체계로 옮겨 적는다.
- 변환 전 코드의 스타일 구조는 깨지지 않게 수정한다.

## 시맨틱 마크업과 접근성

- 의미에 맞는 시맨틱 태그(`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`/`figcaption`, `time`)를 사용한다. 의미 없이 `div`로만 구조를 만들지 않는다.
- `h1`~`h6`은 계층적으로 사용하고 한 페이지에 `h1`은 하나만 둔다. 스타일링 목적으로 헤딩 태그를 쓰지 않는다.
  - `h1`은 공통 헤더(`_header.html`)의 로고가 이미 쓰고 있다. 따라서 `#content` 안 페이지 콘텐츠는 `h1`을 다시 쓰지 않고 `h2`부터 시작한다(`sample.html`의 `page-tit`이 `h2`인 것도 이 때문). 하위 헤딩도 이 기준으로 한 단계씩 내려서 계층을 맞춘다(`page-tit` h2 → 섹션 제목 h3 → 그 아래 h4 …).
- `<a href="">`의 `href`는 기획서에 URL이 있으면 그 값을, 없으면 빈 값으로 둔다. `href="javascript:void(0)"`는 사용하지 않는다.
- 아이콘은 `<i class="ico-xxx" aria-hidden="true"></i>` 형태로 마크업한다. 아이콘만으로 의미를 전달하면 `aria-label`(또는 `role="img"` + `aria-label`)을 추가하고, 텍스트와 함께 쓰면 아이콘에 `aria-hidden="true"`만 둔다.
- 아이콘 전용 버튼에는 시각적으로 숨긴 `<span class="hide-txt">설명</span>`을 추가해 스크린 리더에 목적을 전달한다.
- HTML 주석은 `<!-- 주석 -->`, 수정 표시는 `<!-- 20240228 수정 -->` ~ `<!-- // 20240228 수정 -->` 형태로 시작·끝을 표시한다.
- `br`, `img`, `input`, `hr` 같은 void 요소는 자체 닫힘으로 작성한다(`<br />`, `<input />`). 닫지 않은 형태(`<br>`)는 `npm run checkhtml`에서 오류로 처리된다.

## 컴포넌트 사용 원칙

- 모든 UI 요소는 새로 만들기 전에 `src/guide/pages/components`의 컴포넌트 가이드와 관련 스킬을 먼저 확인하고, 있으면 직접 마크업 대신 그 컴포넌트를 사용한다. 예: 버튼은 `component-button`, 입력 필드는 `component-input`, 폼 레이아웃은 `component-form`, 체크박스는 `component-checkbox`, 라디오는 `component-radio`, 셀렉트는 `component-select`, 탭은 `component-tabs`, 아코디언은 `component-accordion`, 단독 접기/펼치기 패널은 `component-collapse`, 표는 `component-table`, 페이지네이션은 `component-pagination`, 아이콘은 `component-icon`.
- 모달은 `component-modal`, 스와이퍼는 `component-swiper`, 글자 수 카운트가 있는 텍스트영역은 `component-textarea`, 날짜 선택은 `component-picker`, 툴팁은 `component-tooltip`을 따른다.
- 위 컴포넌트(체크박스·라디오·셀렉트·탭·아코디언·접기펼치기·모달·스와이퍼·텍스트영역·날짜 선택 등 인터랙션이 있는 것들)는 전부 `initUI()`가 해당 `.component-*` 클래스를 스캔해 자동 초기화하는 실제 JS 컴포넌트(`src/assets/scripts/ui/components`)와 연결되어 있으므로 클래스와 `data-props-*` 속성을 임의로 바꾸지 않는다.
- 확인·경고 팝업("alert"으로 요청받아도)은 `component-dialog`를 따른다. 마크업을 직접 쓰지 않고 `etUI.dialog.alert`/`.confirm`/`.previewImage` 호출로 연다. 하단 알림은 `component-toast`(`etUI.dialog.toastBasic` 등)를 기본으로 쓴다. `component-snackbar`는 공용 JS가 없는 레거시 패턴이므로 새 화면에는 쓰지 않는다.
- 캐러셀·슬라이더는 `component-swiper`로 구현한다. 별도 carousel 컴포넌트는 없으므로 새로 만들지 않는다.
- 같은 기능의 UI는 항상 같은 컴포넌트로 구현해 일관된 사용자 경험을 유지한다.
- 컴포넌트를 확장할 때는 기존 구조와 클래스를 유지하면서 필요한 부분만 수정한다.
- 설계 단계의 특별한 UX 요청이나 개발 제약이 없다면, 각 컴포넌트 가이드의 검증된 마크업을 그대로 복사해 사용하는 것을 기본으로 한다.
- 컴포넌트 사용 시 컴포넌트 예시의 HTML 구조를 따르고, 전달받은 디자인과 일치하도록 구현한다.

## SCSS 작성

- 새 페이지의 SCSS는 `src/assets/styles/pages/_<도메인>.scss`로, 그 페이지가 속한 도메인 폴더(`src/pages/<도메인>/`) 단위로 파일 하나를 관리한다(예: `src/pages/notice/`에 목록·상세 페이지가 있으면 `_notice.scss` 하나에 `.notice-list-wrap`, `.notice-view-wrap`을 각각 최상위 선택자로 나란히 둔다. 서로 중첩하지 않는다). 도메인에 페이지가 하나뿐이면(`main`, `sample`처럼) 그 파일이 곧 페이지 하나짜리 파일이 된다. 파일 상단에 `@use '../abstracts' as *;`를 두고, `style.scss`의 페이지 목록에 `@use 'pages/<도메인>';`을 추가해 직접 등록한다.
  - `pages/_index.scss`는 `main`/`sample`/`codinglist`/`component_guide`를 `@forward`하지만 `style.scss`를 포함해 어디에서도 `@use`되지 않는 미사용 파일이다. 새 페이지를 이 인덱스에 추가하지 않는다.
- 모든 SCSS는 상위(페이지 또는 컴포넌트) 클래스를 중심으로 그 안에 중첩해 작성한다. 개별 요소 스타일을 최상위에 독립적으로 정의하지 않는다.
- `content-inner`, `page-tit`, `page-tit-group`처럼 여러 페이지가 공유하는 골격 클래스도, 특정 페이지에서만 다르게 보여야 하면 그 페이지의 최상위 wrap 클래스 안에 중첩해서 재정의한다(`.notice-list-wrap .content-inner { ... }`). 클래스명이 공통이라는 이유로 전역 파일(`_base.scss` 등)을 고치거나 손대지 않고 넘어가지 않는다. 여러 페이지에 공통으로 필요한 변경이라고 확신할 때만 전역 파일 수정을 검토하고, 그 경우에도 영향 범위가 넓으니 먼저 사용자에게 확인한다.
- 중첩은 2~3단계를 넘지 않도록 하고, 컴파일된 CSS도 5단계 이상 중첩되지 않는지 `dist/assets/styles/style.css`에서 확인한다. 깊은 중첩 대신 클래스 기반 선택자를 사용한다.
- 클래스명은 kebab-case를 사용한다. `mainContainer`, `main_container`, `main__container` 형태는 사용하지 않는다.
- 하위 클래스는 역할이나 콘텐츠로 이름 짓는다. 위치·순서·색상 같은 시각적 특징으로 이름 짓지 않는다.
  - `top-box` x
  - `card-title` o
- 직접 mixin을 정의하지 않고 `_mixins.scss`에 정의된 mixin만 사용한다.
- 2px 이상의 수치가 있는 속성에는 모두 `@include rem(속성, 값)`을 사용한다. `calc()` 계산식이 포함된 값에는 mixin을 적용하지 않는다.
  - `margin: 20px;` x
  - `@include rem(margin, 20);` o
- 여백·크기(margin, padding, width, height, max-width 등) 값도 Figma가 1순위다. "이 정도면 비슷하겠지"로 눈대중 넣지 않고, Figma MCP의 `get_metadata`(x/y/width/height)나 `get_design_context`의 인셋·크기 값을 직접 읽어 그 수치 그대로 `rem()`에 넣는다. 정확한 수치를 구하지 못했으면 완료로 보고하지 않고 불확실하다고 밝힌다.
- 배경색·폰트색·테두리색은 `_variables.scss`에 정의된 변수(`$bg-XXXXXX`, `$font-XXXXXX`, `$line-XXXXXX`) 중 디자인 값과 정확히 일치하는 게 있으면 그 변수를 사용한다. 정확히 일치하는 변수가 없으면, 가장 비슷한 기존 변수로 근사하지 말고 **`_variables.scss`에 새 변수를 그 값 그대로 추가한 뒤** 그 변수를 쓴다(예: 디자인이 `#3c3c3b`인데 `$font-333333`으로 대충 맞추지 않고, `$font-3c3c3b: #3c3c3b;`를 추가한다). 용도에 따라 접두어를 맞춘다: 글자색 → `$font-XXXXXX`, 배경 → `$bg-XXXXXX`, 테두리/구분선 → `$line-XXXXXX`. 페이지 SCSS에 원본 hex를 직접 박아 넣지 않는다.
- 디자인에 명시된 색을 컴포넌트/베이스의 플레이스홀더 기본값(`component-table`의 `th` 배경 `lightgray`, 테두리 `gray`, `_base.scss`의 기본 글자색 `#000000` 등)에 그냥 맡겨두지 않는다. 다르면 페이지 SCSS에서 명시적으로 재정의한다.
- Hex 색상은 항상 6자리로 쓴다. 축약형은 사용하지 않는다.
  - `#666` x
  - `#666666` o
- `gap` 속성은 사용하지 않는다. 요소 간 간격은 `margin`으로 조정한다.
- 상태·토글 클래스는 `is-`, `has-` 접두어를 사용하고 기본 클래스에 중첩해 결합한다(`&.is-active`, `&.is-open`).
- 스타일링이 필요한 요소는 태그만 두지 않고 목적을 드러내는 고유 클래스를 부여한다. 스타일은 태그 선택자가 아니라 클래스 선택자로 작성한다.
- Figma 디자인이 항상 1순위다. 폰트 크기·두께도 Figma 지정값과 동일하게 맞춘다("기본값 유지"로 임의로 생략하지 않는다). `_mixins.scss`에 해당 크기의 믹스인(`f12`~`f18` 등)이 없으면 같은 패턴으로 추가한다(`f20`, `f40`, `f56`처럼). 굵기는 별도 변수 없이 믹스인의 `$fontWeight` 인자에 숫자를 직접 넘긴다(`@include f18(700, 1.5);`) — 믹스인 자체의 사용 예시가 이미 이 방식이다. `font-size`를 믹스인 없이 직접 하드코딩하지 않는다.
  - 예외: 글꼴(font-family) 자체가 프로젝트에 없는 경우(웹폰트 파일 미보유, 라이선스 미확인 등)는 크기·두께만 정확히 맞추고 글꼴은 프로젝트 기본값을 쓴다. 이 경우 어떤 글꼴이 빠졌는지 사용자에게 알린다.
- `stylelint`가 다음 조합을 오류로 처리하므로 지킨다(`npm run checkstyle`로 검증).
  - `display: block`인 요소에 `vertical-align`을 함께 쓰지 않는다.
  - `display: inline`인 요소에 `margin-top`/`margin-bottom`을 함께 쓰지 않는다.
  - `position`을 지정하지 않은(`static`) 요소에 `top`/`left`/`right`/`bottom`을 쓰지 않는다. 오프셋이 필요하면 먼저 `position: relative`(또는 `absolute`/`fixed`)를 지정한다.
- `src/assets/styles/utilities/`에 `.mt-0`, `.text-center`, `.pc-show`/`.mo-show` 같은 유틸리티 클래스가 실제로 존재하고 빌드에도 연결되어 있다(`style.scss`가 `@use 'utilities'`). 하지만 해당 파일 대부분에 "사용시 PL과 상의 할 것"이라는 주석이 있다. 사용자가 명시적으로 승인하지 않으면 이 유틸리티 클래스를 새 코드에 쓰지 않는다. 기본값은 이 문서의 "역할·콘텐츠 기반 네이밍" 원칙대로 페이지 전용 클래스를 만드는 것이다.

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
- Figma 기반으로 구현한 화면은 코드 컨벤션 검수(`reviewer`)와 별개로, 완성된 화면을 Figma와 스크린샷으로 시각 비교해야 하면 `design-qa` 에이전트를 호출한다. `reviewer`는 lint·컨벤션만 보고 시각적 일치 여부는 보지 않으므로, `reviewer`가 "문제 없음"이라고 해도 그건 코드 컨벤션 기준일 뿐 Figma와의 시각적 일치를 보장하지 않는다.
- `design-qa`(또는 다른 검수)에서 "다른 원인 때문에 파생된 문제라 제외"라고 정리한 항목은 영구 제외가 아니라 그 원인이 해결될 때까지만 제외한 것이다. 원인이 되는 이슈(예: 공통 골격 `content-inner` 미비)를 고친 뒤에는, 그 이유로 제외했던 파생 항목들(예: 정렬 오차)을 반드시 다시 확인한다. 원인을 고쳤다고 파생 항목이 저절로 고쳐지는 게 아니므로, 제외 목록을 만든 사람이 직접 그 목록을 다시 열어봐야 한다.
- 검증하지 못한 항목이나 남은 불확실성은 완료로 표현하지 않는다.
