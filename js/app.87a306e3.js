(function(){"use strict";var t={2558:function(t,r,e){var o=e(6369),i=function(){var t=this,r=t._self._c;return r("div",{attrs:{id:"app"}},[r("div",{staticClass:"container"},[r("div",{staticClass:"mine"},[t._l(t.floors,(function(t){return r("div",{key:t,staticClass:"floor"})})),r("div",{ref:"elevator",staticClass:"elevator",style:{bottom:`${t.currentHeight}%`}})],2),r("div",{staticClass:"buttons"},t._l(t.reverseMass,(function(e){return r("div",{key:e,staticClass:"buttons__item"},[r("span",{staticClass:"buttons__item-number"},[t._v(t._s(e))]),r("button",{staticClass:"buttons__item-button",class:{active:t.inListOrder(e)},on:{click:function(r){return t.addFloorList(e)}}},[r("svg",{attrs:{width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[r("circle",{attrs:{cx:"7.5",cy:"7.5",r:"3.75"}}),r("circle",{attrs:{cx:"7.5",cy:"7.5",r:"7"}})])])])})),0)])])},n=[],s=(e(7658),{name:"App",data(){return{floors:[1,2,3,4,5],currentFloor:1,currentHeight:0,orderVisitFloor:[],elevatorStatusStart:!1}},methods:{inListOrder:function(t){for(let r=0;r<this.orderVisitFloor.length;r++)if(this.orderVisitFloor[r]===t)return!0;return!1},addFloorList:function(t){for(let r=0;r<this.orderVisitFloor.length;r++)if(this.orderVisitFloor[r]===t)return;this.orderVisitFloor.push(t),this.elevatorStatusStart||(this.elevatorStatusStart=!0,setTimeout((()=>{this.startElevator()}),0)),console.log(this.orderVisitFloor)},startElevator:async function(){while(0!==this.orderVisitFloor.length)await this.moveFloor(this.orderVisitFloor[0]),setTimeout((()=>{0===this.orderVisitFloor.length&&(this.elevatorStatusStart=!1)}),3e3),console.log("gggg")},moveFloor:function(t){return new Promise((()=>{let r=setInterval((()=>{if(this.currentFloor<t)this.currentHeight++;else{if(!(this.currentFloor>t))return!1;this.currentHeight--}this.currentHeight===100/this.floors.length*(t-1)&&(this.currentFloor=t,this.$refs.elevator.classList.add("elevator-pause"),this.orderVisitFloor.shift(),clearInterval(r))}),30)}))}},computed:{reverseMass(){return[...this.floors].reverse()}},components:{}}),l=s,u=e(1001),a=(0,u.Z)(l,i,n,!1,null,null,null),c=a.exports;o.ZP.config.productionTip=!1,new o.ZP({render:t=>t(c)}).$mount("#app")}},r={};function e(o){var i=r[o];if(void 0!==i)return i.exports;var n=r[o]={exports:{}};return t[o](n,n.exports,e),n.exports}e.m=t,function(){var t=[];e.O=function(r,o,i,n){if(!o){var s=1/0;for(c=0;c<t.length;c++){o=t[c][0],i=t[c][1],n=t[c][2];for(var l=!0,u=0;u<o.length;u++)(!1&n||s>=n)&&Object.keys(e.O).every((function(t){return e.O[t](o[u])}))?o.splice(u--,1):(l=!1,n<s&&(s=n));if(l){t.splice(c--,1);var a=i();void 0!==a&&(r=a)}}return r}n=n||0;for(var c=t.length;c>0&&t[c-1][2]>n;c--)t[c]=t[c-1];t[c]=[o,i,n]}}(),function(){e.n=function(t){var r=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(r,{a:r}),r}}(),function(){e.d=function(t,r){for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)}}(),function(){var t={143:0};e.O.j=function(r){return 0===t[r]};var r=function(r,o){var i,n,s=o[0],l=o[1],u=o[2],a=0;if(s.some((function(r){return 0!==t[r]}))){for(i in l)e.o(l,i)&&(e.m[i]=l[i]);if(u)var c=u(e)}for(r&&r(o);a<s.length;a++)n=s[a],e.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return e.O(c)},o=self["webpackChunkelevator"]=self["webpackChunkelevator"]||[];o.forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o))}();var o=e.O(void 0,[998],(function(){return e(2558)}));o=e.O(o)})();
//# sourceMappingURL=app.87a306e3.js.map