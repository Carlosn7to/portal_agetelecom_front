if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const e=s||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let u={};const o=s=>n(s,e),c={module:{uri:e},exports:u,require:o};l[e]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"ageportal"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/112.45f302b7.css",revision:null},{url:"/css/113.02f496ea.css",revision:null},{url:"/css/234.022f4429.css",revision:null},{url:"/css/259.64279161.css",revision:null},{url:"/css/301.ae2bcc7c.css",revision:null},{url:"/css/401.61837cec.css",revision:null},{url:"/css/419.e338447b.css",revision:null},{url:"/css/441.2e79ed0c.css",revision:null},{url:"/css/461.52bd89d3.css",revision:null},{url:"/css/47.f4553cde.css",revision:null},{url:"/css/48.c8f81287.css",revision:null},{url:"/css/495.4de5b64c.css",revision:null},{url:"/css/527.6cbf6f18.css",revision:null},{url:"/css/571.8ec191b4.css",revision:null},{url:"/css/59.43b8c827.css",revision:null},{url:"/css/60.f005869c.css",revision:null},{url:"/css/656.5f205900.css",revision:null},{url:"/css/678.6c9db367.css",revision:null},{url:"/css/691.947546af.css",revision:null},{url:"/css/737.b39d40a3.css",revision:null},{url:"/css/842.d783414a.css",revision:null},{url:"/css/871.f43e45ea.css",revision:null},{url:"/css/875.be4e0aef.css",revision:null},{url:"/css/920.41d85f81.css",revision:null},{url:"/css/944.a2bcf07f.css",revision:null},{url:"/css/948.e8e3dde4.css",revision:null},{url:"/css/966.66a0a1b8.css",revision:null},{url:"/css/98.33b89ac4.css",revision:null},{url:"/css/app.1bb65d50.css",revision:null},{url:"/img/acelerador.8296a6cb.png",revision:null},{url:"/img/age_orange.57916d66.png",revision:null},{url:"/img/age_orange_grey.83a59ba0.png",revision:null},{url:"/img/bug.4b8ed362.png",revision:null},{url:"/img/comissao2.c611fe01.png",revision:null},{url:"/img/congratulations.ad0b20c0.png",revision:null},{url:"/img/dinheiro0.b3426db6.png",revision:null},{url:"/img/dinheiro1.38fbe42e.png",revision:null},{url:"/img/dinheiro2.4ee8caec.png",revision:null},{url:"/img/dinheiro3.344266c0.png",revision:null},{url:"/img/dinheiro4.3750dce7.png",revision:null},{url:"/img/estrela.3949d29a.png",revision:null},{url:"/img/letsgo.25dc3320.png",revision:null},{url:"/img/logo_orange.d9b0681f.png",revision:null},{url:"/img/manha.827e41c4.png",revision:null},{url:"/img/running-2.150a94b8.png",revision:null},{url:"/img/running.1450b9e8.png",revision:null},{url:"/img/servico-tecnico.a22c6d74.png",revision:null},{url:"/img/suporte-tecnico.05f9f4e8.png",revision:null},{url:"/img/tarde.d9c26579.png",revision:null},{url:"/img/valor_estrela.bcdafcec.png",revision:null},{url:"/index.html",revision:"1ea2ba583616c0bea65d4466f288f321"},{url:"/js/112.ad3c4080.js",revision:null},{url:"/js/113.8af824fd.js",revision:null},{url:"/js/234.3144c3fa.js",revision:null},{url:"/js/259.fbd96386.js",revision:null},{url:"/js/301.47b9941d.js",revision:null},{url:"/js/383.bf77c296.js",revision:null},{url:"/js/401.abdc02a1.js",revision:null},{url:"/js/419.019b991a.js",revision:null},{url:"/js/441.ec6ba6c4.js",revision:null},{url:"/js/461.9ed293d5.js",revision:null},{url:"/js/47.202446c3.js",revision:null},{url:"/js/48.485d4d8a.js",revision:null},{url:"/js/495.21ef6e0e.js",revision:null},{url:"/js/527.99484316.js",revision:null},{url:"/js/571.7c46dbea.js",revision:null},{url:"/js/59.ed09f497.js",revision:null},{url:"/js/60.bd858016.js",revision:null},{url:"/js/632.18b3381a.js",revision:null},{url:"/js/656.405b4cab.js",revision:null},{url:"/js/678.82e4c4cf.js",revision:null},{url:"/js/691.63a63686.js",revision:null},{url:"/js/737.0b2b7dc4.js",revision:null},{url:"/js/797.16727588.js",revision:null},{url:"/js/842.d034aea4.js",revision:null},{url:"/js/871.ae6d0d89.js",revision:null},{url:"/js/875.839ed95b.js",revision:null},{url:"/js/920.2151678d.js",revision:null},{url:"/js/944.9ebbbfd7.js",revision:null},{url:"/js/948.1815f29e.js",revision:null},{url:"/js/95.2e77bec7.js",revision:null},{url:"/js/966.85a5b56d.js",revision:null},{url:"/js/98.38dcf2c0.js",revision:null},{url:"/js/app.3ddc1ad1.js",revision:null},{url:"/js/chunk-vendors.887282e9.js",revision:null},{url:"/manifest.json",revision:"f95f93af103df1ebe0bc7eae080865fa"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
