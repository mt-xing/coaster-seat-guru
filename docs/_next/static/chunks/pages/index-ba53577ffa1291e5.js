(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5075)}])},6673:function(e,n,t){"use strict";t.d(n,{Z:function(){return o}});var r=t(5893),s=t(3952),a=t.n(s);function o(e){return(0,r.jsx)("footer",{className:e.isDark?"".concat(a().footer," ").concat(a().dark):a().footer,children:(0,r.jsx)("a",{href:"https://www.flaticon.com/free-icons/roller-coaster",title:"roller coaster icons",children:"Roller coaster icons created by Freepik - Flaticon"})})}},9988:function(e,n,t){"use strict";t.d(n,{Z:function(){return _}});var r=t(4051),s=t.n(r),a=t(5893),o=t(1664),c=t(7294),i=t(4040),u=t(3253),l=t.n(u),d=t(606),h=t(9929);function f(e,n,t,r,s,a,o){try{var c=e[a](o),i=c.value}catch(u){return void t(u)}c.done?n(i):Promise.resolve(i).then(r,s)}function _(){var e=(0,c.useState)(""),n=e[0],t=e[1],r=(0,c.useState)(null),u=r[0],_=r[1],p=(0,c.useState)({s:"hidden"}),m=p[0],x=p[1],j=(0,c.useCallback)(function(){var e,n=(e=s().mark((function e(n){var t,r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(_(null),""!==(t=n.replace(/[\W_]+/g,"").toLowerCase())){e.next=5;break}return x({s:"hidden"}),e.abrupt("return");case 5:return e.next=7,fetch("".concat(h.QP,"Search?q=").concat(t));case 7:if((r=e.sent).ok){e.next=11;break}return x({s:"hidden"}),e.abrupt("return");case 11:return e.next=13,r.json();case 13:a=e.sent,x({s:"displayed",list:a});case 15:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,s){var a=e.apply(n,t);function o(e){f(a,r,s,o,c,"next",e)}function c(e){f(a,r,s,o,c,"throw",e)}o(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[x,_]),v=(0,c.useCallback)((function(){t(""),x({s:"hidden"})}),[]),w=(0,c.useCallback)((function(e){var n=e.target.value;t(n),u&&window.clearTimeout(u),""!==n.replace(/[\W_]+/g,"").toLowerCase()?(x({s:"loading"}),_(window.setTimeout((function(){j(n)}),1e3))):x({s:"hidden"})}),[t,u,_,j]),k=(0,c.useCallback)((function(){var e=(0,a.jsxs)("span",{className:l().prompt,children:["Don't see a coaster? ",(0,a.jsx)(o.default,{href:"/contribute/newCoaster",children:(0,a.jsx)("a",{children:"Add it!"})})]});switch(m.s){case"hidden":return null;case"loading":return(0,a.jsx)("div",{className:l().results,children:(0,a.jsx)("span",{className:l().load,children:(0,a.jsx)(i.SyncLoader,{color:"white",size:5})})});case"displayed":return 0===m.list.length?(0,a.jsxs)("div",{className:l().results,children:[(0,a.jsx)("span",{className:l().noResults,children:"No results found"})," ",e]}):(0,a.jsxs)("div",{className:l().results,children:[(0,a.jsx)("ul",{children:m.list.map((function(e){return(0,a.jsx)("li",{children:(0,a.jsx)(o.default,{href:"/results?id=".concat(e.id),children:(0,a.jsxs)("a",{onClick:v,children:[(0,a.jsx)("p",{children:e.name}),(0,a.jsx)("p",{children:e.park})]})})},e.id)}))}),e]});default:return(0,d.U)(m)}}),[m,v]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{type:"text",placeholder:"Search for a coaster",value:n,onChange:w,className:l().input}),k()]})}},5075:function(e,n,t){"use strict";t.r(n);var r=t(5893),s=t(9008),a=t(6673),o=t(9988),c=t(9929),i=t(214),u=t.n(i);n.default=function(){return(0,r.jsx)("div",{className:u().imageContainer,children:(0,r.jsxs)("div",{className:u().container,children:[(0,r.jsxs)(s.default,{children:[(0,r.jsx)("title",{children:c.sG}),(0,r.jsx)("meta",{name:"description",content:"See what seats on a roller coaster people prefer, and submit your own preferences. It's like that other trademarked site name, but for roller coasters."})]}),(0,r.jsx)("h1",{className:u().title,children:c.sG}),(0,r.jsx)("p",{className:u().searchWrap,children:(0,r.jsx)(o.Z,{})}),(0,r.jsx)(a.Z,{isDark:!0})]})})}},606:function(e,n,t){"use strict";function r(e){throw new Error("Reached unreachable statement ".concat(e))}t.d(n,{U:function(){return r}})},9929:function(e,n,t){"use strict";t.d(n,{sG:function(){return r},QP:function(){return s},Cx:function(){return a}});var r="Coaster Seat Guru",s="https://coasterseatguru.azurewebsites.net/api/",a="707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com"},3952:function(e){e.exports={footer:"Footer_footer__Tl1eP",dark:"Footer_dark__YTV09"}},214:function(e){e.exports={title:"Home_title__T09hD",imageContainer:"Home_imageContainer__w0gn2",container:"Home_container__bCOhY",searchWrap:"Home_searchWrap___W0Bn",footer:"Home_footer____T7K"}},3253:function(e){e.exports={input:"Search_input__jBVVm",results:"Search_results__5GAEo",noResults:"Search_noResults__RG_yA",load:"Search_load__7D_zK",none:"Search_none__strFj",prompt:"Search_prompt__Xe5Gh"}}},function(e){e.O(0,[828,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);