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
- `data-props-navigation="true"`: 이전/다음 버튼을 `.swiper-controls > .swiper-navigation` 안에
  자동 생성한다. `data-props-navigation-class`로 `.swiper-navigation`에 커스텀 클래스를 줄 수 있다.
  - 주의: 버튼은 생성되지만 클릭해도 슬라이드가 넘어가지 않는다(`Swiper.js`에서 `prevEl`/`nextEl`
    설정이 주석 처리되어 `swiper.navigation.nextEl`이 `null`). 동작하는 이전/다음 버튼이 필요하면 JS
    수정이 필요하므로 작업 전에 확인한다.
- `data-props-pagination="true"`: 페이지네이션을 `.swiper-controls` 안에 **자동 생성**한다.
  `data-props-pagination-class`(커스텀 클래스), `data-props-pagination-type`(`bullets` |
  `fraction` | `progressbar`, 미지정 시 `fraction`)로 조정한다. `bullets`일 때만 클릭할 수 있다.
  가이드에는 `progress`로 적혀 있지만 Swiper 11의 유효한 값은 `progressbar`다.
- `data-props-breakpoints`(복수형): 반응형 옵션 JSON. 단수형 `data-props-breakpoint`는 무시된다.
  - 주의: 코드가 첫 번째 항목의 옵션만 꺼내 키를 항상 `1024`로 바꾼다. 따라서 적은 사이즈 키와
    상관없이 1024px 이상에만 적용되고, 브레이크포인트는 하나만 쓸 수 있다.

  ```html
  <div
    class="component-swiper"
    data-props-slides-per-view="1"
    data-props-breakpoints='{ "1024": { "slidesPerView": "3", "spaceBetween": "20" } }'
  >
    ...
  </div>
  ```

- 슬라이드 변경 콜백 prop은 없다. 필요하면 `el.ui.getSwiperInstance().on('slideChange', fn)`으로
  Swiper 인스턴스에 직접 등록한다(가이드 표의 `slideChange`는 실제 prop이 아니다).
- `data-desktop-only="true"` / `data-mobile-only="true"`: 이 컴포넌트를 포함한 모든 `initUI()`
  대상 컴포넌트가 공통으로 지원하는 옵션으로, PC 또는 모바일에서만 초기화한다.
  - 주의: 페이지 첫 로드 시에만 정확히 동작한다. 로드 후 화면 폭을 바꿔 조건이 전환되면 Swiper
    인스턴스가 해제되지 않고, 다시 전환될 때 컨트롤이 중복 생성될 수 있다.

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
