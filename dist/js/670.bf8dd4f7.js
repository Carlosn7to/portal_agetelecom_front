"use strict";(self["webpackChunkageportal"]=self["webpackChunkageportal"]||[]).push([[670],{6486:function(e,t,o){o.r(t),o.d(t,{default:function(){return w}});var s=o(3396);function a(e,t,o,a,n,r){const i=(0,s.up)("WelcomeSystems");return(0,s.wg)(),(0,s.j4)(i)}var n=o(680),r=o(65),i=o(7139);const l={key:0,class:"welcome-text"},d={class:"systems"},m=["onClick"],c={class:"title"};function u(e,t,o,a,n,r){return!1===n.loading?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("h2",null,(0,i.zw)(r.getDate()),1),(0,s._)("h1",null,(0,i.zw)(r.getMessage())+", "+(0,i.zw)(e.user.firstName),1),(0,s._)("div",d,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.systems,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{class:"system",key:t,onClick:t=>r.tradePage(e.route),style:(0,i.j5)("animation-delay: "+.3*t+"s")},[(0,s._)("div",c,[(0,s._)("i",{class:(0,i.C_)(e.icon)},null,2),(0,s._)("h2",null,(0,i.zw)(e.system),1)]),(0,s._)("span",null,(0,i.zw)(e.legend),1)],12,m)))),128))])])):(0,s.kq)("",!0)}var g=o(6797),f=o.n(g),p={name:"WelcomeSystems",components:{},data(){return{screen:"loading",systems:[{system:"Agerv",icon:"fi fi-rr-star",legend:"Vendas, comissionamento e planejamento.",route:"agerv/home"},{system:"AgeBoard",icon:"fi fi-rr-stats",legend:"Dashboards e indicadores.",route:"ageBoard/home"},{system:"AgeReport",icon:"fi fi-rr-document",legend:"Relatórios e planilhas.",route:"ageReport/home"},{system:"AgeControle",icon:"fi fi-rr-apps-add",legend:"Frota e combustível.",route:"ageControle/home"}],animationDelay:.3,loading:!1}},computed:{...(0,r.Se)(["user"])},methods:{...(0,r.OI)(["SAVE_SYSTEM"]),tradePage:function(e){this.SAVE_SYSTEM({loading:!0}),this.$router.replace(e)},getDate:function(){const e=f()().locale("pt-br"),t=e.format("dddd"),o=e.format("LL"),s=t+", "+o;return s},getMessage:function(){var e=new Date,t=e.getHours(),o="";return o=t<12?"Bom dia":t<18?"Boa tarde":"Boa noite",o}},mounted(){}},h=o(89);const v=(0,h.Z)(p,[["render",u],["__scopeId","data-v-73a1fe16"]]);var y=v,S={name:"SystemApp",components:{WelcomeSystems:y},data(){return{mode:n.Z.get("mode"),loading:!1,routes:{agerv:"/ageRv/home"}}},methods:{...(0,r.nv)(["verifyDevice"]),...(0,r.OI)(["SAVE_MENU","SAVE_SYSTEM"]),modeView:function(e){this.mode=e}},created(){this.verifyDevice()},mounted(){this.SAVE_MENU({system:"portal",selected:"home"}),this.SAVE_SYSTEM({loading:!1})},computed:{...(0,r.Se)(["isMobile","system"])}};const _=(0,h.Z)(S,[["render",a],["__scopeId","data-v-14f17f97"]]);var w=_}}]);
//# sourceMappingURL=670.bf8dd4f7.js.map