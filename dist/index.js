"use strict";var E=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var y=E(function(N,b){"use strict";function A(e){var r,t;for(r=[];t=e.next(),!t.done;)r.push(t.value);return r}b.exports=A});var d=E(function(P,T){"use strict";function L(e,r,t){var s,n,u;for(s=[],u=-1;n=e.next(),!n.done;)u+=1,s.push(r.call(t,n.value,u));return s}T.exports=L});var x=E(function(D,_){"use strict";var R=require("@stdlib/assert-is-collection"),S=require("@stdlib/assert-is-object"),f=require("@stdlib/assert-is-function"),I=require("@stdlib/assert-has-iterator-symbol-support"),q=require("@stdlib/symbol-iterator"),g=require("@stdlib/utils-define-nonenumerable-read-only-property"),O=require("@stdlib/array-base-getter"),M=require("@stdlib/array-base-accessor-getter"),k=require("@stdlib/utils-inherit"),v=require("@stdlib/array-fixed-endian-float64"),w=require("@stdlib/string-format"),B=y(),Y=d(),p=8,j=I(),h="little-endian";function F(e){return e===a}function a(){var e=arguments.length;return this instanceof a?(e===0?v.call(this,h):e===1?v.call(this,h,arguments[0]):e===2?v.call(this,h,arguments[0],arguments[1]):e===3&&v.call(this,h,arguments[0],arguments[1],arguments[2]),this):e===0?new a:e===1?new a(arguments[0]):e===2?new a(arguments[0],arguments[1]):new a(arguments[0],arguments[1],arguments[2])}g(a,"BYTES_PER_ELEMENT",p);g(a,"name","Float64ArrayLE");g(a,"from",function(r){var t,s,n,u,o,m,c,l,i;if(!f(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!F(this))throw new TypeError("invalid invocation. `this` is not a Float64ArrayLE.");if(s=arguments.length,s>1){if(n=arguments[1],!f(n))throw new TypeError(w("invalid argument. Second argument must be a function. Value: `%s`.",n));s>2&&(t=arguments[2])}if(R(r)){if(n){for(l=r.length,r.get&&r.set?c=M("default"):c=O("default"),u=new this(l),o=u._buffer,i=0;i<l;i++)o.setFloat64(i*p,n.call(t,c(r,i),i),!0);return u}return new this(r)}if(S(r)&&j&&f(r[q])){if(o=r[q](),!f(o.next))throw new TypeError(w("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",r));for(n?m=Y(o,n,t):m=B(o),l=m.length,u=new this(l),o=u._buffer,i=0;i<l;i++)o.setFloat64(i*p,m[i],!0);return u}throw new TypeError(w("invalid argument. First argument must be an array-like object or an iterable. Value: `%s`.",r))});g(a,"of",function(){var r,t;if(!f(this))throw new TypeError("invalid invocation. `this` context must be a constructor.");if(!F(this))throw new TypeError("invalid invocation. `this` is not a Float64ArrayLE.");for(r=[],t=0;t<arguments.length;t++)r.push(arguments[t]);return new this(r)});k(a,v);_.exports=a});var V=x();module.exports=V;
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
//# sourceMappingURL=index.js.map
