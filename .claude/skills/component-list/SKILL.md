---
name: component-list
description: 목록 마크업 정책을 안내한다. 별도 공통 List 컴포넌트가 없으므로 ul/ol/테이블 중 데이터 성격에 맞는 마크업을 직접 구성하도록 안내한다.
---

# List

- 독립적인 공통 List 컴포넌트는 없습니다.
- 목록은 데이터 성격에 맞게 화면에서 의미 있는 `ul`, `ol`, 또는 테이블 마크업으로 구성합니다.
- 단순히 재사용을 위해 추상 List 컴포넌트를 새로 만들지 않습니다. 반복되는 실제 요구가 확인된 경우에만 공통화를 검토합니다.

```tsx
<ul>
  {items.map((item) => <li key={item.id}>{item.name}</li>)}
</ul>
```

- 행·열 관계가 있는 데이터는 List가 아니라 `component-table` 스킬을 따릅니다.
