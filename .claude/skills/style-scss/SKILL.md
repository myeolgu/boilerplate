---
name: style-scss
description: SCSS 작성 규칙(상위 클래스 중심 중첩, kebab-case, rem() 믹스인, 색상 변수, gap 금지, 태그 선택자 금지 등)을 안내한다. 페이지·컴포넌트 스타일을 작성하거나 수정하기 전에 사용한다.
---

# SCSS 지침

이 프로젝트는 Gulp + `gulp-sass`로 컴파일하는 일반 SCSS 프로젝트다. CSS Modules나 React 컴포넌트 prop을 통한 스타일 위임 개념은 없다.

## 상위 클래스 중심 구조

- 모든 SCSS는 상위(페이지 또는 컴포넌트) 클래스를 중심으로 그 안에 중첩해 작성한다. 개별 요소 스타일을 최상위에 독립적으로 정의하지 않는다.

```scss
/* 사용하지 않음 */
.notice-header { @include rem(padding, 20); }
.notice-content { @include rem(margin-top, 10); }

/* 사용 */
.notice-page {
  background: #ffffff;

  .notice-header {
    @include rem(padding, 20);
  }

  .notice-content {
    @include rem(margin-top, 10);
  }
}
```

- 컴포넌트 내부 요소도 반드시 컴포넌트 최상위 선택자 안에 중첩한다.
- 전역 선택자나 다른 페이지에 영향을 줄 수 있는 단독 클래스 선택자는 만들지 않는다.

## 중첩 깊이

- 중첩은 2~3단계를 넘지 않는 것을 기본으로 한다. 깊은 중첩은 가독성과 성능을 해친다.
- 컴파일된 CSS도 5단계 이상 중첩되지 않는지 `dist/assets/styles/style.css`에서 확인한다.
- 깊은 중첩을 피하려면 태그·ID 선택자 대신 구체적인 클래스 선택자를 사용한다.

```scss
/* 깊은 중첩 */
.component-table {
  thead {
    tr {
      th { }
      td { .name { } }
    }
  }
}

/* 클래스로 완화 */
.component-table {
  th { }
  td { .name { } }
  thead { }
  tbody tr:nth-child(even) { }
}
```

## 클래스 네이밍

- 클래스명은 kebab-case를 사용한다. `mainContainer`, `main_container`, `main__container` 형태는 사용하지 않는다.
- 하위 클래스는 상위 클래스의 핵심 키워드를 이어 짓되, 상위 클래스 전체를 그대로 반복하지 않는다.
  - 예: `.notice-page` 안의 `.notice-header`, `.notice-content` (`.notice-page-header`처럼 전체를 반복하지 않음)
  - 예: `.component-tab` 안의 `.tab-head`, `.tab-label` (`component-` 접두어는 하위 클래스에서 생략)
- 하위 클래스는 역할이나 콘텐츠로 이름 짓는다. 위치·순서·색상 같은 시각적 특징으로 이름 짓지 않는다.
  - `top-box` x / `card-title` o
  - `red-text` x / `filter-panel` o
- JS로 켜고 끄는 상태·토글 클래스는 `is-`, `has-` 접두어를 쓰고 기본 클래스에 중첩해 결합한다(`&.is-active`).
  - `active` x / `is-active` o
  - `error` x / `has-error` o
- Sass Parent Selector로 상위 클래스명에 접미사만 붙여 새 클래스명을 만들지 않는다. 필요한 클래스명은 명시적으로 작성한다. 기존 클래스에 상태·modifier를 결합하는 `&.is-active`, `&:disabled` 같은 결합은 예외로 허용한다.

## Mixin

- 직접 mixin을 정의하지 않고 `_mixins.scss`에 정의된 mixin만 사용한다.
- 2px 이상의 수치가 있는 속성에는 모두 `@include rem(속성, 값)`을 사용한다.

```scss
/* 사용하지 않음 */
.button {
  margin: 20px;
  padding: 10px 20px 15px;
  border: 1px solid #333333;
}

/* 사용 */
.button {
  @include rem(margin, 20);
  @include rem(padding, 10 20 15);
  @include rem(border, 1px solid #333333);
}
```

- `calc()` 계산식이 포함된 값에는 mixin을 적용하지 않고 그대로 쓴다: `top: calc(50% - 9px);`
- 1px 테두리·구분선은 `1px`로 그대로 쓴다.

## 색상·폰트

- 배경색·폰트색·테두리색은 `_variables.scss`에 정의된 변수가 있으면 그 변수를 쓰고, 없으면 직접 hex 값을 지정한다. 임의로 새 색상 변수를 만들지 않는다.
  - background-color → `$bg-XXXXXX`
  - color → `$font-XXXXXX`
  - border → `$line-XXXXXX`
- Hex 색상은 항상 6자리로 쓴다.
  - `#666` x / `#666666` o
  - `#fff` x / `#ffffff` o
- 폰트 스타일(글꼴, 크기, 두께 등)은 기본값을 그대로 사용한다. 커스텀 폰트 스타일은 이번 작업 범위에서 임의로 지정하지 않는다. 별도 커스텀 작업으로 처리한다.

## 레이아웃

- `gap` 속성은 사용하지 않는다. 요소 간 간격은 `margin`으로 조정한다.
- `position: absolute`는 겹침 배치가 필요한 경우에만 사용하고, 기준 컨테이너에는 `position: relative`를 명시한다.
- `position`을 지정하지 않은(`static`) 요소에는 `top`/`left`/`right`/`bottom`을 쓰지 않는다. `stylelint`가 이 조합을 오류로 처리한다(`no-positionless-offsets`).
- `display: block`인 요소에는 `vertical-align`을 함께 쓰지 않는다. `stylelint`가 오류로 처리한다(`no-block-with-vertical-align`).
- `display: inline`인 요소에는 `margin-top`/`margin-bottom`을 함께 쓰지 않는다. `stylelint`가 오류로 처리한다(`no-margin-with-inline`).

## 태그 선택자

- 스타일링이 필요한 요소는 태그만 두지 않고 목적을 드러내는 고유 클래스를 반드시 부여한다.
- 스타일은 `button`, `a`, `strong` 같은 태그 선택자나 태그 조합 선택자로 지정하지 않고 클래스를 기준으로 작성한다. 이 규칙에는 예외를 두지 않는다.
  - `button { ... }` x / `.submit-btn { ... }` o

## Modifier/state 중첩

- 같은 기본 클래스의 modifier·state는 해당 기본 클래스 블록 안에 중첩해, 기본 스타일과의 종속 관계가 드러나도록 작성한다.
- SCSS 선언 블록은 한 줄로 축약하지 않고 selector·선언·닫는 중괄호를 각각 줄바꿈해 작성한다. 변경 후 Prettier(`npm run prettier`)로 포맷한다.

```scss
&.basic {
  // basic styles
  &.d-day {
    // modifier styles
  }
}
```

## 마크업 접근성

- 보이는 폼 label은 고유하고 안정적인 `id`/`for`로 연결한다.
- 하나의 라벨이 여러 컨트롤을 설명하면 `fieldset`/`legend`를 사용한다.
- `aria-labelledby`는 `label`/`legend`로 설명할 수 없는 경우에만 사용한다.
