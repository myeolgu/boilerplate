---
name: component-swiper
description: 스와이퍼(component-swiper) 마크업 구조와 data-props-* 옵션(네비게이션, 페이지네이션, 반응형)을 안내한다. 슬라이더를 마크업하기 전에 사용한다.
---

# Swiper

스와이퍼는 `swiper/react`가 아니라 순수 JS Swiper 라이브러리를 `.component-swiper` 클래스로 감싸
`initUI()`가 자동 초기화하는 etUI 컴포넌트다. 구현: `src/assets/scripts/ui/components/Swiper.js`,
벤더: `src/assets/scripts/lib/swiper-bundle.min.js`, 스타일:
`src/assets/styles/components/_swiper.scss`. 가이드: `src/guide/pages/components/swiper.html`.

## 기본 구조

```html
<div
  class="component-swiper"
  data-props-initial-slide="1"
  data-props-slides-per-view="3"
  data-props-space-between="20"
>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <button type="button"><img src="" alt="" />slide 1</button>
      </div>
      <div class="swiper-slide">
        <button type="button"><img src="" alt="" />slide 2</button>
      </div>
    </div>
  </div>
</div>
```

- 슬라이드 콘텐츠는 클릭 가능한 콘텐츠(배너 등)면 `<button>` 또는 `<a>`로 감싸 접근성을 확보한다.

## 클래스 구조

- `.component-swiper` > `.swiper-container` > `.swiper-wrapper` > `.swiper-slide`(각 슬라이드)

## 옵션 (`data-props-*`)

- `data-props-initial-slide`: 시작 슬라이드 인덱스
- `data-props-slides-per-view`: 한 화면에 보여줄 슬라이드 수(기본 1)
- `data-props-space-between`: 슬라이드 사이 여백(기본 0)
- `data-props-navigation="true"`: 이전/다음 버튼을 `.swiper-controls` 안에 **자동 생성**한다.
  추가 마크업이 필요 없다. `data-props-navigation-class`로 커스텀 클래스를 지정할 수 있다.
- `data-props-pagination="true"`: 페이지네이션을 `.swiper-controls` 안에 **자동 생성**한다.
  `data-props-pagination-class`(커스텀 클래스), `data-props-pagination-type`(`bullets` |
  `fraction` | `progress`, 기본 `bullets`)로 조정한다.
- `data-props-breakpoint`: 반응형 옵션 재설정 객체(`{ "사이즈": 옵션 }`)
- `slideChange`: 슬라이드 변경 후 콜백(JS로 인스턴스에 직접 전달)
- `data-desktop-only="true"` / `data-mobile-only="true"`: 이 컴포넌트를 포함한 모든 `initUI()`
  대상 컴포넌트가 공통으로 지원하는 옵션으로, PC 또는 모바일에서만 초기화한다.

## 반응형 표시 예시

```html
<div class="component-swiper" data-mobile-only="true" data-props-slides-per-view="1">
  ...
</div>
```

## 접근성

- 이미지 슬라이드는 `alt`를 채운다(장식용이 아니면 빈 값으로 두지 않는다).
- 자동재생 토글 버튼이 필요하면 `.swiper-autoplay`에 `.play`/`.stop` 상태 클래스를 사용한다(가상
  요소로 "정지"/"재생" 텍스트를 표시하므로 실제 버튼에는 상태를 나타내는 접근 가능한 텍스트도
  함께 제공한다).
