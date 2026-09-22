---
name: style-scss
description: SCSS 작성 규칙(상위 클래스 중심 중첩, kebab-case, rem() 믹스인, 색상 변수, gap 금지, 태그 선택자 제한 등)을 안내한다. 페이지·컴포넌트 스타일을 작성하거나 수정하기 전에 사용한다.
---

# SCSS 지침

이 프로젝트는 Gulp + `gulp-sass`로 컴파일하는 일반 SCSS 프로젝트다. CSS Modules나 React 컴포넌트 prop을 통한 스타일 위임 개념은 없다.

## 페이지 SCSS 파일 구성

- 새 페이지의 SCSS는 `src/assets/styles/pages/_<도메인>.scss`로, 그 페이지가 속한 도메인 폴더(`src/pages/<도메인>/`) 단위로 파일 하나를 관리한다. 같은 도메인 폴더에 페이지가 여러 개면(예: `src/pages/notice/`의 목록·상세) 그 페이지들의 최상위 wrap 클래스를 전부 한 파일 안에 나란히 둔다(`.notice-list-wrap { ... }`, `.notice-view-wrap { ... }`처럼 각각 독립된 최상위 선택자로, 서로 중첩하지 않는다). 페이지가 하나뿐인 도메인은 그 파일이 곧 페이지 하나짜리 파일이 된다. 파일 상단에 `@use '../abstracts' as *;`를 둔다.
- `style.scss`의 페이지 목록에 `@use 'pages/<도메인>';`을 직접 추가해 빌드에 연결한다.
- `pages/_index.scss`는 `main`/`sample`/`codinglist`/`component_guide`를 `@forward`하지만 `style.scss`를 포함해 어디에서도 `@use`되지 않는 미사용 파일이다. 새 페이지를 여기 추가하지 않는다.

## 상위 클래스 중심 구조

- 모든 SCSS는 상위(페이지 또는 컴포넌트) 클래스를 중심으로 그 안에 중첩해 작성한다. 개별 요소 스타일을 최상위에 독립적으로 정의하지 않는다.

```scss
/* 사용하지 않음 */
.notice-header {
  @include rem(padding, 20);
}
.notice-content {
  @include rem(margin-top, 10);
}

/* 사용 */
.notice-page {
  background: $bg-ffffff;

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
- **공통 골격 클래스도 페이지별로 재정의할 수 있다.** `content-inner`, `page-tit`, `page-tit-group`처럼 `sample.html` 템플릿이 제공하는 클래스가 특정 페이지에서 디자인과 다르게 보이면, 전역 파일(`_base.scss` 등)을 고치는 게 아니라 그 페이지의 최상위 wrap 클래스 안에 중첩해서 재정의한다.

```scss
/* base.scss 등 전역 파일을 고치지 않고 */
.notice-list-wrap {
  .content-inner {
    @include rem(max-width, 1200);
    margin: 0 auto;
  }
  .page-tit {
    color: $font-222222;
  }
}
```

클래스명이 여러 페이지에 공통이라는 이유만으로 전역 파일을 고치거나, 손대지 않고 넘어가지 않는다. 여러 페이지에 공통으로 필요한 변경이라고 확신할 때만 전역 파일 수정을 검토할 수 있고, 그 경우에도 영향 범위가 넓으므로 먼저 사용자에게 확인한다.

## 중첩 깊이

- SCSS 중첩은 최상위 wrap 클래스 아래 2~3단계를 넘지 않는 것을 기본으로 한다. 깊은 중첩은 가독성과 성능을 해친다.
- 컴파일된 CSS에서는 한 선택자가 공백으로 이어진 선택자 5개 이상(예: `.a .b .c .d .e`)이 되지 않는지 `dist/assets/styles/style.css`에서 확인한다.
- 깊은 중첩을 피하려면 태그·ID 선택자 대신 구체적인 클래스 선택자를 사용한다.

```scss
/* 깊은 중첩 */
.component-table {
  thead {
    tr {
      th {
      }
      td {
        .name {
        }
      }
    }
  }
}

/* 중첩 완화 — th/td/thead/tbody는 가이드 마크업에 클래스가 없어 "태그 선택자" 예외로 상위 클래스 아래에서만 태그를 쓰고, 새로 넣는 요소는 .name처럼 클래스로 선택 */
.component-table {
  th {
  }
  td {
    .name {
    }
  }
  thead {
  }
  tbody tr:nth-child(even) {
  }
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
- 새 페이지에서 직접 만드는 상태·토글 클래스는 `is-`, `has-` 접두어를 쓰고 기본 클래스에 중첩해 결합한다(`&.is-active`, `&.is-open`).
  - `active` x / `is-active` o
  - `error` x / `has-error` o
  - 기존 컴포넌트(`src/assets/scripts/ui/components`)의 상태는 이 규칙을 적용하지 않고 JS가 실제로 붙이는 클래스(`show`, `current`, `on`, `over`, `select-disabled`, `input-disabled` 등)를 그대로 쓴다. `is-`로 바꾸면 동작이 깨진다.
- Sass Parent Selector로 상위 클래스명에 접미사만 붙여 새 클래스명을 만들지 않는다. 필요한 클래스명은 명시적으로 작성한다. 기존 클래스에 상태·modifier를 결합하는 `&.is-active`, `&:disabled` 같은 결합은 예외로 허용한다.

## Mixin

- 페이지 SCSS에서 mixin을 직접 정의하지 않고 `_mixins.scss`(아이콘은 `_svg.scss`)에 정의된 mixin을 사용한다.
- 폰트 믹스인(`_mixins.scss`)·아이콘 믹스인(`_svg.scss`)·색상 변수(`_variables.scss`) 추가는 전역 파일 수정이므로, 위 "공통 골격 클래스" 항목과 같은 기준으로 사용자 확인 후에만 한다.
- 2px 이상의 길이 값(px)이 들어가는 속성(`margin`, `padding`, `width`, `height`, `top`, `border-radius`, `font-size` 등)에는 `@include rem(속성, 값)`을 사용한다. `z-index`, `font-weight`, `opacity`, 단위 없는 `line-height`, `flex` 같은 단위 없는 수치 속성에는 쓰지 않는다 — `rem()`은 단위 없는 숫자를 px로 보고 rem으로 바꾼다(`_mixins.scss`의 `rem-convert`).

```scss
/* 사용하지 않음 */
.button {
  margin: 20px;
  padding: 10px 20px 15px;
  border-radius: 4px;
}

/* 사용 */
.button {
  @include rem(margin, 20);
  @include rem(padding, 10 20 15);
  @include rem(border-radius, 4);
  border: 1px solid $line-cccccc;
}
```

- `calc()` 계산식이 포함된 값에는 mixin을 적용하지 않고 그대로 쓴다: `top: calc(50% - 9px);`
- **단위 함정**: `rem()` 믹스인은 px 값을 10으로 나눠 rem으로 바꾼다(`$rem-baseline` = `$global-font-size` = 10px, 즉 1rem = 10px). `calc()` 안에서는 믹스인을 못 쓰므로 직접 환산해야 한다 — 20px은 `2rem`, 40px은 `4rem`이다. 같은 요소의 `margin`을 `rem()`으로 줬다면 `calc()` 안에서도 px가 아니라 rem으로 맞춘다(500px 이하에서는 html 폰트 크기가 유동이라 px와 rem이 어긋난다). 환산한 값 옆에 `// 20px × 2 = 40px = 4rem`처럼 계산 근거를 주석으로 남긴다.
- 1px 테두리·구분선은 `rem()` 없이 `1px`로 그대로 쓴다(`rem()`을 쓰면 `0.1rem`이 되고, 500px 이하에서는 html 폰트 크기가 유동이라 1px이 유지되지 않는다 — `_reset.scss`).

## 여백·크기 — Figma가 1순위

- `margin`, `padding`, `width`, `height`, `max-width` 등 여백·크기 값도 Figma가 1순위다. "이 정도면 비슷하겠지"로 눈대중 넣지 않는다.
- Figma MCP의 `get_metadata`(x/y/width/height)나 `get_design_context` 응답의 인셋·크기 값을 직접 읽어 그 수치 그대로 `rem()`에 넣는다.
- 정확한 수치를 구하지 못했으면(예: 절대좌표 기반 레이아웃이라 셀 패딩처럼 직접 대응하는 값이 없는 경우) 임의로 지어내지 않는다. 어떻게 근사했는지 밝히고 불확실하다고 표시하며, 완료로 보고하지 않는다.

## 색상·폰트

- 배경색·폰트색·테두리색은 `_variables.scss`에 정의된 변수 중 **디자인 값과 정확히 일치하는 것**이 있으면 그 변수를 쓴다.
  - background-color → `$bg-XXXXXX`
  - color → `$font-XXXXXX`
  - border → `$line-XXXXXX`
- **정확히 일치하는 변수가 없으면 가장 비슷한 기존 변수로 근사하지 않는다.** `$font-333333`(#333333)과 디자인의 `#3c3c3b`는 다른 색이다 — 이런 경우 기존 변수를 억지로 끌어쓰지 않고, **`_variables.scss`에 그 hex 그대로 새 변수를 추가**한 뒤(`$font-3c3c3b: #3c3c3b;`, 용도에 맞는 접두어로) 그 변수를 쓴다. 변수 추가는 전역 파일 수정이므로 사용자 확인 후에 한다. 페이지 SCSS에 원본 hex를 직접 쓰지 않는다.
  - `color: $font-333333;`(디자인 값 `#3c3c3b`일 때) x / `color: #3c3c3b;`(변수 미생성) x / `color: $font-3c3c3b;`(`_variables.scss`에 추가 후) o
- **Figma 등 디자인에 명시된 색을 프로젝트 기본값에 그냥 맡겨두지 않는다.** `component-table`의 `th` 배경(`lightgray`)·테두리(`gray`)나 `_reset.scss`의 `body` 기본 글자색(`$global-font-color`, `#000000`)처럼 컴포넌트/베이스에 박혀 있는 플레이스홀더 색은, 디자인이 다른 색을 요구하면 반드시 페이지 SCSS에서 명시적으로 재정의한다. "색을 안 건드렸으니 알아서 맞겠지"로 넘기지 않는다.
- Hex 색상은 항상 6자리로 쓴다.
  - `#666` x / `#666666` o
  - `#fff` x / `#ffffff` o

## 폰트 크기·두께 — Figma가 1순위

- Figma 디자인이 항상 1순위다. 폰트 크기·두께도 Figma 지정값과 동일하게 맞춘다. "기본값 유지"를 이유로 생략하지 않는다.
- `_mixins.scss`에 이미 `f12`/`f14`/`f16`/`f18`/`f20`/`f40`/`f56` 폰트 크기 믹스인이 있다. 필요한 크기가 없으면 사용자 확인 후 `_mixins.scss`에 같은 패턴으로 새 믹스인을 추가한다(위 "Mixin" 참고). `font-size`를 믹스인 없이 직접 쓰지 않는다.
- 굵기는 별도 변수를 만들지 않고 믹스인의 `$fontWeight` 인자에 숫자를 직접 넘긴다(`@include f18(700, 1.5);`) — `_mixins.scss` 상단 사용 예시 자체가 이미 이 방식이다(`@include f12(500);`). `_variables.scss`의 "폰트 굵기 참고용" 섹션은 참고용 주석일 뿐 변수를 채우는 자리가 아니다.
- line-height도 Figma 값을 그대로 믹스인의 두 번째 인자로 넘긴다(`@include f18(400, 1.5);`). 주의: 첫 인자가 3 이하 숫자면 굵기가 아니라 line-height로 처리된다(`@include f18(1.5);`는 line-height 1.5).
- 예외: 글꼴(font-family) 자체가 프로젝트 폰트 스택(`$global-font-family`)에 없으면(웹폰트 파일 미보유, 라이선스 미확인 등) 크기·두께만 정확히 맞추고 글꼴은 프로젝트 기본값을 쓴다. 이때는 어떤 글꼴이 빠졌는지 사용자에게 알린다 — 조용히 넘어가지 않는다.

## 레이아웃

- `gap` 속성은 사용하지 않는다. 요소 간 간격은 `margin`으로 조정한다.
- 같은 크기 아이템이 반복되는 N열 그리드(카드 목록 등)는 아래 패턴을 쓴다(클래스명은 예시). 3열·간격 20px 카드 목록에서 1920·1440·1280 폭 모두 3열 정렬과 가로 스크롤 없음을 실측으로 확인한 패턴이다. 아이템마다 `-col-N` 클래스를 붙여야 하는 `flex-grid` 믹스인은 버튼·폼처럼 칸 수가 고정된 경우용이라, 개수가 바뀌는 반복 목록에는 쓰지 않는다.

  ```scss
  .card-list {
    display: flex;
    flex-wrap: wrap;

    .card-item {
      // 폭 = (100% - 간격 × (N - 1)) / N. 간격 20px × 2 = 40px = 4rem
      width: calc((100% - 4rem) / 3);
      @include rem(margin-bottom, 20);

      &:not(:nth-child(3n)) {
        @include rem(margin-right, 20);
      }
    }
  }
  ```

  - N을 바꿀 때는 `calc()`의 나눗수, 빼는 간격 합(간격 × (N-1)), `:nth-child(Nn)` 세 곳을 함께 바꾼다. 하나라도 틀리면 한 줄에 N개가 안 들어가 N-1열로 줄바꿈된다.
  - 확인은 눈으로 하지 않고 Playwright `browser_evaluate`로 카드들의 `getBoundingClientRect().top`을 묶어 행마다 N개인지, `left`가 행마다 같은지 잰다.

- `position: absolute`는 겹침 배치가 필요한 경우에만 사용하고, 기준 컨테이너에는 `position: relative`를 명시한다.
- `position`을 지정하지 않은(`static`) 요소에는 `top`/`left`/`right`/`bottom`을 쓰지 않는다. `stylelint`의 `no-positionless-offsets`는 같은 블록에 `position: static`을 **명시했을 때만** 걸리고, `position`을 아예 안 쓴 경우는 잡지 못하므로 직접 확인한다.
- `display: block`인 요소에는 `vertical-align`을 함께 쓰지 않는다(`no-block-with-vertical-align`).
- `display: inline`인 요소에는 `margin-top`/`margin-bottom`을 함께 쓰지 않는다(`no-margin-with-inline`).
- 위 규칙들은 `npm run checkstyle`이 빌드된 `dist/**/*.css`를 검사해 보고만 하고 명령은 실패하지 않는다. 종료 결과가 아니라 출력 내용을 읽어 판단한다.
- 반응형 분기는 `@include mobile { ... }`(`max-width: $global-tablet-width`, 1023px)을 쓴다.

## 유틸리티 클래스 (사용 전 확인 필요)

`src/assets/styles/utilities/`에 `.mt-0`, `.text-center`, `.pc-show`/`.mo-show`,
`.text-ellipsis-1~3` 같은 유틸리티 클래스가 실제로 있고 빌드에도 연결되어 있다(`style.scss`가
`@use 'utilities'`). 소스 파일 대부분에 "사용시 PL과 상의 할 것" 주석이 있으므로, 사용자가
명시적으로 승인하지 않으면 새 코드에 쓰지 않는다. 기본값은 이 스킬의 "클래스 네이밍" 규칙대로
역할·콘텐츠 기반 페이지 전용 클래스를 만드는 것이다.

## 태그 선택자

- 스타일링이 필요한 요소는 태그만 두지 않고 목적을 드러내는 고유 클래스를 반드시 부여한다.
- 새로 작성하는 마크업에는 반드시 클래스를 붙이고, 스타일은 `button`, `a`, `strong` 같은 태그 선택자나 태그 조합 선택자가 아니라 클래스를 기준으로 작성한다.
  - `button { ... }` x / `.submit-btn { ... }` o
- 예외: 가이드 컴포넌트 마크업에서 원래 클래스가 없는 요소(표의 `th`/`td` 등)를 재정의할 때만, 상위 클래스 아래 중첩해 태그 선택자를 허용한다(`.notice-list-wrap .component-table th`처럼). 최상위나 단독 태그 선택자는 이 경우에도 쓰지 않는다.

## Modifier/state 중첩

- 같은 기본 클래스의 modifier·state는 해당 기본 클래스 블록 안에 중첩해, 기본 스타일과의 종속 관계가 드러나도록 작성한다.
- SCSS 선언 블록은 한 줄로 축약하지 않고 selector·선언·닫는 중괄호를 각각 줄바꿈해 작성한다. 변경 후 변경한 파일만 `npx prettier --write <변경한 파일>`로 포맷한다(`npm run prettier`는 저장소 전체를 다시 포맷하므로 쓰지 않는다).

```scss
&.basic {
  // basic styles
  &.d-day {
    // modifier styles
  }
}
```
