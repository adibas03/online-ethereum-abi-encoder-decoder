import{w as h}from"./with-props-CDxDMfRq.js";import{p as y,l as a}from"./chunk-K6AXKMTT-nVvi_5XD.js";import{e as x,d as o}from"./eth-fyaT1nlS.js";import{F as d,v,a as j,i as b,b as l,L as r,c as p,r as m,D as u,d as g,R as f,e as F}from"./form-BscyzAqm.js";const N=async({request:i})=>{const n=await i.formData(),t=(n.get(d.types)||"").toString(),e=(n.get(d.decoded)||"").toString(),s={...t&&!v(t)?{[d.types]:!0}:{},...e&&!j(e,t)?{[d.decoded]:!0}:{}};if(Object.keys(s).length>0||!t||!e||b(i.method))return{errors:s};try{return{encoded:x(t,e)}}catch(c){return console.error(c),{errors:{[d.button]:c.message}}}},L=h(function(){let n=y(),t=n.data,e=t==null?void 0:t.errors;return a.jsxs(n.Form,{method:"post",children:[a.jsx("div",{className:"mt-8 rounded-sm border border-gray-200 py-4 dark:border-gray-700 space-y-4",children:a.jsxs("div",{className:"mx-6 my-12",children:[a.jsxs("div",{children:[a.jsx(l,{ariaInvalid:!!(e!=null&&e[d.types]),htmlFor:d.types,children:r[d.types]}),a.jsx(p,{ariaInvalid:!!(e!=null&&e[d.types]),children:a.jsx("input",{type:"text",name:d.types,id:d.types,required:!0,"aria-invalid":!!(e!=null&&e[d.types]),className:"w-full bg-transparent border-0",onChange:s=>m(s,n)})}),a.jsx(o,{ariaInvalid:!!(e!=null&&e[d.types]),children:u[d.types]})]}),a.jsxs("div",{className:"mt-12",children:[a.jsx(l,{ariaInvalid:!!(e!=null&&e[d.decoded]),htmlFor:d.decoded,children:r[d.decoded]}),a.jsx(p,{ariaInvalid:!!(e!=null&&e[d.decoded]),children:a.jsx("textarea",{name:d.decoded,id:d.decoded,required:!0,"aria-invalid":!!(e!=null&&e[d.decoded]),className:"w-full bg-transparent border-0",onChange:s=>m(s,n)})}),a.jsx(o,{ariaInvalid:!!(e!=null&&e[d.decoded]),children:u[d.decoded]})]}),a.jsx(g,{errorMessage:e==null?void 0:e[d.button],children:"Encode values"})]})}),t!=null&&t[d.encoded]?a.jsx(f,{label:d.encoded,description:F[d.encoded],children:t[d.encoded]}):null]})});export{N as clientAction,L as default};
