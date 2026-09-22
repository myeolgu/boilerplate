---
name: component-checkbox
description: 체크박스는 component-input 클래스를 쓴다(Input.js 동작 전제). 체크박스·스위치·약관 동의 그룹 마크업 구조와 상태를 안내한다. 체크박스를 마크업하기 전에 사용한다.
---

# Checkbox

체크박스는 `.component-checkbox`가 아니라 **`.component-input`**을 기본 클래스로 쓴다. 실제 가이드
(`src/guide/pages/components/checkbox.html`)에 "Checkbox 컴포넌트는 `Input.js`의 동작을 위해
반드시 `component-input` 클래스를 사용합니다"라고 명시되어 있다. 스타일:
`src/assets/styles/components/_checkbox.scss`.

## 기본 구조

```html
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="checkbox_id" name="checkbox_group_name" aria-label="항목 이름" />
  </label>
</div>
```

## 텍스트가 있는 체크박스

```html
<div class="component-input">
  <label class="checkbox-inner">
    <input type="checkbox" id="temp_checkbox_0201" name="temp_checkbox_0200" />
    <span class="checkbox-item">
      <span class="checkbox-txt">Checkbox default</span>
    </span>
  </label>
</div>
```

## 스위치(토글) 변형

같은 `.component-input` 안에서 `.checkbox-inner` 대신 `.switch-inner`를 쓰면 토글 스위치
스타일이 된다.

```html
<!-- 보이는 라벨이 있는 스위치 -->
<div class="component-input">
  <label class="switch-inner">
    <span class="switch-label">스위치 제목</span>
    <input type="checkbox" id="switch_id" name="switch_group_name" />
    <span class="switch-item">
      <span class="switch-handle"></span>
    </span>
  </label>
</div>

<!-- 보이는 라벨이 없는 스위치(ON/OFF 텍스트 포함) -->
<div class="component-input">
  <label class="switch-inner">
    <input type="checkbox" id="switch_id_02" name="switch_group_name" aria-label="스위치 제목" />
    <span class="switch-item">
      <span class="switch-handle"></span>
      <span class="switch-txts" aria-hidden="true">
        <span class="txt">ON</span>
        <span class="txt">OFF</span>
      </span>
    </span>
  </label>
</div>
```

- `.switch-item`은 반드시 `input` 바로 뒤에 둔다(`input:checked + .switch-item`으로 상태를 그린다).
- `.switch-label`이 없으면 `input`에 `aria-label`을 준다. `.switch-txts`는 장식이므로
  `aria-hidden="true"`로 숨긴다.

## 상태

- 선택: `input`에 `checked` / 비활성화: `input`에 `disabled` / 둘 다 가능.

## 클래스 구조

- 기본 클래스: `.component-input` (체크박스·스위치 공용)
- 체크박스: `.checkbox-inner`(`.checkbox-item`, `.checkbox-txt`)
- 스위치: `.switch-inner`(`.switch-item`, `.switch-handle`, `.switch-txts`, `.switch-label`)

## 약관 동의 그룹은 별도 컴포넌트

여러 체크박스를 들여쓰기 구조로 묶는 약관 동의 화면은 **`.component-agreement`**로 감싸고, 그 안에
전체 동의 동작을 맡는 `.component-input[data-props-all-check][data-props-sub-check]` 래퍼를 둔다.
각 항목 안에는 위 기본 체크박스 구조를 그대로 넣는다.

- `data-props-all-check="true"`: `.all-agree-item`의 체크박스로 `.agree-area` 전체를 선택/해제하고,
  하위가 모두 선택되면 전체 동의도 자동 선택된다(`Input.js:225-239`, `282-285`).
- `data-props-sub-check="true"`: `.agree-item.sub-all-agree`의 체크박스와 그 안 `.sub-agree-item`
  체크박스를 서로 연동한다(`Input.js:242-258`, `286-289`).
- JS는 `.all-agree-item`, `.agree-area`, `.agree-item`, `.sub-all-agree`, `.sub-agree-item` 클래스로
  요소를 찾으므로 이름을 바꾸지 않는다.

```html
<div class="component-agreement">
  <div class="component-input" data-props-all-check="true" data-props-sub-check="true">
    <!-- 전체 동의 -->
    <div class="all-agree-item">
      <div class="component-input">
        <label class="checkbox-inner">
          <input type="checkbox" id="agree_all" name="agree_group" />
          <span class="checkbox-item"><span class="checkbox-txt">전체 동의하기</span></span>
        </label>
      </div>
    </div>
    <!-- 동의 항목 -->
    <div class="agree-area">
      <div class="agree-item">
        <div class="component-input">
          <label class="checkbox-inner">
            <input type="checkbox" id="agree_01" name="agree_group" />
            <span class="checkbox-item"><span class="checkbox-txt">[필수] 서비스 약관 동의</span></span>
          </label>
        </div>
      </div>
      <!-- 하위 항목이 있는 동의 항목 -->
      <div class="agree-item sub-all-agree">
        <div class="component-input">
          <label class="checkbox-inner">
            <input type="checkbox" id="agree_02" name="agree_group" />
            <span class="checkbox-item"><span class="checkbox-txt">[선택] 마케팅 정보 수신 동의</span></span>
          </label>
        </div>
        <div class="sub-agree-area">
          <div class="sub-agree-item">
            <div class="component-input">
              <label class="checkbox-inner">
                <input type="checkbox" id="agree_02_01" name="agree_sub_group" />
                <span class="checkbox-item"><span class="checkbox-txt">전화</span></span>
              </label>
            </div>
          </div>
          <div class="sub-agree-item">
            <div class="component-input">
              <label class="checkbox-inner">
                <input type="checkbox" id="agree_02_02" name="agree_sub_group" />
                <span class="checkbox-item"><span class="checkbox-txt">이메일</span></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 접근성

- 각 체크박스에 고유한 `id`를 부여한다.
- 같은 그룹의 체크박스는 동일한 `name`을 공유한다.
- `label`로 감싸 클릭 영역을 넓히고, 텍스트가 있으면 `.checkbox-txt`/`.switch-label`로 시각적 라벨을 제공한다.
- 텍스트 없는 기본 체크박스(위 "기본 구조")는 접근 가능한 이름이 없으므로 `input`에 `aria-label`을 준다.
- 포커스 상태는 스타일에 이미 정의되어 있다. 체크박스는 `input:focus-visible`(`outline: 1px solid
  $line-000000`), 스위치는 `.switch-inner:focus-within .switch-item`에 같은 outline을 쓴다
  (`_checkbox.scss:52-54`, `145-149`). 가이드에는 `-webkit-focus-ring-color`로 적혀 있지만 실제 코드는
  이 값이다.
