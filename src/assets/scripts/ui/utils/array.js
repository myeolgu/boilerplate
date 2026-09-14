/**
 * Check if the value is an array
 * @param value {any}
 * @returns {arg is any[]}
 */
function isArray(value) {
  return Array.isArray(value);
}

/**
 * 설명
 * @param cleanups  {function[]}
 */
function allCleanups(cleanups) {
  cleanups.forEach((cleanup) => cleanup());
}
