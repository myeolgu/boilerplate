---
name: component-table
description: 테이블(component-table) 마크업 구조, caption/scope/rowspan 규칙을 안내한다. 표를 마크업하기 전에 사용한다.
---

# Table

테이블은 React 컴포넌트가 아니라 `.component-table`로 감싼 시맨틱 `<table>` 마크업이다. AG Grid 같은 그리드 라이브러리는 사용하지 않는다.

## 기본 테이블

```html
<div class="component-table">
  <table>
    <caption>표제목 : 제목1, 제목2, 제목3, 제목4</caption>
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col style="width: 25%;">
    <col>
    <thead>
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
        <th scope="col">장소</th>
        <th scope="col">가격</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2025.04.01</td>
        <td>골프대회</td>
        <td>서울CC</td>
        <td>100,000원</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 복합형 테이블(병합·그룹 헤더)

```html
<div class="component-table">
  <table>
    <caption>
      2024 주간 요율 요약
      <span>2024년 4월 15일부터 4월 20일까지의 주간 다양한 금융 도구에 대한 주간 요율</span>
    </caption>
    <col>
    <col style="width: 17%;"><col style="width: 17%;"><col style="width: 17%;">
    <col style="width: 17%;"><col style="width: 17%;">
    <thead>
      <tr>
        <th rowspan="2" scope="col">구분</th>
        <th colspan="3" scope="colgroup">2024</th>
        <th colspan="2" scope="colgroup">일주일 마무리</th>
      </tr>
      <tr>
        <th scope="col">4월 15일</th>
        <th scope="col">4월 16일</th>
        <th scope="col">4월 17일</th>
        <th scope="col">4월 19일</th>
        <th scope="col">4월 20일</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">연방 자금</th>
        <td>1.84</td><td>1.85</td><td>1.85</td><td>1.85</td><td>1.85</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 고정 헤더 (스크롤 시 헤더 고정)

```html
<div class="component-table table-fixed">
  <table>
    <caption>표제목 : 제목1, 제목2, 제목3, 제목4</caption>
    <col style="width: 25%;">
    <col>
    <thead class="thead-fixed">
      <tr>
        <th scope="col">날짜</th>
        <th scope="col">이벤트</th>
      </tr>
    </thead>
    <tbody>...</tbody>
  </table>
</div>
```

- `.table-fixed`: 본문 스크롤 시 `<thead class="thead-fixed">`가 상단에 고정된다.

## 가로 스크롤 테이블

열이 많아 화면을 넘길 때는 `.table-scroll`을 추가한다. 좌우 스크롤 가능 여부를 그림자로 알려준다.

```html
<div class="component-table table-scroll">
  <table>...</table>
</div>
```

## 사용 규칙

- `caption`으로 테이블의 제목과 내용을 요약한다.
- 행·열 병합은 `rowspan`, `colspan`으로 처리한다.
- 열 너비 지정이 필요하면 `col` 태그에 `style="width: %"`를 사용한다.
- `th`에는 적절한 `scope`(`col`, `row`, `colgroup`, `rowgroup`)를 지정한다.
- 셀 정렬이 기본(가운데)과 다르면 `th`/`td`에 `.align-left` 또는 `.align-right`를 추가한다.
- 테이블 안의 링크 텍스트는 `.txt-link` 클래스로 통일한다.
- 스코어 표처럼 값에 따라 색이 달라지면 `.par`, `.birdie`, `.bogey`, `.eagle`처럼 의미를 드러내는 클래스를 값에 부여해 색상 코딩한다.

## 중첩 최소화

셀 안에 추가 마크업이 필요하면(예: `td` 안의 이름 강조) 태그 중첩 선택자 대신 클래스를 부여해 선택한다.

```scss
/* 사용하지 않음 */
.component-table thead tr th { ... }

/* 사용 */
.component-table {
  th, td { ... }
  td .name { ... }
  thead { ... }
  tbody tr:nth-child(even) { ... }
}
```
