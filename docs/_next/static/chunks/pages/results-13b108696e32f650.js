(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[255],{5419:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/results",function(){return n(3569)}])},1952:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(5893),i=n(1664),o=n(9929),s=n(9988),a=n(5606),c=n.n(a),l={background:"none",boxShadow:"none"};function u(e){return(0,r.jsxs)("header",{className:c().header,style:e.noBg?l:void 0,children:[(0,r.jsx)("h1",{className:c().h1,children:(0,r.jsx)(i.default,{href:"/",children:(0,r.jsxs)("a",{className:c().a,children:[(0,r.jsx)("img",{src:"/img/icon.png",alt:"",className:c().img}),o.sG]})})}),(0,r.jsx)("div",{className:c().div,children:(0,r.jsx)(s.Z,{})})]})}},9988:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(4051),i=n.n(r),o=n(5893),s=n(1664),a=n(7294),c=n(4040),l=n(3253),u=n.n(l),h=n(606),d=n(9929);function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function f(e,t,n,r,i,o,s){try{var a=e[o](s),c=a.value}catch(l){return void n(l)}a.done?t(c):Promise.resolve(c).then(r,i)}var m,v,b=(m=function(){var e=0;return[function(){var t,n=(t=i().mark((function t(n,r,o){var s,a,c,l;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r(null),""!==(s=o.replace(/[\W_]+/g,"").toLowerCase())){t.next=5;break}return n({s:"hidden"}),t.abrupt("return");case 5:return e++,a=e,t.next=9,fetch("".concat(d.QP,"Search?q=").concat(s));case 9:if((c=t.sent).ok){t.next=13;break}return n({s:"hidden"}),t.abrupt("return");case 13:return t.next=15,c.json();case 15:if(l=t.sent,e===a){t.next=18;break}return t.abrupt("return");case 18:n({s:"displayed",list:l});case 19:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function s(e){f(o,r,i,s,a,"next",e)}function a(e){f(o,r,i,s,a,"throw",e)}s(void 0)}))});return function(e,t,r){return n.apply(this,arguments)}}(),function(){e++}]}(),v=2,function(e){if(Array.isArray(e))return e}(m)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,o=[],s=!0,a=!1;try{for(n=n.call(e);!(s=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);s=!0);}catch(c){a=!0,i=c}finally{try{s||null==n.return||n.return()}finally{if(a)throw i}}return o}}(m,v)||function(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(m,v)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),x=b[0],y=b[1];function g(e){var t,n=(0,a.useState)(""),r=n[0],i=n[1],l=(0,a.useState)(null),d=l[0],p=l[1],f=(0,a.useState)({s:"hidden"}),m=f[0],v=f[1],b=(0,a.useMemo)((function(){return x.bind({},v,p)}),[v,p]),g=(0,a.useCallback)((function(){y(),i(""),v({s:"hidden"})}),[]),w=(0,a.useCallback)((function(e){var t=e.target.value;i(t),d&&window.clearTimeout(d);var n=t.replace(/[\W_]+/g,"").toLowerCase();if(""===n)return y(),void v({s:"hidden"});v({s:"loading"}),p(window.setTimeout((function(){b(t)}),function(e){var t=500;switch(e.length){case 0:return Number.POSITIVE_INFINITY;case 1:return 2e3;case 2:return t;case 3:return 250;case 4:return 100;default:return 50}}(n)))}),[i,d,p,b]),_=(0,a.useCallback)((function(){var e=(0,o.jsxs)("span",{className:u().prompt,children:["Don't see a coaster? ",(0,o.jsx)(s.default,{href:"/contribute/newCoaster",children:(0,o.jsx)("a",{children:"Add it!"})})]});switch(m.s){case"hidden":return null;case"loading":return(0,o.jsx)("div",{className:u().results,children:(0,o.jsx)("span",{className:u().load,children:(0,o.jsx)(c.SyncLoader,{color:"white",size:5})})});case"displayed":return 0===m.list.length?(0,o.jsxs)("div",{className:u().results,children:[(0,o.jsx)("span",{className:u().noResults,children:"No results found"})," ",e]}):(0,o.jsxs)("div",{className:u().results,children:[(0,o.jsx)("ul",{children:m.list.map((function(e){return(0,o.jsx)("li",{children:(0,o.jsx)(s.default,{href:"/results?id=".concat(e.id),children:(0,o.jsxs)("a",{onClick:g,children:[(0,o.jsx)("p",{children:e.name}),(0,o.jsx)("p",{children:e.park})]})})},e.id)}))}),e]});default:return(0,h.U)(m)}}),[m,g]);return(0,o.jsxs)("div",{className:e.customWrap?"".concat(u().wrap," ").concat(e.customWrap):u().wrap,children:[(0,o.jsx)("input",{type:"text",placeholder:"Search for a coaster",value:r,onChange:w,className:null!==(t=e.customStyles)&&void 0!==t?t:u().input}),_()]})}},3569:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});var r=n(4051),i=n.n(r),o=n(5893),s=n(9008),a=n(7294),c=n(4040),l=n(1664),u=n(1163);function h(e,t,n){return e[t]?e[t][0]?e[t][0][n]:e[t][n]:"contentBoxSize"===t?e.contentRect["inlineSize"===n?"width":"height"]:void 0}function d(e){void 0===e&&(e={});var t=e.onResize,n=(0,a.useRef)(void 0);n.current=t;var r=e.round||Math.round,i=(0,a.useRef)(),o=(0,a.useState)({width:void 0,height:void 0}),s=o[0],c=o[1],l=(0,a.useRef)(!1);(0,a.useEffect)((function(){return l.current=!1,function(){l.current=!0}}),[]);var u=(0,a.useRef)({width:void 0,height:void 0}),d=function(e,t){var n=(0,a.useRef)(null),r=(0,a.useRef)(null);r.current=t;var i=(0,a.useRef)(null);(0,a.useEffect)((function(){o()}));var o=(0,a.useCallback)((function(){var t=i.current,o=r.current,s=t||(o?o instanceof Element?o:o.current:null);n.current&&n.current.element===s&&n.current.subscriber===e||(n.current&&n.current.cleanup&&n.current.cleanup(),n.current={element:s,subscriber:e,cleanup:s?e(s):void 0})}),[e]);return(0,a.useEffect)((function(){return function(){n.current&&n.current.cleanup&&(n.current.cleanup(),n.current=null)}}),[]),(0,a.useCallback)((function(e){i.current=e,o()}),[o])}((0,a.useCallback)((function(t){return i.current&&i.current.box===e.box&&i.current.round===r||(i.current={box:e.box,round:r,instance:new ResizeObserver((function(t){var i=t[0],o="border-box"===e.box?"borderBoxSize":"device-pixel-content-box"===e.box?"devicePixelContentBoxSize":"contentBoxSize",s=h(i,o,"inlineSize"),a=h(i,o,"blockSize"),d=s?r(s):void 0,p=a?r(a):void 0;if(u.current.width!==d||u.current.height!==p){var f={width:d,height:p};u.current.width=d,u.current.height=p,n.current?n.current(f):l.current||c(f)}}))}),i.current.instance.observe(t,{box:e.box}),function(){i.current&&i.current.instance.unobserve(t)}}),[e.box,r]),e.ref);return(0,a.useMemo)((function(){return{ref:d,width:s.width,height:s.height}}),[d,s.width,s.height])}function p(){var e=(0,a.useState)(0),t=e[0],n=e[1],r=(0,a.useCallback)((function(){n(window.innerWidth)}),[]);return(0,a.useEffect)((function(){return n(window.innerWidth),window.addEventListener("resize",r),function(){window.removeEventListener("resize",r)}}),[r]),t}var f=n(4812),m=n.n(f);function v(e){var t=(0,a.useMemo)((function(){return Array.from(Array(e.rows).keys())}),[e.rows]),n=(0,a.useMemo)((function(){return Array.from(Array(e.cols).keys())}),[e.cols]),r=d(),i=r.ref,s=r.width,c=r.height,l=(0,a.useMemo)((function(){if(s)return{height:"".concat(s,"px")}}),[s]),u=p(),h=(0,a.useMemo)((function(){return(null!==c&&void 0!==c?c:0)>u}),[c,u]),f=e.onResizeCallback;(0,a.useEffect)((function(){h?null===f||void 0===f||f(s):null===f||void 0===f||f(void 0)}),[s,h,f]);var v=e.rowsPerCar,x=e.carDesign,y=e.spacings,g=e.render,w=e.renderGap;return void 0===v||void 0===x||void 0===y?(0,o.jsx)("section",{style:l,className:m().coaster,children:(0,o.jsx)("table",{className:m().coasterTrain,ref:i,children:(0,o.jsx)("tbody",{style:{padding:"0 35px"},children:t.map((function(t){return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"".concat(m().rowMarker," ").concat(m().legacyRowMarker),children:t+1}),n.map((function(n){return(0,o.jsx)("td",{children:e.render(t,n)},n)}))]},t)}))})})}):(0,o.jsx)("section",{style:l,className:"".concat(m().coaster," ").concat(m().trainEdit).concat(h?" ".concat(m().sideTrain):""),children:(0,o.jsx)("div",{className:m().coasterTrain,ref:i,children:"number"===typeof v?Array.from(Array(e.rows/v).keys()).map((function(t){return(0,o.jsx)(b,{carNum:t,numRows:v,cols:e.cols,startingRow:t*v,lastCar:t===e.rows/v-1,carType:Array.isArray(x)?x[t]:x,spacings:y,render:g,renderGap:w},t)})):v.map((function(t,n){return(0,o.jsx)(b,{carNum:n,numRows:0===n?t+1:t-v[n-1],cols:e.cols,startingRow:0===n?0:v[n-1]+1,lastCar:n===v.length-1,carType:Array.isArray(x)?x[n]:x,spacings:y,render:g,renderGap:w},n)}))})})}function b(e){var t=(0,a.useMemo)((function(){return Array.from(Array(e.numRows).keys())}),[e.numRows]),n=e.carType,r=e.spacings,i=e.render,s=e.renderGap;return(0,o.jsx)("table",{className:"".concat(m().coasterCar," ").concat("circular"===n?" ".concat(m().roundCar):""),children:(0,o.jsx)("tbody",{children:t.map((function(t){var n=t+e.startingRow,c=n<r.length?r[n]:r[t];return(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:m().rowMarker,children:n+1}),(0,o.jsx)("td",{children:(0,o.jsx)("div",{style:{whiteSpace:"nowrap",marginBottom:"2px"},children:c.reduce((function(e,t,r){return e.v.push((0,o.jsx)(a.Fragment,{children:t?i(n,e.numSeats++):s(n,r)},r)),e}),{v:[],numSeats:0}).v})})]},n)}))})})}function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(this,arguments)}var y=a.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},a.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),g=a.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},a.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function w(e){if(7===e.length)return e;for(var t="#",n=1;n<4;n+=1)t+=e[n]+e[n];return t}function _(e,t,n,r,i){return function(e,t,n,r,i){var o=(e-n)/(t-n);if(0===o)return r;if(1===o)return i;for(var s="#",a=1;a<6;a+=2){var c=parseInt(r.substr(a,2),16),l=parseInt(i.substr(a,2),16),u=Math.round((1-o)*c+o*l).toString(16);1===u.length&&(u="0"+u),s+=u}return s}(e,t,n,w(r),w(i))}var j=function(e){function t(t){e.call(this,t);var n=t.height,r=t.width,i=t.checked;this.t=t.handleDiameter||n-2,this.i=Math.max(r-n,r-(n+this.t)/2),this.o=Math.max(0,(n-this.t)/2),this.state={h:i?this.i:this.o},this.l=0,this.u=0,this.p=this.p.bind(this),this.v=this.v.bind(this),this.g=this.g.bind(this),this.k=this.k.bind(this),this.m=this.m.bind(this),this.M=this.M.bind(this),this.T=this.T.bind(this),this.$=this.$.bind(this),this.C=this.C.bind(this),this.D=this.D.bind(this),this.O=this.O.bind(this),this.S=this.S.bind(this)}return e&&(t.__proto__=e),(t.prototype=Object.create(e&&e.prototype)).constructor=t,t.prototype.componentDidMount=function(){this.W=!0},t.prototype.componentDidUpdate=function(e){e.checked!==this.props.checked&&this.setState({h:this.props.checked?this.i:this.o})},t.prototype.componentWillUnmount=function(){this.W=!1},t.prototype.I=function(e){this.H.focus(),this.setState({R:e,j:!0,B:Date.now()})},t.prototype.L=function(e){var t=this.state,n=t.R,r=t.h,i=(this.props.checked?this.i:this.o)+e-n;t.N||e===n||this.setState({N:!0});var o=Math.min(this.i,Math.max(this.o,i));o!==r&&this.setState({h:o})},t.prototype.U=function(e){var t=this.state,n=t.h,r=t.N,i=t.B,o=this.props.checked,s=(this.i+this.o)/2;this.setState({h:this.props.checked?this.i:this.o});var a=Date.now()-i;(!r||a<250||o&&n<=s||!o&&n>=s)&&this.A(e),this.W&&this.setState({N:!1,j:!1}),this.l=Date.now()},t.prototype.p=function(e){e.preventDefault(),"number"==typeof e.button&&0!==e.button||(this.I(e.clientX),window.addEventListener("mousemove",this.v),window.addEventListener("mouseup",this.g))},t.prototype.v=function(e){e.preventDefault(),this.L(e.clientX)},t.prototype.g=function(e){this.U(e),window.removeEventListener("mousemove",this.v),window.removeEventListener("mouseup",this.g)},t.prototype.k=function(e){this.X=null,this.I(e.touches[0].clientX)},t.prototype.m=function(e){this.L(e.touches[0].clientX)},t.prototype.M=function(e){e.preventDefault(),this.U(e)},t.prototype.$=function(e){Date.now()-this.l>50&&(this.A(e),Date.now()-this.u>50&&this.W&&this.setState({j:!1}))},t.prototype.C=function(){this.u=Date.now()},t.prototype.D=function(){this.setState({j:!0})},t.prototype.O=function(){this.setState({j:!1})},t.prototype.S=function(e){this.H=e},t.prototype.T=function(e){e.preventDefault(),this.H.focus(),this.A(e),this.W&&this.setState({j:!1})},t.prototype.A=function(e){var t=this.props;(0,t.onChange)(!t.checked,e,t.id)},t.prototype.render=function(){var e=this.props,t=e.checked,n=e.disabled,r=e.className,i=e.offColor,o=e.onColor,s=e.offHandleColor,c=e.onHandleColor,l=e.checkedIcon,u=e.uncheckedIcon,h=e.checkedHandleIcon,d=e.uncheckedHandleIcon,p=e.boxShadow,f=e.activeBoxShadow,m=e.height,v=e.width,b=e.borderRadius,y=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===t.indexOf(r)&&(n[r]=e[r]);return n}(e,["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"]),g=this.state,w=g.h,j=g.N,k=g.j,S={position:"relative",display:"inline-block",textAlign:"left",opacity:n?.5:1,direction:"ltr",borderRadius:m/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},C={height:m,width:v,margin:Math.max(0,(this.t-m)/2),position:"relative",background:_(w,this.i,this.o,i,o),borderRadius:"number"==typeof b?b:m/2,cursor:n?"default":"pointer",WebkitTransition:j?null:"background 0.25s",MozTransition:j?null:"background 0.25s",transition:j?null:"background 0.25s"},R={height:m,width:Math.min(1.5*m,v-(this.t+m)/2+1),position:"relative",opacity:(w-this.o)/(this.i-this.o),pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},T={height:m,width:Math.min(1.5*m,v-(this.t+m)/2+1),position:"absolute",opacity:1-(w-this.o)/(this.i-this.o),right:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},N={height:this.t,width:this.t,background:_(w,this.i,this.o,s,c),display:"inline-block",cursor:n?"default":"pointer",borderRadius:"number"==typeof b?b-1:"50%",position:"absolute",transform:"translateX("+w+"px)",top:Math.max(0,(m-this.t)/2),outline:0,boxShadow:k?f:p,border:0,WebkitTransition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:j?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},M={height:this.t,width:this.t,opacity:Math.max(2*(1-(w-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"},E={height:this.t,width:this.t,opacity:Math.max(2*((w-this.o)/(this.i-this.o)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:j?null:"opacity 0.25s",MozTransition:j?null:"opacity 0.25s",transition:j?null:"opacity 0.25s"};return a.createElement("div",{className:r,style:S},a.createElement("div",{className:"react-switch-bg",style:C,onClick:n?null:this.T,onMouseDown:function(e){return e.preventDefault()}},l&&a.createElement("div",{style:R},l),u&&a.createElement("div",{style:T},u)),a.createElement("div",{className:"react-switch-handle",style:N,onClick:function(e){return e.preventDefault()},onMouseDown:n?null:this.p,onTouchStart:n?null:this.k,onTouchMove:n?null:this.m,onTouchEnd:n?null:this.M,onTouchCancel:n?null:this.O},d&&a.createElement("div",{style:M},d),h&&a.createElement("div",{style:E},h)),a.createElement("input",x({},{type:"checkbox",role:"switch","aria-checked":t,checked:t,disabled:n,style:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1}},y,{ref:this.S,onFocus:this.D,onBlur:this.O,onKeyUp:this.C,onChange:this.$})))},t}(a.Component);j.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:y,checkedIcon:g,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56};var k=n(1952),S=n(606),C=n(9929),R=n(5913),T=n.n(R);function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var M=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);var n=6,r=0;t.forEach((function(t){t.forEach((function(t){var i=Math.abs(e.weightedScore(t));i>n&&(n=i);var o=t.reduce((function(e,t){return e+t}));o>r&&(r=o)}))})),this.maxMagnitude=n,this.maxVotes=r}var t,n,r;return t=e,r=[{key:"weightedScore",value:function(e){return 3*e[0]+e[1]-3*e[2]}}],(n=[{key:"colorOfScore",value:function(t){if(0===this.maxVotes)return"rgb(128, 128, 128)";var n=Math.min(t[0],t[2])/(this.maxVotes/2),r=Math.floor(128*n),i=[128+r,128+r,128-r],o=e.weightedScore(t),s=o>=0?[0,256,0]:[256,0,0],a=Math.abs(o/this.maxMagnitude),c=i.map((function(e,t){return(1-a)*e+a*s[t]})).map((function(e){return e>255?255:e}));return"rgb(".concat(c[0],", ").concat(c[1],", ").concat(c[2],")")}},{key:"accessibleScore",value:function(t){if(0===this.maxVotes)return"";var n=e.weightedScore(t)/this.maxMagnitude;return Math.abs(n)<.25?Math.min(t[0],t[2])/(this.maxVotes/2)>.2?"\u21ce":"":Math.abs(n)<.75?n>0?"+":"\u2212":n>0?"++":"\u2212\u2212"}},{key:"maximumVotes",get:function(){return this.maxVotes}}])&&N(t.prototype,n),r&&N(t,r),e}();function E(e,t,n,r,i,o,s){try{var a=e[o](s),c=a.value}catch(l){return void n(l)}a.done?t(c):Promise.resolve(c).then(r,i)}function W(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){W(e,t,n[t])}))}return e}function A(){var e=(0,a.useState)({s:"Loading"}),t=e[0],n=e[1],r=(0,a.useState)(!1),s=r[0],h=r[1];(0,a.useEffect)((function(){"on"===localStorage.getItem("accessible")&&h(!0)}),[]);var d=(0,a.useCallback)((function(e){h(e),e?localStorage.setItem("accessible","on"):localStorage.removeItem("accessible")}),[]),f=(0,a.useCallback)((function(e,r){"Ready"===t.s&&n(D({},t,{selected:{row:e,col:r}}))}),[t]),m=(0,a.useCallback)((function(){window.document.title="N/A - ".concat(C.sG),n({s:"Not Found"})}),[]),b=(0,a.useState)(),x=b[0],y=b[1],g=p(),w=!!x&&x+450>g,_=(0,u.useRouter)(),k=_.query.id,R=_.isReady;(0,a.useEffect)((function(){if(R)if(void 0===k||Array.isArray(k))m();else{var e=function(){var e,t=(e=i().mark((function e(){var t,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(C.QP,"getCoaster?id=").concat(k));case 2:if((t=e.sent).ok){e.next=6;break}return m(),e.abrupt("return");case 6:return e.next=8,t.json();case 8:r=e.sent,window.document.title="".concat(r.name," Seat Map - ").concat(C.sG),n(D({s:"Ready"},r,{selected:null,heatmap:new M(r.data)}));case 11:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function s(e){E(o,r,i,s,a,"next",e)}function a(e){E(o,r,i,s,a,"throw",e)}s(void 0)}))});return function(){return t.apply(this,arguments)}}();e()}}),[m,k,R]);var N=(0,a.useCallback)((function(e){if("Ready"!==e.s)return null;if(null===e.selected)return null;var t=e.selected.row,n=e.selected.col,r=e.data[t][n],i=r.reduce((function(e,t){return e+t})),s=r.reduce((function(e,t){return t>e?t:e})),a=e.total-i;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("h2",{children:["Row ",t+1," \u2014 Seat ",n+1]}),(0,o.jsx)("table",{children:(0,o.jsxs)("tbody",{children:[[["Love","#2E7D32"],["Like","#0277BD"],["Hate","#C62828"]].map((function(t,n){var a=r[n];return(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:t[0]}),(0,o.jsxs)("td",{children:[(0,o.jsx)("span",{style:{width:"".concat(0===s?0:a/e.heatmap.maximumVotes*100/2,"%"),backgroundColor:t[1]}}),"".concat(0===s?0:Math.round(a/i*100),"% (").concat(a,")")]})]},t[0])})),(0,o.jsx)("tr",{children:(0,o.jsxs)("td",{colSpan:2,children:[a," ",1===a?"user":"users"," had no opinion"]})})]})})]})}),[]),W=(0,a.useCallback)((function(){return(0,o.jsx)("div",{className:"seat",style:{height:"30px",width:"30px",margin:"0 5px",display:"inline-block",verticalAlign:"middle"}})}),[]);return(0,a.useCallback)((function(){switch(t.s){case"Loading":return(0,o.jsx)("div",{className:T().load,children:(0,o.jsx)(c.SyncLoader,{color:"white"})});case"Not Found":return(0,o.jsxs)("div",{className:T().load,children:[(0,o.jsx)("h1",{style:{marginBottom:"20px"},children:"Coaster Not Found :("}),(0,o.jsx)("p",{children:"Like Six Flags' corporate strategy, this coaster doesn't seem to exist."}),(0,o.jsx)(l.default,{href:"/contribute/newCoaster",children:"Why not add it?"})]});case"Ready":if(void 0===k||Array.isArray(k))throw new Error;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("main",{className:"".concat(T().main," ").concat(x?T().sideTrain:T().normalTrain).concat(w?" ".concat(T().narrow):""),children:[(0,o.jsx)("div",{className:T().trainWrap,children:(0,o.jsx)(v,{rows:t.rows,cols:t.cols,render:function(e,n){var r,i;return(0,o.jsxs)("button",{"aria-label":"Row ".concat(e+1,", Seat ").concat(n+1),style:{backgroundColor:t.heatmap.colorOfScore(t.data[e][n])},onClick:function(){return f(e,n)},className:"".concat(T().seat).concat((null===(r=t.selected)||void 0===r?void 0:r.row)===e&&(null===(i=t.selected)||void 0===i?void 0:i.col)===n?" ".concat(T().selected):""),children:[(0,o.jsx)("div",{className:T().selected}),s?(0,o.jsx)("span",{className:T().accessibleScore,children:t.heatmap.accessibleScore(t.data[e][n])}):null]})},renderGap:W,carDesign:t.carDesign,spacings:t.spacings,rowsPerCar:t.rowsPerCar,onResizeCallback:y},k)}),(0,o.jsxs)("div",{className:T().boxWrap,children:[(0,o.jsxs)("section",{className:T().infoWrap,lang:"en",children:[(0,o.jsx)("h1",{children:t.name}),(0,o.jsx)("h2",{children:t.park}),(0,o.jsx)("p",{children:(0,o.jsx)(l.default,{href:"/contribute?id=".concat(k),children:(0,o.jsx)("a",{className:T().voteBtn,children:"Add your vote \ud83e\udc82"})})})]}),(0,o.jsx)("section",{className:T().detailsWrap,children:null===t.selected?(0,o.jsx)("h2",{children:"Select a seat to see ratings"}):N(t)})]})]}),(0,o.jsxs)("div",{className:T().bottomWrap,children:[(0,o.jsxs)("p",{children:["The seat map above shows the layout, to the best of my knowledge, of ",t.name," at ",t.park,"."]}),(0,o.jsxs)("p",{children:[t.total," ",1===t.total?"person has":"people have"," voted on this coaster."]}),(0,o.jsx)("p",{children:(0,o.jsx)(l.default,{href:"/contribute?id=".concat(k),children:(0,o.jsx)("a",{className:T().voteBtn,children:"Add your opinion too \ud83e\udc82"})})}),t.carDesign&&t.spacings&&t.rowsPerCar?null:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("p",{children:"Incidentally, I don't actually know the layout of this coaster's train :("}),(0,o.jsx)("p",{children:(0,o.jsx)(l.default,{href:"/contribute/coasterTrain?id=".concat(k),children:(0,o.jsx)("a",{className:T().voteBtn,children:"Would you like to add it?"})})})]}),(0,o.jsx)("div",{children:(0,o.jsxs)("label",{children:["Having trouble seeing the colors? Try text mode:",(0,o.jsx)(j,{onChange:d,checked:s,className:T().accToggle,onColor:"#03045E"})]})}),s?(0,o.jsx)("p",{style:{marginLeft:"50px"},children:"++ (beloved), + (liked), \u21ce (controversial), \u2212 (disliked), \u2212\u2212 (hated)"}):null,(0,o.jsxs)("p",{className:T().contactMsg,children:["If something is wrong with this page, please let me know on ",(0,o.jsx)("a",{href:"https://github.com/mt-xing/coaster-seat-guru/issues",children:"GitHub"}),"."]})]})]});default:return(0,S.U)(t)}}),[k,t,f,N,W,s,d,x,w])()}var O=function(){var e,t,n=(0,u.useRouter)();return(0,o.jsxs)("div",{className:T().pageWrap,children:[(0,o.jsxs)(s.default,{children:[(0,o.jsxs)("title",{children:["Seat Map - ",C.sG]}),(0,o.jsx)("meta",{name:"description",content:"Coaster seat map"}),(0,o.jsx)("link",{rel:"canonical",href:"https://coasterseatguru.com/results/?id=".concat(null!==(t=null===(e=n.query.id)||void 0===e?void 0:e.toString())&&void 0!==t?t:"")})]}),(0,o.jsx)(k.Z,{noBg:!0}),(0,o.jsx)(A,{})]})}},606:function(e,t,n){"use strict";function r(e){throw new Error("Reached unreachable statement ".concat(e))}n.d(t,{U:function(){return r}})},9929:function(e,t,n){"use strict";n.d(t,{sG:function(){return r},QP:function(){return i},Cx:function(){return o}});var r="Coaster Seat Guru",i="https://coasterseatguru.azurewebsites.net/api/",o="707815788715-v292qtutlmval10742tekpbnv2a6to6l.apps.googleusercontent.com"},4812:function(e){e.exports={coaster:"DisplayTrain_coaster__URbn0",coasterTrain:"DisplayTrain_coasterTrain__HeoTE",cyclebg:"DisplayTrain_cyclebg__qui_D",coasterCar:"DisplayTrain_coasterCar__O3_1e",arrivein:"DisplayTrain_arrivein__yKhRF",roundCar:"DisplayTrain_roundCar__3Otrq",rowMarker:"DisplayTrain_rowMarker__Hd401",legacyRowMarker:"DisplayTrain_legacyRowMarker__8VLw5",sideTrain:"DisplayTrain_sideTrain__QR6vq"}},5606:function(e){e.exports={header:"Header_header__VYZ3G",img:"Header_img__ndXrS",h1:"Header_h1__Rh9ep",div:"Header_div__ju8k0",a:"Header_a__OpYgW"}},5913:function(e){e.exports={pageWrap:"Results_pageWrap__dK6cu",main:"Results_main__i9e5E",load:"Results_load__Yj84G",detailsWrap:"Results_detailsWrap__5vTPm",voteBtn:"Results_voteBtn__t8c6k",seat:"Results_seat__NTGkj",selected:"Results_selected__4rf_U",pulse:"Results_pulse__XkcHc",accessibleScore:"Results_accessibleScore__0rCzX",accToggle:"Results_accToggle__duer_",infoWrap:"Results_infoWrap__JPd6I",details:"Results_details__73WFo",contactMsg:"Results_contactMsg__fgbFv",bottomWrap:"Results_bottomWrap__EYmUI",normalTrain:"Results_normalTrain__vH8GW",boxWrap:"Results_boxWrap__Pl0xL",trainWrap:"Results_trainWrap__6U3yT",sideTrain:"Results_sideTrain__teN2P",narrow:"Results_narrow__MoauM",circle:"Results_circle__jvSEO"}},3253:function(e){e.exports={wrap:"Search_wrap__q61yw",input:"Search_input__jBVVm",results:"Search_results__5GAEo",noResults:"Search_noResults__RG_yA",load:"Search_load__7D_zK",none:"Search_none__strFj",prompt:"Search_prompt__Xe5Gh"}},1163:function(e,t,n){e.exports=n(387)}},function(e){e.O(0,[828,774,888,179],(function(){return t=5419,e(e.s=t);var t}));var t=e.O();_N_E=t}]);