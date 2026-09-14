---
name: icon-asset-naming
description: 아이콘 자산의 파일명 규칙(ico- kebab-case, 폴더 구조)과 SVG 추가 전 기존 자산 재사용 확인 절차를 안내한다. 새 아이콘을 추가하기 전에 사용한다.
---

# 아이콘(ICO) 지침

## 파일 관리

- 아이콘 자산은 `src/assets/images/icons/`에 둔다.
- 아이콘 클래스와 파일명은 `ico-` 접두어의 kebab-case로 짓는다. 예: `ico-close.svg`, `ico-search.svg`, `ico-arrow-down.svg`.
- 인라인 `data:image/svg+xml`은 사용하지 않고, 재사용 가능한 SVG 파일로 분리한다.

## SVG 추가 전 검수

- 사용자가 SVG 코드를 제공해도 즉시 새 파일을 만들지 않는다.
- 먼저 `src/assets/images/icons/`에서 파일명과 용도가 비슷한 SVG를 검색하고, 기존 아이콘이 요구한 모양과 용도에 맞는지 확인한다.
- 기존 아이콘을 재사용할 수 있으면 새 SVG를 추가하지 않고 그 아이콘을 사용한다.
- 재사용할 수 없을 때만 제공된 SVG를 위 규칙의 `ico-` kebab-case 파일명으로 추가한다.
- 추가 여부와 재사용 여부를 작업 결과에 함께 알린다.

## Figma에서 내보낼 때

- Figma 레이어명이 아니라 이 규칙대로 이름을 정해서 내보낸다. `Vector`, `Group 2085`, `Frame 1` 같은 이름을 그대로 쓰지 않는다.
- 같은 glyph의 상태 변형은 한 파일로 묶지 말고 상태 접미어로 나눈다. 예: `ico-power-off.svg`, `ico-power-on.svg`.
- 내보내기 전에 같은 glyph가 이미 있는지 먼저 찾는다. 있으면 새로 만들지 않고 그것을 쓴다.

## 마크업

- 아이콘은 `<i class="ico-{이름} ico-normal" aria-hidden="true"></i>` 형태로 마크업한다. 자세한 사용법과 접근성 규칙은 `component-icon` 스킬을 따른다.
- 직접 `<img>` 태그나 data URI를 사용하지 않는다.
