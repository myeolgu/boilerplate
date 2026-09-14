---
name: layout-page
description: 신규 정적 HTML 페이지 작성 시 sample.html 기준 구조, 작업 가능 범위, 페이지 최상위 클래스 규칙을 안내한다. 새 페이지를 만들기 전에 사용한다.
---

# 페이지 레이아웃 지침

이 프로젝트의 페이지는 React 컴포넌트가 아니라 `@@include` 파셜을 사용하는 정적 HTML 파일이다.

## 코딩리스트 갱신 (작업 시작 전)

- 페이지 코딩을 시작하기 전에 `src/guide/cl.csv`(코딩리스트)에 해당 페이지 행을 먼저 추가하거나 기존 행의 진행상태를 갱신한다.
- 컬럼 순서: `no,카테고리명,Depth 1,Depth 2,Depth 3,Depth 4,Depth 5,화면경로,담당자,진행상태,완료일,비고`.
- `src/guide/cl.html`이 보여주는 실제 코딩리스트는 구글시트(`codinglist.js`의 `mySpreadsheet`)가 원본이고 `cl.csv`는 로컬 폴백이다. 구글시트는 직접 수정할 수 없으니 `cl.csv`만 갱신하고, 구글시트 갱신 여부는 사용자에게 확인한다.
- `화면경로`는 `gulp/config/paths.js`의 `pathPages<도메인>` 별칭을 쓴다. 새 도메인 폴더를 처음 쓰는 것이면 `projectReplacePaths`에 `pathPages<도메인>` 항목을 먼저 추가한다(코딩리스트 미리보기가 이 별칭을 `paths-config.json`으로 변환해서 링크를 연다).

## 기준 템플릿

새 페이지는 `src/pages/sample/sample.html`의 구조를 기준으로 작성한다.

```html
<body>
  <div id="wrap">
    @@include('pathPagesInclude/_header.html', { "title": "test_title01" })
    <div id="container">
      <div id="content" role="main">
        <div class="해당 페이지-wrap">
          <div class="content-inner">
            <hgroup class="page-tit-group">
              <h2 class="page-tit">해당 페이지 제목</h2>
            </hgroup>
            <!-- ai가 코딩해줄 부분 -->
          </div>
        </div>
      </div>
    </div>
    @@include('pathPagesInclude/_footer.html')
  </div>
</body>
```

## 작업 가능 범위

- `head` 태그는 임의로 수정하지 않는다.
- `<div id="content" role="main">` 안에서만 마크업하고, 그 안의 `<!-- ai가 코딩해줄 부분 -->` 주석 바로 아래에 코딩한다.
- 헤더·푸터는 `@@include('pathPagesInclude/_header.html', ...)` / `@@include('pathPagesInclude/_footer.html')`로 포함하고 직접 마크업하지 않는다.
- `#content` 안의 페이지 전용 클래스 자식에는 항상 `<div class="content-inner">`를 사용한다.
- `br`, `img`, `input`, `hr` 같은 void 요소는 자체 닫힘으로 작성한다(`<br />`). 닫지 않은 형태(`<br>`)는 `npm run checkhtml`에서 오류로 처리된다.

## 페이지 최상위 클래스

- 페이지마다 고유한 최상위 클래스를 하나 둔다(예: `notice-wrap`, `signup-page`).
- 기존 페이지의 최상위 클래스와 같은 이름을 재사용하지 않는다.

## Figma 기반 구현

- 새 페이지는 사용자가 전달한 Figma 링크의 대상 node를 먼저 확인한 뒤 구현한다.
- 링크에 node-id가 없거나 화면 범위가 불명확하면, 임의로 다른 화면을 기준 삼지 않고 확인을 요청한다.
- Figma MCP가 연결되어 있으면 `figma-to-page` 스킬을 따른다. `get_design_context`의 결과(React·
  Tailwind 참고 코드)를 그대로 쓰지 않고 이 프로젝트의 실제 컴포넌트·토큰으로 옮겨 적는다.
- Figma의 여백, 정렬, 텍스트 크기, 색상, 상태를 확인하되 기존 컴포넌트 가이드(`src/guide/pages/components`)에 맞는 패턴이 있으면 새 마크업보다 그 패턴을 우선 사용한다.
- 디자인에 없는 기능이나 상태를 추측하여 추가하지 않는다.

## 페이지 SCSS 범위

- 해당 페이지 SCSS의 모든 선택자는 고유 최상위 클래스 내부에 작성한다. 자세한 규칙은 `style-scss` 스킬을 따른다.
