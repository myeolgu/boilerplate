/**
 * 개인정보처리방침 템플릿 관리
 * 단축키:
 * - Alt + P: 팝업 열기
 * - Alt + G: 코드 생성
 * - Alt + C: 항목 삭제
 */
/* global window, document, alert, Event */
(function () {
  'use strict';

  // 모달 HTML 구조 생성
  function createPrivacyPolicyModal() {
    const modalHTML = `
      <style>
        /* 리스트 스타일 */
        .policy-list {
          padding-left: 20px;
        }

        /* 불릿 리스트 */
        ul.policy-list:not(.hyphen-list) li {
          list-style-type: disc;
        }

        /* 번호 리스트 */
        ol.policy-list li {
          list-style-type: decimal;
        }

        /* 하이픈 리스트 */
        .hyphen-list li {
          list-style-type: none !important;
          position: relative;
          padding-left: 15px;
        }

        .hyphen-list li:before {
          content: '-';
          position: absolute;
          left: 0;
        }

        /* 박스 스타일 */
        .box-style {
          background-color: #f8f8f8;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 10px;
          margin-top: 5px;
        }

        /* 서식 툴바 스타일 */
        .formatting-toolbar {
          display: flex;
          gap: 5px;
          margin-bottom: 5px;
          padding: 5px;
          background-color: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .formatting-toolbar button {
          padding: 3px 8px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
        }

        .formatting-toolbar button:hover {
          background-color: #f0f0f0;
        }

        .formatting-toolbar button.active {
          background-color: #e0e0e0;
        }

        /* 요소 추가 섹션 스타일 */
        .elements-section {
          margin-bottom : 20px;
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .elements-section h4 {
          margin: 0 0 10px 0;
          font-size: 14px;
          font-weight: bold;
        }

        .elements-buttons {
          display: flex;
          gap: 10px;
        }

        .element-dialog {
          margin-top: 10px;
          padding: 10px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .element-dialog label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .element-dialog input {
          width: 100%;
          padding: 5px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
          border-radius: 3px;
        }
      </style>
      <div class="component-modal privacy-policy-modal" id="privacyPolicyModal">
        <div class="modal-dimm"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h2 class="modal-tit">개인정보처리방침 템플릿</h2>
          </div>
          <div class="modal-content">
            <div class="template-controls">
              <div class="template-type">
                <label>템플릿 유형:</label>
                <div class="component-select">
                  <select id="templateType" class="select-list">
                    <option value="title">타이틀</option>
                    <option value="list">리스트</option>
                    <option value="box">박스</option>
                  </select>
                </div>
              </div>
              <div id="listTypeContainer" style="display: none; margin-bottom: 10px;">
                <div class="template-type">
                  <label>리스트 유형:</label>
                  <div class="component-select">
                    <select id="listType" class="select-list">
                      <option value="ul">불릿 리스트</option>
                      <option value="ol">번호 리스트</option>
                      <option value="hyphen">하이픈 리스트</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="template-input">
                <div class="input-group">
                  <label for="itemTitle">제목:</label>
                  <div class="component-input" data-props-clear="true">
                    <div class="input-field">
                      <input type="text" id="itemTitle" placeholder="제목을 입력하세요">
                    </div>
                  </div>
                </div>
                <div class="input-group">
                  <label for="itemContent">내용:</label>
                  <div class="formatting-toolbar">
                    <button type="button" id="boldBtn" title="굵게"><strong>B</strong></button>
                    <button type="button" id="italicBtn" title="기울임"><em>I</em></button>
                    <button type="button" id="underlineBtn" title="밑줄"><u>U</u></button>
                  </div>
                  <div class="component-input">
                    <div class="input-field">
                      <textarea id="itemContent" placeholder="내용을 입력하세요"></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="template-buttons">
                <button id="addItem" class="btn">미리 보기</button>
                <button id="deleteItem" class="btn btn-close">초기화</button>
              </div>
            </div>
            <div class="template-preview">
              <div id="previewContainer"></div>
            </div>
            <div class="elements-section">
              <h4>요소 추가</h4>
              <div class="elements-buttons">
                <button type="button" id="addButtonElement" class="btn btn-sm">버튼 추가</button>
                <button type="button" id="addLinkElement" class="btn btn-sm">링크 추가</button>
              </div>
              <div id="buttonElementDialog" class="element-dialog" style="display: none;">
                <label for="buttonText">버튼 텍스트:</label>
                <input type="text" id="buttonText" placeholder="버튼에 표시할 텍스트">
                <label for="buttonClass">버튼 클래스 (선택사항):</label>
                <input type="text" id="buttonClass" placeholder="예: btn btn-primary">
                <div class="location-checkboxes">
                  <div class="component-input">
                    <label class="checkbox-inner">
                      <input type="checkbox" id="addToList" name="addToList">
                      <span class="checkbox-item">
                        <span class="checkbox-txt">List 요소에 추가</span>
                      </span>
                    </label>
                  </div>
                  <div class="component-input">
                    <label class="checkbox-inner">
                      <input type="checkbox" id="addToContent" name="addToContent">
                      <span class="checkbox-item">
                        <span class="checkbox-txt">Content 요소에 추가</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div class="dialog-buttons">
                  <button type="button" id="insertButtonElement" class="btn btn-sm">추가</button>
                  <button type="button" id="cancelButtonElement" class="btn btn-sm btn-close">취소</button>
                </div>
              </div>
              <div id="linkElementDialog" class="element-dialog" style="display: none;">
                <label for="linkText">링크 텍스트:</label>
                <input type="text" id="linkText" placeholder="링크에 표시할 텍스트">
                <label for="linkUrl">링크 URL:</label>
                <input type="text" id="linkUrl" placeholder="예: https://example.com">
                <div class="dialog-buttons">
                  <button type="button" id="insertLinkElement" class="btn btn-sm">추가</button>
                  <button type="button" id="cancelLinkElement" class="btn btn-sm btn-close">취소</button>
                </div>
              </div>
            </div>
            <div class="template-code">
              <h3>생성된 코드</h3>
              <div class="component-input">
                <div class="input-field">
                  <textarea id="generatedCode" readonly></textarea>
                </div>
              </div>
              <button id="addCode" class="btn">코드 생성</button>
            </div>
          </div>
          <div class="btn-group">
            <button class="btn btn-close modal-close-btn">닫기</button>
            <button class="btn copy-code-btn">코드 복사</button>
          </div>
          <button type="button" class="modal-close"></button>
        </div>
      </div>
    `;

    // 모달 HTML을 body에 추가
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // 모달 초기화 및 이벤트 바인딩
  function initPrivacyPolicyModal() {
    const modal = document.getElementById('privacyPolicyModal');
    if (!modal) {
      createPrivacyPolicyModal();
      bindModalEvents();
    }
  }

  // HTML 태그를 그대로 유지하는 함수 (이전의 마크다운 변환 함수 대체)
  function preserveHTMLTags(text) {
    if (!text) {return text;}
    return text;
  }

  // 서식 옵션 버튼 이벤트 처리
  function setupFormattingToolbar() {
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');
    const contentTextarea = document.getElementById('itemContent');

    if (!boldBtn || !italicBtn || !underlineBtn || !contentTextarea) {return;}

    // 굵게 버튼 클릭 이벤트
    boldBtn.addEventListener('click', () => {
      applyFormatting('bold');
    });

    // 기울임 버튼 클릭 이벤트
    italicBtn.addEventListener('click', () => {
      applyFormatting('italic');
    });

    // 밑줄 버튼 클릭 이벤트
    underlineBtn.addEventListener('click', () => {
      applyFormatting('underline');
    });

    // 요소 추가 버튼 이벤트 처리
    setupElementsButtons();

    // 서식 적용 함수
    function applyFormatting(format) {
      const textarea = contentTextarea;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      let formattedText = '';

      if (selectedText) {
        switch (format) {
          case 'bold':
            formattedText = `<strong class="strong">${selectedText}</strong>`;
            break;
          case 'italic':
            formattedText = `<em class="italic">${selectedText}</em>`;
            break;
          case 'underline':
            formattedText = `<u class="underline">${selectedText}</u>`;
            break;
        }

        // 선택한 텍스트를 서식이 적용된 텍스트로 교체
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);

        // 커서 위치 재설정
        textarea.focus();
        textarea.selectionStart = start + formattedText.length;
        textarea.selectionEnd = start + formattedText.length;
      }
    }
  }

  // 요소 추가 버튼 이벤트 처리
  function setupElementsButtons() {
    const contentTextarea = document.getElementById('itemContent');
    const addButtonElement = document.getElementById('addButtonElement');
    const addLinkElement = document.getElementById('addLinkElement');
    const buttonElementDialog = document.getElementById('buttonElementDialog');
    const linkElementDialog = document.getElementById('linkElementDialog');
    const insertButtonElement = document.getElementById('insertButtonElement');
    const cancelButtonElement = document.getElementById('cancelButtonElement');
    const insertLinkElement = document.getElementById('insertLinkElement');
    const cancelLinkElement = document.getElementById('cancelLinkElement');

    // 버튼 추가 대화상자 열기
    addButtonElement.addEventListener('click', () => {
      buttonElementDialog.style.display = 'block';
      linkElementDialog.style.display = 'none';
      document.getElementById('buttonText').focus();
    });

    // 링크 추가 대화상자 열기
    addLinkElement.addEventListener('click', () => {
      linkElementDialog.style.display = 'block';
      buttonElementDialog.style.display = 'none';
      document.getElementById('linkText').focus();
    });

    // 버튼 추가 처리
    insertButtonElement.addEventListener('click', () => {
      const buttonText = document.getElementById('buttonText').value.trim();
      const buttonClass = document.getElementById('buttonClass').value.trim();
      const addToList = document.getElementById('addToList').checked;
      const addToContent = document.getElementById('addToContent').checked;

      if (!buttonText) {
        alert('버튼 텍스트를 입력해주세요.');
        return;
      }

      const buttonHTML = buttonClass
        ? `<button class="${buttonClass}">${buttonText}</button>`
        : `<button class="btn">${buttonText}</button>`;

      if (addToList) {
        if (document.querySelector('.policy-list')) {
          // policy-list에 추가하는 로직
          const listElement = document.createElement('li');
          listElement.innerHTML = buttonHTML;
          document.querySelector('.policy-list').appendChild(listElement);
        }
      } else if (addToContent) {
        if (document.querySelector('.policy-content')) {
          // policy-content 자식 요소로 추가하는 로직
          const buttonElement = document.createElement('div');
          buttonElement.innerHTML = buttonHTML;
          document.querySelector('.policy-content').appendChild(buttonElement);
        }
      } else {
        // policy-item 자식 요소로 추가하는 로직
        if (document.querySelector('.policy-item')) {
          const buttonElement = document.createElement('div');
          buttonElement.innerHTML = buttonHTML;
          document.querySelector('.policy-item').appendChild(buttonElement);
        }
      }

      if (templateItems.length > 0) {
        const lastItem = templateItems[templateItems.length - 1];

        if (addToList || addToContent) {
          // 리스트 요소에 추가
          if (lastItem.type === 'list' || lastItem.type === 'box') {
            // 이미 있는 리스트 내용에 새 리스트 아이템 또는 내용에 추가
            lastItem.content += `\n${  buttonHTML}`;
          }
        } else {
          // 기본 위치에 추가 (체크박스 선택 없을 때)
          if (!lastItem.buttonHTML) {
            lastItem.buttonHTML = buttonHTML;
          } else {
            lastItem.buttonHTML += `\n${  buttonHTML}`;
          }
        }
      }

      buttonElementDialog.style.display = 'none';
      document.getElementById('buttonText').value = '';
      document.getElementById('buttonClass').value = '';
    });

    // 링크 추가 처리 함수 수정
    insertLinkElement.addEventListener('click', () => {
      const linkText = document.getElementById('linkText').value.trim();
      const linkUrl = document.getElementById('linkUrl').value.trim();

      if (!linkText) {
        alert('링크 텍스트를 입력해주세요.');
        return;
      }

      if (!linkUrl) {
        alert('링크 URL을 입력해주세요.');
        return;
      }

      const linkHTML = `<a href="${linkUrl}">${linkText}</a>`;

      insertAtCursor(contentTextarea, linkHTML);

      // templateItems 배열 업데이트 - textarea의 새 값으로 업데이트
      if (templateItems.length > 0) {
        // 현재 선택된 항목이 없으면 가장 최근 항목 업데이트
        const lastItem = templateItems[templateItems.length - 1];
        lastItem.content = contentTextarea.value;
      }

      linkElementDialog.style.display = 'none';
      document.getElementById('linkText').value = '';
      document.getElementById('linkUrl').value = '';
    });

    // 버튼 추가 취소
    cancelButtonElement.addEventListener('click', () => {
      buttonElementDialog.style.display = 'none';
      document.getElementById('buttonText').value = '';
      document.getElementById('buttonClass').value = '';
    });

    // 링크 추가 처리
    insertLinkElement.addEventListener('click', () => {
      const linkText = document.getElementById('linkText').value.trim();
      const linkUrl = document.getElementById('linkUrl').value.trim();

      if (!linkText) {
        alert('링크 텍스트를 입력해주세요.');
        return;
      }

      if (!linkUrl) {
        alert('링크 URL을 입력해주세요.');
        return;
      }

      const linkHTML = `<a href="${linkUrl}">${linkText}</a>`;

      insertAtCursor(contentTextarea, linkHTML);
      linkElementDialog.style.display = 'none';
      document.getElementById('linkText').value = '';
      document.getElementById('linkUrl').value = '';
    });

    // 링크 추가 취소
    cancelLinkElement.addEventListener('click', () => {
      linkElementDialog.style.display = 'none';
      document.getElementById('linkText').value = '';
      document.getElementById('linkUrl').value = '';
    });

    // 커서 위치에 텍스트 삽입
    function insertAtCursor(textarea, text) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);

      // 커서 위치 재설정
      textarea.focus();
      textarea.selectionStart = start + text.length;
      textarea.selectionEnd = start + text.length;
    }
  }

  // 모달 이벤트 바인딩
  function bindModalEvents() {
    const modal = document.getElementById('privacyPolicyModal');
    const modalDimm = modal.querySelector('.modal-dimm');
    const modalContainer = modal.querySelector('.modal-container');
    const closeBtn = modal.querySelector('.modal-close');
    const closeBtnFooter = modal.querySelector('.modal-close-btn');
    const addItemBtn = document.getElementById('addItem');
    const addCodeBtn = document.getElementById('addCode');
    const deleteItemBtn = document.getElementById('deleteItem');
    const copyCodeBtn = modal.querySelector('.copy-code-btn');
    const templateTypeSelect = document.getElementById('templateType');

    // 템플릿 항목 데이터
    // const templateItems = [];

    // 모달 닫기 함수
    const closeModal = () => {
      modalDimm.style.display = 'none';
      modalContainer.style.display = 'none';
      modal.style.display = 'none';
    };

    // 모달 열기 함수
    const openModal = () => {
      modal.style.display = 'block';
      modalDimm.style.display = 'block';
      modalContainer.style.display = 'flex';
    };

    // 닫기 버튼 이벤트
    closeBtn.addEventListener('click', closeModal);
    closeBtnFooter.addEventListener('click', closeModal);
    modalDimm.addEventListener('click', closeModal);

    // 템플릿 유형 변경 이벤트
    templateTypeSelect.addEventListener('change', () => {
      // 템플릿 유형 변경 시 모든 입력 필드 초기화
      // 1. 입력 필드 초기화
      document.getElementById('itemTitle').value = ''; // 제목 초기화
      document.getElementById('itemContent').value = ''; // 내용 초기화

      // 2. 템플릿 항목 데이터 초기화
      templateItems.length = 0;

      // 3. 미리보기 초기화
      updatePreview();

      // 4. 생성된 코드 초기화
      document.getElementById('generatedCode').value = '';

      // 5. 예시 업데이트 (템플릿 유형에 따라 예시 변경)
      const titleInput = document.getElementById('itemTitle');
      const contentInput = document.getElementById('itemContent');
      const templateType = templateTypeSelect.value;
      const listTypeContainer = document.getElementById('listTypeContainer');

      // 리스트 유형 선택 옵션 표시/숨김
      if (templateType === 'title') {
        document.querySelector('.elements-section').style.display = 'none';
      } else if (templateType === 'list') {
        listTypeContainer.style.display = 'block';
        document.querySelector('.elements-section').style.display = 'block';
        document.getElementById('addToList').parentElement.parentElement.style.display = 'block';
        document.getElementById('addToContent').parentElement.parentElement.style.display = 'none';
      } else {
        listTypeContainer.style.display = 'none';
        document.querySelector('.elements-section').style.display = 'block';
        document.getElementById('addToList').parentElement.parentElement.style.display = 'none';
        document.getElementById('addToContent').parentElement.parentElement.style.display = 'block';
      }

      switch (templateType) {
        case 'title':
          titleInput.placeholder = '타이틀';
          contentInput.placeholder = '내용 없음';
          break;
        case 'list':
          titleInput.placeholder = '타이틀';
          contentInput.placeholder = '내용';
          break;
        case 'box':
          titleInput.placeholder = '타이틀';
          contentInput.placeholder = '내용';
          break;
      }
    });

    // 미리 보기 및 코드 생성 버튼 이벤트
    addItemBtn.addEventListener('click', () => {
      addTemplateItem();
      // generateTemplateCode();
    });

    // 미리 보기 및 코드 생성 버튼 이벤트
    addCodeBtn.addEventListener('click', () => {
      // addTemplateItem();
      generateTemplateCode();
    });

    // 초기화 버튼 이벤트
    deleteItemBtn.addEventListener('click', () => {
      resetTemplateItems();
    });

    // 코드 복사 버튼 이벤트
    copyCodeBtn.addEventListener('click', () => {
      const generatedCode = document.getElementById('generatedCode');
      generatedCode.select();
      document.execCommand('copy');
      alert('코드가 클립보드에 복사되었습니다.');
    });

    // 템플릿 항목 추가 함수
    function addTemplateItem() {
      const titleInput = document.getElementById('itemTitle');
      const contentInput = document.getElementById('itemContent');
      const templateType = document.getElementById('templateType').value;
      const title = titleInput.value.trim();
      let content = contentInput.value.trim();
      let listType = null;

      if (templateType === 'list') {
        // 리스트 유형일 경우 리스트 유형 가져오기
        listType = document.getElementById('listType').value;
      }

      if (templateType === 'title') {
        // 타이틀 유형일 경우 내용 필드 검사 생략
        if (!title) {
          alert('제목을 입력해주세요.');
          return;
        }
        // 타이틀은 내용이 없어도 됨
        content = content || '내용 없음';
      } else {
        // 다른 유형일 경우 제목과 내용 모두 필요
        if (!title || !content) {
          alert('제목과 내용을 모두 입력해주세요.');
          return;
        }
      }

      templateItems.push({
        type: templateType,
        title: title,
        content: content,
        listType: listType,
        buttonHTML: '',
      });
      updatePreview();

      // 입력 필드 초기화
      titleInput.value = '';
      contentInput.value = '';
      titleInput.focus();
    }

    // 템플릿 항목 초기화 함수
    function resetTemplateItems() {
      if (templateItems.length > 0) {
        templateItems.length = 0;
        updatePreview();
        document.getElementById('generatedCode').value = '';
        alert('모든 항목이 초기화되었습니다.');
      } else {
        alert('초기화할 항목이 없습니다.');
      }
    }

    // 미리보기 업데이트 함수
    function updatePreview() {
      const previewContainer = document.getElementById('previewContainer');
      const templateType = document.getElementById('templateType').value;

      let previewHTML = '';

      if (templateItems.length === 0) {
        previewContainer.innerHTML = '<p>미리보기 영역</p>';
        return;
      }

      switch (templateType) {
        case 'title':
          previewHTML = generateFullTitlePreview();
          break;
        case 'list':
          previewHTML = generateListPreview();
          break;
        case 'box':
          previewHTML = generateBoxPreview();
          break;
      }

      previewContainer.innerHTML = previewHTML;
    }

    // 타이틀 미리보기 생성
    function generateFullTitlePreview() {
      let html = '';

      templateItems.forEach((item) => {
        html += '<div class="policy-item">';
        html += `<span class="policy-title">${  item.title  }</span>`;

        // 내용이 '내용 없음'이 아닌 경우에만 policy-content 추가
        if (item.content && item.content !== '내용 없음') {
          html += `<div class="policy-content">${  item.content  }</div>`;
        }
        html += '</div>';
      });

      return html;
    }

    // 미리보기 생성
    function generateListPreview() {
      let html = '';

      templateItems.forEach((item) => {
        html += '<div class="policy-item">';
        html += `<span class="policy-title">${  item.title  }</span>`;

        // 내용이 있는 경우에만 policy-list 추가
        if (item.content && item.content.trim()) {
          const listType = item.listType || 'ul';

          if (listType === 'hyphen') {
            html += '<ul class="policy-list hyphen-list">';
          } else if (listType === 'ol') {
            html += '<ol class="policy-list">';
          } else {
            html += '<ul class="policy-list">';  // 기본값은 ul
          }

          // 중첩 리스트 처리
          const processNestedList = (content) => {
            let result = '';
            const lines = content.split('\n');

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) {continue;}

              // 들여쓰기가 있는지 확인 (탭 또는 공백 2개 이상)
              const indentation = lines[i].match(/^(\s+)/);

              if (indentation && (indentation[1].length >= 2 || indentation[1].includes('\t'))) {
                // 이전 줄이 리스트 아이템이면 중첩 리스트 시작
                if (i > 0 && result.endsWith('</li>')) {
                  // 마지막 </li> 제거
                  result = result.substring(0, result.length - 5);
                  result += '<ul class="nested-list">';
                  result += `<li>${  preserveHTMLTags(line)  }</li>`;

                  // 다음 줄도 들여쓰기가 있는지 확인
                  let j = i + 1;
                  while (j < lines.length &&
                         lines[j].trim() &&
                         lines[j].match(/^(\s+)/) &&
                         (lines[j].match(/^(\s+)/)[1].length >= 2 || lines[j].match(/^(\s+)/)[1].includes('\t'))) {
                    result += `<li>${  preserveHTMLTags(lines[j].trim())  }</li>`;
                    j++;
                  }

                  result += '</ul></li>';
                  i = j - 1; // 다음 반복에서 처리할 인덱스 조정
                } else {
                  result += `<li>${  preserveHTMLTags(line)  }</li>`;
                }
              } else {
                result += `<li>${  line  }</li>`;
              }
            }

            return result;
          };

          html += processNestedList(item.content);
          if (listType === 'ol') {
            html += '</ol>';
          } else {
            html += '</ul>';
          }
        }
        html += '</div>';
      });

      return html;
    }

    // 미리보기 생성
    function generateBoxPreview() {
      let html = '';

      templateItems.forEach((item) => {
        html += '<div class="policy-item">';
        html += `<span class="policy-title">${  item.title  }</span>`;

        // 내용이 있는 경우에만 policy-content 추가
        if (item.content && item.content.trim()) {
          html += `<div class="policy-content box-style">${  item.content  }</div>`;
        }
        html += '</div>';
      });

      return html;
    }

    // 코드 생성 함수
    function generateTemplateCode() {
      const templateType = document.getElementById('templateType').value;
      const generatedCodeElem = document.getElementById('generatedCode');

      if (templateItems.length === 0) {
        alert('생성할 항목이 없습니다. 항목을 먼저 추가해주세요.');
        return;
      }

      let generatedHTML = '';

      switch (templateType) {
        case 'title':
          generatedHTML = generateFullTitleHTML();
          break;
        case 'list':
          generatedHTML = generateListHTML();
          break;
        case 'box':
          generatedHTML = generateBoxHTML();
          break;
      }

      generatedCodeElem.value = generatedHTML;
    }

    // 타이틀 HTML 생성
    function generateFullTitleHTML() {
      let html = '';

      templateItems.forEach((item) => {
        html += '  <div class="policy-item">\n';
        html += `    <span class="policy-title">${  item.title  }</span>\n`;

        // 내용이 '내용 없음'이 아닌 경우에만 policy-content 추가
        if (item.content && item.content !== '내용 없음') {
          html += `    <div class="policy-content">${  item.content  }</div>\n`;
        }

        html += '  </div>\n';
      });

      return html;
    }

    // HTML 생성
    function generateListHTML() {
      let html = '';

      templateItems.forEach((item) => {
        html += '  <div class="policy-item">\n';
        html += `    <span class="policy-title">${  item.title  }</span>\n`;

        // 내용이 있는 경우에만 policy-list 추가
        if (item.content && item.content.trim()) {
          const listType = item.listType || 'ul';

          if (listType === 'hyphen') {
            html += '    <ul class="policy-list hyphen-list">\n';
          } else if (listType === 'ol') {
            html += '    <ol class="policy-list">\n';
          } else {
            html += '    <ul class="policy-list">\n';
          }

          // 중첩 리스트 처리
          const processNestedList = (content) => {
            let result = '';
            const lines = content.split('\n');

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();
              if (!line) {continue;}

              // 들여쓰기가 있는지 확인 (탭 또는 공백 2개 이상)
              const indentation = lines[i].match(/^(\s+)/);

              if (indentation && (indentation[1].length >= 2 || indentation[1].includes('\t'))) {
                // 이전 줄이 리스트 아이템이면 중첩 리스트 시작
                if (i > 0 && result.endsWith('</li>\n')) {
                  // 마지막 </li> 제거
                  result = result.substring(0, result.length - 6);
                  result += '\n        <ul class="nested-list">\n';
                  result += `          <li>${  preserveHTMLTags(line)  }</li>\n`;

                  // 다음 줄도 들여쓰기가 있는지 확인
                  let j = i + 1;
                  while (j < lines.length &&
                         lines[j].trim() &&
                         lines[j].match(/^(\s+)/) &&
                         (lines[j].match(/^(\s+)/)[1].length >= 2 || lines[j].match(/^(\s+)/)[1].includes('\t'))) {
                    result += `          <li>${  preserveHTMLTags(lines[j].trim())  }</li>\n`;
                    j++;
                  }

                  result += '        </ul>\n      </li>\n';
                  i = j - 1; // 다음 반복에서 처리할 인덱스 조정
                } else {
                  result += `      <li>${  line  }</li>\n`;
                }
              } else {
                result += `      <li>${  line  }</li>\n`;
              }
            }

            return result;
          };

          html += processNestedList(item.content);
          if (listType === 'ol') {
            html += '    </ol>\n';
          } else {
            html += '    </ul>\n';
          }
        }

        if (item.buttonHTML) {
          html += `    ${  item.buttonHTML  }\n`;
        }

        html += '  </div>\n';
      });

      return html;
    }

    // HTML 생성
    function generateBoxHTML() {
      let html = '';

      templateItems.forEach((item) => {
        html += '  <div class="policy-item">\n';
        html += `    <span class="policy-title">${  item.title  }</span>\n`;

        // 내용이 있는 경우에만 policy-content 추가
        if (item.content && item.content.trim()) {
          html += `    <div class="policy-content box-style">${  item.content  }</div>\n`;
        }

        if (item.buttonHTML) {
          html += `    ${  item.buttonHTML  }\n`;
        }

        html += '  </div>\n';
      });

      return html;
    }

    // 타입 변경 이벤트
    document.getElementById('templateType').addEventListener('change', function() {
      const templateType = this.value;
      const contentGroup = document.querySelector('.input-group:nth-child(2)');

      // 타이틀 유형일 경우 내용 입력란 숨기기
      if (templateType === 'title') {
        contentGroup.style.display = 'none';
      } else {
        contentGroup.style.display = 'block';
      }

      updatePreview();
    });

    // 단축키 이벤트 리스너는 전역으로 이동했으니 여기서는 삭제
  }

  // 템플릿 유형별 예시 추가
  function addTemplateExamples() {
    const templateType = document.getElementById('templateType');

    // 초기 예시 설정 (기본 타이틀)
    templateType.dispatchEvent(new Event('change'));
  }

  // 전역 변수로 모달 접근할 수 있도록 설정
  let privacyPolicyModal;
  const templateItems = [];

  // 모달 열기 함수 - 전역 스코프로 이동
  function openPrivacyPolicyModal() {
    if (!privacyPolicyModal) {
      initPrivacyPolicyModal();
      privacyPolicyModal = document.getElementById('privacyPolicyModal');
    }

    const modalDimm = privacyPolicyModal.querySelector('.modal-dimm');
    const modalContainer = privacyPolicyModal.querySelector('.modal-container');

    privacyPolicyModal.style.display = 'block';
    modalDimm.style.display = 'block';
    modalContainer.style.display = 'flex';
  }

  // 단축키 이벤트 리스너 - 전역 스코프로 이동
  document.addEventListener('keydown', (e) => {
    // Alt + P: 팝업 열기
    if (e.altKey && e.key === 'p') {
      e.preventDefault();
      openPrivacyPolicyModal();
    }

    // 모달이 열려있을 때만 다른 단축키 활성화
    if (privacyPolicyModal && privacyPolicyModal.style.display === 'block') {
      // Alt + G: 미리 보기 및 코드 생성
      if (e.altKey && e.key === 'g') {
        e.preventDefault();
        const addItemBtn = document.getElementById('addItem');
        if (addItemBtn) {addItemBtn.click();}
      }

      // Alt + C: 초기화
      if (e.altKey && e.key === 'c') {
        e.preventDefault();
        const deleteItemBtn = document.getElementById('deleteItem');
        if (deleteItemBtn) {deleteItemBtn.click();}
      }
    }
  });

  // DOM이 로드된 후 초기화
  document.addEventListener('DOMContentLoaded', () => {
    initPrivacyPolicyModal();
    addTemplateExamples();
    privacyPolicyModal = document.getElementById('privacyPolicyModal');
    setupFormattingToolbar(); // 서식 툴바 초기화
  });
})();
