'use strict';

const validator = require('../lib/validator.js');

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out

  let str = 'yes';
  let num = 1;
  let arr = ['a'];
  let obj = {x:'y'};
  let func = () => {};
  let bool = false;

  it('strings', () => {
    expect(validator.isString(str)).toBeTruthy();
    expect(validator.isString(num)).toBeFalsy();
    expect(validator.isString(arr)).toBeFalsy();
    expect(validator.isString(obj)).toBeFalsy();
    expect(validator.isString(func)).toBeFalsy();
    expect(validator.isString(bool)).toBeFalsy();
  });

  it('numbers', () => {
    expect(validator.isNumber(str)).toBeFalsy();
    expect(validator.isNumber(num)).toBeTruthy();
    expect(validator.isNumber(arr)).toBeFalsy();
    expect(validator.isNumber(obj)).toBeFalsy();
    expect(validator.isNumber(func)).toBeFalsy();
    expect(validator.isNumber(bool)).toBeFalsy();
  });

  it('arrays', () => {
    expect(validator.isArray(str)).toBeFalsy();
    expect(validator.isArray(num)).toBeFalsy();
    expect(validator.isArray(arr)).toBeTruthy();
    expect(validator.isArray(obj)).toBeFalsy();
    expect(validator.isArray(func)).toBeFalsy();
    expect(validator.isArray(bool)).toBeFalsy();
  });

  it('objects', () => {
    expect(validator.isObject(str)).toBeFalsy();
    expect(validator.isObject(num)).toBeFalsy();
    expect(validator.isObject(arr)).toBeFalsy();
    expect(validator.isObject(obj)).toBeTruthy();
    expect(validator.isObject(func)).toBeFalsy();
    expect(validator.isObject(bool)).toBeFalsy();
  });

  it('booleans', () => {
    expect(validator.isBoolean(str)).toBeFalsy();
    expect(validator.isBoolean(num)).toBeFalsy();
    expect(validator.isBoolean(arr)).toBeFalsy();
    expect(validator.isBoolean(obj)).toBeFalsy();
    expect(validator.isBoolean(func)).toBeFalsy();
    expect(validator.isBoolean(bool)).toBeTruthy();
  });

  it('functions', () => {
    expect(validator.isFunction(str)).toBeFalsy();
    expect(validator.isFunction(num)).toBeFalsy();
    expect(validator.isFunction(arr)).toBeFalsy();
    expect(validator.isFunction(obj)).toBeFalsy();
    expect(validator.isFunction(func)).toBeTruthy();
    expect(validator.isFunction(bool)).toBeFalsy();
  });

});

describe('validator module performs complex validations', () => {
  const object = {
    name: 'Scarlett',
    age: 100000,
    zero: 0,
    someObj: {},
    someBool: true,
    someFunction: () => {},
    someArray: [1,2,3],
  };

  it('validates the presence of required object properties at any level', () => {
    expect(validator.hasProperty('propertyThatDoesntExist', object)).toBeFalsy();
    expect(validator.hasProperty('name', object)).toBeTruthy();
    expect(validator.hasProperty('zero', object)).toBeTruthy();
  });

  it('validates the proper types of object properties', () => {
    expect(validator.validateProperty('name', object, validator.isString)).toBeTruthy();
    expect(validator.validateProperty('name', object, validator.isNumber)).toBeFalsy();
    expect(validator.validateProperty('age', object, validator.isString)).toBeFalsy();
    expect(validator.validateProperty('age', object, validator.isNumber)).toBeTruthy();
    expect(validator.validateProperty('someObj', object, validator.isObject)).toBeTruthy();
    expect(validator.validateProperty('someBool', object, validator.isBoolean)).toBeTruthy();
    expect(validator.validateProperty('someFunction', object, validator.isFunction)).toBeTruthy();
    expect(validator.validateProperty('someArray', object, validator.isArray)).toBeTruthy();
  });

  it('validates the types of values contained in an array', () => {
    const goodArray1 = [1,2,3,4,5,6,7,8,9,10];
    const goodArray2 = ['a','b','c','d','e','f','g'];
    const goodArray3 = [[1],[2],[4]];
    const badArray1 = ['a',1,'b',2,'c',3,'d',4];
    const badArray2 = [['g','o','o','d'],{s: 'not so good'}];
    // i.e. an array of all strings or numbers
    expect(validator.validateArrayTypes(goodArray1)).toBeTruthy();
    expect(validator.validateArrayTypes(goodArray2)).toBeTruthy();
    expect(validator.validateArrayTypes(goodArray3)).toBeTruthy();
    expect(validator.validateArrayTypes(badArray1)).toBeFalsy();
    expect(validator.validateArrayTypes(badArray2)).toBeFalsy();
  });

  it('validates a value array against an approved list', () => {
    const goodArray1 = ['yes', 'yes', 'yes', 'blue', 'blue', 'yes'];
    const accepted1 = ['yes', 'blue'];

    const goodArray2 = [2, 4, 4, 8, 10, 6, 2, 4, 10, 4];
    const accepted2 = [2, 4, 6, 8, 10];

    const badArray1 = ['yes', 'no', 'yes', 'blue'];
    const badArray2 = [2, 2, 6, 7, 10];
    expect(validator.validateArrayValues(goodArray1, accepted1)).toBeTruthy();
    expect(validator.validateArrayValues(goodArray1, accepted2)).toBeFalsy();
    expect(validator.validateArrayValues(goodArray2, accepted2)).toBeTruthy();
    expect(validator.validateArrayValues(goodArray2, accepted1)).toBeFalsy();
    expect(validator.validateArrayValues(badArray1, accepted1)).toBeFalsy();
    expect(validator.validateArrayValues(badArray2, accepted2)).toBeFalsy();
  });

  // TODO: Cover so, so many more cases

});
