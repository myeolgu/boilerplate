---
name: component-snackbar
description: 스낵바(component-snackbar) 마크업이 왜 공용 JS 컴포넌트가 아닌지, 새 화면에는 언제 component-toast를 대신 써야 하는지 안내한다.
---

# Snackbar (레거시, 신규 화면에는 비권장)

`_snackbar.scss`(`src/assets/styles/components/_snackbar.scss`)에 스타일은 남아 있지만, 이
클래스를 초기화하는 공용 JS 컴포넌트는 없다. `initUI()`의 컴포넌트 목록(`src/assets/scripts/ui/
init.js`)에도, `etUI.dialog`(`useDialog.js`)의 API에도 snackbar 항목이 없다. 저장소 전체에서
`snackbar`를 다루는 JS는 가이드 페이지(`src/guide/pages/components/snackbar.html`,
`src/guide/pages/components/element/snackbar.html`)에 직접 작성된 예시 스크립트뿐이다.

## 새 화면에서는

같은 목적(하단 알림)의 실제 공용 컴포넌트는 `component-toast`(`etUI.dialog.toastBasic` 등)다.
새로 만드는 화면에서 하단 알림이 필요하면 `component-toast`를 사용한다.

디자인이 `snackbar-*` 클래스 스타일을 명시적으로 지정했거나 기존 스낵바 화면을 유지·수정해야
하는 경우에만 아래 패턴을 참고한다.

## 기존 패턴 (가이드 페이지의 수동 구현)

```html
<button type="button" data-snackbar="snackbar1" class="btn btn-snackbar">
  <span class="btn-txt">Show Snackbar1</span>
</button>

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

      // .snackbar-container는 기본으로 translate3d(0, 30px, 0) 상태라 등장 애니메이션(y: 0)이 필요하다.
      // 가이드와 같은 GSAP 타임라인(등장 → 3초 뒤 퇴장 → 제거). 표시 시간 등은 화면 요구에 맞게 조정한다.
      gsap
        .timeline()
        .to(newSnackbar, { duration: 0.5, y: 0 })
        .to(newSnackbar, { duration: 0.5, delay: 3, y: 30 })
        .to(newSnackbar, { duration: 0.2, opacity: 0.2, onComplete: () => newSnackbar.remove() }, '-=0.5');
    });
  });
</script>
```

- 이 패턴은 공용 컴포넌트가 아니라 화면마다 직접 구현하는 예시이므로, 위 타임라인은 가이드 기본값일
  뿐이다. 표시 시간·중첩 처리 같은 세부 동작은 추측으로 채우지 말고 필요한 동작을 확인해 맞춘다.
  GSAP이 페이지에 로드돼 있어야 한다(가이드는 CDN으로 불러온다).

## 클래스 구조

- `.component-snackbar`(컨테이너) > `.snackbar-container`(`.type01` 등 변형) >
  `.snackbar-content` > `.snackbar-txt`
- 트리거 버튼: 가이드의 `.btn-snackbar`는 가이드 데모용 트리거 스타일이다. 실제 화면의 트리거 버튼은
  `component-button`의 `.btn` + `.btn-txt` 구조를 쓴다.
