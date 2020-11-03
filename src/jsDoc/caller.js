// Imported type definitions
// own repo / external libraries
// For external libraries, 'Peek definition' reveals what 'T' stands for

/**
 * @typedef {import('./Definer').Graph} Graph
 * @typedef {{
 *   collection: import('@reduxjs/toolkit').EntityState<Graph>;
 * }} GraphsState
 */

// Internal type definitions

/**
 *  @typedef { {name: string, age: number, whatever: any} } MyType
 *
 */

/** @type {MyType} */
const x = { name: 's', age: 2, whatever: 3 };
x.addedLater = 2;

/** @type {MyType} */
const x1 = { name: 's', age: 2, whatever: 3, extraKey: 4 };

/** @type {MyType} */
const x2 = { name: 's', age: 6 };

/** @type {MyType} */
const y = 'A';

// why doesn't ts-expect-error supresses the error:
// @ts-expect-error
/** @type {MyType} */
const z = 'A';

/** @type {NotDefined} */
const w = 3;

/** @typedef { {[x: string]: number} } AnyStringToNumber */

/** @type {AnyStringToNumber} */
const a = { any: 99 };

// why are the following 2 not errors:
/** @type {AnyStringToNumber} */
const b = { any: 99, extraKey: 98 };

/** @type {AnyStringToNumber} */
const c = {};

/** @type {AnyStringToNumber} */
const d = 9;

//
// Functions
//

/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody) {
  if (!somebody) {
    somebody = 'John Doe';
  }
  console.log('Hello ' + somebody);
}

// why is the name important:
/**
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(diferentName) {
  if (!diferentName) {
    diferentName = 'John Doe';
  }
  console.log('Hello ' + diferentName);
}

// why isnt that an error:
/**
 * @param {string} somebody - Somebody's name.
 */
function sayHello(somebody, extraParam) {
  if (!somebody) {
    somebody = 'John Doe';
  }
  console.log('Hello ' + somebody);
}

sayHello();

/** @type {(s: string, b: boolean) => number} TypeScript syntax */
var sbn2;

/** @param {string} [p4="test"] - An optional param with a default value */

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
function ab() {}

//
// Arrays
//

/** @type{Array.<number>} */
var array = [];

array.push(1); // OK
array.push('string'); // Error, string is not assignable to number

/** @type {number[]} */
var ns;
/** @type {Array.<number>} */
var nds;
/** @type {Array<number>} */
var nas;
