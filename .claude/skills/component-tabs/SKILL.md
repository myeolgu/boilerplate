---
name: component-tabs
description: 탭(component-tab) 마크업 구조와 중첩 탭 패턴을 안내한다. 탭 UI를 마크업하기 전에 사용한다.
---

# Tab

탭은 React 컴포넌트가 아니라 `.component-tab` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 구조

```html
<div class="component-tab" data-active="tab2">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1" role="tab" aria-selected="true" aria-controls="tab-panel-1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2" role="tab" aria-selected="false" aria-controls="tab-panel-2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3" role="tab" aria-selected="false" aria-controls="tab-panel-3">TAB 3</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1" role="tabpanel" aria-labelledby="tab-1">
      <div class="content-inner">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2" role="tabpanel" aria-labelledby="tab-2" hidden>
      <div class="content-inner">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3" role="tabpanel" aria-labelledby="tab-3" hidden>
      <div class="content-inner">Tab content 3</div>
    </div>
  </div>
</div>
```

- 각 탭·콘텐츠에 동일한 `data-tab-value`를 부여해 짝짓는다.
- 기본 활성 탭이 첫 번째가 아니면 `.component-tab`에 `data-active`를 지정한다. 생략하면 첫 번째 탭이 기본값이다.
- 설계 단계의 특별한 UX 요청이나 제약이 없다면 이 검증된 마크업을 그대로 복사해 사용한다.

## 클래스·속성 구조

- `.component-tab` > `.tab-head`(`.tab-label`) + `.tab-body`(`.tab-content` > `.content-inner`)
- 활성 라벨: `.tab-label.is-active`

## 중첩 탭

탭 콘텐츠 안에 다시 `.component-tab`을 두면 하위 탭을 만들 수 있다. 하위 탭의 루트에는 `component-tab tab-content` 두 클래스를 함께 준다.

```html
<div class="component-tab" data-active="tab1">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">Tab1</button>
  </div>
  <div class="tab-body">
    <div class="component-tab tab-content" data-tab-value="tab1" data-active="tab1-1">
      <div class="tab-head">
        <button type="button" class="tab-label" data-tab-value="tab1-1">Tab1-1</button>
      </div>
      <div class="tab-body">
        <div class="tab-content" data-tab-value="tab1-1">
          <div class="content-inner">Tab content 1-1</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## SCSS

```scss
.component-tab {
  .tab-head { }
  .tab-body { }

  .tab-label {
    &.is-active { }
  }

  .tab-content {
    .content-inner { }
  }
}
```
