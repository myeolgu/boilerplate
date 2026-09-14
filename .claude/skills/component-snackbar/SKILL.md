---
name: component-snackbar
description: 스낵바(component-snackbar) 마크업이 왜 공용 JS 컴포넌트가 아닌지, 새 화면에는 언제 component-toast를 대신 써야 하는지 안내한다.
---

# Snackbar (레거시, 신규 화면에는 비권장)

`_snackbar.scss`(`src/assets/styles/components/_snackbar.scss`)에 스타일은 남아 있지만, 이
클래스를 초기화하는 공용 JS 컴포넌트는 없다. `initUI()`의 컴포넌트 목록(`src/assets/scripts/ui/
init.js`)에도, `etUI.dialog`(`useDialog.js`)의 API에도 snackbar 항목이 없다. 저장소 전체에서
`snackbar`를 다루는 JS는 가이드 페이지(`src/guide/pages/components/snackbar.html`)에 직접 작성된
예시 스크립트 하나뿐이다.

## 새 화면에서는

같은 목적(하단 알림)의 실제 공용 컴포넌트는 `component-toast`(`etUI.dialog.toastBasic` 등)다.
새로 만드는 화면에서 하단 알림이 필요하면 `component-toast`를 사용한다.

디자인이 `snackbar-*` 클래스 스타일을 명시적으로 지정했거나 기존 스낵바 화면을 유지·수정해야
하는 경우에만 아래 패턴을 참고한다.

## 기존 패턴 (가이드 페이지의 수동 구현)

```html
<button type="button" data-snackbar="snackbar1" class="btn btn-snackbar">Show Snackbar1</button>

<div class="component-snackbar"></div>

<script>
  document.querySelectorAll('.btn-snackbar').forEach((button) => {
    button.addEventListener('click', () => {
      const container = document.querySelector('.component-snackbar');
      const newSnackbar = document.createElement('div');
      newSnackbar.className = 'snackbar-container type01';
      const innerSnackbar = document.createElement('div');
      innerSnackbar.className = 'snackbar-content';
      const snackbarText = document.createElement('p');
      snackbarText.className = 'snackbar-txt';
      snackbarText.textContent = '스낵바 팝업에 표시될 문장입니다.';
      innerSnackbar.appendChild(snackbarText);
      newSnackbar.appendChild(innerSnackbar);
      container.appendChild(newSnackbar);
      // 일정 시간 후 제거하는 로직은 화면 요구에 맞게 직접 작성한다.
    });
  });
</script>
```

- 이 패턴은 공용 컴포넌트가 아니라 화면마다 직접 구현하는 예시이므로, 자동 닫힘·중첩 처리 같은
  세부 동작은 요구사항에 맞게 새로 작성해야 한다. 추측으로 채우지 말고 필요한 동작을 확인한다.

## 클래스 구조

- `.component-snackbar`(컨테이너) > `.snackbar-container`(`.type01` 등 변형) >
  `.snackbar-content` > `.snackbar-txt`
- 트리거 버튼: `.btn-snackbar`
