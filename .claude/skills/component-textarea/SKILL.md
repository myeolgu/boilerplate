---
name: component-textarea
description: 텍스트영역 마크업 규칙은 아직 실제 가이드 페이지 기준으로 정리되지 않았다. 텍스트영역을 마크업하기 전에 반드시 이 스킬의 확인 절차를 먼저 따른다.
---

# Textarea (확인 필요)

이 스킬은 이전에 React `Textarea` 컴포넌트를 기준으로 작성되어 있었지만, 이 프로젝트는 정적 HTML·SCSS 퍼블리싱 보일러플레이트라 그 내용이 맞지 않는다. 별도의 `textarea.html` 가이드 페이지는 없다.

## 작업 전 확인 절차

1. `src/guide/pages/components/form.html`과 `input.html`에 textarea 예시가 포함되어 있는지 먼저 확인한다.
2. 없으면 `component-input` 스킬의 구조(`component-input` > `input-field`)를 기준으로 `input`을 `textarea`로 바꿔 동일한 클래스 체계를 따르되, 글자 수 카운트 등 추가 기능이 필요하면 구현 전 사용자에게 확인한다.
3. 확인한 내용을 바탕으로 이 스킬 문서를 갱신한다.
