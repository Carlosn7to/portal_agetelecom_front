if(!self.define){let s,l={};const n=(n,i)=>(n=new URL(n+".js",i).href,l[n]||new Promise((l=>{if("document"in self){const s=document.createElement("script");s.src=n,s.onload=l,document.head.appendChild(s)}else s=n,importScripts(n),l()})).then((()=>{let s=l[n];if(!s)throw new Error(`Module ${n} didn’t register its module`);return s})));self.define=(i,r)=>{const e=s||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let u={};const o=s=>n(s,e),c={module:{uri:e},exports:u,require:o};l[e]=Promise.all(i.map((s=>c[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-db5fc017"],(function(s){"use strict";s.setCacheNameDetails({prefix:"ageportal"}),self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"/css/112.45f302b7.css",revision:null},{url:"/css/113.109a275c.css",revision:null},{url:"/css/234.97917610.css",revision:null},{url:"/css/259.64279161.css",revision:null},{url:"/css/301.ae2bcc7c.css",revision:null},{url:"/css/371.d6f33b79.css",revision:null},{url:"/css/419.e338447b.css",revision:null},{url:"/css/441.2e79ed0c.css",revision:null},{url:"/css/47.f4553cde.css",revision:null},{url:"/css/549.b0d01bfc.css",revision:null},{url:"/css/565.ff191a92.css",revision:null},{url:"/css/59.43b8c827.css",revision:null},{url:"/css/60.f005869c.css",revision:null},{url:"/css/648.3571442a.css",revision:null},{url:"/css/823.aeb8af77.css",revision:null},{url:"/css/842.d783414a.css",revision:null},{url:"/css/871.3dce52df.css",revision:null},{url:"/css/903.14568ad0.css",revision:null},{url:"/css/91.4b0f0c79.css",revision:null},{url:"/css/948.e8e3dde4.css",revision:null},{url:"/css/966.66a0a1b8.css",revision:null},{url:"/css/98.33b89ac4.css",revision:null},{url:"/css/app.17fa6a20.css",revision:null},{url:"/img/acelerador.8296a6cb.png",revision:null},{url:"/img/age_orange.57916d66.png",revision:null},{url:"/img/age_orange_grey.83a59ba0.png",revision:null},{url:"/img/comissao2.c611fe01.png",revision:null},{url:"/img/congratulations.ad0b20c0.png",revision:null},{url:"/img/dinheiro0.b3426db6.png",revision:null},{url:"/img/dinheiro1.38fbe42e.png",revision:null},{url:"/img/dinheiro2.4ee8caec.png",revision:null},{url:"/img/dinheiro3.344266c0.png",revision:null},{url:"/img/dinheiro4.3750dce7.png",revision:null},{url:"/img/estrela.3949d29a.png",revision:null},{url:"/img/letsgo.25dc3320.png",revision:null},{url:"/img/logo_orange.d9b0681f.png",revision:null},{url:"/img/running-2.150a94b8.png",revision:null},{url:"/img/running.1450b9e8.png",revision:null},{url:"/img/valor_estrela.bcdafcec.png",revision:null},{url:"/index.html",revision:"18e08285b414086ee3eb1959099152bf"},{url:"/js/112.0d4d3721.js",revision:null},{url:"/js/113.56618417.js",revision:null},{url:"/js/234.76edd3f3.js",revision:null},{url:"/js/259.041a4a2a.js",revision:null},{url:"/js/301.2bcc7982.js",revision:null},{url:"/js/371.df8c528c.js",revision:null},{url:"/js/419.aadca18d.js",revision:null},{url:"/js/441.805bb61d.js",revision:null},{url:"/js/47.6e9c53ef.js",revision:null},{url:"/js/549.bf120d38.js",revision:null},{url:"/js/565.88146e3f.js",revision:null},{url:"/js/59.3f482acc.js",revision:null},{url:"/js/60.0f20cbe6.js",revision:null},{url:"/js/632.0839087a.js",revision:null},{url:"/js/648.799f42d1.js",revision:null},{url:"/js/797.8593ead9.js",revision:null},{url:"/js/823.4b0b5912.js",revision:null},{url:"/js/842.e687e5c6.js",revision:null},{url:"/js/871.20d12d7d.js",revision:null},{url:"/js/903.f7dbe953.js",revision:null},{url:"/js/91.62a7c016.js",revision:null},{url:"/js/948.e12068ff.js",revision:null},{url:"/js/95.6b03363d.js",revision:null},{url:"/js/966.eb28eceb.js",revision:null},{url:"/js/98.62ed7136.js",revision:null},{url:"/js/app.f75f2ea4.js",revision:null},{url:"/js/chunk-vendors.dc8fc841.js",revision:null},{url:"/manifest.json",revision:"f95f93af103df1ebe0bc7eae080865fa"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
