"use strict";(self["webpackChunkageportal"]=self["webpackChunkageportal"]||[]).push([[920],{5920:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var n=a(3396),o=a(7139);const s={key:0,class:"welcome-text"},l={class:"systems"},r=["onClick"],i={class:"title"};function d(e,t,a,d,u,c){return!1===u.loading?((0,n.wg)(),(0,n.iD)("div",s,[(0,n._)("h2",null,(0,o.zw)(c.getDate()),1),(0,n._)("h1",null,(0,o.zw)(c.getMessage())+", "+(0,o.zw)(e.user.firstName),1),(0,n._)("div",l,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(u.modules,((e,t)=>((0,n.wg)(),(0,n.iD)("div",{class:"system",key:e.id,onClick:t=>c.tradePage(e.rota),style:(0,o.j5)("animation-delay: "+.3*t+"s")},[(0,n._)("div",i,[(0,n._)("i",{class:(0,o.C_)(e.icone)},null,2),(0,n._)("h2",null,(0,o.zw)(e.modulo),1)]),(0,n._)("span",null,(0,o.zw)(e.descricao),1)],12,r)))),128))])])):(0,n.kq)("",!0)}var u=a(65),c=a(6797),m=a.n(c),g=a(8089),h=a(680),f={name:"WelcomeSystems",components:{},data(){return{screen:"loading",modules:{},animationDelay:.3,loading:!1}},computed:{...(0,u.Se)(["user"])},methods:{...(0,u.OI)(["SAVE_SYSTEM"]),tradePage:function(e){this.SAVE_SYSTEM({loading:!0}),this.$router.replace(e)},getDate:function(){const e=m()().locale("pt-br"),t=e.format("dddd"),a=e.format("LL"),n=t+", "+a;return n},getMessage:function(){var e=new Date,t=e.getHours(),a="";return a=t<12?"Bom dia":t<18?"Boa tarde":"Boa noite",a},getModules:function(){(0,g.m)({method:"GET",url:"portal/aux/modules/access",headers:{Authorization:"Bearer"+h.Z.get("token")}}).then((e=>{this.modules=e.data}))}},mounted(){this.getModules(),this.SAVE_SYSTEM({loading:!1})}},_=a(89);const p=(0,_.Z)(f,[["render",d],["__scopeId","data-v-f044d640"]]);var w=p}}]);
//# sourceMappingURL=920.2151678d.js.map