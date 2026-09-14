---
name: component-carousel
description: 캐러셀(component-carousel) 관련 실제 코드는 스타일이 비어 있는 프로토타입 단계임을 안내한다. 캐러셀을 마크업하기 전에 반드시 이 스킬의 확인 절차를 먼저 따른다.
---

# Carousel (프로토타입 단계, 확인 필요)

`component-carousel`은 `component-swiper`와 다른 별도 클래스 체계를 쓰지만, 스타일 파일
`_carousel.scss`/`_carousels.scss`(`src/assets/styles/components/`)가 둘 다 비어 있다. 공용
`initUI()` 컴포넌트 목록에도 등록되어 있지 않고, 별도의 `Carousel.js`도 없다. 즉 마크업 예시만
있고 스타일·공용 JS 초기화는 아직 없는 프로토타입 단계다.

예시는 `src/guide/pages/components/element/carousel.html`에 하나 있다(다른 컴포넌트처럼
`src/guide/pages/components/`가 아니라 `element/` 하위에 있다).

```html
<div class="component-carousels">
  <div
    class="component-carousel thumbs-top left-fixed"
    data-component="carousel"
    data-props-initial-slide="0"
    data-props-autoplay-button="true"
    data-props-slideTo-button="true"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="..." alt="" /></div>
    </div>
    <button class="swiper-button-prev"></button>
    <button class="swiper-button-next"></button>
    <div class="swiper-pagination"></div>
  </div>
</div>
```

- 초기화는 `document.querySelector('[data-component="carousel"]')`로 직접 찾아 붙이는 방식으로,
  `.component-swiper`처럼 클래스만으로 자동 초기화되지 않는다. 이 페이지의 하단 스크립트를 함께
  확인해야 정확한 초기화 코드를 알 수 있다.

## 작업 전 확인 절차

1. 실제로 caroucel이 필요하면 먼저 `component-swiper`로 요구사항을 충족할 수 있는지 확인한다.
   일반적인 이미지 슬라이더는 이미 완성된 `component-swiper`를 쓰는 편이 안전하다.
2. `thumbs-top left-fixed` 같은 변형 클래스나 `data-props-autoplay-button`/
   `data-props-slideTo-button`의 정확한 동작은 스타일이 없어 눈으로 확인할 수 없다. 실제로 필요한
   경우 `element/carousel.html`의 전체 스크립트를 읽고, 스타일 부재로 인한 화면 문제를 사용자에게
   미리 알린다.
3. 확정된 스타일이 없는 상태이므로, 디자인에 맞는 새 스타일을 이 스킬 문서에 반영하기 전에 추측으로
   완성하지 않는다.
