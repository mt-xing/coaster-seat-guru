(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[255],{5419:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/results",function(){return t(7773)}])},6673:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(5893),s=t(3952),a=t.n(s);function c(e){return(0,r.jsx)("footer",{className:e.isDark?"".concat(a().footer," ").concat(a().dark):a().footer,children:(0,r.jsx)("a",{href:"https://www.flaticon.com/free-icons/roller-coaster",title:"roller coaster icons",children:"Roller coaster icons created by Freepik - Flaticon"})})}},1952:function(e,n,t){"use strict";t.d(n,{Z:function(){return u}});var r=t(5893),s=t(1664),a=t(9929),c=t(9988),o=t(5606),i=t.n(o);function u(){return(0,r.jsxs)("header",{className:i().header,children:[(0,r.jsx)("h1",{className:i().h1,children:(0,r.jsx)(s.default,{href:"/",children:(0,r.jsxs)("a",{className:i().a,children:[(0,r.jsx)("img",{src:"/img/icon.png",alt:"",className:i().img}),a.sG]})})}),(0,r.jsx)("div",{className:i().div,children:(0,r.jsx)(c.Z,{})})]})}},9988:function(e,n,t){"use strict";t.d(n,{Z:function(){return x}});var r=t(4051),s=t.n(r),a=t(5893),c=t(1664),o=t(7294),i=t(4040),u=t(3253),l=t.n(u),d=t(606),f=t(9929);function h(e,n,t,r,s,a,c){try{var o=e[a](c),i=o.value}catch(u){return void t(u)}o.done?n(i):Promise.resolve(i).then(r,s)}function x(){var e=(0,o.useState)(""),n=e[0],t=e[1],r=(0,o.useState)(null),u=r[0],x=r[1],p=(0,o.useState)({s:"hidden"}),_=p[0],j=p[1],m=(0,o.useCallback)(function(){var e,n=(e=s().mark((function e(n){var t,r,a;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x(null),""!==(t=n.replace(/[\W_]+/g,"").toLowerCase())){e.next=5;break}return j({s:"hidden"}),e.abrupt("return");case 5:return e.next=7,fetch("".concat(f.QP,"Search?q=").concat(t));case 7:if((r=e.sent).ok){e.next=11;break}return j({s:"hidden"}),e.abrupt("return");case 11:return e.next=13,r.json();case 13:a=e.sent,j({s:"displayed",list:a});case 15:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,s){var a=e.apply(n,t);function c(e){h(a,r,s,c,o,"next",e)}function o(e){h(a,r,s,c,o,"throw",e)}c(void 0)}))});return function(e){return n.apply(this,arguments)}}(),[j,x]),v=(0,o.useCallback)((function(){t(""),j({s:"hidden"})}),[]),w=(0,o.useCallback)((function(e){var n=e.target.value;t(n),u&&window.clearTimeout(u),""!==n.replace(/[\W_]+/g,"").toLowerCase()?(j({s:"loading"}),x(window.setTimeout((function(){m(n)}),1e3))):j({s:"hidden"})}),[t,u,x,m]),b=(0,o.useCallback)((function(){var e=(0,a.jsxs)("span",{className:l().prompt,children:["Don't see a coaster? ",(0,a.jsx)("a",{href:"/contribute/newCoaster",children:"Add it!"})]});switch(_.s){case"hidden":return null;case"loading":return(0,a.jsx)("div",{className:l().results,children:(0,a.jsx)("span",{className:l().load,children:(0,a.jsx)(i.SyncLoader,{color:"white",size:5})})});case"displayed":return 0===_.list.length?(0,a.jsxs)("div",{className:l().results,children:[(0,a.jsx)("span",{className:l().noResults,children:"No results found"})," ",e]}):(0,a.jsxs)("div",{className:l().results,children:[(0,a.jsx)("ul",{children:_.list.map((function(e){return(0,a.jsx)("li",{children:(0,a.jsx)(c.default,{href:"/results?id=".concat(e.id),children:(0,a.jsxs)("a",{onClick:v,children:[(0,a.jsx)("p",{children:e.name}),(0,a.jsx)("p",{children:e.park})]})})},e.id)}))}),e]});default:return(0,d.U)(_)}}),[_,v]);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{type:"text",placeholder:"Search for a coaster",value:n,onChange:w,className:l().input}),b()]})}},6132:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(5893),s=t(6934),a=t.n(s);function c(e){var n=Array.from(Array(e.rows).keys()),t=Array.from(Array(e.cols).keys());return(0,r.jsxs)("section",{className:a().coaster,children:[(0,r.jsx)("p",{children:"Front of train"}),(0,r.jsx)("table",{className:a().coasterTrain,children:(0,r.jsx)("tbody",{children:n.map((function(n){return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:n+1}),t.map((function(t){return(0,r.jsx)("td",{children:e.render(n,t)},t)}))]},n)}))})})]})}},7773:function(e,n,t){"use strict";t.r(n);var r=t(4051),s=t.n(r),a=t(5893),c=t(9008),o=t(7294),i=t(4040),u=t(1664),l=t(1163),d=t(6673),f=t(1952),h=t(606),x=t(9929),p=t(5913),_=t.n(p),j=t(9841),m=t.n(j),v=t(6132);function w(e,n,t,r,s,a,c){try{var o=e[a](c),i=o.value}catch(u){return void t(u)}o.done?n(i):Promise.resolve(i).then(r,s)}function b(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function g(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){b(e,n,t[n])}))}return e}function y(e){return 3*e[0]+e[1]-3*e[2]}function k(e,n){var t=y(e);if(t>=0){var r=t/n*128+128,s=256-r;return"rgb(".concat(s,", ").concat(r,", ").concat(s,")")}var a=-t/n*128+128,c=256-a;return"rgb(".concat(a,", ").concat(c,", ").concat(c,")")}function N(){var e=(0,o.useState)({s:"Loading"}),n=e[0],t=e[1],r=(0,o.useCallback)((function(e,r){"Ready"===n.s&&t(g({},n,{selected:{row:e,col:r}}))}),[n]),c=(0,o.useCallback)((function(){window.document.title="N/A - ".concat(x.sG),t({s:"Not Found"})}),[]),d=(0,l.useRouter)(),f=d.query.id,p=d.isReady;(0,o.useEffect)((function(){if(p)if(void 0===f||Array.isArray(f))c();else{var e=function(){var e,n=(e=s().mark((function e(){var n,r;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(x.QP,"GetCoaster?id=").concat(f));case 2:if((n=e.sent).ok){e.next=6;break}return c(),e.abrupt("return");case 6:return e.next=8,n.json();case 8:r=e.sent,window.document.title="".concat(r.name," Seat Map - ").concat(x.sG),t(g({s:"Ready"},r,{selected:null}));case 11:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,s){var a=e.apply(n,t);function c(e){w(a,r,s,c,o,"next",e)}function o(e){w(a,r,s,c,o,"throw",e)}c(void 0)}))});return function(){return n.apply(this,arguments)}}();e()}}),[c,f,p]);var j=(0,o.useMemo)((function(){if("Ready"!==n.s)return[NaN,NaN];var e=6,t=0;return n.data.forEach((function(n){n.forEach((function(n){var r=Math.abs(y(n));r>e&&(e=r);var s=n.reduce((function(e,n){return e+n}));s>t&&(t=s)}))})),[e,t]}),[n]),b=j[0],N=j[1],C=(0,o.useCallback)((function(e){if("Ready"!==e.s)return null;if(null===e.selected)return null;var n=e.selected.row,t=e.selected.col,r=e.data[n][t],s=r.reduce((function(e,n){return e+n})),c=r.reduce((function(e,n){return n>e?n:e})),o=e.total-s;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("h2",{children:["Row ",n+1," \u2014 Seat ",t+1]}),(0,a.jsx)("table",{children:(0,a.jsxs)("tbody",{children:[[["Love","#2E7D32"],["Like","#0277BD"],["Hate","#C62828"]].map((function(e,n){var t=r[n];return(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{children:e[0]}),(0,a.jsxs)("td",{children:[(0,a.jsx)("span",{style:{width:"".concat(0===c?0:t/N*100/2,"%"),backgroundColor:e[1]}}),"".concat(0===c?0:Math.round(t/s*100),"% (").concat(t,")")]})]},e[0])})),(0,a.jsx)("tr",{children:(0,a.jsxs)("td",{colSpan:2,children:[o," ",1===o?"user":"users"," had no opinion"]})})]})})]})}),[N]);return(0,o.useCallback)((function(){switch(n.s){case"Loading":return(0,a.jsx)("div",{className:_().load,children:(0,a.jsx)(i.SyncLoader,{})});case"Not Found":return(0,a.jsxs)("div",{className:_().load,children:[(0,a.jsx)("h1",{style:{marginBottom:"20px"},children:"Coaster Not Found :("}),(0,a.jsx)(u.default,{href:"/contribute/newCoaster",children:(0,a.jsx)("a",{className:m().bigBtn,children:"Why not add it?"})})]});case"Ready":if(void 0===f||Array.isArray(f))throw new Error;return(0,a.jsxs)("main",{className:_().main,children:[(0,a.jsx)("h1",{children:n.name}),(0,a.jsx)("h2",{children:n.park}),(0,a.jsx)(v.Z,{rows:n.rows,cols:n.cols,render:function(e,t){return(0,a.jsx)("button",{style:{backgroundColor:k(n.data[e][t],b)},onClick:function(){return r(e,t)}})}}),(0,a.jsxs)("section",{className:_().details,children:[null===n.selected?(0,a.jsx)("h2",{children:"Select a seat to see ratings"}):C(n),(0,a.jsxs)("p",{className:_().contactMsg,children:["If something is wrong with this page,",(0,a.jsx)("br",{}),"please let me know on ",(0,a.jsx)("a",{href:"https://www.reddit.com/r/rollercoasters/comments/tkwcol/other_i_built_coasterseatgurucom_for_people_to/",children:"reddit"}),"."]}),(0,a.jsx)(u.default,{href:"/contribute?id=".concat(f),children:(0,a.jsx)("a",{className:"".concat(m().bigBtn," ").concat(_().voteBtn),children:"Vote on your favorite seats"})})]})]});default:return(0,h.U)(n)}}),[f,n,b,r,C])()}n.default=function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(c.default,{children:[(0,a.jsxs)("title",{children:["Seat Map - ",x.sG]}),(0,a.jsx)("meta",{name:"description",content:"Coaster seat map"})]}),(0,a.jsx)(f.Z,{}),(0,a.jsx)(N,{}),(0,a.jsx)(d.Z,{isDark:!1})]})}},606:function(e,n,t){"use strict";function r(e){throw new Error("Reached unreachable statement ".concat(e))}t.d(n,{U:function(){return r}})},9929:function(e,n,t){"use strict";t.d(n,{sG:function(){return r},QP:function(){return s},Cx:function(){return a}});var r="Coaster Seat Guru",s="https://coasterseatguru.azurewebsites.net/api/",a="707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com"},9841:function(e){e.exports={bigBtn:"BigButton_bigBtn__zurtf"}},3952:function(e){e.exports={footer:"Footer_footer__Tl1eP",dark:"Footer_dark__YTV09"}},5606:function(e){e.exports={header:"Header_header__VYZ3G",img:"Header_img__ndXrS",h1:"Header_h1__Rh9ep",div:"Header_div__ju8k0",a:"Header_a__OpYgW"}},5913:function(e){e.exports={main:"Results_main__i9e5E",load:"Results_load__Yj84G",details:"Results_details__73WFo",voteBtn:"Results_voteBtn__t8c6k",contactMsg:"Results_contactMsg__fgbFv"}},3253:function(e){e.exports={input:"Search_input__jBVVm",results:"Search_results__5GAEo",noResults:"Search_noResults__RG_yA",load:"Search_load__7D_zK",none:"Search_none__strFj",prompt:"Search_prompt__Xe5Gh"}},6934:function(e){e.exports={coaster:"Train_coaster__KhtQW",coasterTrain:"Train_coasterTrain__8ur2O"}},1163:function(e,n,t){e.exports=t(387)}},function(e){e.O(0,[828,774,888,179],(function(){return n=5419,e(e.s=n);var n}));var n=e.O();_N_E=n}]);