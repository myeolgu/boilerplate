/**
 * Reverse a string
 * @param str {string}
 * @returns {string}
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}

/**
 * Get a random id
 * @returns {string}
 */
function getRandomId() {
  return Math.random().toString(36).substring(2);
}

/**
 *
 * @param prefix
 * @returns {string}
 */
function getRandomUIID(prefix = 'ui') {
  return `${prefix}-${getRandomId()}`;
}

/**
 * 첫글자만 대문자로 변환
 * @param word
 * @returns {string}
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * 첫글자만 소문자로 변환
 * @param word
 * @returns {string}
 */
function uncapitalize(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

function addPrefixCamelString(str, prefix) {
  // dimmClick => propsDimmClick
  return prefix + etUI.utils.capitalize(str);
}

function removePrefixCamelString(str, prefix) {
  const regExp = new RegExp(`^${prefix}`, 'g');
  return etUI.utils.uncapitalize(str.replaceAll(regExp, ''));

}

function countCharacters(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    // Check if the character is English
    if (/[a-zA-Z]/.test(str[i])) {
      count += 1;
    }
    // Check if the character is Korean or other 2-byte character
    else if (str.charCodeAt(i) > 127) {
      count += 2;
    }
    // Special characters
    else {
      count += 1;
    }
  }
  return count;
}
