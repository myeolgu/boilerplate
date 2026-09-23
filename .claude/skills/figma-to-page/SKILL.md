---
name: figma-to-page
description: 연결된 Figma MCP(get_design_context 등)로 받은 결과를 이 프로젝트의 실제 정적 HTML·SCSS·컴포넌트 체계로 바꾸는 방법을 안내한다. Figma 링크/node로 페이지나 화면을 구현하기 전에 사용한다.
---

# Figma MCP → 이 프로젝트 코드

Figma MCP가 연결되어 있으면 사용자가 링크만 줘도 디자인 구조를 직접 읽어올 수 있다. 이 스킬은
그 결과를 이 프로젝트(정적 HTML·SCSS, React 아님)의 실제 컴포넌트·토큰 체계로 옮기는 방법을
다룬다. **Figma MCP 자체의 사용법(도구 호출 규칙)은 이 스킬이 아니라 Figma MCP가 제공하는
`figma-design-to-code` 스킬을 따른다.** `get_design_context` 호출 전에 그 스킬을 반드시
불러온다(도구 자체에도 그렇게 안내되어 있다).

## 링크 형식

사용자는 보통 이런 형태로 링크를 준다.

```
https://www.figma.com/design/{fileKey}/{파일명}?node-id={id}&t={추적용해시}
```

예: `https://www.figma.com/design/pN8Sh3iBOzYOAgsAVCC9yF/롯데-호텔-시니어-레지던스?node-id=3905-1383&t=...`
→ `fileKey = pN8Sh3iBOzYOAgsAVCC9yF`, `nodeId = 3905:1383`(하이픈을 콜론으로 바꾼다). `&t=...`는
추적용 값이라 무시한다. 파일명 세그먼트(한글 포함)는 무시하고 `fileKey`만 쓴다.

## 컨텍스트 수집 (코드 작성 전, CLAUDE.md 작업 순서 1단계)

아래를 끝내기 전에는 코드를 한 줄도 쓰지 않는다. 결과는 "Figma 수치 요약"으로 정리해 구현 에이전트에 넘긴다.

1. **대상 node 확인**: 사용자가 준 Figma 링크에 `node-id`가 있는지 확인한다. 없으면 임의로
   다른 화면을 기준 삼지 않고 사용자에게 확인한다(`layout-page`와 동일).
2. **구조 파악**: `get_metadata`로 node 트리와 x/y/width/height를 받는다. 최상위 프레임에 무엇이
   들어 있는지(본문만인지, 헤더·LNB까지인지) 여기서 확정한다. `get_screenshot`은 기본값이 주변
   캔버스까지 찍으므로 범위 확인용으로는 `contentsOnly: true`로 대상 node만 찍는다.
3. **Figma 필수 스킬 로드**: `get_design_context`를 부르기 전에 Figma MCP의 `figma-design-to-code`
   스킬을 반드시 읽는다. 이 환경에서는 Skill 도구 목록에 없으므로
   `ReadMcpResourceTool`(server `claude.ai Figma`, uri `skill://figma/figma-design-to-code/SKILL.md`)로
   읽는다. `get_design_context` 호출 시 `skillNames`에 `resource:figma-design-to-code,figma-to-page`를 넣는다.
4. **`get_design_context` 호출**: 구조·값 참고는 이 도구로 받고, 다른 도구로 대체하지 않는다.
   응답이 잘리거나(토큰 한도 초과 `OUTPUT TRUNCATED`) sparse로 표시되면 그 응답으로 구현하지 않는다.
   2단계 트리에서 자식 node ID를 골라 **자식 단위로 나눠 병렬 호출**해 빠진 부분까지 전부 받는다.
5. **토큰 수집**: `get_variable_defs`로 Figma 변수(색상·간격 등 이름과 값)를 받고, `get_design_context`
   응답 끝의 스타일 목록과 합쳐 색상·폰트 크기·아이콘 목록을 만든다. 이걸 이 프로젝트의
   `_variables.scss`·`_mixins.scss`(f12~f56)·`_svg.scss`·`$ico-sizes`와 대조해 "이미 있음 / 새로 필요"로
   나눈다. "새로 필요" 목록이 CLAUDE.md 1단계의 전역 변경 승인 목록이 된다.
6. **에셋 SVG 일괄 다운로드 (코드 작성 전에 반드시)**: `get_design_context` 응답 맨 위의
   `const imgXxx = "https://www.figma.com/api/mcp/asset/….svg"` URL을 **한 번에 모아 `curl`로 전부
   받는다**. 특히 체크박스·라디오·토글·정렬 아이콘·상태 아이콘처럼 응답에 `<img>`로만 나오는 요소는
   코드 문자열에 색·모서리·선 굵기가 안 나오고 **에셋 안에만 있다**(예: 체크박스 `rect rx=8 fill=#33225E`,
   미선택 `stroke=#E4E7ED stroke-width=1.2`, 토글 `44×24 rx=12 fill=#C4CACF`). 받아서 hex·radius·
   stroke를 그대로 읽어 수치표에 넣는다.
   - **스크린샷 픽셀을 눈으로 재서 색을 추정하지 않는다.** 에셋 SVG가 원본이다.
   - Figma MCP는 호출 한도(Starter plan)가 있어 작업 중간에 막힐 수 있다. 한도에 걸리면 재조회가
     불가능하므로 **필요한 에셋은 초반에 한꺼번에 받아 둔다.** 받은 값은 대화에 수치표로 남겨,
     이후 검수 에이전트가 Figma를 다시 부르지 않고도 대조할 수 있게 한다.
7. **Code Connect 확인**: `get_code_connect_map`으로 연결된 컴포넌트가 있는지 본다(아래 매핑 규칙 참고).
8. **이 프로젝트 쪽 확인**: 화면의 UI 요소(버튼·입력·셀렉트·표·페이지네이션 등)마다
   `src/guide/pages/components`와 `component-*` 스킬에 대응 컴포넌트가 있는지 확인한다. 가이드에
   없는 요소(카드 등)는 새로 만든다고 목록에 표시한다.

## 구현 에이전트에 넘길 자료 (수치 손실 방지)

구현 에이전트는 이전 대화 맥락이 없으므로, 수집한 내용을 **산문으로 요약하지 말고 원본 수치 그대로**
넘긴다. 아래 세 가지는 실제로 요약 과정에서 값이 사라져 재작업을 유발한 항목들이다.

- **`get_metadata`의 x/y/width/height를 노드별 표로 그대로 붙여넣는다.** 폭만 적고 좌표를 빼면
  **요소 사이 간격이 통째로 증발한다.** 예: 표 헤더 셀이 `x=20 w=80`, `x=112 w=120`, `x=244 w=452`면
  셀 사이에 12px 간격이 있다는 뜻인데, "80 / 120 / 452"로만 요약하면 이 12px이 사라져 뒤쪽 열이
  수십 px씩 밀린다. 라벨 `w=100` + 필드 `x=112`(=12 간격)도 같은 방식으로 사라지기 쉽다.
- **좌표로 구할 수 있는 값을 "가정"으로 넘기지 않는다.** 두 프레임 사이 간격은 항상
  `뒤 프레임 y − (앞 프레임 y + height)`로 계산된다. 계산해 보지 않고 "Figma에 수치가 없어 가정"이라고
  적으면 틀린 값이 그대로 구현된다.
- **한 인스턴스의 값을 전체로 일반화하지 않는다.** 같은 컴포넌트라도 인스턴스마다 다른 에셋을
  쓰는 경우가 많다(예: 댓글 아이콘이 행마다 `#7B53EA` / `#81899C` / `#888888`). 상태·행별로 에셋
  URL이 다르면 **각각 받아서 따로 적는다.**
- **폼 컨트롤(체크박스·라디오·스위치·페이지네이션·표 헤더)의 사양을 빠뜨리지 않는다.** 이 프로젝트의
  해당 컴포넌트 기본값은 전부 플레이스홀더 색이라, 수치표에 없으면 구현 에이전트가 그대로 둔다
  (`style-scss` 스킬의 "컴포넌트 기본값은 플레이스홀더다" 참고).

## 구현 시 원칙

- **반환된 코드는 그대로 쓰지 않는다.** `get_design_context`가 주는 코드는 React + Tailwind
  참고 코드다. 이 프로젝트는 정적 HTML + SCSS이므로 절대 그대로 붙여넣지 않고, 구조와 의도만
  참고해 아래 매핑 규칙대로 다시 작성한다.
- **기존 컴포넌트부터 쓴다.** Figma의 버튼/입력/모달/탭 등은 새 마크업이 아니라 이미 있는 `.btn`,
  `.component-input`, `.component-modal`, `.component-tab` 등으로 옮긴다(CLAUDE.md "컴포넌트 사용 원칙").
- **`figma-design-to-code`와 이 프로젝트 규칙이 충돌할 때**: 그 스킬은 SVG 에셋을 "경로 추출·인라인
  금지, 다운로드해서 그대로 사용"하라고 하지만, 이 프로젝트는 아이콘을 `_svg.scss`의 인라인 data-URI
  믹스인으로 그리는 것이 검증된 관행이다(`component-icon`/`icon-asset-naming`). 아이콘은 이 프로젝트
  규칙을 따르고, 사진·일러스트 같은 이미지 에셋만 그 스킬대로 다운로드해 `src/assets/images/`에 둔다.
  이 선택은 보고할 때 근거와 함께 밝힌다.

## 매핑 규칙 (Figma 결과 → 이 프로젝트)

- **Code Connect 매핑**: `get_code_connect_map`으로 해당 node에 이미 코드 연결이 있는지 먼저
  확인한다. 이 프로젝트는 아직 Code Connect를 설정하지 않아 대부분 비어 있을 것이다. 비어 있는
  것 자체는 정상이며, 없다고 새로 만들 필요는 없다(사용자가 별도로 요청하지 않는 한).
- **컴포넌트 문서/디자인 주석**: Figma 쪽 힌트가 있으면 참고하되, 최종 마크업 구조는 이 프로젝트
  실제 가이드(`src/guide/pages/components/*.html`)를 기준으로 한다.
- **디자인 토큰(색상)**: React/Tailwind 참고 코드의 CSS 변수나 hex 값을 그대로 쓰지 않고, `style-scss`
  스킬의 "색상·폰트" 규칙대로 `_variables.scss` 변수로 옮긴다. 정확히 일치하는 변수가 없어 새 변수가
  필요하면(폰트 믹스인·아이콘 믹스인도 마찬가지) 전역 파일 수정이므로 사용자 확인 후에만 추가한다.
- **아이콘**: Figma가 내보낸 아이콘 에셋을 그대로 이미지 파일로 쓰지 않는다. 먼저
  `component-icon`/`icon-asset-naming` 스킬대로 같은 glyph의 `.ico-*` 클래스나 `_svg.scss`
  믹스인이 이미 있는지 확인하고, 있으면 재사용한다. 정말 새 아이콘이면 그 스킬의 절차(새 믹스인
  추가)를 따르고, 사진처럼 인라인 SVG로 만들기 어려운 에셋만 예외로 다룬다.
- **간격·타이포그래피**: Figma 수치를 그대로 쓰되, 단위·폰트 믹스인·예외는 `style-scss` 스킬의
  "Mixin", "여백·크기", "폰트 크기·두께" 규칙을 따른다.
- **레이아웃 구조**: 페이지 뼈대는 Figma가 아니라 `layout-page` 스킬(`sample.html` 기준 구조,
  `#content[role="main"]`, `.content-inner`)을 따른다. Figma는 그 안의 콘텐츠 디자인만 반영한다.
- **GNB/헤더·푸터 인스턴스**: `get_metadata`의 최상위 프레임에 `##top_GNB`, `footer`처럼 공용
  컴포넌트로 보이는 인스턴스가 함께 잡히는 경우가 있다. 이런 인스턴스는 새로 마크업하지 않고
  기존 `@@include('pathPagesInclude/_header.html', ...)`/`_footer.html`로 대응한다. 실제로
  구현할 대상은 그 사이의 본문 프레임(제목·콘텐츠 섹션)뿐이다. `##`으로 시작하는 프레임명은
  이 파일에서 공용/장식 요소를 표시하는 관례로 보이므로, 무엇을 구현 대상으로 볼지 애매하면
  추측하지 말고 확인한다.

## 이미지·아이콘 자산 처리

- 에셋 다운로드 URL은 약 7일 후 만료된다. 실제로 커밋할 이미지는 받은 바이트 그대로
  `src/assets/images/`에 저장하고, 다시 불러오지 않아도 되게 한다.
- 아이콘은 위 매핑 규칙대로 기존 글리프 재사용을 먼저 시도한다.

## 완료 기준

- 구현 후 `CLAUDE.md` "검증"의 절차를 그대로 따른다.
- Figma 디자인에 없는 기능이나 상태는 추측으로 추가하지 않는다.
