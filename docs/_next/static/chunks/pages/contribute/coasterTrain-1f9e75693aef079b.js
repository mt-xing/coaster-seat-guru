(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[391],{2275:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contribute/coasterTrain",function(){return t(8436)}])},8436:function(e,n,t){"use strict";t.r(n);var r=t(4051),a=t.n(r),s=t(5893),i=t(9008),c=t(7294),o=t(4040),u=t(1664),d=t(1163),l=t(5921),f=t(1952),h=t(606),b=t(9929),x=t(2746),j=t.n(x),m=t(9841),g=t.n(m),p=t(2601),v=t(5843),_=t(6957);function k(e,n,t,r,a,s,i){try{var c=e[s](i),o=c.value}catch(u){return void t(u)}c.done?n(o):Promise.resolve(o).then(r,a)}function y(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var s=e.apply(n,t);function i(e){k(s,r,a,i,c,"next",e)}function c(e){k(s,r,a,i,c,"throw",e)}i(void 0)}))}}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function C(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){w(e,n,t[n])}))}return e}function N(){var e=(0,c.useState)({s:"Unauthenticated"}),n=e[0],t=e[1],r=(0,c.useCallback)((function(){window.document.title="N/A - ".concat(b.sG),t({s:"Not Found"})}),[]),i=(0,d.useRouter)(),f=i.query.id,x=i.isReady,m=(0,c.useCallback)((function(e){var n=e.credential;(0,p.W)(n),t({s:"Loading",token:n})}),[]);(0,c.useEffect)((function(){switch(n.s){case"Unauthenticated":var e=(0,p.v)();if(null!==e)return void t({s:"Loading",token:e});google.accounts.id.initialize({client_id:b.Cx,callback:m}),google.accounts.id.renderButton(document.getElementById("gbuttonDiv"),{theme:"outline",size:"large"});break;case"Loading":var s=function(){var e=y(a().mark((function e(){var s,i;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x){e.next=2;break}return e.abrupt("return");case 2:if(void 0!==f&&!Array.isArray(f)){e.next=5;break}return r(),e.abrupt("return");case 5:return e.next=7,fetch("".concat(b.QP,"GetCoaster?id=").concat(f));case 7:if((s=e.sent).ok){e.next=11;break}return r(),e.abrupt("return");case 11:return e.next=13,s.json();case 13:if(!((i=e.sent).rowsPerCar&&i.carDesign&&i.spacings)){e.next=17;break}return t({s:"Already Exists",id:i.id}),e.abrupt("return");case 17:t(C({s:"Ready",token:n.token,submitting:!1},i));case 18:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();s()}}),[n,m,f,r,x]);var v=(0,c.useCallback)((function(e,r,s,i,c){"Ready"===n.s&&(n.submitting||(t(C({},n,{submitting:!0})),y(a().mark((function e(){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={token:n.token,id:n.id,rowsPerCar:s,carDesign:i,spacings:c},e.next=3,fetch("".concat(b.QP,"editTrain?id=").concat(n.id),{method:"POST",body:JSON.stringify(r)});case 3:e.sent.ok?t({s:"Done",id:n.id}):t({s:"Error"});case 5:case"end":return e.stop()}}),e)})))()))}),[n]),k=(0,c.useCallback)((function(){return location.reload()}),[]);return(0,c.useCallback)((function(){switch(n.s){case"Unauthenticated":return(0,s.jsx)(_.Z,{});case"Loading":return(0,s.jsx)("div",{className:j().load,children:(0,s.jsx)(o.SyncLoader,{})});case"Not Found":return(0,s.jsxs)("div",{className:j().load,children:[(0,s.jsx)("h1",{children:"Coaster Not Found :("}),(0,s.jsx)(u.default,{href:"/contribute/newCoaster",children:(0,s.jsx)("a",{className:g().bigBtn,children:"Why not add it?"})})]});case"Ready":return(0,s.jsxs)("main",{className:j().main,children:[(0,s.jsx)("h1",{children:n.name}),(0,s.jsx)("h2",{children:n.park}),n.submitting?(0,s.jsx)(o.SyncLoader,{}):(0,s.jsx)(l.Z,{complete:v,initialRows:n.rows,initialCols:n.cols,allowRowEdit:!1})]});case"Done":return(0,s.jsxs)("div",{className:j().load,children:[(0,s.jsx)("h1",{children:"Thank You!"}),(0,s.jsx)(u.default,{href:"/results?id=".concat(n.id),children:(0,s.jsx)("a",{className:g().bigBtn,children:"Back to coaster"})})]});case"Error":return(0,s.jsxs)("div",{className:j().load,children:[(0,s.jsx)("h1",{children:"Something Went Wrong :("}),(0,s.jsx)("button",{className:g().bigBtn,onClick:k,children:"Try again"})]});case"Already Exists":return(0,s.jsxs)("div",{className:j().load,children:[(0,s.jsx)("h1",{children:"Invalid"}),(0,s.jsx)("p",{children:"This coaster already has train data"}),(0,s.jsx)(u.default,{href:"/results?id=".concat(n.id),children:(0,s.jsx)("a",{className:g().bigBtn,children:"Back to coaster"})})]});default:return(0,h.U)(n)}}),[n,v,k])()}n.default=function(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.default,{children:[(0,s.jsxs)("title",{children:["Edit Train - ",b.sG]}),(0,s.jsx)("meta",{name:"description",content:"Vote on a coaster's seats"})]}),(0,s.jsx)(f.Z,{}),(0,s.jsx)(v.Z,{page:(0,s.jsx)(N,{})})]})}},2746:function(e){e.exports={main:"Contribute_main__5fPQK",load:"Contribute_load__pL_xj",details:"Contribute_details__0dFDG",subInstr:"Contribute_subInstr___1zAv",progress:"Contribute_progress__XRuP3",active:"Contribute_active__ahOAj"}},1163:function(e,n,t){e.exports=t(387)}},function(e){e.O(0,[828,800,759,921,774,888,179],(function(){return n=2275,e(e.s=n);var n}));var n=e.O();_N_E=n}]);