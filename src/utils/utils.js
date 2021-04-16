/*
===========================================
Tech4humans - Custom methods
-------------------------------------------
  Version: 1.0
===========================================
*/

/* ----------------------------------------
 Comparison
 ----------------------------------------*/
export const and = (a, b) => a && b;
export const nand = (a, b) => !(a && b);
export const or = (a, b) => a || b;
export const xor = (a, b) => or(a, b) && nand(a, b);

// Bitwise
export const andB = (a, b) => a & b;
export const nandB = (a, b) => !(a & b);
export const orB = (a, b) => a | b;
export const xorB = (a, b) => orB(a, b) && nandB(a, b);

/* ----------------------------------------
   Types
   ----------------------------------------*/
// not: null, undefined, NaN, empty string (""), false
export const isValid = (el) => el || el === 0;
export const typeOf = (obj, type) => isValid(obj) && typeof obj === type;
export const isArray = (array) => array && Array.isArray(array);
export const isFunction = (func) => typeOf(func, "function");
export const isObject = (obj) => typeOf(obj, "object") && !isArray(obj);
// Exclude NaN
export const isNumber = (num) => typeOf(num, "number");

export function isUndefined(o) {
  return typeof o === "undefined";
}

// Include NaN
// export function isNumber(o) {
//   return typeof o === "number";
// }

export function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}

export function isString(o) {
  return typeof o === "string";
}

export function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}

export function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}

/* ----------------------------------------
   Short version
   ----------------------------------------*/
export const objLength = (ob) => (isObject(ob) ? Object.keys(ob).length : 0);

/* ----------------------------------------
   Array methods
   ----------------------------------------*/
export const findLast = (array, condition) => {
  if (isArray(array) && isFunction(condition)) {
    let last = array.length - 1;
    for (let index = last; index >= 0; index--)
      if (condition(array[index])) return array[index];
  }
  return null;
};
