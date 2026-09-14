---
name: component-pagination
description: 페이지네이션(component-pagination) 마크업 구조와 미니 페이지네이션을 안내한다. 페이지 이동 UI를 마크업하기 전에 사용한다.
---

# Pagination

페이지네이션은 React 컴포넌트가 아니라 `.component-pagination` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 페이지네이션

```html
<nav class="component-pagination" aria-label="페이지네이션">
  <a href="#" class="pagination-item first"><span class="hide-txt">첫 페이지로 이동</span></a>
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <span class="pagination-item" aria-current="page">1</span>
  <a href="#" class="pagination-item">2</a>
  <a href="#" class="pagination-item">3</a>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
  <a href="#" class="pagination-item last"><span class="hide-txt">마지막 페이지로 이동</span></a>
</nav>
```

## 미니 페이지네이션

이전/다음과 현재·전체 페이지만 보여주는 간소화된 형태다.

```html
<nav class="component-pagination-mini" aria-label="페이지네이션">
  <a href="#" class="pagination-item prev"><span class="hide-txt">이전 페이지로 이동</span></a>
  <span class="pagination-item-group">
    <span class="pagination-item" aria-current="page">1</span>
    <span class="pagination-item" aria-hidden="true">/</span>
    <span class="pagination-item">100</span>
  </span>
  <a href="#" class="pagination-item next"><span class="hide-txt">다음 페이지로 이동</span></a>
</nav>
```

## 클래스 구조

- 기본: `.component-pagination` / 미니: `.component-pagination-mini`
- `.pagination-item`(이동 버튼은 `.first`, `.prev`, `.next`, `.last` 추가) / `.pagination-item-group`

## 접근성

- 현재 페이지에는 `aria-current="page"`를 지정해 스크린 리더가 인식하게 한다.
- 이동 버튼(첫/이전/다음/마지막)은 `<span class="hide-txt">설명</span>`으로 목적을 알린다.
- 포커스 상태는 `:focus-visible { outline: -webkit-focus-ring-color auto 1px; }`로 표시한다.
