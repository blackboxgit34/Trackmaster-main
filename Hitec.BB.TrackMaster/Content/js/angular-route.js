(function(n,t){"use strict";function e(){function i(n,i){return t.extend(Object.create(n),i)}function r(n,t){var r=t.caseInsensitiveMatch,i={originalPath:n,regexp:n},u=i.keys=[];return n=n.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(n,t,i,r){var f=r==="?"?r:null,e=r==="*"?r:null;return u.push({name:i,optional:!!f}),t=t||"",""+(f?"":t)+"(?:"+(f?t:"")+(e&&"(.+?)"||"([^/]+)")+(f||"")+")"+(f||"")}).replace(/([\/$\*])/g,"\\$1"),i.regexp=new RegExp("^"+n+"$",r?"i":""),i}var n={};this.when=function(i,u){var f=t.copy(u),e;return t.isUndefined(f.reloadOnSearch)&&(f.reloadOnSearch=!0),t.isUndefined(f.caseInsensitiveMatch)&&(f.caseInsensitiveMatch=this.caseInsensitiveMatch),n[i]=t.extend(f,i&&r(i,f)),i&&(e=i[i.length-1]=="/"?i.substr(0,i.length-1):i+"/",n[e]=t.extend({redirectTo:i},r(e,f))),this};this.caseInsensitiveMatch=!1;this.otherwise=function(n){return typeof n=="string"&&(n={redirectTo:n}),this.when(null,n),this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(r,u,e,o,s,h,c){function k(n,t){var s=t.keys,e={},r,i,o,u,f;if(!t.regexp||(r=t.regexp.exec(n),!r))return null;for(i=1,o=r.length;i<o;++i)u=s[i-1],f=r[i],u&&f&&(e[u.name]=f);return e}function p(n){var i=a.current;l=d();y=l&&i&&l.$$route===i.$$route&&t.equals(l.pathParams,i.pathParams)&&!l.reloadOnSearch&&!v;!y&&(i||l)&&r.$broadcast("$routeChangeStart",l,i).defaultPrevented&&n&&n.preventDefault()}function w(){var i=a.current,n=l;y?(i.params=n.params,t.copy(i.params,e),r.$broadcast("$routeUpdate",i)):(n||i)&&(v=!1,a.current=n,n&&n.redirectTo&&(t.isString(n.redirectTo)?u.path(b(n.redirectTo,n.params)).search(n.params).replace():u.url(n.redirectTo(n.pathParams,u.path(),u.search())).replace()),o.when(n).then(function(){if(n){var u=t.extend({},n.resolve),i,r;return t.forEach(u,function(n,i){u[i]=t.isString(n)?s.get(n):s.invoke(n,null,null,i)}),t.isDefined(i=n.template)?t.isFunction(i)&&(i=i(n.params)):t.isDefined(r=n.templateUrl)&&(t.isFunction(r)&&(r=r(n.params)),t.isDefined(r)&&(n.loadedTemplateUrl=c.valueOf(r),i=h(r))),t.isDefined(i)&&(u.$template=i),o.all(u)}}).then(function(u){n==a.current&&(n&&(n.locals=u,t.copy(n.params,e)),r.$broadcast("$routeChangeSuccess",n,i))},function(t){n==a.current&&r.$broadcast("$routeChangeError",n,i,t)}))}function d(){var f,r;return t.forEach(n,function(n){!r&&(f=k(u.path(),n))&&(r=i(n,{params:t.extend({},u.search(),f),pathParams:f}),r.$$route=n)}),r||n[null]&&i(n[null],{params:{},pathParams:{}})}function b(n,i){var r=[];return t.forEach((n||"").split(":"),function(n,t){if(t===0)r.push(n);else{var u=n.match(/(\w+)(?:[?*])?(.*)/),f=u[1];r.push(i[f]);r.push(u[2]||"");delete i[f]}}),r.join("")}var v=!1,l,y,a={routes:n,reload:function(){v=!0;r.$evalAsync(function(){p();w()})},updateParams:function(n){if(this.current&&this.current.$$route)n=t.extend({},this.current.params,n),u.path(b(this.current.$$route.originalPath,n)),u.search(n);else throw f("norout","Tried updating route when with no current route");}};return r.$on("$locationChangeStart",p),r.$on("$locationChangeSuccess",w),a}]}function o(){this.$get=function(){return{}}}function r(n,i,r){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(u,f,e,o,s){function v(){c&&(r.cancel(c),c=null);h&&(h.$destroy(),h=null);l&&(c=r.leave(l),c.then(function(){c=null}),l=null)}function y(){var e=n.current&&n.current.locals,c=e&&e.$template;if(t.isDefined(c)){var o=u.$new(),y=n.current,w=s(o,function(n){r.enter(n,null,l||f).then(function(){t.isDefined(a)&&(!a||u.$eval(a))&&i()});v()});l=w;h=y.scope=o;h.$emit("$viewContentLoaded");h.$eval(p)}else v()}var h,l,c,a=e.autoscroll,p=e.onload||"";u.$on("$routeChangeSuccess",y);y()}}}function u(n,t,i){return{restrict:"ECA",priority:-400,link:function(r,u){var f=i.current,o=f.locals,s,e;u.html(o.$template);s=n(u.contents());f.controller&&(o.$scope=r,e=t(f.controller,o),f.controllerAs&&(r[f.controllerAs]=e),u.data("$ngControllerController",e),u.children().data("$ngControllerController",e));s(r)}}}var i=t.module("ngRoute",["ng"]).provider("$route",e),f=t.$$minErr("ngRoute");i.provider("$routeParams",o);i.directive("ngView",r);i.directive("ngView",u);r.$inject=["$route","$anchorScroll","$animate"];u.$inject=["$compile","$controller","$route"]})(window,window.angular);
/*
//# sourceMappingURL=angular-route.min.js.map
*/