if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const e=s||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let u={};const o=s=>n(s,e),c={module:{uri:e},exports:u,require:o};l[e]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"ageportal"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/100.3079227f.css",revision:null},{url:"/css/109.36d1a371.css",revision:null},{url:"/css/112.45f302b7.css",revision:null},{url:"/css/113.02f496ea.css",revision:null},{url:"/css/141.96b262a5.css",revision:null},{url:"/css/234.022f4429.css",revision:null},{url:"/css/259.64279161.css",revision:null},{url:"/css/301.ae2bcc7c.css",revision:null},{url:"/css/315.43e82205.css",revision:null},{url:"/css/394.083721d6.css",revision:null},{url:"/css/401.61837cec.css",revision:null},{url:"/css/419.e338447b.css",revision:null},{url:"/css/441.2e79ed0c.css",revision:null},{url:"/css/47.f4553cde.css",revision:null},{url:"/css/48.c8f81287.css",revision:null},{url:"/css/543.dbf36d1d.css",revision:null},{url:"/css/59.43b8c827.css",revision:null},{url:"/css/60.f005869c.css",revision:null},{url:"/css/614.5166a044.css",revision:null},{url:"/css/656.5f205900.css",revision:null},{url:"/css/691.947546af.css",revision:null},{url:"/css/737.b39d40a3.css",revision:null},{url:"/css/755.bf6f88ed.css",revision:null},{url:"/css/807.36c7d0d9.css",revision:null},{url:"/css/842.d783414a.css",revision:null},{url:"/css/871.f43e45ea.css",revision:null},{url:"/css/875.be4e0aef.css",revision:null},{url:"/css/920.41d85f81.css",revision:null},{url:"/css/948.e8e3dde4.css",revision:null},{url:"/css/966.66a0a1b8.css",revision:null},{url:"/css/app.1bb65d50.css",revision:null},{url:"/img/acelerador.8296a6cb.png",revision:null},{url:"/img/age_orange.57916d66.png",revision:null},{url:"/img/age_orange_grey.83a59ba0.png",revision:null},{url:"/img/bug.4b8ed362.png",revision:null},{url:"/img/comissao2.c611fe01.png",revision:null},{url:"/img/congratulations.ad0b20c0.png",revision:null},{url:"/img/dinheiro0.b3426db6.png",revision:null},{url:"/img/dinheiro1.38fbe42e.png",revision:null},{url:"/img/dinheiro2.4ee8caec.png",revision:null},{url:"/img/dinheiro3.344266c0.png",revision:null},{url:"/img/dinheiro4.3750dce7.png",revision:null},{url:"/img/estrela.3949d29a.png",revision:null},{url:"/img/letsgo.25dc3320.png",revision:null},{url:"/img/logo_orange.d9b0681f.png",revision:null},{url:"/img/manha.827e41c4.png",revision:null},{url:"/img/running-2.150a94b8.png",revision:null},{url:"/img/running.1450b9e8.png",revision:null},{url:"/img/servico-tecnico.a22c6d74.png",revision:null},{url:"/img/suporte-tecnico.05f9f4e8.png",revision:null},{url:"/img/tarde.d9c26579.png",revision:null},{url:"/img/valor_estrela.bcdafcec.png",revision:null},{url:"/index.html",revision:"35a5c7d3ebe5b357a0aef3efeca4115a"},{url:"/js/100.91bd37b7.js",revision:null},{url:"/js/109.541c6c6a.js",revision:null},{url:"/js/112.2da850e9.js",revision:null},{url:"/js/113.812e6188.js",revision:null},{url:"/js/141.1dec6626.js",revision:null},{url:"/js/234.5eacf764.js",revision:null},{url:"/js/259.5be20ce2.js",revision:null},{url:"/js/301.cd0e9d3b.js",revision:null},{url:"/js/315.3972d7c7.js",revision:null},{url:"/js/383.18ea906d.js",revision:null},{url:"/js/394.779ffdcd.js",revision:null},{url:"/js/401.3b65113d.js",revision:null},{url:"/js/419.5452a082.js",revision:null},{url:"/js/441.bf1ea160.js",revision:null},{url:"/js/47.3da3f491.js",revision:null},{url:"/js/48.79b7c93a.js",revision:null},{url:"/js/543.8b3dbd34.js",revision:null},{url:"/js/59.dbbd6f4b.js",revision:null},{url:"/js/60.1538f443.js",revision:null},{url:"/js/614.3df77043.js",revision:null},{url:"/js/632.18b3381a.js",revision:null},{url:"/js/656.97ca3e38.js",revision:null},{url:"/js/691.21ff759b.js",revision:null},{url:"/js/737.f1ff3cf6.js",revision:null},{url:"/js/755.aa58efef.js",revision:null},{url:"/js/797.16727588.js",revision:null},{url:"/js/807.6124da62.js",revision:null},{url:"/js/842.c73f6eef.js",revision:null},{url:"/js/871.e86fca66.js",revision:null},{url:"/js/875.c5ef5834.js",revision:null},{url:"/js/920.a50c1647.js",revision:null},{url:"/js/948.977d53f3.js",revision:null},{url:"/js/95.71cdd362.js",revision:null},{url:"/js/966.250a583a.js",revision:null},{url:"/js/app.2a5cfefb.js",revision:null},{url:"/js/chunk-vendors.fc29b21b.js",revision:null},{url:"/manifest.json",revision:"f95f93af103df1ebe0bc7eae080865fa"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
