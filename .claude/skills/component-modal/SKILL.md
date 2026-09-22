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
- `.modal-close` 클래스가 있는 버튼은 별도 스크립트 없이 자동으로 닫기 이벤트가 바인딩된다.
- `data-props-dimm-click="true"`면 딤 영역 클릭으로도 닫힌다.

## 클래스 구조

- `.component-modal` > `.modal-dimm` + `.modal-frame` > `.modal-container` >
  `.modal-header`(`.modal-tit`) + `.modal-content`(`.modal-info`) + `.modal-close.btn`
- 하단 버튼이 필요하면 `.modal-content` 뒤에 `.btn-group`(`.btn`, 닫기 버튼은 `.btn.btn-close`)을
  둔다.

## 크기·위치 변형

- `.modal-full`: 전체 화면 모달
- `.modal-bottom`: 바텀시트. `.modal-slide`(`.slide-bar`) 드래그 핸들을 상단에 둔다.

```html
<div class="component-modal modal02 modal-bottom">...</div>
```

## 접근성 (JS가 자동 처리)

`Modal.js`가 열릴 때 자동으로 처리하므로 마크업에서 별도로 추가하지 않는다.

- `role="dialog"`, `aria-modal="true"`, 고유 `id"`
- `.modal-tit`에 `id`를 부여하고 모달 루트에 `aria-labelledby`로 연결
- `focus-trap`으로 포커스를 모달 안에 가두고, 닫히면 트리거로 포커스를 되돌린다.
- 열려 있는 동안 배경 스크롤을 잠그고, 여러 레이어가 겹치면 딤 투명도를 자동 보정한다(아래 참고).

## 주의: 가이드 예시의 오타

`src/guide/pages/components/modal.html`의 라이브 예시 코드는 래퍼 클래스를
`laywer-wrap`(오타)으로 쓰고 있다. 실제로 여러 레이어(모달·다이얼로그)의 딤 투명도를 계산하는
`useLayer.js`는 `.layer-wrap`(정상 철자)을 찾는다. 새 코드에서는 `layer-wrap`을 쓴다. 가이드
페이지 자체의 오타이므로 그대로 복사하지 않는다.

## 관련

- 확인/경고성 팝업은 모달이 아니라 `.component-dialog`(`Dialog.js`, 스타일은 `_alert.scss`. `_dialog.scss`는 빈 파일이다) 컴포넌트를
  쓴다. 필요하면 `src/guide/pages/components/dialog.html`을 확인한다(이 스킬 범위 밖).
