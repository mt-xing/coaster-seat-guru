(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[112],{6673:function(r,e,n){"use strict";n.d(e,{Z:function(){return c}});var t=n(5893),a=n(3952),s=n.n(a);function c(r){return(0,t.jsxs)("footer",{className:r.isDark?"".concat(s().footer," ").concat(s().dark):s().footer,children:[(0,t.jsx)("div",{children:(0,t.jsxs)("p",{children:["A website by ",(0,t.jsx)("a",{href:"https://michaelxing.com",target:"_blank",rel:"noreferrer",children:"Michael Xing"}),", with help from ",(0,t.jsx)("a",{href:"https://reddit.com/r/rollercoasters",target:"_blank",rel:"noreferrer",children:"r/rollercoasters"}),"."]})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("p",{children:["Roller coaster icon by ",(0,t.jsx)("a",{href:"https://www.flaticon.com/free-icons/roller-coaster",target:"_blank",rel:"noreferrer",children:"Freepik - Flaticon"}),"."]}),(0,t.jsxs)("p",{children:["Proudly open source on ",(0,t.jsx)("a",{href:"https://github.com/mt-xing/coaster-seat-guru",target:"_blank",rel:"noreferrer",children:"GitHub"}),"."]})]})]})}},1952:function(r,e,n){"use strict";n.d(e,{Z:function(){return l}});var t=n(5893),a=n(1664),s=n(9929),c=n(9988),i=n(5606),o=n.n(i);function l(){return(0,t.jsxs)("header",{className:o().header,children:[(0,t.jsx)("h1",{className:o().h1,children:(0,t.jsx)(a.default,{href:"/",children:(0,t.jsxs)("a",{className:o().a,children:[(0,t.jsx)("img",{src:"/img/icon.png",alt:"",className:o().img}),s.sG]})})}),(0,t.jsx)("div",{className:o().div,children:(0,t.jsx)(c.Z,{})})]})}},9988:function(r,e,n){"use strict";n.d(e,{Z:function(){return _}});var t=n(4051),a=n.n(t),s=n(5893),c=n(1664),i=n(7294),o=n(4040),l=n(3253),d=n.n(l),u=n(606),h=n(9929);function p(r,e,n,t,a,s,c){try{var i=r[s](c),o=i.value}catch(l){return void n(l)}i.done?e(o):Promise.resolve(o).then(t,a)}function _(){var r=(0,i.useState)(""),e=r[0],n=r[1],t=(0,i.useState)(null),l=t[0],_=t[1],f=(0,i.useState)({s:"hidden"}),x=f[0],m=f[1],j=(0,i.useCallback)(function(){var r,e=(r=a().mark((function r(e){var n,t,s;return a().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(_(null),""!==(n=e.replace(/[\W_]+/g,"").toLowerCase())){r.next=5;break}return m({s:"hidden"}),r.abrupt("return");case 5:return r.next=7,fetch("".concat(h.QP,"Search?q=").concat(n));case 7:if((t=r.sent).ok){r.next=11;break}return m({s:"hidden"}),r.abrupt("return");case 11:return r.next=13,t.json();case 13:s=r.sent,m({s:"displayed",list:s});case 15:case"end":return r.stop()}}),r)})),function(){var e=this,n=arguments;return new Promise((function(t,a){var s=r.apply(e,n);function c(r){p(s,t,a,c,i,"next",r)}function i(r){p(s,t,a,c,i,"throw",r)}c(void 0)}))});return function(r){return e.apply(this,arguments)}}(),[m,_]),w=(0,i.useCallback)((function(){n(""),m({s:"hidden"})}),[]),g=(0,i.useCallback)((function(r){var e=r.target.value;n(e),l&&window.clearTimeout(l),""!==e.replace(/[\W_]+/g,"").toLowerCase()?(m({s:"loading"}),_(window.setTimeout((function(){j(e)}),500))):m({s:"hidden"})}),[n,l,_,j]),v=(0,i.useCallback)((function(){var r=(0,s.jsxs)("span",{className:d().prompt,children:["Don't see a coaster? ",(0,s.jsx)(c.default,{href:"/contribute/newCoaster",children:(0,s.jsx)("a",{children:"Add it!"})})]});switch(x.s){case"hidden":return null;case"loading":return(0,s.jsx)("div",{className:d().results,children:(0,s.jsx)("span",{className:d().load,children:(0,s.jsx)(o.SyncLoader,{color:"white",size:5})})});case"displayed":return 0===x.list.length?(0,s.jsxs)("div",{className:d().results,children:[(0,s.jsx)("span",{className:d().noResults,children:"No results found"})," ",r]}):(0,s.jsxs)("div",{className:d().results,children:[(0,s.jsx)("ul",{children:x.list.map((function(r){return(0,s.jsx)("li",{children:(0,s.jsx)(c.default,{href:"/results?id=".concat(r.id),children:(0,s.jsxs)("a",{onClick:w,children:[(0,s.jsx)("p",{children:r.name}),(0,s.jsx)("p",{children:r.park})]})})},r.id)}))}),r]});default:return(0,u.U)(x)}}),[x,w]);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("input",{type:"text",placeholder:"Search for a coaster",value:e,onChange:g,className:d().input}),v()]})}},6132:function(r,e,n){"use strict";n.d(e,{Z:function(){return i}});var t=n(5893),a=n(7294),s=n(6934),c=n.n(s);function i(r){var e=(0,a.useMemo)((function(){return Array.from(Array(r.rows).keys())}),[r.rows]),n=(0,a.useMemo)((function(){return Array.from(Array(r.cols).keys())}),[r.cols]),s=r.rowsPerCar,i=r.carDesign,l=r.spacings,d=r.render,u=r.renderGap,h=r.renderCarSide,p=r.renderColGap,_=r.renderRowGap;return void 0===s||void 0===i||void 0===l?(0,t.jsxs)("section",{className:c().coaster,children:[(0,t.jsx)("p",{children:"Front of train"}),(0,t.jsx)("table",{className:c().coasterTrain,children:(0,t.jsx)("tbody",{children:e.map((function(e){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:e+1}),n.map((function(n){return(0,t.jsx)("td",{children:r.render(e,n)},n)}))]},e)}))})})]}):(0,t.jsxs)("section",{className:"".concat(c().coaster," ").concat(c().trainEdit),children:[(0,t.jsx)("p",{children:"Front of train"}),(0,t.jsx)("table",{className:c().coasterTrain,children:(0,t.jsx)("tbody",{children:"number"===typeof s?Array.from(Array(r.rows/s).keys()).map((function(e){return(0,t.jsx)(o,{carNum:e,numRows:s,cols:r.cols,startingRow:e*s,lastCar:e===r.rows/s-1,carType:Array.isArray(i)?i[e]:i,spacings:l,render:d,renderGap:u,renderCarSide:h,renderColGap:p,renderRowGap:_},e)})):s.map((function(e,n){return(0,t.jsx)(o,{carNum:n,numRows:0===n?e+1:e-s[n-1],cols:r.cols,startingRow:0===n?0:s[n-1]+1,lastCar:n===s.length-1,carType:Array.isArray(i)?i[n]:i,spacings:l,render:d,renderGap:u,renderCarSide:h,renderColGap:p,renderRowGap:_},n)}))})})]})}function o(r){var e=(0,a.useMemo)((function(){return Array.from(Array(r.numRows).keys())}),[r.numRows]),n=r.lastCar,s=r.carNum,i=r.carType,o=r.spacings,l=r.render,d=r.renderGap,u=r.renderCarSide,h=r.renderColGap,p=r.renderRowGap;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:(0,t.jsx)("table",{className:"".concat(c().coasterTrain," ").concat(c().coasterCar).concat("circular"===i?" ".concat(c().roundCar):""),children:(0,t.jsx)("tbody",{children:e.map((function(e){var n=e+r.startingRow,s=n<o.length?o[n]:o[e];return(0,t.jsxs)(a.Fragment,{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:n+1}),(0,t.jsx)("td",{children:(0,t.jsx)("div",{children:s.reduce((function(r,e,c){return r.v.push((0,t.jsxs)(a.Fragment,{children:[e?l(n,r.numSeats++):d(n,c),h&&c!==s.length-1?h(n,c):null]},c)),r}),{v:[],numSeats:0}).v})})]}),p&&e!==r.numRows-1?p(n):null]},n)}))})})}),u?(0,t.jsx)("td",{className:c().carOptions,children:u(s)}):null]}),p&&!n?p(r.numRows-1+r.startingRow):null]})}},606:function(r,e,n){"use strict";function t(r){throw new Error("Reached unreachable statement ".concat(r))}n.d(e,{U:function(){return t}})},9929:function(r,e,n){"use strict";n.d(e,{sG:function(){return t},QP:function(){return a},Cx:function(){return s}});var t="Coaster Seat Guru",a="https://coasterseatguru.azurewebsites.net/api/",s="707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com"},9841:function(r){r.exports={bigBtn:"BigButton_bigBtn__zurtf"}},3952:function(r){r.exports={footer:"Footer_footer__Tl1eP",dark:"Footer_dark__YTV09"}},5606:function(r){r.exports={header:"Header_header__VYZ3G",img:"Header_img__ndXrS",h1:"Header_h1__Rh9ep",div:"Header_div__ju8k0",a:"Header_a__OpYgW"}},3253:function(r){r.exports={input:"Search_input__jBVVm",results:"Search_results__5GAEo",noResults:"Search_noResults__RG_yA",load:"Search_load__7D_zK",none:"Search_none__strFj",prompt:"Search_prompt__Xe5Gh"}},6934:function(r){r.exports={coaster:"Train_coaster__KhtQW",coasterTrain:"Train_coasterTrain__8ur2O",seat:"Train_seat___Il7C",trainEdit:"Train_trainEdit__l02Pk",rowBtn:"Train_rowBtn__Hesh3",del:"Train_del__rqXuR",add:"Train_add__AhMqU",spaceAdd:"Train_spaceAdd__44ClC",spaceDel:"Train_spaceDel__QLFAe",coasterCar:"Train_coasterCar__U4VL7",carOptions:"Train_carOptions__yN6YB",wrap:"Train_wrap__kwZ_7",roundCar:"Train_roundCar__fQntI"}}}]);