---
name: component-accordion
description: 아코디언(component-accordion) 마크업 구조, 다중/단일 활성화 패턴, 단독 접기/펼치기 패널을 안내한다. 접기/펼치기 UI를 마크업하기 전에 사용한다.
---

# Accordion

아코디언은 React 컴포넌트가 아니라 `.component-accordion` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다. 접기/펼치기 UI는 이 컴포넌트 하나로 만든다(별도 공개 `component-collapse` 컴포넌트는 없다).

`initUI()`가 `.component-accordion`을 자동 초기화한다(`Accordion.js`). `Accordion.js`는 각 `.accordion-item`마다 내부 부품인 `Collapse.js`를 붙여 열고 닫기·애니메이션·ARIA를 처리한다. `.collapse-tit`/`.collapse-content`는 이 내부 부품이 찾는 클래스명이라 바꾸지 않는다. `.accordion-item`에 `component-collapse` 클래스를 함께 붙이지 않는다.

## 여러 아이템 동시 활성화

```html
<div class="component-accordion">
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">
      <div>HTML stands for Hyper Text Markup Language.</div>
    </div>
  </div>
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets.</div>
  </div>
</div>
```

- 아이템은 기본적으로 닫힌 상태다. 열린 상태로 시작할 아이템에만 `data-state="open"`을 둔다.
- `data-init`은 JS가 초기화 후 스스로 붙이는 속성이라 마크업에 쓰지 않는다. 특히
  `.component-accordion` 루트에 `data-init="false"`를 쓰면 `initUI()`가 값이 있다는 이유로 초기화를
  건너뛴다(`init.js`).

## 단일 아이템만 활성화

```html
<div class="component-accordion" data-props-type="single">
  <div class="accordion-item" data-state="open">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">HTML stands for Hyper Text Markup Language.</div>
  </div>
  <div class="accordion-item">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets.</div>
  </div>
</div>
```

- `data-props-type="single"`: 한 번에 하나의 아이템만 활성화
- 처음에 열어 둘 아이템은 그 아이템의 `data-state="open"`으로 지정한다. 가이드 예시에는
  `data-props-index="0"`이 있지만 실제 코드는 `props.index`를 읽지 않아 효과가 없으므로 쓰지 않는다.
- `data-props-type`은 `multiple`(기본) | `single`을 쓴다(`Accordion.js`). 코드에 `separate` 분기가
  있지만 동작은 `multiple`과 같다. 가이드 표에는 기본값이 `single`로 적혀 있지만 실제 코드 기본값은
  `multiple`이다.

## 단독 접기/펼치기 패널

패널 하나만 접고 펼치면 되는 경우도 아이템이 1개인 아코디언으로 만든다. 서로 독립적으로 여닫는 패널 여러 개는 기본(multiple) 아코디언에 아이템을 나열한다.

```html
<div class="component-accordion">
  <div class="accordion-item">
    <button type="button" class="collapse-tit">상세 조건 보기</button>
    <div class="collapse-content">패널 내용</div>
  </div>
</div>
```

## 접근성 (JS가 자동 처리)

`Collapse.js`가 초기화·열림·닫힘 시 처리하므로 마크업에서 직접 추가하지 않는다.

- `.collapse-tit`에 `id`, 열고 닫을 때 `aria-expanded`
- `.collapse-content`에 `role="region"`, `aria-hidden`, `aria-labelledby`(제목 id)

## 클래스·속성 구조

- 기본 클래스: `.component-accordion`
- `.accordion-item` > `.collapse-tit` + `.collapse-content`
- `.accordion-item`의 `data-state`: `"open"` | `"close"`(JS가 열고 닫을 때 갱신한다)

## 사용 가이드

설계 단계의 특별한 UX 요청이나 개발 제약이 없다면 위 검증된 마크업을 그대로 복사해 사용한다.

## SCSS

```scss
.component-accordion {
  .accordion-item {
    &[data-state='open'] { }
  }

  .collapse-tit { }
  .collapse-content { }
}
```
