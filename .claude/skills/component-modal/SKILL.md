---
name: component-modal
description: 모달(component-modal) 마크업 구조와 etUI Modal 컴포넌트의 열기/닫기 동작을 안내한다. 모달을 마크업하기 전에 사용한다.
---

# Modal

모달은 `.component-modal` 클래스를 `initUI()`가 자동 스캔해 `etUI.components.Modal`로 초기화하는
JS 컴포넌트다. 구현: `src/assets/scripts/ui/components/Modal.js`,
`src/assets/styles/components/_modal.scss`. 가이드: `src/guide/pages/components/modal.html`.

## 기본 구조

```html
<button type="button" class="btn-modal01">Modal</button>

<div class="layer-wrap">
  <div class="component-modal modal01" data-props-dimm-click="true">
    <div class="modal-dimm"></div>
    <div class="modal-frame">
      <div class="modal-container">
        <div class="modal-header">
          <h3 class="modal-tit">Modal Example</h3>
        </div>
        <div class="modal-content">
          <p class="modal-info">본문 내용</p>
        </div>
        <button type="button" class="modal-close btn"><span class="hide-txt">닫기</span></button>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn-modal01').addEventListener('click', () => {
      document.querySelector('.modal01').ui.open();
    });
  });
</script>
```

- 트리거 버튼은 자유롭게 만들고, 클릭 시 `document.querySelector('.{모달 고유 클래스}').ui.open()`을
  호출해 연다. `.ui.close()`로 닫을 수도 있다.
- `.component-modal`에는 반드시 페이지 안에서 고유한 두 번째 클래스(`modal01` 등)를 함께 부여해
  JS와 트리거 버튼이 그 인스턴스를 정확히 찾도록 한다.
- 닫기 이벤트는 `.modal-close` 버튼(과 딤)에만 자동으로 바인딩된다. 다른 클래스의 버튼은 눌러도
  닫히지 않는다. Esc 키로도 닫힌다.
- 딤 영역 클릭으로 닫히는 동작은 기본값(`dimmClick: true`)이다. 막으려면
  `data-props-dimm-click="false"`를 준다.
- `.layer-wrap`은 필수다. 열 때 `useLayer.js`가 `document.querySelector('.layer-wrap').children`을
  읽으므로 없으면 에러가 나서 열리지 않는다. 문서의 첫 번째 `.layer-wrap` 직계 자식만 딤 겹침 계산에
  들어가므로 페이지에 하나만 두고 모든 모달을 그 안에 둔다.
- 주의: 닫힐 때 모달 안의 모든 `input` 값이 비워진다(`Modal.js` close).

## 클래스 구조

- `.component-modal` > `.modal-dimm` + `.modal-frame` > `.modal-container` >
  `.modal-header`(`.modal-tit`) + `.modal-content`(`.modal-info`) + `.modal-close.btn`
- 하단 버튼이 필요하면 `.modal-content` 뒤에 `.btn-group`(`.btn`)을 둔다. `.btn-group`은 모달 내부
  한정이고, 그 외 영역의 버튼 그룹은 `component-button`의 `.component-btns`를 쓴다.
- `.btn.btn-close`는 회색 버튼 스타일일 뿐 닫기 동작이 없다. 하단 버튼으로 닫아야 하면
  `.modal-close`를 함께 주거나 클릭 시 `.ui.close()`를 호출한다.

## 크기·위치 변형

- `.modal-full`: 전체 화면 모달
- `.modal-bottom`: 바텀시트. 상단에 `.modal-slide`(`.slide-bar`) 핸들을 둔다. 핸들은 스타일만 있고
  드래그 동작 JS는 없다.

```html
<div class="component-modal modal02 modal-bottom">...</div>
```

## 접근성 (JS가 자동 처리)

`Modal.js`가 자동으로 처리하므로 마크업에서 별도로 추가하지 않는다. 아래 속성은 초기화 시 붙는다.

- `role="dialog"`, `aria-modal="true"`, 고유 `id`
- `.modal-tit`에 `id`를 부여하고 모달 루트에 `aria-labelledby`로 연결
- `focus-trap`으로 포커스를 모달 안에 가두고, 닫히면 트리거로 포커스를 되돌린다.
- 열려 있는 동안 배경 스크롤을 잠그고, 여러 레이어가 겹치면 딤 투명도를 자동 보정한다(아래 참고).

## 주의: 가이드 예시의 오타

`src/guide/pages/components/modal.html`의 Basic Modal 복사용 코드(textarea)는 래퍼 클래스를
`laywer-wrap`(오타)으로 쓰고 있다(미리보기 영역은 정상 철자). 실제로 여러 레이어(모달·다이얼로그)의 딤 투명도를 계산하는
`useLayer.js`는 `.layer-wrap`(정상 철자)을 찾는다. 새 코드에서는 `layer-wrap`을 쓴다. 가이드
페이지 자체의 오타이므로 그대로 복사하지 않는다.

## 관련

- 확인/경고성 팝업은 모달이 아니라 `.component-dialog`(`Dialog.js`, 스타일은 `_alert.scss`. `_dialog.scss`는 빈 파일이다) 컴포넌트를
  쓴다. 필요하면 `src/guide/pages/components/dialog.html`을 확인한다(이 스킬 범위 밖).
