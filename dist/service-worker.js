if(!self.define){let e,n={};const r=(r,s)=>(r=new URL(r+".js",s).href,n[r]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=n,document.head.appendChild(e)}else e=r,importScripts(r),n()})).then((()=>{let e=n[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(s,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let l={};const t=e=>r(e,o),u={module:{uri:o},exports:l,require:t};n[o]=Promise.all(s.map((e=>u[e]||t(e)))).then((e=>(i(...e),l)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ageportal"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/app.3055de4d.css",revision:null},{url:"/img/age_orange.57916d66.png",revision:null},{url:"/img/logo_orange.d9b0681f.png",revision:null},{url:"/index.html",revision:"09ca8eba75e1541f5284d7d7ea077222"},{url:"/js/app.9c5d6a07.js",revision:null},{url:"/js/chunk-vendors.dc8fc841.js",revision:null},{url:"/manifest.json",revision:"f95f93af103df1ebe0bc7eae080865fa"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
