/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* eslint-disable max-len, no-restricted-syntax, no-invalid-this */

'use strict';

// MODULES //

var isCollection = require( '@stdlib/assert-is-collection' );
var isObject = require( '@stdlib/assert-is-object' );
var isFunction = require( '@stdlib/assert-is-function' );
var hasIteratorSymbolSupport = require( '@stdlib/assert-has-iterator-symbol-support' );
var ITERATOR_SYMBOL = require( '@stdlib/symbol-iterator' );
var setReadOnly = require( '@stdlib/utils-define-nonenumerable-read-only-property' );
var getter = require( '@stdlib/array-base-getter' );
var accessorGetter = require( '@stdlib/array-base-accessor-getter' );
var inherits = require( '@stdlib/utils-inherit' );
var parent = require( '@stdlib/array-fixed-endian-float64' ); // eslint-disable-line stdlib/no-redeclare
var format = require( '@stdlib/string-format' );
var fromIterator = require( './from_iterator.js' );
var fromIteratorMap = require( './from_iterator_map.js' );


// VARIABLES //

var BYTES_PER_ELEMENT = 8; // 8 bytes per double
var HAS_ITERATOR_SYMBOL = hasIteratorSymbolSupport();
var BYTE_ORDER = 'little-endian';


// FUNCTIONS //

/**
* Returns a boolean indicating if a value is a `Float64ArrayLE` constructor.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `Float64ArrayLE` constructor
*/
function isFloat64ArrayLEConstructor( value ) { // eslint-disable-line id-length
	return ( value === Float64ArrayLE );
}


// MAIN //

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in little-endian byte order.
*
* @constructor
* @param {(NonNegativeInteger|Collection|ArrayBuffer|Iterable)} [arg] - length, typed array, array-like object, buffer, or an iterable
* @param {NonNegativeInteger} [byteOffset=0] - byte offset
* @param {NonNegativeInteger} [length] - view length
* @throws {TypeError} if provided only one argument, the argument must be a valid argument
* @throws {TypeError} byte offset must be a nonnegative integer
* @throws {RangeError} must provide sufficient memory to accommodate byte offset and view length requirements
* @returns {Float64ArrayLE} typed array instance
*
* @example
* var arr = new Float64ArrayLE();
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 0
*
* @example
* var arr = new Float64ArrayLE( 2 );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*
* @example
* var arr = new Float64ArrayLE( [ 1.0, 2.0 ] );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*
* @example
* var ArrayBuffer = require( '@stdlib/array-buffer' );
*
* var buf = new ArrayBuffer( 16 );
* var arr = new Float64ArrayLE( buf );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*
* @example
* var ArrayBuffer = require( '@stdlib/array-buffer' );
*
* var buf = new ArrayBuffer( 16 );
* var arr = new Float64ArrayLE( buf, 8 );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 1
*
* @example
* var ArrayBuffer = require( '@stdlib/array-buffer' );
*
* var buf = new ArrayBuffer( 32 );
* var arr = new Float64ArrayLE( buf, 8, 2 );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*/
function Float64ArrayLE() {
	var nargs = arguments.length;
	if ( !(this instanceof Float64ArrayLE) ) {
		if ( nargs === 0 ) {
			return new Float64ArrayLE();
		}
		if ( nargs === 1 ) {
			return new Float64ArrayLE( arguments[0] );
		}
		if ( nargs === 2 ) {
			return new Float64ArrayLE( arguments[0], arguments[1] );
		}
		return new Float64ArrayLE( arguments[0], arguments[1], arguments[2] );
	}
	if ( nargs === 0 ) {
		parent.call( this, BYTE_ORDER );
	} else if ( nargs === 1 ) {
		parent.call( this, BYTE_ORDER, arguments[0] );
	} else if ( nargs === 2 ) {
		parent.call( this, BYTE_ORDER, arguments[0], arguments[1] );
	} else if ( nargs === 3 ) {
		parent.call( this, BYTE_ORDER, arguments[0], arguments[1], arguments[2] );
	}
	return this;
}

/**
* Size (in bytes) of each array element.
*
* @name BYTES_PER_ELEMENT
* @memberof Float64ArrayLE
* @readonly
* @type {PositiveInteger}
* @default 8
*
* @example
* var nbytes = Float64ArrayLE.BYTES_PER_ELEMENT;
* // returns 8
*/
setReadOnly( Float64ArrayLE, 'BYTES_PER_ELEMENT', BYTES_PER_ELEMENT );

/**
* Constructor name.
*
* @name name
* @memberof Float64ArrayLE
* @readonly
* @type {string}
* @default 'Float64ArrayLE'
*
* @example
* var str = Float64ArrayLE.name;
* // returns 'Float64ArrayLE'
*/
setReadOnly( Float64ArrayLE, 'name', 'Float64ArrayLE' );

/**
* Creates a new `Float64ArrayLE` from an array-like object or an iterable.
*
* @name from
* @memberof Float64ArrayLE
* @type {Function}
* @param {(Collection|Iterable)} src - array-like object or iterable
* @param {Function} [clbk] - callback to invoke for each source element
* @param {*} [thisArg] - context
* @throws {TypeError} `this` context must be a constructor
* @throws {TypeError} `this` must be a Float64ArrayLE
* @throws {TypeError} first argument must be an array-like object or an iterable
* @throws {TypeError} second argument must be a function
* @returns {Float64ArrayLE} typed array instance
*
* @example
* var arr = Float64ArrayLE.from( [ 1.0, 2.0 ] );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*
* @example
* function clbk( v ) {
*     return v * 2.0;
* }
*
* var arr = Float64ArrayLE.from( [ 1.0, 2.0 ], clbk );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 2
*/
setReadOnly( Float64ArrayLE, 'from', function from( src ) {
	var thisArg;
	var nargs;
	var clbk;
	var out;
	var buf;
	var tmp;
	var get;
	var len;
	var i;
	if ( !isFunction( this ) ) {
		throw new TypeError( 'invalid invocation. `this` context must be a constructor.' );
	}
	if ( !isFloat64ArrayLEConstructor( this ) ) {
		throw new TypeError( 'invalid invocation. `this` is not a Float64ArrayLE.' );
	}
	nargs = arguments.length;
	if ( nargs > 1 ) {
		clbk = arguments[ 1 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a function. Value: `%s`.', clbk ) );
		}
		if ( nargs > 2 ) {
			thisArg = arguments[ 2 ];
		}
	}
	if ( isCollection( src ) ) {
		if ( clbk ) {
			len = src.length;
			if ( src.get && src.set ) {
				get = accessorGetter( 'default' );
			} else {
				get = getter( 'default' );
			}
			out = new this( len );
			buf = out._buffer; // eslint-disable-line no-underscore-dangle
			for ( i = 0; i < len; i++ ) {
				buf.setFloat64( i*BYTES_PER_ELEMENT, clbk.call( thisArg, get( src, i ), i ), true );
			}
			return out;
		}
		return new this( src );
	}
	if ( isObject( src ) && HAS_ITERATOR_SYMBOL && isFunction( src[ ITERATOR_SYMBOL ] ) ) {
		buf = src[ ITERATOR_SYMBOL ]();
		if ( !isFunction( buf.next ) ) {
			throw new TypeError( format( 'invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.', src ) );
		}
		if ( clbk ) {
			tmp = fromIteratorMap( buf, clbk, thisArg );
		} else {
			tmp = fromIterator( buf );
		}
		len = tmp.length;
		out = new this( len );
		buf = out._buffer; // eslint-disable-line no-underscore-dangle
		for ( i = 0; i < len; i++ ) {
			buf.setFloat64( i*BYTES_PER_ELEMENT, tmp[ i ], true );
		}
		return out;
	}
	throw new TypeError( format( 'invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.', src ) );
});

/**
* Creates a new `Float64ArrayLE` from a variable number of arguments.
*
* @name of
* @memberof Float64ArrayLE
* @type {Function}
* @param {...*} element - array elements
* @throws {TypeError} `this` context must be a constructor
* @throws {TypeError} `this` must be a Float64ArrayLE
* @returns {Float64ArrayLE} typed array instance
*
* @example
* var arr = Float64ArrayLE.of( 1.0, 1.0, 1.0, 1.0 );
* // returns <Float64ArrayLE>
*
* var len = arr.length;
* // returns 4
*/
setReadOnly( Float64ArrayLE, 'of', function of() {
	var args;
	var i;
	if ( !isFunction( this ) ) {
		throw new TypeError( 'invalid invocation. `this` context must be a constructor.' );
	}
	if ( !isFloat64ArrayLEConstructor( this ) ) {
		throw new TypeError( 'invalid invocation. `this` is not a Float64ArrayLE.' );
	}
	args = [];
	for ( i = 0; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	return new this( args );
});

// Inherit from the parent constructor:
inherits( Float64ArrayLE, parent );


// EXPORTS //

module.exports = Float64ArrayLE;