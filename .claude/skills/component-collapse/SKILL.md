---
name: component-collapse
description: 단일 접기/펼치기 패널(component-collapse) 마크업 구조를 안내한다. 아코디언이 아니라 단독 토글 패널이 필요할 때 사용한다.
---

# Collapse

아코디언 여러 개가 아니라 **단독으로 접고 펼치는 패널 하나**가 필요하면 `component-accordion`이
아니라 이 컴포넌트를 쓴다. `.component-collapse` 클래스를 `initUI()`가 자동 초기화한다
(`Collapse.js`, `src/assets/scripts/ui/components/Collapse.js`). `component-accordion`의
`.accordion-item`도 내부적으로 이 컴포넌트와 같은 `.collapse-tit`/`.collapse-content` 클래스를
공유한다(`component-accordion` 스킬 참고).

## 기본 구조

```html
<div class="component-collapse" data-state="close" data-init="false">
  <button type="button" class="collapse-tit">Q. What is HTML?</button>
  <div class="collapse-content">
    <div>HTML stands for Hyper Text Markup Language.</div>
  </div>
</div>
```

- `data-state="close"`: 초기 닫힌 상태. 열린 상태로 시작하려면 `"open"`으로 둔다.
- `data-init="false"`: 초기화 여부(JS가 초기화 후 값을 갱신한다).

## 접근성 (JS가 자동 처리)

`Collapse.js`가 초기화 시 자동으로 처리하므로 마크업에서 직접 추가하지 않는다.

- 루트 요소에 `aria-expanded`, 고유 `id`
- `.collapse-tit`에 `id`와 `controls`(콘텐츠 id)
- `.collapse-content`에 `role="region"`, `aria-hidden`, `aria-labelledby`(제목 id)

## 클래스 구조

- `.component-collapse` > `.collapse-tit` + `.collapse-content`

## 참고

여러 패널을 한 화면에 나열하면서 그룹 동작(하나만 열기, 전체 열기 등)이 필요하면
`component-accordion`을 쓴다. 각 패널이 서로 독립적으로만 동작하면 이 컴포넌트를 그대로 여러 번
반복한다.
