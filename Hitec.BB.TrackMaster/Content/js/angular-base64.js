(function(){"use strict";angular.module("base64",[]).constant("$base64",function(){function t(t,i){var r=n.indexOf(t.charAt(i));if(r==-1)throw"Cannot decode base64";return r}function u(n){var o,i,u,f,e;if(n=""+n,f=n.length,f==0)return n;if(f%4!=0)throw"Cannot decode base64";for(o=0,n.charAt(f-1)==r&&(o=1,n.charAt(f-2)==r&&(o=2),f-=4),e=[],i=0;i<f;i+=4)u=t(n,i)<<18|t(n,i+1)<<12|t(n,i+2)<<6|t(n,i+3),e.push(String.fromCharCode(u>>16,u>>8&255,u&255));switch(o){case 1:u=t(n,i)<<18|t(n,i+1)<<12|t(n,i+2)<<6;e.push(String.fromCharCode(u>>16,u>>8&255));break;case 2:u=t(n,i)<<18|t(n,i+1)<<12;e.push(String.fromCharCode(u>>16))}return e.join("")}function i(n,t){var i=n.charCodeAt(t);if(i>255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";return i}function f(t){var f,u,e,o;if(arguments.length!=1)throw"SyntaxError: Not enough arguments";if(e=[],t=""+t,o=t.length-t.length%3,t.length==0)return t;for(f=0;f<o;f+=3)u=i(t,f)<<16|i(t,f+1)<<8|i(t,f+2),e.push(n.charAt(u>>18)),e.push(n.charAt(u>>12&63)),e.push(n.charAt(u>>6&63)),e.push(n.charAt(u&63));switch(t.length-o){case 1:u=i(t,f)<<16;e.push(n.charAt(u>>18)+n.charAt(u>>12&63)+r+r);break;case 2:u=i(t,f)<<16|i(t,f+1)<<8;e.push(n.charAt(u>>18)+n.charAt(u>>12&63)+n.charAt(u>>6&63)+r)}return e.join("")}var r="=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";return{encode:f,decode:u}}())})();
/*
//# sourceMappingURL=angular-base64.min.js.map
*/