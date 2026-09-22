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

## 규칙은 스킬에 있다

세부 규칙의 원본은 스킬이다. 이 문서는 원칙과 "언제 어떤 스킬을 부르는지"만 담는다. 규칙을 바꿀 때는 해당 스킬 한 곳만 고치고, 이 문서나 에이전트 문서에 규칙 내용을 다시 복사하지 않는다.

| 작업                                                                              | 먼저 불러올 스킬                       |
| --------------------------------------------------------------------------------- | -------------------------------------- |
| 새 페이지 작성(코딩리스트 갱신, `sample.html` 구조, 작업 범위, 최상위 클래스)     | `layout-page`                          |
| HTML 작성·수정(시맨틱 태그, 헤딩 계층, `href`, 주석, void 요소)                   | `markup-html`                          |
| SCSS 작성·수정(구조, 네이밍, `rem()`, 색상 변수, 폰트, 레이아웃, 유틸리티 클래스) | `style-scss`                           |
| Figma 링크·node로 구현                                                            | `figma-to-page`                        |
| 아이콘 사용(마크업·색상·접근성) / 새 아이콘 추가                                  | `component-icon` / `icon-asset-naming` |
| 커밋 메시지("커밋 내용" 요청)                                                     | `commit`                               |

## 컴포넌트 사용 원칙

- 모든 UI 요소는 새로 만들기 전에 `src/guide/pages/components`의 컴포넌트 가이드와 관련 `component-*` 스킬을 먼저 확인하고, 있으면 직접 마크업 대신 그 컴포넌트를 사용한다.
  - 버튼 `component-button`, 입력 필드 `component-input`, 텍스트영역 `component-textarea`, 체크박스 `component-checkbox`, 라디오 `component-radio`, 셀렉트 `component-select`, 폼 레이아웃 `component-form`, 날짜 선택 `component-picker`
  - 탭 `component-tabs`, 아코디언·단독 접기/펼치기 `component-accordion`, 모달 `component-modal`, 툴팁 `component-tooltip`, 스와이퍼·캐러셀·슬라이더 `component-swiper`
  - 표 `component-table`, 목록 `component-list`, 페이지네이션 `component-pagination`
  - 확인·경고 팝업("alert"으로 요청받아도) `component-dialog`, 하단 알림 `component-toast`(`component-snackbar`는 레거시이므로 새 화면에 쓰기 전에 그 스킬을 확인한다)
- 인터랙션이 있는 컴포넌트는 `initUI()`가 `.component-*` 클래스를 스캔해 자동 초기화하는 실제 JS 컴포넌트(`src/assets/scripts/ui/components`)와 연결되어 있으므로 클래스와 `data-props-*` 속성을 임의로 바꾸지 않는다.
- 같은 기능의 UI는 항상 같은 컴포넌트로 구현해 일관된 사용자 경험을 유지한다.
- 컴포넌트를 확장할 때는 기존 구조와 클래스를 유지하면서 필요한 부분만 수정한다.
- 설계 단계의 특별한 UX 요청이나 개발 제약이 없다면, 각 컴포넌트 가이드의 검증된 마크업을 그대로 복사해 사용하고, 전달받은 디자인과 일치하도록 구현한다.

## 검증

- HTML을 변경한 뒤에는 `npm run checkhtml`을 실행한다.
- SCSS를 변경한 뒤에는 `npm run checkstyle`과 `npm run prettier`를 실행한다.
- 컴포넌트 가이드 페이지(`src/guide/pages/components/*.html`)가 있는 요소는 그 예시와 마크업 구조가 일치하는지 비교해 확인한다.
- `npm run dev`(gulp) 첫 실행 직후에는 `etUI.components`가 비어 있어 모든 인터랙션 컴포넌트가 초기화 실패할 수 있다(`src/assets/scripts/ui/{components,hooks,utils,templates}/index.cjs` 생성과 JS 번들 합치기 사이의 레이스 컨디션). 콘솔에 `Cannot read properties of undefined (reading 'Input')` 같은 에러가 보이면 dev 서버를 껐다 다시 켠다.
- 실제 동작(클릭, 열림/닫힘 등) 확인이 필요하면 Playwright(MCP가 연결되어 있으면)로 dev 서버를 띄운 페이지를 열어 검증한다. 코드만 읽고 동작을 추측하지 않는다. Playwright가 만드는 `.playwright-mcp/`(스크린샷·스냅샷·콘솔 로그)는 검증에 다 쓰고 나면 삭제한다. git에는 잡히지 않지만(`.gitignore`) 로컬에 쌓아둘 필요가 없다.
- Figma 기반으로 구현한 화면은 코드 컨벤션 검수(`reviewer`)와 별개로, 완성된 화면을 Figma와 스크린샷으로 시각 비교해야 하면 `design-qa` 에이전트를 호출한다. `reviewer`는 lint·컨벤션만 보고 시각적 일치 여부는 보지 않으므로, `reviewer`가 "문제 없음"이라고 해도 그건 코드 컨벤션 기준일 뿐 Figma와의 시각적 일치를 보장하지 않는다.
- `design-qa`(또는 다른 검수)에서 "다른 원인 때문에 파생된 문제라 제외"라고 정리한 항목은 영구 제외가 아니라 그 원인이 해결될 때까지만 제외한 것이다. 원인이 되는 이슈(예: 공통 골격 `content-inner` 미비)를 고친 뒤에는, 그 이유로 제외했던 파생 항목들(예: 정렬 오차)을 반드시 다시 확인한다. 원인을 고쳤다고 파생 항목이 저절로 고쳐지는 게 아니므로, 제외 목록을 만든 사람이 직접 그 목록을 다시 열어봐야 한다.
