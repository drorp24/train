// ? https://code.visualstudio.com/docs/nodejs/working-with-javascript

// ? jsDoc for type checking
// Do jsdoc errors fail the build like ts error do?
// Do we want to fail it upon such errors?

/* eslint no-unused-vars: 0 */

// ! Imported type definitions
// own repo / external libraries
// For external libraries, 'Peek definition' reveals what 'T' stands for

// why "cannot find module redux/toolkit"
/**
 * @typedef {import('./Definer').Graph} Graph
 * @typedef {{
 *   collection: import('@reduxjs/toolkit').EntityState<Graph>;
 * }} GraphsState
 */

// ! Internal type definitions

/**
 *  @typedef { {name: string, age: number, whatever: any} } MyType
 *
 */

//
// Objects
//

// Defined keys

/** @type {MyType} */
const x1 = { name: 's', age: 2, whatever: 3 }

/** @type {MyType} */
const x2 = { name: 's', age: 2, whatever: 3, extra: 4 }

x1.addedLater = 2

/** @type {MyType} */
const x3 = { name: 's', age: 6 }

/** @type {MyType} */
const x4 = 'A'

// is that the right way to use expect-error / ignore
/** @type {MyType} */
// @ts-expect-error
const x5 = 'A'

/** @type {UnDefined} */
const x6 = 3

// Undefined keys

/** @typedef { {[x: string]: number} } AnyStringToNumber */

/** @type {AnyStringToNumber} */
const x7 = { any: 99 }

/** @type {AnyStringToNumber} */
const x8 = { any: 'A' }

/** @type {AnyStringToNumber} */
const x9 = 9

/** @type {AnyStringToNumber} */
const x10 = { any: 99, extra: 98 }

/** @type {AnyStringToNumber} */
const x11 = {}

/** @type {Object.<string, number>} */
const x12 = { a: 1, b: 2, c: 3 }

/** @type {Object.<string, number>} */
const x13 = 5

/** @type {Object<string, number>} */
const x14 = 5

//
// Functions
//

// Using @param and @returns

// why is the error shown on @param rather than on f1
/**
 * @param {string} name - Someone's name
 */
function f1(diferentName) {}

// why is that an error (brackets make the argument optional)
/**
 * @param {string} [name]
 */
function f2() {}

// why isn't that an error:
/**
 * @param {string} name - Somebody's name.
 */
function f3(name, extra) {}

// that default value is for documentation only, JS will not see it
/** @param {string} name="test" - An optional param with a default value */
const f4 = name => {}

/**
 * @returns {{ a: string, b: number }} - May use '@returns' as well as '@return'
 */
const f5 = () => ({ a: 'B', b: 5, c: false })

// Using ts notation

// ts notation allows specifying all params and the return value, which is not always inferrable
/** @type {(s: string, b: boolean) => number} TypeScript syntax */
const f6 = (s, b) => 5

// why isn't that an error
/** @type {(s: string, b: boolean) => number} */
const f7 = s => 5

// is that syntax ok
/** @type {({s: string, b: boolean}) => number} */
const f8 = ({ s, b, extra }) => 5

// why is that not
/** @type {({[x: string]: string, [y: string]: boolean}) => number} */
const f9 = ({ s, b, extra }) => 5

// that one works
/** @type {(arg: {s: string, b: boolean}) => number} */
const f10 = ({ s, b, extra }) => 5

// that one does too, but requires defining a type first
/** @typedef {{s: string, b: boolean}} sb */
/** @type {(arg: sb) => number} */
const f11 = ({ s, b }) => 5

// it's easy enough to define an obj return
/** @type {(s: string, b: boolean) => {n: number, c: string}} */
const f12 = s => ({ n: 5, c: 'A' })

// it will err if I add a key
/** @type {(s: string, b: boolean) => {n: number, c: string}} */
const f13 = s => ({ n: 5, c: 'A', extra: 'C' })

// it will err if I omit a key
/** @type {(s: string, b: boolean) => {n: number, c: string}} */
const f14 = s => ({ n: 5 })

// so why isn't that an error when I omit a key in the input arg...
/** @type {(arg: sb) => number} */
const f15 = ({ s }) => 5

// ... but it is an error when I add a key
/** @type {(arg: sb) => number} */
const f16 = ({ s, b, extra }) => 5

//
// Arrays
//

/** @type{number[]} */
var array = []

array.push(1) // OK
array.push('string')

// alternative notations map to number[]:
/** @type {Array.<number>} */
let nds
/** @type {Array<number>} */
let nas
