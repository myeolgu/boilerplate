---
name: component-accordion
description: 아코디언(component-accordion) 마크업 구조, 다중/단일 활성화 패턴을 안내한다. 아코디언 UI를 마크업하기 전에 사용한다.
---

# Accordion

아코디언은 React 컴포넌트가 아니라 `.component-accordion` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 여러 아이템 동시 활성화

```html
<div class="component-accordion">
  <div class="accordion-item component-collapse" data-state="close" data-init="false">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">
      <div>HTML stands for Hyper Text Markup Language.</div>
    </div>
  </div>
  <div class="accordion-item component-collapse" data-state="close" data-init="false">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets.</div>
  </div>
</div>
```

- `data-state="close"`: 초기 닫힌 상태
- `data-init="false"`: 초기화 여부

## 단일 아이템만 활성화

```html
<div class="component-accordion" data-props-type="single" data-props-index="0">
  <div class="accordion-item" data-init="true" data-state="open">
    <button type="button" class="collapse-tit">Q. What is HTML?</button>
    <div class="collapse-content">HTML stands for Hyper Text Markup Language.</div>
  </div>
  <div class="accordion-item" data-init="false">
    <button type="button" class="collapse-tit">Q. What is CSS?</button>
    <div class="collapse-content">CSS stands for Cascading Style Sheets.</div>
  </div>
</div>
```

- `data-props-type="single"`: 한 번에 하나의 아이템만 활성화
- `data-props-index="0"`: 초기 활성화 아이템의 인덱스(0부터 시작)

## 클래스·속성 구조

- 기본 클래스: `.component-accordion`
- `.accordion-item`(`.component-collapse`와 함께 쓰기도 함), `.collapse-tit`, `.collapse-content`
- `data-state`: `"open"` | `"close"`

## 사용 가이드

설계 단계의 특별한 UX 요청이나 개발 제약이 없다면 위 검증된 마크업을 그대로 복사해 사용한다.

## SCSS

```scss
.component-accordion {
  .accordion-item {
    &[data-state="open"] { }
  }

  .collapse-tit { }
  .collapse-content { }
}
```
