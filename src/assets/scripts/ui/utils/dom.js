/**
 * set attribute
 * @param { Element } parent
 * @param opts
 */
function setProperty(parent, ...opts) {
  if (opts.length === 2) {
    const [property, value] = opts;

    parent?.setAttribute(property, value);
  } else if (opts.length === 3) {
    const [selector, property, value] = opts;

    parent.querySelector(selector)?.setAttribute(property, value);
  }
}

/**
 * get attribute
 * @param { Element } parent
 * @param { String } selector
 * @param { String } property
 */
function getProperty(parent, selector, property) {
  parent.querySelector(selector)?.getAttribute(property);
}

/**
 * set style
 * @param { Element } parent
 * @param { String } selector
 * @param { String } property
 * @param { any } value
 */
function setStyle(parent, selector, property, value) {
  if (parent.querySelector(selector)) {
    parent.querySelector(selector).style[property] = value;
  }
}

/**
 * gsap의 SplitText를 활용하여 문자를 분리하여 마스크 가능하게 해준다.
 * @param selector  {string}
 * @param type  {'lines'|'words'|'chars'}
 * @returns [HTMLElement[], HTMLElement[]]
 */
function splitTextMask(selector, type = 'lines', isOverflow = true) {
  let $quote;

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  if (typeof selector === 'string') {
    $quote = document.querySelector(selector);
  } else {
    $quote = selector;
  }
  // const $quote = document.querySelector(selector),

  const mySplitText = new SplitText($quote, { type });

  const $splitted = mySplitText[type];
  const $lineWrap = [];
  $splitted.forEach(($el, index) => {
    const $div = document.createElement('div');
    if (isOverflow) {
      $div.style.overflow = 'hidden';
    }
    $div.style.position = 'relative';
    $div.style.display = 'inline-block';
    $div.classList.add('splite-text-wrap');
    wrap($el, $div);
    $lineWrap.push($div);
  });

  return [$splitted, $lineWrap];
}

/**
 *
 * @param el  {string|HTMLElement}
 * @returns {Node}
 */
function wrapMask(el) {
  const $el = etUI.utils.selectorStringToElement(el);
  if ($el.parentNode.classList.contains('ui-mask')) {
    return $el.parentNode;
  }

  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  const style = window.getComputedStyle($el);
  const $div = document.createElement('div');
  $div.style.overflow = 'hidden';
  $div.style.position = style.position || null;
  if (style.position === 'absolute' || style.position === 'fixed') {
    $div.style.top = style.top;
    $div.style.left = style.left;
    $div.style.right = style.right;
    $div.style.bottom = style.bottom;

    $el.style.top = 0;
    $el.style.left = 0;
    $el.style.right = 0;
    $el.style.bottom = 0;
  }
  $div.style.display = style.display || null;
  $div.classList.add('ui-mask');
  wrap($el, $div);

  return $div;
}

/**
 *
 */
function setDocHeight() {
  document.querySelector('body').style.setProperty('--doc-height', window.innerHeight + 'px');
  document.querySelector('body').dataset.docHeight = window.innerHeight;
}

/**
 *
 * @param arrBreakPointName
 * @param arrBreakPoint
 * @returns {{}}
 */
function getMediaQueryCondition(arrBreakPointName, arrBreakPoint) {
  if (arrBreakPointName.length !== arrBreakPoint.length + 1) {
    console.error('arrBreakPointName.length !== arrBreakPoint.length + 1');
    return;
  }

  const mediaQueryCondition = {};

  const arr = [],
    length = arrBreakPoint.length;
  arr.push(`(max-width: ${arrBreakPoint[0] - 1}px)`);

  new Array(length - 1).fill(0).forEach((_, index) => {
    arr.push(`(min-width: ${arrBreakPoint[index]}px) and (max-width: ${arrBreakPoint[index + 1] - 1}px)`);
  });

  arr.push(`(min-width: ${arrBreakPoint[length - 1]}px)`);

  arrBreakPointName.forEach((name, index) => {
    mediaQueryCondition[name] = arr[index];
  });

  mediaQueryCondition['reduceMotion'] = '(prefers-reduced-motion: reduce)';
  mediaQueryCondition['isDark'] = '(prefers-color-scheme: dark)';
  mediaQueryCondition['isLight'] = '(prefers-color-scheme: light)';

  return mediaQueryCondition;
}

/**
 *
 * @param fn
 */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 *
 * @param {string | NodeList} target
 * @returns {HTMLElement | null}
 */
function firstNode(target) {
  if (typeof target === 'string') {
    return document.querySelector(target);
  } else if (NodeList.prototype.isPrototypeOf(target)) {
    if (target.length <= 0) {
      return null;
    }
    return target[0];
  } else if (Array.isArray(target)) {
    return target[0];
  }
}

/**
 *
 * @param {string | NodeList} target
 * @returns {HTMLElement | null}
 */
function lastNode(target) {
  if (typeof target === 'string') {
    return document.querySelectorAll(target)[document.querySelectorAll(target).length - 1];
  } else if (NodeList.prototype.isPrototypeOf(target)) {
    if (target.length <= 0) {
      return null;
    }
    return target[target.length - 1];
  } else if (Array.isArray(target)) {
    return target[target.length - 1];
  }
}

/**
 *
 * @param str
 * @returns {*[]}
 */
function parseHTML(str) {
  const tmp = document.implementation.createHTMLDocument('');
  tmp.body.innerHTML = str;
  return [...tmp.body.childNodes];
}

/**
 *
 * @param selector  {string|HTMLElement}
 * @returns {Element|*}
 */
function selectorStringToElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector);
  } else {
    return selector;
  }
}

/**
 * 페이지의 모든 요소를 탐색하여 고정된 요소들의 높이를 계산합니다.
 * 속성 값이 fixed, sticky인경유 클래스 추가할지 협의해야합니다.
 * 테스트중
 * @returns {number} 고정된 요소들의 총 높이
 */
// function getFixedHeight() {
//   const elements = document.querySelectorAll(`.fixed, .sticky, ${etUI.config.isDevice === 'desktop' ? '.header-group02' : '.header-group01'}`);
//   return Array.from(elements).reduce((total, el) => {
//     const { height } = window.getComputedStyle(el);
//     return total + (parseFloat(height) || 0) ;
//   }, 0);
// }

function getFixedHeight() {
  const elements = document.querySelectorAll('.sticky-wrap');
  let topHeight = 0;
  const header = document.querySelector(`${etUI.config.isDevice === 'desktop' ? '.header-group02' : '.header-group01'}`);

  const collapseWrap = document.querySelector('.collapse-tab-wrap');
  // if(!collapseWrap && header){
  //   const headerStyle = window.getComputedStyle(header);
  //   topHeight += parseFloat(headerStyle.height) || 0;
  // }
  if (header) {
    const headerStyle = window.getComputedStyle(header);
    topHeight += parseFloat(headerStyle.height) || 0;
  }

  elements.forEach((el) => {
    const { height } = window.getComputedStyle(el);
    if (el.querySelector('.chips-type')) return;
    if (el.querySelector('.scroll-spy-tit') && etUI.config.isDevice === 'desktop') return;
    topHeight += parseFloat(height) || 0;
  });
  return topHeight;
}
/**
 * 특정 요소 또는 위치로 부드럽게 스크롤합니다.
 * @param {HTMLElement|number} target - 스크롤할 목표 요소 또는 위치.
 * @param {Object} options - 스크롤 옵션 객체.
 * @param {number} [options.offset=0] - 추가 오프셋 값.
 */
function scrollTo(target, { scroller = 'body,html', callback, duration = 0.5 } = {}) {
  const targetPosition =
    typeof target === 'number'
      ? target
      : target instanceof HTMLElement
        ? target.offsetTop
        : (() => {
          throw new Error('target must be an HTMLElement or a number');
        })();
  // document.documentElement.style.overflow = 'hidden'
  gsap.to(scroller, duration, {
    scrollTo: targetPosition,
    ease: 'power2.inOut',
    onComplete() {
      if (callback) {
        callback();
        // document.documentElement.style.overflow = null
      }
    },
  });
}
