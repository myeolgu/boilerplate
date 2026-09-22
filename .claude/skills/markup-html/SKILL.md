---
name: markup-html
description: HTML 마크업 공통 규칙(시맨틱 태그, h1~h6 헤딩 계층, a href 값, HTML 주석·수정 표시, void 요소 자체 닫힘)을 안내한다. 페이지나 컴포넌트의 HTML을 작성하거나 수정하기 전에 사용한다.
---

# HTML 마크업 공통 규칙

페이지 뼈대(`sample.html` 구조, 작업 가능 범위)는 `layout-page`, 컴포넌트별 마크업은 각 `component-*`,
아이콘 마크업·접근성은 `component-icon` 스킬을 따른다. 이 스킬은 그 밖의 모든 HTML에 공통으로
적용되는 규칙이다.

## 시맨틱 태그

- 의미에 맞는 시맨틱 태그(`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`/`figcaption`, `time`)를 사용한다. 의미 없이 `div`로만 구조를 만들지 않는다.

## 헤딩 계층

- `h1`~`h6`은 계층적으로 사용하고 한 페이지에 `h1`은 하나만 둔다. 스타일링 목적으로 헤딩 태그를 쓰지 않는다.
- `h1`은 공통 헤더(`_header.html`)의 로고가 이미 쓰고 있다. 따라서 `#content` 안 페이지 콘텐츠는 `h1`을 다시 쓰지 않고 `h2`부터 시작한다(`sample.html`의 `page-tit`이 `h2`인 것도 이 때문). 하위 헤딩도 이 기준으로 한 단계씩 내려서 계층을 맞춘다(`page-tit` h2 → 섹션 제목 h3 → 그 아래 h4 …).
- `src/pages/main/main.html`은 콘텐츠 안에 `h1`을 두고 `<main id="content">`를 쓰는 예전 구조라 이 규칙과 `sample.html` 구조의 참고 대상이 아니다.

## 링크

- `<a href="">`의 `href`는 기획서에 URL이 있으면 그 값을, 없으면 빈 값으로 둔다. `href="#"`, `href="javascript:void(0)"`는 사용하지 않는다.

## 주석

- HTML 주석은 `<!-- 주석 -->`, 수정 표시는 `<!-- 20240228 수정 -->` ~ `<!-- // 20240228 수정 -->` 형태로 시작·끝을 표시한다.

## void 요소

- `br`, `img`, `input`, `hr` 같은 void 요소는 자체 닫힘으로 작성한다(`<br />`, `<input />`). `npm run checkhtml`(W3C Nu 검증기)은 닫지 않은 형태(`<br>`)를 잡지 않으므로 직접 확인한다.

## 폼 접근성

- 보이는 폼 label은 고유하고 안정적인 `id`/`for`로 연결한다.
- 하나의 라벨이 여러 컨트롤을 설명하면 `fieldset`/`legend`를 사용한다.
- `aria-labelledby`는 `label`/`legend`로 설명할 수 없는 경우에만 사용한다.
