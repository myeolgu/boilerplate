---
name: component-list
description: 목록 마크업 정책을 안내한다. 별도 공통 List 컴포넌트가 없으므로 ul/ol/테이블 중 데이터 성격에 맞는 마크업을 직접 구성하도록 안내한다.
---

# List

- 독립적인 공통 List 컴포넌트는 없다.
- 목록은 데이터 성격에 맞게 의미 있는 `ul`(순서 없음), `ol`(순서 있음), 또는 테이블 마크업으로 구성한다.
- 단순히 재사용을 위해 추상 List 컴포넌트를 새로 만들지 않는다. 반복되는 실제 요구가 확인된 경우에만 공통화를 검토한다.

```html
<ul class="notice-list">
  <li class="notice-item">첫 번째 항목</li>
  <li class="notice-item">두 번째 항목</li>
</ul>
```

- 스타일링이 필요한 목록과 항목에는 역할을 드러내는 클래스를 부여하고, 페이지 최상위 클래스 안에 중첩해 스타일을 작성한다(`style-scss` 스킬 참고). 예시의 `notice-list`/`notice-item`은 이름 예시일 뿐 공통 클래스가 아니다.
- 행·열 관계가 있는 데이터는 List가 아니라 `component-table` 스킬을 따른다.
