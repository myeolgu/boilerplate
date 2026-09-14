---
name: component-tabs
description: 탭(component-tab) 마크업 구조와 중첩 탭 패턴을 안내한다. 탭 UI를 마크업하기 전에 사용한다.
---

# Tab

탭은 React 컴포넌트가 아니라 `.component-tab` 클래스를 `initUI()`가 자동 초기화하는 JS
컴포넌트다(`Tab.js`). `role`, `aria-selected`, `aria-controls`, `aria-labelledby`는 JS가 초기화
시 자동으로 붙이므로 마크업에 직접 쓰지 않는다.

## 기본 구조

```html
<div class="component-tab" data-active="tab2">
  <div class="tab-head">
    <button type="button" class="tab-label" data-tab-value="tab1">TAB 1</button>
    <button type="button" class="tab-label" data-tab-value="tab2">TAB 2</button>
    <button type="button" class="tab-label" data-tab-value="tab3">TAB 3</button>
  </div>
  <div class="tab-body">
    <div class="tab-content" data-tab-value="tab1">
      <div class="content-inner">Tab content 1</div>
    </div>
    <div class="tab-content" data-tab-value="tab2">
      <div class="content-inner">Tab content 2</div>
    </div>
    <div class="tab-content" data-tab-value="tab3">
      <div class="content-inner">Tab content 3</div>
    </div>
  </div>
</div>
```

- 각 탭·콘텐츠에 동일한 `data-tab-value`를 부여해 짝짓는다.
- 기본 활성 탭이 첫 번째가 아니면 `.component-tab`에 `data-active`를 지정한다. 생략하면 첫 번째 탭이 기본값이다.
- 설계 단계의 특별한 UX 요청이나 제약이 없다면 이 검증된 마크업을 그대로 복사해 사용한다.

## 가로 스크롤 탭

탭 개수가 많아 한 줄에 다 안 들어가면 `.tab-scroll`을 추가한다.

```html
<div class="component-tab tab-scroll">...</div>
```

## 클래스·속성 구조

- `.component-tab` > `.tab-head`(`.tab-label`) + `.tab-body`(`.tab-content` > `.content-inner`)
- 활성 라벨 상태: `.tab-label[aria-selected="true"]` (JS가 클릭 시 전환한다. `.is-active` 같은
  클래스가 아니다.)
- 활성 콘텐츠 표시: `.tab-content.show` (JS가 클릭 시 이 클래스를 추가·제거한다. `hidden` 속성이
  아니다. 기본은 `display: none`이고 `.show`가 붙어야 `display: block`이 된다.)

## 중첩 탭

탭 콘텐츠 안에 다시 `.component-tab`을 두면 하위 탭을 만들 수 있다. 하위 탭의 루트에는
`component-tab tab-content` 두 클래스를 함께 준다.

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

## SCSS (실제 `_tab.scss` 기준)

```scss
.component-tab {
  .tab-head { }
  .tab-body { }

  .tab-label {
    &[aria-selected='true'] { }
  }

  .tab-content {
    display: none;
    &.show {
      display: block;
    }
    .content-inner { }
  }

  &.tab-scroll {
    .tab-head {
      overflow-x: scroll;
    }
  }
}
```
