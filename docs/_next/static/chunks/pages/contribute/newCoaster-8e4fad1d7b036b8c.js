(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[886],{7802:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contribute/newCoaster",function(){return t(5882)}])},5882:function(e,n,t){"use strict";t.r(n);var r=t(4051),a=t.n(r),i=t(5893),s=t(9008),c=t(7294),o=t(1664),l=t(5921),u=t(6673),d=t(1952),h=t(606),f=t(9929),m=t(832),x=t.n(m),p=t(9841),b=t.n(p),g=t(2601),j=t(5843),v=t(6957);function k(e,n,t,r,a,i,s){try{var c=e[i](s),o=c.value}catch(l){return void t(l)}c.done?n(o):Promise.resolve(o).then(r,a)}function w(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var y=[{name:"Angry 326",park:"Dakotawinds"},{name:"Steel Retaliation",park:"Cedar Tip"},{name:"Z3",park:"Five Banners Magic Hill"},{name:"Mystic Wood",park:"King's Isle"}],C=y[Math.floor(Math.random()*y.length)],_=/http(?:s?):\/\/rcdb.com\/([\d]+)\.htm/;function N(){var e=(0,c.useState)({s:"Unauthenticated"}),n=e[0],t=e[1],r=(0,c.useState)(""),s=r[0],u=r[1],d=(0,c.useState)(""),m=d[0],p=d[1],j=(0,c.useState)(""),y=j[0],N=j[1],S=(0,c.useState)(!1),E=S[0],O=S[1],P=(0,c.useCallback)((function(e){var n=e.credential;(0,g.W)(n),t({s:"Ready",token:n,submitting:!1})}),[]);(0,c.useEffect)((function(){if("Unauthenticated"===n.s){var e=(0,g.v)();if(null!==e)return void t({s:"Ready",token:e,submitting:!1});google.accounts.id.initialize({client_id:f.Cx,callback:P}),google.accounts.id.renderButton(document.getElementById("gbuttonDiv"),{theme:"outline",size:"large"})}}),[n,P]);var D=(0,c.useCallback)((function(){return O(!0)}),[]),R=(0,c.useCallback)((function(e,r,i,c,o){if("Ready"===n.s&&!n.submitting){var l=_.exec(y);if(null!==l){var u,d=l[1],h=n.token;t(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){w(e,n,t[n])}))}return e}({},n,{submitting:!0})),(u=a().mark((function n(){var l;return a().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return l={token:h,rcdb:y,name:s,park:m,rows:e,cols:r,rowsPerCar:i,carDesign:c,spacings:o},n.next=3,fetch("".concat(f.QP,"createCoaster?id=").concat(d),{method:"POST",body:JSON.stringify(l)});case 3:n.sent.ok?t({s:"Done",id:d}):t({s:"Error",msg:"Sorry, an error occurred"});case 5:case"end":return n.stop()}}),n)})),function(){var e=this,n=arguments;return new Promise((function(t,r){var a=u.apply(e,n);function i(e){k(a,t,r,i,s,"next",e)}function s(e){k(a,t,r,i,s,"throw",e)}i(void 0)}))})()}}}),[n,s,m,y]),T=(0,c.useMemo)((function(){return"Ready"===n.s&&!n.submitting&&(""!==s&&""!==m&&""!==y&&_.test(y))}),[n,s,m,y]),B=(0,c.useCallback)((function(){return location.reload()}),[]);return(0,c.useCallback)((function(){switch(n.s){case"Unauthenticated":return(0,i.jsx)(v.Z,{});case"Ready":return E?(0,i.jsxs)("main",{className:x().main,children:[(0,i.jsx)("h1",{children:"Train Editor"}),(0,i.jsxs)("h2",{children:[s," - ",m]}),(0,i.jsx)(l.Z,{allowRowEdit:!0,complete:R})]}):(0,i.jsxs)("main",{className:x().main,children:[(0,i.jsx)("h1",{children:"New Coaster"}),(0,i.jsx)("p",{children:"Thanks for making this site better."}),(0,i.jsx)("p",{children:(0,i.jsxs)("label",{children:["Coaster Name: ",(0,i.jsx)("input",{type:"text",placeholder:C.name,value:s,onChange:function(e){return u(e.target.value)}})]})}),(0,i.jsx)("p",{children:(0,i.jsxs)("label",{children:["Park Name: ",(0,i.jsx)("input",{type:"text",placeholder:C.park,value:m,onChange:function(e){return p(e.target.value)}})]})}),(0,i.jsx)("p",{children:(0,i.jsxs)("label",{children:["RCDB Link: ",(0,i.jsx)("input",{type:"text",placeholder:"https://rcdb.com/???.html",value:y,onChange:function(e){return N(e.target.value)}})]})}),(0,i.jsx)("p",{children:(0,i.jsx)("button",{className:b().bigBtn,disabled:!T,onClick:D,children:"Next"})})]});case"Done":return(0,i.jsxs)("div",{className:x().load,children:[(0,i.jsx)("h1",{children:"Thank You!"}),(0,i.jsx)(o.default,{href:"/results?id=".concat(n.id),children:(0,i.jsx)("a",{className:b().bigBtn,children:"Go to coaster"})})]});case"Error":return(0,i.jsxs)("div",{className:x().load,children:[(0,i.jsx)("h1",{children:"Something Went Wrong :("}),(0,i.jsx)("h2",{children:n.msg}),(0,i.jsx)("button",{className:b().bigBtn,onClick:B,children:"Try again"})]});default:return(0,h.U)(n)}}),[n,B,s,m,y,T,D,R,E])()}n.default=function(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(s.default,{children:[(0,i.jsxs)("title",{children:["Submit Coaster - ",f.sG]}),(0,i.jsx)("meta",{name:"description",content:"Submit a new coaster"})]}),(0,i.jsx)(d.Z,{}),(0,i.jsx)(j.Z,{page:(0,i.jsx)(N,{})}),(0,i.jsx)(u.Z,{isDark:!1})]})}},832:function(e){e.exports={main:"NewCoaster_main__6vIxY",load:"NewCoaster_load__hY_7f"}}},function(e){e.O(0,[828,800,112,8,774,888,179],(function(){return n=7802,e(e.s=n);var n}));var n=e.O();_N_E=n}]);