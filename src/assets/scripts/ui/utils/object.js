// object 관련 기능

/**
 * compare obj
 * @param { Object } obj1
 * @param { Object } obj2
 * @returns Boolean
 */
function shallowCompare(obj1, obj2) {
  const keys = [...Object.keys(obj1), Object.keys(obj2)];

  for (const key of keys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!etUI.utils.shallowCompare(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      const role = !obj2[key] || typeof obj1[key] === 'function';
      if (!role && obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}

function isDeepEqual(object1, object2) {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) {return false;}

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}

/**
 *
 * @param obj
 * @param key
 * @returns {*}
 */
function getValueFromNestedObject(obj, key) {
  const keys = key.split('.');

  return keys.reduce((acc, currKey) => {
    return acc && acc[currKey] !== undefined ? acc[currKey] : undefined;
  }, obj);
}
