---
name: component-dialog
description: alert/confirm/이미지 미리보기 팝업(component-dialog)을 etUI.dialog API로 여는 방법을 안내한다. 확인·경고 팝업이 필요할 때 사용한다. "alert"으로 요청받아도 이 스킬을 따른다.
---

# Dialog (Alert / Confirm)

이 프로젝트에서 "alert"과 "dialog"는 같은 컴포넌트다. 클래스는 `.component-dialog`이고, 구현은
`src/assets/scripts/ui/components/Dialog.js` + `src/assets/scripts/ui/hooks/useDialog.js` +
`src/assets/scripts/ui/templates/dialogTmpl.js`다. 마크업을 직접 쓰지 않고 JS 호출만으로 팝업이
동적으로 생성된다. 가이드: `src/guide/pages/components/dialog.html`
(`src/guide/pages/components/element/alert.html`은 레이아웃·예시 구성이 다른 구버전 데모 페이지이므로
`dialog.html`을 기준으로 한다).

스타일은 `_dialog.scss`가 아니라 `src/assets/styles/components/_alert.scss`에 있다(파일명과
클래스명이 어긋난 실제 프로젝트 상태이니 새로 옮기지 않는다).

## 준비: layer-wrap

팝업이 들어갈 자리로 페이지 어딘가에 빈 `<div class="layer-wrap"></div>`를 둔다. 없으면
`etUI.dialog`가 자동으로 만들어 `body`에 붙이므로, 반드시 필요한 건 아니지만 명시적으로 두는
쪽을 기본으로 한다.

```html
<div class="layer-wrap"></div>
```

## Alert

```html
<button type="button" class="btn btn-alert-open">
  <span class="btn-txt">Alert</span>
</button>

<script>
  document.querySelector('.btn-alert-open').addEventListener('click', () => {
    etUI.dialog.alert({
      title: 'alert title',
      message: 'alert message',
      callback: () => {
        console.log('alert callback');
      },
    });
  });
</script>
```

- 문자열만 필요하면 `etUI.dialog.alert('메시지', callback)`처럼 축약 호출도 된다.
- `title`은 선택이다. 없으면 `.dialog-tit`가 생성되지 않고 빈 `.dialog-header`만 남는다(header를
  숨기는 CSS 규칙은 없다).
- `callback`은 확인(positive) 버튼을 눌렀을 때만 실행된다. 딤 클릭·ESC·닫기 버튼으로 닫으면 실행되지
  않는다(이 경로는 `negativeCallback`을 탄다).
- 그 밖의 옵션: `positiveText`(버튼 문구, 기본 "확인"), `type`(`'alert'` 기본, `'error'`/`'info'`),
  `dimmClick`(딤 클릭으로 닫기, 기본 `true`), `esc`(ESC로 닫기, 기본 `true`).
- 주의: alert은 `.dialog-content` 안에 `<span class="{type}">icon</span>`을 항상 넣는데,
  `.alert`/`.error`/`.info` 스타일이 프로젝트 SCSS에 없어 "icon" 글자가 그대로 보일 수 있다(코드 판독
  기준). 아이콘이 디자인에 있으면 해당 클래스 스타일을 따로 정의해야 한다.

## Confirm

```html
<button type="button" class="btn btn-confirm-open">
  <span class="btn-txt">Confirm</span>
</button>

<script>
  document.querySelector('.btn-confirm-open').addEventListener('click', () => {
    etUI.dialog.confirm({
      title: 'confirm title',
      message: 'confirm message',
      negativeText: '취소',
      positiveText: '확인',
      negativeCallback: () => {},
      positiveCallback: () => {},
    });
  });
</script>
```

- 축약형: `etUI.dialog.confirm('메시지', positiveCallback)`.
- `negativeText`/`positiveText`를 생략하면 기본값 "취소"/"확인"이 쓰인다.

## 이미지 미리보기

```html
<script>
  etUI.dialog.previewImage({
    title: '이미지 제목',
    images: [
      { src: 'https://...', alt: '설명1' },
      { src: 'https://...', alt: '설명2' },
    ],
  });
</script>
```

내부적으로 `.component-swiper`를 사용해 이미지를 슬라이드로 보여준다.

## 클래스 구조 (JS가 자동 생성, 직접 마크업하지 않음)

- `.component-dialog` > `.dialog-dimm` + `.dialog-frame` > `.dialog-container` >
  `.dialog-header`(`.dialog-tit`) + `.dialog-content`(alert은 `span.{type}` + `.dialog-info`) +
  `.btn-group`(`.dialog-negative`, `.dialog-positive`) + `.dialog-close`(alert·이미지 미리보기의 닫기
  버튼. 스타일이 `_alert.scss`에서 주석 처리돼 있어 현재 스타일 없음)

## 참고

- `dialogType`은 호출한 API에 따라 `alert`/`confirm`/`previewImage`로 자동 설정되므로 직접 지정하지
  않는다.
- 여러 레이어(모달+다이얼로그)가 동시에 열리면 `useLayer.js`가 딤 투명도를 자동으로 보정한다.
- 주의: 다이얼로그를 동시에 두 개 열지 않는다. 모든 다이얼로그가 같은 `.layer-wrap`을 공유해, 하나가
  열린 상태에서 다시 호출하면 초기화가 건너뛰어져 에러가 날 수 있다(코드 판독 기준). 연속으로 띄워야
  하면 앞 다이얼로그의 콜백 안에서 다음 것을 연다(콜백은 닫힘 처리 후 실행된다).
