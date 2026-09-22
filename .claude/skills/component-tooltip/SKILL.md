---
name: component-tooltip
description: 툴팁(component-tooltip) 마크업 구조와 트리거/닫기 버튼, data-props 옵션을 안내한다. 툴팁을 마크업하기 전에 사용한다.
---

# Tooltip

`.component-tooltip` 클래스를 `initUI()`가 자동 초기화한다(`Tooltip.js`,
`src/assets/scripts/ui/components/Tooltip.js`).

## 기본 구조

```html
<div class="component-tooltip" data-state="open" data-props-position="bottom">
  <button type="button" class="btn tooltip-btn-trigger">
    <span class="btn-txt">Tooltip</span>
  </button>
  <div class="tooltip-container">
    설명 텍스트
    <button type="button" class="btn-close tooltip-btn-close"><span class="hide-txt">닫기</span></button>
  </div>
</div>
```

- `data-state`: 초기 표시 상태가 아니다. 초기화 때 툴팁은 항상 닫혀 있고, `"open"`을 줘도 처음에
  보이지 않는다. 트리거 클릭은 state를 바꾸지 않으므로, 바깥 클릭 시 닫힘은 `data-state="open"`일
  때만 동작한다(가이드 예시도 `open`). `"close"`면 바깥을 클릭해도 닫히지 않는다.
- `.tooltip-btn-trigger`: 툴팁을 여는 버튼(필수, `component-button` 구조 그대로 사용). 가이드 예시의
  `aria-expanded`/`aria-controls="tooltip-container"`는 JS가 갱신하지 않고 존재하지 않는 id를
  가리키므로 쓰지 않는다.
- `.tooltip-btn-close`: 닫기 버튼(선택). 있으면 클릭·Tab 이탈 시 닫히고, 열릴 때 이 버튼으로 포커스가
  옮겨진다. 없으면 트리거 버튼에서 Tab으로 벗어날 때 닫힌다. JS는 `.tooltip-btn-close`를 찾고
  스타일(`_tooltip.scss`)은 `.tooltip-container .btn-close`에 있으므로 두 클래스를 함께 주고
  `.tooltip-container` 안에 둔다. 아이콘만 있는 버튼이므로 `<span class="hide-txt">`를 넣는다.
- `.tooltip-container`: 실제 툴팁 내용.
- `.dim`(선택): 모바일에서 함께 쓰는 딤 처리 레이어.

## 접근성 (JS가 자동 처리)

`Tooltip.js`가 초기화·열림·닫힘 시 자동으로 처리하므로 마크업에서 직접 추가하지 않는다.

- 루트 요소에 고유 `id`, `aria-expanded`, `aria-controls`(초기화 시)
- 열고 닫을 때 `.tooltip-container`의 `aria-hidden` 토글
- 주의: 포커스 트랩과 `.tooltip-container`의 `aria-expanded` 토글은 `el.ui.open()`/`close()`로
  state를 바꿀 때만 실행된다. 일반적인 트리거 클릭으로 열면 포커스 트랩이 켜지지 않는다.

## data-props 옵션

`Tooltip.js`의 `useCore` 훅이 `data-props-*` 속성을 자동으로 읽어 props로 반영한다
(`data-props-position` → `position`처럼 `props` 뒤 kebab-case를 camelCase prop명으로 변환).

- `data-props-position`(`top` | `right` | `bottom` | `left`, 필수): 툴팁 노출 위치. JS는 이 값을 쓰지
  않고 `_tooltip.scss`의 `[data-props-position='…']` 속성 선택자로만 위치가 정해진다. 기본값이
  없으므로 생략하면 위치 스타일이 적용되지 않는다.
- `data-props-type`(`default` | `custom`, 기본 `default`): 열림 애니메이션 방식.
- `data-props-duration`(number, 기본 `0.2`): 열림/닫힘 애니메이션 시간(초).
- 가이드 표의 `clickOutside`, `wrapperSelector`(`layer-tooltip-wrap`)는 실제 코드에 없으므로 쓰지
  않는다. 바깥 클릭 닫힘은 위 `data-state` 설명을 따른다.

## 클래스 구조

- `.component-tooltip` > `.tooltip-btn-trigger` + `.tooltip-container`(> 선택적 `.btn-close.tooltip-btn-close`) (+ 선택적 `.dim`)
