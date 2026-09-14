---
name: layout-page
description: 신규 정적 HTML 페이지 작성 시 sample.html 기준 구조, 작업 가능 범위, 페이지 최상위 클래스 규칙을 안내한다. 새 페이지를 만들기 전에 사용한다.
---

# 페이지 레이아웃 지침

이 프로젝트의 페이지는 React 컴포넌트가 아니라 `@@include` 파셜을 사용하는 정적 HTML 파일이다.

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
