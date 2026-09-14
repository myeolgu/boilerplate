/**
 * 함수 호출을 지연시켜 마지막 호출만 실행되도록 하는 debounce 함수
 * @param {Function} callback - 실행할 콜백 함수
 * @param {number} [delay=250] - 지연 시간(ms)
 * @returns {Function} debounced 함수
 * @example
 * const debouncedSearch = debounce((query) => search(query), 300);
 * input.addEventListener('input', (e) => debouncedSearch(e.target.value));
 */
function debounce(callback, delay = 250) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/**
 * 함수 호출을 제한하여 일정 시간 간격으로만 실행되도록 하는 throttle 함수
 * @param {Function} callback - 실행할 콜백 함수
 * @param {number} [delay=250] - 제한 간격(ms)
 * @returns {Function} throttled 함수
 * @example
 * const throttledScroll = throttle(() => handleScroll(), 100);
 * window.addEventListener('scroll', throttledScroll);
 */
function throttle(callback, delay = 250) {
  let isThrottled = false;
  let args;
  let context;

  function wrapper(...wrapperArgs) {
    if (isThrottled) {
      args = wrapperArgs;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, wrapperArgs);
    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }

  return wrapper;
}

/**
 * URL 쿼리 스트링에 디버그 마커가 있는지 확인
 * @returns {boolean} 마커 존재 여부
 */
function isMarkerQS() {
  return location.search.includes('marker121212');
}

/**
 * DOM 엘리먼트에 이벤트를 프로그래밍 방식으로 트리거
 * @param {HTMLElement} el - 대상 엘리먼트
 * @param {string|Event} eventType - 이벤트 타입 또는 Event 객체
 * @example
 * triggerEvent(button, 'click');
 * triggerEvent(input, new Event('change', { bubbles: true }));
 */
function triggerEvent(el, eventType) {
  if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
    el[eventType]();
  } else {
    const event = typeof eventType === 'string' ? new Event(eventType, { bubbles: true }) : eventType;
    el.dispatchEvent(event);
  }
}

/**
 * 에러를 처리하고 사용자에게 피드백을 제공하는 함수
 * @param {Error} error - 발생한 에러 객체
 * @param {Object} [options] - 에러 처리 옵션
 * @param {string} [options.context] - 에러 발생 컨텍스트 (컴포넌트명 등)
 * @param {boolean} [options.silent=false] - true일 경우 사용자 알림 없이 로깅만 수행
 * @param {Function} [options.onError] - 커스텀 에러 핸들러
 * @example
 * try {
 *   // risky operation
 * } catch (error) {
 *   handleError(error, { context: 'Modal', silent: false });
 * }
 */
function handleError(error, options = {}) {
  const { context = 'etUI', silent = false, onError } = options;

  // 에러 로깅 (개발 환경에서만)
  if (process.env.NODE_ENV !== 'production' || isMarkerQS()) {
    console.error(`[${context}] Error:`, error);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }

  // 커스텀 에러 핸들러가 있으면 실행
  if (typeof onError === 'function') {
    try {
      onError(error);
    } catch (handlerError) {
      console.error('[etUI] Error in custom error handler:', handlerError);
    }
  }

  // 사용자 피드백 (silent 모드가 아닐 때)
  if (!silent && typeof etUI !== 'undefined' && etUI.components?.Toast) {
    const message = error.message || '알 수 없는 오류가 발생했습니다.';
    etUI.components.Toast?.show?.({
      type: 'error',
      message: message,
    });
  }

  return error;
}

/**
 * 함수를 안전하게 실행하고 에러를 처리하는 래퍼
 * @param {Function} fn - 실행할 함수
 * @param {Object} [options] - 에러 처리 옵션
 * @returns {Function} 에러 처리가 포함된 래핑된 함수
 * @example
 * const safeInit = tryCatch(init, { context: 'ComponentInit' });
 * safeInit();
 */
function tryCatch(fn, options = {}) {
  return function (...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      handleError(error, options);
      return null;
    }
  };
}
