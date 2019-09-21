'use strict';

let validator = module.exports = {};

/**
 * Based on a set of rules, is the input valid?
 * TODO: Define the rules ... how do we send them in? How do we identify?
 * @param input
 * @param rules
 * @returns {boolean}
 */
validator.isValid = (input, ...rules) => {
  for (const rule of rules) {
    if (!rule(input)) {
      return false;
    }
  }
  return true;
};

/**
 * Is this a string?
 * @param input
 * @returns {boolean}
 */
validator.isString = (input) => {
  return typeof input === 'string';
};

validator.isNumber = (input) => {
  return typeof input === 'number';
};

validator.isObject = (input) => {
  return typeof input === 'object' && !Array.isArray(input);
};

validator.isFunction = (input) => {
  return typeof input === 'function';
};

validator.isArray = (input) => {
  return Array.isArray(input);
};

validator.isBoolean = (input) => {
  return typeof input === 'boolean';
};

validator.hasProperty = (propName, input) => {
  return propName in input;
};

validator.validateProperty = (propName, input, validator) => {
  return validator(input[propName]);
};

validator.validateArray = (array, ...validatorFuncs) => {
  for (const val of array) {
    if (!validator.isValid(val, ...validatorFuncs)) {
      return false;
    }
  }
  return true;
};

validator.validateArrayTypes = (array) => {
  if (array.length === 0) {
    return true;
  }
  const validatorFunc = Array.isArray(array[0]) ? (val) => Array.isArray(val) : (val) => typeof val === typeof array[0];
  return validator.validateArray(array, validatorFunc);
};

validator.validateArrayValues = (array, valids) => {
  if (array.length === 0) {
    return true;
  }
  const validatorFunc = (val) => valids.includes(val);
  return validator.validateArray(array, validatorFunc);
};