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
빈 컨테이너를 둬야 한다.

```html
<div class="toast-wrap"></div>
```

## 기본 토스트

```html
<button type="button" class="btn toast-trigger-btn type01">기본 toast</button>

<script>
  document.querySelector('.toast-trigger-btn.type01').addEventListener('click', () => {
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

## 링크 버튼이 있는 토스트

```html
<script>
  etUI.dialog.toastLinkBtn({
    message: 'confirm message',
    link: '/',
  });
</script>
```

## 클래스 구조 (JS가 자동 생성)

- `.toast-wrap` > `.toast-container` > `.toast-content`(`.toast-txt`, 필요시 `.toast-close-btn`/
  `.toast-link-btn`)
- 트리거 버튼 스타일은 `.toast-trigger-btn`을 사용한다.

## 참고: snackbar와의 관계

가이드에는 "Snackbar"라는 이름의 유사한 데모도 있지만, 그건 공용 JS 컴포넌트가 아니라 페이지에
직접 작성한 예시 스크립트다(`component-snackbar` 스킬 참고). 새로 만드는 화면에서 하단 알림이
필요하면 공용 API가 있는 이 `toast`를 기본으로 쓴다.
