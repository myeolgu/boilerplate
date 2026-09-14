---
name: component-calendar
description: 날짜 선택(date-picker) 마크업 규칙은 아직 실제 가이드 페이지 기준으로 정리되지 않았다. 날짜 입력을 마크업하기 전에 반드시 이 스킬의 확인 절차를 먼저 따른다.
---

# Date picker (확인 필요)

이 스킬은 이전에 React `Calendar` 컴포넌트를 기준으로 작성되어 있었지만, 이 프로젝트는 정적 HTML·SCSS 퍼블리싱 보일러플레이트라 그 내용이 맞지 않는다. 실제 가이드 페이지 이름도 "calendar"가 아니라 "date-picker"다.

## 작업 전 확인 절차

1. `src/guide/pages/components/date-picker.html`을 읽어 실제 마크업 구조, 클래스명, 날짜 형식, 아이콘 트리거 방식을 확인한다.
2. 입력 필드와 결합되는 형태라면 `component-input` 스킬의 버튼 포함 입력 패턴(`.input-field-btn.calendar`)과의 관계도 함께 확인한다.
3. 확인한 구조를 바탕으로 구현하고, 이 스킬 문서를 실제 마크업 기준으로 갱신한다. 구조가 불명확하면 추측하지 말고 사용자에게 확인한다.
