---
name: layout-page
description: 신규 정적 HTML 페이지 작성 시 sample.html 기준 구조, 작업 가능 범위, 페이지 최상위 클래스 규칙을 안내한다. 새 페이지를 만들기 전에 사용한다.
---

# 페이지 레이아웃 지침

이 프로젝트의 페이지는 React 컴포넌트가 아니라 `@@include` 파셜을 사용하는 정적 HTML 파일이다.

## 코딩리스트 갱신 (작업 시작 전)

- 페이지 코딩을 시작하기 전에 `src/guide/cl.csv`(코딩리스트)에 해당 페이지 행을 먼저 추가하거나 기존 행을 갱신한다.
- 컬럼 순서: `no,카테고리명,Depth 1,Depth 2,Depth 3,Depth 4,Depth 5,화면경로,담당자,진행상태,완료일,비고`.
- `src/guide/cl.html`이 보여주는 실제 코딩리스트는 구글시트(`codinglist.js`의 `mySpreadsheet`)가 원본이고 `cl.csv`는 로컬 폴백이다. 구글시트는 직접 수정할 수 없으니 `cl.csv`만 갱신하고, 구글시트 갱신 여부는 사용자에게 확인한다.
- `화면경로`는 `gulp/config/paths.js`의 `pathPages<도메인>` 별칭을 쓴다. 새 도메인 폴더(`src/pages/<도메인>/`)를 처음 쓰는 것이면 `gulp/config/paths.js`의 `projectReplacePaths`에 `pathPages<도메인>: getBuildPath(...)` 항목을 먼저 추가한다. 추가 위치는 파일의 "// 필요한 경로를 추가 합니다." 주석 바로 위다(코딩리스트 미리보기가 이 별칭을 `paths-config.json`으로 변환해서 링크를 연다).

## 기준 템플릿

새 페이지는 `src/pages/sample/sample.html`의 구조를 기준으로 작성한다(아래는 `head`를 뺀 `body` 부분).

```html
<body>
  <div id="wrap">
    @@include('pathPagesInclude/_header.html', { "title": "test_title01", "title02": "test_title02" })
    <div class="" id="container">
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
- 시맨틱 태그·헤딩 계층·`href`·주석·void 요소 규칙은 `markup-html` 스킬을 따른다.

## 페이지 최상위 클래스

- 페이지마다 목적을 드러내는 고유한 kebab-case 최상위 클래스를 하나 둔다(예: `notice-wrap`, `signup-page`).
- 기존 페이지의 최상위 클래스와 같은 이름을 재사용하지 않는다.

## Figma 기반 구현

- 새 페이지는 사용자가 전달한 Figma 링크의 대상 node를 먼저 확인한 뒤 구현한다.
- 링크에 node-id가 없거나 화면 범위가 불명확하면, 임의로 다른 화면을 기준 삼지 않고 확인을 요청한다.
- Figma MCP가 연결되어 있으면 `figma-to-page` 스킬을 따른다. `get_design_context`의 결과(React·
  Tailwind 참고 코드)를 그대로 쓰지 않고 이 프로젝트의 실제 컴포넌트·토큰으로 옮겨 적는다.
- Figma의 여백, 정렬, 텍스트 크기, 색상, 상태를 확인하되 기존 컴포넌트 가이드(`src/guide/pages/components`)에 맞는 패턴이 있으면 새 마크업보다 그 패턴을 우선 사용한다.
- 디자인에 없는 기능이나 상태를 추측하여 추가하지 않는다.
- 기존 코드를 고칠 때는 변환 전 코드의 스타일 구조가 깨지지 않게 수정한다.

## 페이지 SCSS 범위

- 해당 페이지 SCSS의 모든 선택자는 고유 최상위 클래스 내부에 작성한다. 자세한 규칙은 `style-scss` 스킬을 따른다.
- **`content-inner`, `page-tit`, `page-tit-group`에는 페이지 골격용 전역 스타일이 없다**(확인 시점 기준 `_base.scss` 등 전역 파일에 없음 — 폭 제한도, 가운데 정렬도, 타이포그래피도 없는 빈 골격이다. `_hgroup.scss`도 빈 파일이다). 단, `components/_tab.scss`에는 탭 안 `.component-tab .tab-content .content-inner`에만 적용되는 스타일(flex 가운데 정렬, padding 40)이 있으니 탭 안에 `content-inner`를 넣으면 이 스타일을 받는다. 이 템플릿을 그대로 가져다 쓰면 브라우저 기본값(왼쪽 정렬, 폭 제한 없음)으로 보인다. Figma에 폭 제한·정렬이 있으면 그 페이지의 최상위 wrap 클래스 안에서 `content-inner`/`page-tit`/`page-tit-group`을 직접 재정의해야 한다(`style-scss` 스킬의 "공통 골격 클래스도 페이지별로 재정의할 수 있다" 참고). 전역 파일이 이미 채워져 있으려니 가정하지 않는다.
