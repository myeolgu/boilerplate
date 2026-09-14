---
name: component-button
description: 버튼(.btn) 마크업 구조와 버튼 그룹(component-btns) 사용법을 안내한다. 새 버튼이나 버튼 그룹을 마크업하기 전에 사용한다.
---

# Button

버튼은 React 컴포넌트가 아니라 `.btn` 클래스와 정해진 마크업 구조를 그대로 사용하는 정적 HTML 패턴이다.

## 기본 버튼

```html
<!-- 텍스트 버튼 -->
<button type="button" class="btn">
  <span class="btn-txt">텍스트버튼</span>
</button>

<!-- 버튼 + 아이콘 -->
<button type="button" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">버튼 + 아이콘</span>
</button>

<!-- 아이콘만 있는 버튼 -->
<button type="button" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="hide-txt">아이콘버튼</span>
</button>
```

- 버튼 요소는 기본적으로 `<button type="button">`을 사용한다.
- 아이콘만 있는 버튼에는 스크린 리더용 `<span class="hide-txt">설명</span>`을 추가한다.
- 아이콘에는 `aria-hidden="true"`를 추가해 스크린 리더가 중복으로 읽지 않게 한다.

## 스타일 변형

```html
<!-- 강조(primary) -->
<button type="button" class="btn btn-primary">
  <span class="btn-txt">Primary</span>
</button>

<!-- 전체 너비 -->
<button type="button" class="btn btn-full">
  <span class="btn-txt">Full</span>
</button>
<a href="#" class="btn btn-primary btn-full">
  <span class="btn-txt">Primary Full</span>
</a>
```

- `.btn-primary`: 강조 스타일. `.btn-full`과 함께 쓸 수 있다.
- `.btn-full`: 버튼을 부모 너비만큼 채운다.

## 링크 버튼

링크 형태 버튼은 `<a>` 태그에 동일한 클래스 구조를 사용한다.

```html
<a href="" class="btn">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">링크버튼</span>
</a>
```

## 커스텀(div) 버튼

`button`/`a`를 쓸 수 없어 `div`로 버튼을 만들어야 하면 접근성 속성과 키보드 이벤트를 함께 추가한다.

```html
<div class="btn" role="button" tabindex="0" onclick="handleClick()" onkeydown="handleKeyDown(event)" onkeyup="handleKeyUp(event)">
  <i class="ico-search ico-normal" aria-hidden="true"></i>
  <span class="btn-txt">커스텀버튼</span>
</div>
```

- `role="button"`으로 역할을 명시한다.
- `tabindex="0"`으로 키보드 포커스를 받게 한다.
- keydown에서 Enter/Space를 처리해 스크롤이 발생하지 않도록 `preventDefault()`한다.

## 버튼 그룹

여러 버튼을 묶을 때는 `.component-btns`/`.btns-row`를 사용한다.

```html
<!-- 가운데 정렬(기본값) -->
<div class="component-btns">
  <div class="btns-row">
    <button type="button" class="btn"><span class="btn-txt">button</span></button>
    <button type="button" class="btn"><span class="btn-txt">button</span></button>
  </div>
</div>

<!-- 왼쪽/오른쪽 정렬 -->
<div class="component-btns">
  <div class="btns-row align-left">...</div>
</div>
<div class="component-btns">
  <div class="btns-row align-right">...</div>
</div>
```

- 정렬 클래스: `.align-left`, `.align-right`. 기본값은 가운데 정렬이다.

### 2단 레이아웃 버튼 그룹

좌우로 나뉘는 버튼 그룹은 `.two-col` + `.btns-col-1`/`.btns-col-2`를 사용한다.

```html
<div class="component-btns">
  <div class="btns-row two-col">
    <div class="btns-col-1">
      <button type="button" class="btn"><span class="btn-txt">확인</span></button>
      <button type="button" class="btn"><span class="btn-txt">취소</span></button>
    </div>
    <div class="btns-col-2 align-right">
      <button type="button" class="btn"><span class="btn-txt">저장</span></button>
    </div>
  </div>
</div>
```

### 3단 레이아웃 버튼 그룹

```html
<div class="component-btns">
  <div class="btns-row three-col">
    <button type="button" class="btn btn-full"><span class="btn-txt">1</span></button>
    <button type="button" class="btn btn-full"><span class="btn-txt">2</span></button>
    <button type="button" class="btn btn-full"><span class="btn-txt">3</span></button>
  </div>
</div>
```

## 클래스 구조

- 기본 클래스: `.btn` (변형: `.btn-primary`, `.btn-full`)
- 텍스트 클래스: `.btn-txt`
- 숨김 텍스트 클래스: `.hide-txt`
- 그룹: `.component-btns` > `.btns-row`(`.align-left` | `.align-right` | `.two-col` + `.btns-col-1`/`.btns-col-2` | `.three-col`)

## 참고

`.windsurfrules`의 "컴포넌트 사용 원칙"은 모든 컴포넌트가 `component-` 접두 클래스를 쓴다고 설명하지만, 버튼 예시 코드 전체는 `component-` 접두어 없이 `.btn`을 그대로 쓴다. 실제 검증된 예시 코드(`.btn`)를 기준으로 삼는다.
