(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(5075)}])},6673:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var t=n(5893),s=n(3952),a=n.n(s);function o(e){return(0,t.jsxs)("footer",{className:e.isDark?"".concat(a().footer," ").concat(a().dark):a().footer,children:[(0,t.jsx)("div",{children:(0,t.jsxs)("p",{children:["A website by ",(0,t.jsx)("a",{href:"https://michaelxing.com",target:"_blank",rel:"noreferrer",children:"Michael Xing"}),", with help from ",(0,t.jsx)("a",{href:"https://reddit.com/r/rollercoasters",target:"_blank",rel:"noreferrer",children:"r/rollercoasters"}),"."]})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{children:["Roller coaster icon by ",(0,t.jsx)("a",{href:"https://www.flaticon.com/free-icons/roller-coaster",target:"_blank",rel:"noreferrer",children:"Freepik - Flaticon"}),"."]}),(0,t.jsxs)("p",{children:["Proudly open source on ",(0,t.jsx)("a",{href:"https://github.com/mt-xing/coaster-seat-guru",target:"_blank",rel:"noreferrer",children:"GitHub"}),"."]})]})]})}},9988:function(e,r,n){"use strict";n.d(r,{Z:function(){return p}});var t=n(4051),s=n.n(t),a=n(5893),o=n(1664),c=n(7294),i=n(4040),l=n(3253),u=n.n(l),d=n(606),h=n(9929);function f(e,r,n,t,s,a,o){try{var c=e[a](o),i=c.value}catch(l){return void n(l)}c.done?r(i):Promise.resolve(i).then(t,s)}function p(){var e=(0,c.useState)(""),r=e[0],n=e[1],t=(0,c.useState)(null),l=t[0],p=t[1],_=(0,c.useState)({s:"hidden"}),x=_[0],m=_[1],j=(0,c.useCallback)(function(){var e,r=(e=s().mark((function e(r){var n,t,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(p(null),""!==(n=r.replace(/[\W_]+/g,"").toLowerCase())){e.next=5;break}return m({s:"hidden"}),e.abrupt("return");case 5:return e.next=7,fetch("".concat(h.QP,"Search?q=").concat(n));case 7:if((t=e.sent).ok){e.next=11;break}return m({s:"hidden"}),e.abrupt("return");case 11:return e.next=13,t.json();case 13:a=e.sent,m({s:"displayed",list:a});case 15:case"end":return e.stop()}}),e)})),function(){var r=this,n=arguments;return new Promise((function(t,s){var a=e.apply(r,n);function o(e){f(a,t,s,o,c,"next",e)}function c(e){f(a,t,s,o,c,"throw",e)}o(void 0)}))});return function(e){return r.apply(this,arguments)}}(),[m,p]),v=(0,c.useCallback)((function(){n(""),m({s:"hidden"})}),[]),w=(0,c.useCallback)((function(e){var r=e.target.value;n(r),l&&window.clearTimeout(l),""!==r.replace(/[\W_]+/g,"").toLowerCase()?(m({s:"loading"}),p(window.setTimeout((function(){j(r)}),1e3))):m({s:"hidden"})}),[n,l,p,j]),k=(0,c.useCallback)((function(){var e=(0,a.jsxs)("span",{className:u().prompt,children:["Don't see a coaster? ",(0,a.jsx)(o.default,{href:"/contribute/newCoaster",children:(0,a.jsx)("a",{children:"Add it!"})})]});switch(x.s){case"hidden":return null;case"loading":return(0,a.jsx)("div",{className:u().results,children:(0,a.jsx)("span",{className:u().load,children:(0,a.jsx)(i.SyncLoader,{color:"white",size:5})})});case"displayed":return 0===x.list.length?(0,a.jsxs)("div",{className:u().results,children:[(0,a.jsx)("span",{className:u().noResults,children:"No results found"})," ",e]}):(0,a.jsxs)("div",{className:u().results,children:[(0,a.jsx)("ul",{children:x.list.map((function(e){return(0,a.jsx)("li",{children:(0,a.jsx)(o.default,{href:"/results?id=".concat(e.id),children:(0,a.jsxs)("a",{onClick:v,children:[(0,a.jsx)("p",{children:e.name}),(0,a.jsx)("p",{children:e.park})]})})},e.id)}))}),e]});default:return(0,d.U)(x)}}),[x,v]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{type:"text",placeholder:"Search for a coaster",value:r,onChange:w,className:u().input}),k()]})}},5075:function(e,r,n){"use strict";n.r(r);var t=n(5893),s=n(9008),a=n(6673),o=n(9988),c=n(9929),i=n(214),l=n.n(i);r.default=function(){return(0,t.jsx)("div",{className:l().imageContainer,children:(0,t.jsxs)("div",{className:l().container,children:[(0,t.jsxs)(s.default,{children:[(0,t.jsx)("title",{children:c.sG}),(0,t.jsx)("meta",{name:"description",content:"See what seats on a roller coaster people prefer, and submit your own preferences. It's like that other trademarked site name, but for roller coasters."})]}),(0,t.jsx)("h1",{className:l().title,children:c.sG}),(0,t.jsx)("p",{className:l().searchWrap,children:(0,t.jsx)(o.Z,{})}),(0,t.jsx)(a.Z,{isDark:!0})]})})}},606:function(e,r,n){"use strict";function t(e){throw new Error("Reached unreachable statement ".concat(e))}n.d(r,{U:function(){return t}})},9929:function(e,r,n){"use strict";n.d(r,{sG:function(){return t},QP:function(){return s},Cx:function(){return a}});var t="Coaster Seat Guru",s="https://coasterseatguru.azurewebsites.net/api/",a="707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com"},3952:function(e){e.exports={footer:"Footer_footer__Tl1eP",dark:"Footer_dark__YTV09"}},214:function(e){e.exports={title:"Home_title__T09hD",imageContainer:"Home_imageContainer__w0gn2",container:"Home_container__bCOhY",searchWrap:"Home_searchWrap___W0Bn",footer:"Home_footer____T7K"}},3253:function(e){e.exports={input:"Search_input__jBVVm",results:"Search_results__5GAEo",noResults:"Search_noResults__RG_yA",load:"Search_load__7D_zK",none:"Search_none__strFj",prompt:"Search_prompt__Xe5Gh"}}},function(e){e.O(0,[828,774,888,179],(function(){return r=5301,e(e.s=r);var r}));var r=e.O();_N_E=r}]);