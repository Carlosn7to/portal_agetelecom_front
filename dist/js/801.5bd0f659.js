"use strict";(self["webpackChunkageportal"]=self["webpackChunkageportal"]||[]).push([[801],{3801:function(a,e,i){i.r(e),i.d(e,{default:function(){return S}});var s=i(3396),t=i(7139);const r=a=>((0,s.dD)("data-v-1424bc96"),a=a(),(0,s.Cn)(),a),l=r((()=>(0,s._)("div",{class:"divisor"},[(0,s._)("div")],-1))),n={class:"items"},o=["onClick"],d={class:"name"},g=r((()=>(0,s._)("i",{class:"fi fi-rr-chart-pie"},null,-1))),c=r((()=>(0,s._)("div",{class:"more"},[(0,s._)("i",{class:"fi fi-rr-arrow-square-right"})],-1))),h={key:1,class:"view animation-left"},m={class:"header"},u=r((()=>(0,s._)("div",{class:"divisor"},[(0,s._)("div")],-1))),f=["src"];function p(a,e,i,r,p,_){return(0,s.wg)(),(0,s.iD)(s.HY,null,["all"===p.page.stage?((0,s.wg)(!0),(0,s.iD)(s.HY,{key:0},(0,s.Ko)(p.data,(a=>((0,s.wg)(),(0,s.iD)("div",{key:a.id},[(0,s._)("h1",null,(0,t.zw)(a.dashboard),1),l,(0,s._)("div",n,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.itens,((a,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"item",key:a.id,onClick:e=>_.pageIframe(a.item,a.iframe),style:(0,t.j5)("animation-delay: "+.3*e+"s")},[(0,s._)("div",d,[g,(0,s._)("span",null,(0,t.zw)(a.item),1)]),c],12,o)))),128))])])))),128)):(0,s.kq)("",!0),"view"===p.page.stage?((0,s.wg)(),(0,s.iD)("div",h,[(0,s._)("div",m,[(0,s._)("i",{class:"fi fi-rr-arrow-square-left",onClick:e[0]||(e[0]=(...a)=>_.closePage&&_.closePage(...a))}),(0,s._)("h1",null,(0,t.zw)(p.page.name),1)]),u,(0,s._)("iframe",{width:"100%",height:"80%",src:p.page.iframe,frameborder:"0",allowfullscreen:"true"},"\r\n    ",8,f)])):(0,s.kq)("",!0)],64)}var _=i(680),v=i(8089),w=i(65),k={name:"HomePage",components:{},data(){return{mode:_.Z.get("mode"),page:{status:!1,iframe:null,name:"",stage:"all",back:!1},data:{},loading:!1}},methods:{...(0,w.OI)(["SAVE_SYSTEM","SAVE_MENU"]),modeView:function(a){this.mode=a},pageIframe:function(a,e){this.page.status=!0,this.page.name=a,this.page.iframe=e,this.page.stage="view",this.loading=!1},closePage:function(){this.page.back=!0,this.page.stage="all",this.page.status=!1,this.page.iframe=null,this.loading=!1},getBoards:function(){(0,v.m)({method:"GET",url:"/ageboard/dashboards",headers:{Authorization:"Bearer "+_.Z.get("token")}}).then((a=>{this.data=a.data,this.SAVE_SYSTEM({loading:!1})}))}},mounted(){this.getBoards(),this.SAVE_MENU({system:"ageboard",selected:"home"}),this.SAVE_SYSTEM({loading:!1})}},b=i(89);const E=(0,b.Z)(k,[["render",p],["__scopeId","data-v-1424bc96"]]);var S=E}}]);
//# sourceMappingURL=801.5bd0f659.js.map