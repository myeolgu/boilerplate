---
name: component-tooltip
description: 툴팁(component-tooltip) 마크업 구조와 트리거/닫기 버튼, data-props 옵션을 안내한다. 툴팁을 마크업하기 전에 사용한다.
---

# Tooltip

`.component-tooltip` 클래스를 `initUI()`가 자동 초기화한다(`Tooltip.js`,
`src/assets/scripts/ui/components/Tooltip.js`).

## 기본 구조

```html
<div class="component-tooltip" data-state="close" data-props-position="bottom">
  <button type="button" class="btn tooltip-btn-trigger" aria-expanded="false" aria-controls="tooltip-container">
    <span class="btn-txt">Tooltip</span>
  </button>
  <div class="tooltip-container">설명 텍스트</div>
</div>
```

- `data-state`: 초기 상태(`open`/`close`).
- `.tooltip-btn-trigger`: 툴팁을 여는 버튼(필수, `component-button` 구조 그대로 사용).
- `.tooltip-btn-close`: 닫기 버튼(선택). 있으면 클릭·포커스아웃 시 닫히고, 없으면 트리거 버튼
  자체의 포커스아웃으로 닫힌다.
- `.tooltip-container`: 실제 툴팁 내용.
- `.dim`(선택): 모바일에서 함께 쓰는 딤 처리 레이어.

## 접근성 (JS가 자동 처리)

`Tooltip.js`가 초기화·열림·닫힘 시 자동으로 처리하므로 마크업에서 직접 추가하지 않는다.

- 루트 요소에 고유 `id`, `aria-expanded`, `aria-controls`
- 열고 닫을 때 `.tooltip-container`의 `aria-expanded`/`aria-hidden` 토글
- 포커스 트랩(열려 있는 동안 포커스가 툴팁 안에 갇힘), 닫힐 때 포커스 복귀

## data-props 옵션

`Tooltip.js`의 `useCore` 훅이 `data-props-*` 속성을 자동으로 읽어 props로 반영한다
(`data-props-position` → `position`처럼 `props` 뒤 kebab-case를 camelCase prop명으로 변환).

- `data-props-position`(string, 기본 `bottom`): 툴팁 노출 위치.
- `data-props-type`(`default` | `custom`, 기본 `default`): 열림 애니메이션 방식.
- `data-props-duration`(number, 기본 `0.2`): 열림/닫힘 애니메이션 시간(초).
- `data-props-click-outside`(boolean, 기본 `false`): 바깥 클릭 시 닫힘 여부.
- `data-props-wrapper-selector`(string, 기본 `.modal-content`): 부모가 `layer-wrap` 안에 있을 때,
  `layer-tooltip-wrap`으로 보내지 않고 이 셀렉터의 부모 요소에 `position: relative`로 붙일지 지정.

## 클래스 구조

- `.component-tooltip` > `.tooltip-btn-trigger`(+ 선택적 `.tooltip-btn-close`) + `.tooltip-container`(+ 선택적 `.dim`)
