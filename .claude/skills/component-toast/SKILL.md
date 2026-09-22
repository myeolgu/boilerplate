---
name: component-toast
description: 하단 토스트 메시지(component-toast, etUI.dialog.toast* API)를 사용하는 방법을 안내한다. 짧은 결과 알림이 필요할 때 사용한다.
---

# Toast

`.toast-wrap`에 붙는 짧은 하단 알림이다. 구현: `src/assets/scripts/ui/components/Toast.js`, 호출
API: `src/assets/scripts/ui/hooks/useDialog.js`의 `etUI.dialog.toast*`. 스타일:
`src/assets/styles/components/_toast.scss`. 가이드: `src/guide/pages/components/snackbar.html`
("Toast" 섹션).

## 준비: toast-wrap

`component-dialog`와 달리 toast는 `.toast-wrap` 요소를 자동으로 만들어주지 않는다. 페이지에 미리
빈 컨테이너를 둬야 한다. 없으면 에러 없이 아무것도 표시되지 않는다.

```html
<div class="toast-wrap"></div>
```

## 기본 토스트

```html
<!-- btn-save는 공통 스타일 클래스가 아니라 스크립트에서 트리거를 찾기 위한 페이지 전용 클래스 -->
<button type="button" class="btn btn-save">
  <span class="btn-txt">저장</span>
</button>

<script>
  document.querySelector('.btn-save').addEventListener('click', () => {
    etUI.dialog.toastBasic({
      message: 'confirm message',
    });
  });
</script>
```

## 닫기 버튼이 있는 토스트

```html
<script>
  etUI.dialog.toastCloseBtn({
    message: 'confirm message',
    closeText: '닫기',
  });
</script>
```

- `closeText`는 기본값이 없어 생략하면 버튼에 "undefined"가 표시되므로 반드시 지정한다.

## 링크 버튼이 있는 토스트

```html
<script>
  etUI.dialog.toastLinkBtn({
    message: 'confirm message',
    link: '/',
  });
</script>
```

- 링크 버튼 문구는 템플릿에 "링크"로 고정돼 있고 바꾸는 옵션이 없다.

## 클래스 구조 (JS가 자동 생성)

- `.toast-wrap` > `.component-toast`(토스트마다 생성) > `.toast-container` > `.toast-content`
  (`.toast-txt`, 필요시 `.toast-close-btn`/`.toast-link-btn`)
- 가이드의 `.toast-trigger-btn`은 가이드 데모용 트리거 스타일이다. 실제 화면의 트리거 버튼은
  `component-button`의 `.btn` + `.btn-txt` 구조를 쓴다.

## 참고: snackbar와의 관계

가이드에는 "Snackbar"라는 이름의 유사한 데모도 있지만, 그건 공용 JS 컴포넌트가 아니라 페이지에
직접 작성한 예시 스크립트다(`component-snackbar` 스킬 참고). 새로 만드는 화면에서 하단 알림이
필요하면 공용 API가 있는 이 `toast`를 기본으로 쓴다.
