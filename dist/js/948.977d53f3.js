"use strict";(self["webpackChunkageportal"]=self["webpackChunkageportal"]||[]).push([[948],{3235:function(t,e,a){a.r(e),a.d(e,{default:function(){return H}});var s=a(3396),i=a(9242),d=a(7139);const r=t=>((0,s.dD)("data-v-69043ff0"),t=t(),(0,s.Cn)(),t),o={key:0,class:"management"},n=r((()=>(0,s._)("h1",null,"Gerenciamentos - Usuários",-1))),l={class:"container-mng"},c={key:0,class:"content-users animation-down"},h={class:"filters"},m={class:"list"},u=r((()=>(0,s._)("div",{class:"list-header"},[(0,s._)("div",{class:"item-list-header",style:{"text-align":"left",width:"25%"}}," Nome "),(0,s._)("div",{class:"item-list-header",style:{"text-align":"left",width:"25%"}}," E-mail "),(0,s._)("div",{class:"item-list-header",style:{"text-align":"center",width:"25%"}}," Acesso ")],-1))),g={key:0,class:"items-list-body animation-down"},f=["onClick"],p={class:"item-list-body",style:{"text-align":"left",width:"25%"}},w={class:"item-list-body",style:{"text-align":"left",width:"25%"}},k={class:"item-list-body",style:{"text-align":"center",width:"25%"}};function v(t,e,a,r,v,y){const b=(0,s.up)("EditAccess");return(0,s.wg)(),(0,s.iD)(s.HY,null,["users"===v.page?((0,s.wg)(),(0,s.iD)("div",o,[n,(0,s._)("div",l,["users"===v.page?((0,s.wg)(),(0,s.iD)("div",c,[(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{type:"text",id:"search",name:"search",placeholder:"Buscar e-mail...",autocomplete:"off","onUpdate:modelValue":e[0]||(e[0]=t=>v.search=t)},null,512),[[i.nr,v.search]])]),(0,s._)("div",m,[u,!0===v.status?((0,s.wg)(),(0,s.iD)("div",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(y.UsersFiltered,((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"list-body",key:e,onClick:e=>y.editAccess(t.id,t.name,t.access)},[(0,s._)("div",p,(0,d.zw)(t.name),1),(0,s._)("div",w,(0,d.zw)(t.email),1),(0,s._)("div",k,(0,d.zw)(t.access?"Ativo":"Inativo"),1)],8,f)))),128))])):(0,s.kq)("",!0)])])):(0,s.kq)("",!0)])])):(0,s.kq)("",!0),"editAccess"===v.page?((0,s.wg)(),(0,s.j4)(b,{key:1,onClosePage:e[1]||(e[1]=t=>y.closePage("users")),data:v.dataEdit},null,8,["data"])):(0,s.kq)("",!0)],64)}var y=a(680),b=a(8089);const _=t=>((0,s.dD)("data-v-703f16a1"),t=t(),(0,s.Cn)(),t),C={class:"content-card"},I={class:"filters"},A={key:0,id:"list-boards"},B=_((()=>(0,s._)("i",{class:"fi fi-rr-chart-pie"},null,-1))),D={class:"actions"},U=["onClick"],E={key:1,id:"list-boards"},z=_((()=>(0,s._)("i",{class:"fi fi-rr-chart-pie"},null,-1))),q={class:"actions"},x=["onClick"],P=["onClick"];function T(t,e,a,r,o,n){return(0,s.wg)(),(0,s.iD)("div",C,[(0,s._)("button",{onClick:e[0]||(e[0]=(...t)=>n.closePage&&n.closePage(...t))},"Voltar"),(0,s._)("h1",null,"Editar acesso - "+(0,d.zw)(a.data.name),1),(0,s._)("div",I,[(0,s.wy)((0,s._)("input",{type:"text",id:"searchBoard",name:"searchBoard",placeholder:"Buscar dashboard...",autocomplete:"off","onUpdate:modelValue":e[1]||(e[1]=t=>o.searchBoard=t)},null,512),[[i.nr,o.searchBoard]]),"items"===o.page?((0,s.wg)(),(0,s.iD)("button",{key:0,onClick:e[2]||(e[2]=t=>(o.page="dashboards",o.searchBoard=""))},"Voltar")):(0,s.kq)("",!0),(0,s._)("button",{onClick:e[3]||(e[3]=t=>n.alternateUserAccess())},(0,d.zw)(o.dataUser.access?"Inativar acesso":"Ativar acesso"),1)]),"dashboards"===o.page&&!0===o.status?((0,s.wg)(),(0,s.iD)("div",A,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.DashboardsFiltered||[],(t=>((0,s.wg)(),(0,s.iD)("div",{class:"item",key:t.id},[(0,s._)("span",null,[B,(0,s.Uk)(" "+(0,d.zw)(t.dashboard),1)]),(0,s._)("div",D,[(0,s._)("i",{class:"fi fi-rr-arrow-square-right",onClick:e=>n.getItems(t.id),style:{"font-size":"2rem"}},null,8,U)])])))),128))])):(0,s.kq)("",!0),"items"===o.page&&!0===o.status?((0,s.wg)(),(0,s.iD)("div",E,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.ItemsFiltered||[],((t,e)=>((0,s.wg)(),(0,s.iD)("div",{class:"item",key:t.id},[(0,s._)("span",null,[z,(0,s.Uk)(" "+(0,d.zw)(t.item),1)]),(0,s._)("div",q,[!1===t.status?((0,s.wg)(),(0,s.iD)("i",{key:0,class:"fi fi-br-check",style:{"font-size":"1.6rem"},onClick:t=>n.alterItemAccess(e)},null,8,x)):(0,s.kq)("",!0),!0===t.status?((0,s.wg)(),(0,s.iD)("i",{key:1,class:"fi fi-br-cross",style:{"font-size":"1.4rem"},onClick:t=>n.alterItemAccess(e)},null,8,P)):(0,s.kq)("",!0)])])))),128))])):(0,s.kq)("",!0)])}var V={name:"EditAccess",props:{data:{required:!0}},emits:["close-page"],data(){return{searchBoard:"",dataReport:{},status:!1,dataUser:this.data,loading:!0,dataBoards:{},dataItems:{},page:"dashboards"}},methods:{closePage:function(){this.$emit("close-page")},alternateUserAccess:function(){this.loading=!0,(0,b.m)({method:"PUT",url:`admin/access-systems/alternate/${this.data.id}`,headers:{Authorization:"Bearer"+y.Z.get("token")},params:{system:"ageboard"}}).then((t=>{this.dataUser.access=t.data.access,this.loading=!1,alert(t.data.msg)}))},getBoards:function(){this.status=!1,(0,b.m)({method:"GET",url:"ageboard/dashboard",headers:{Authorization:"Bearer"+y.Z.get("token")}}).then((t=>{this.dataBoards=t.data,this.loading=!1,this.status=!0}))},getItems:function(t){this.status=!1,this.page="items",this.loading=!0,this.searchBoard="",(0,b.m)({method:"GET",url:"ageboard/dashboard-items-management",headers:{Authorization:"Bearer"+y.Z.get("token")},params:{dashboardId:t,userId:this.data.id}}).then((t=>{this.dataItems=t.data,this.loading=!1,this.status=!0}))},alterItemAccess:function(t){(0,b.m)({method:"PUT",url:"ageboard/dashboard-items-alternate",params:{idUser:this.dataUser.id,idItem:this.dataItems[t].id}}).then((e=>{!0===this.dataItems[t].status?this.dataItems[t].status=!1:this.dataItems[t].status=!0,alert(e.data.msg),!0===e.data.access&&(this.dataUser.access=!0)}))}},computed:{DashboardsFiltered:function(){let t=[];return t=this.dataBoards.filter((t=>t.dashboard.toLowerCase().indexOf(this.searchBoard.toLowerCase())>-1)),t},ItemsFiltered:function(){let t=[];return t=this.dataItems.filter((t=>t.item.toLowerCase().indexOf(this.searchBoard.toLowerCase())>-1)),t}},mounted(){this.getBoards()}},Z=a(89);const F=(0,Z.Z)(V,[["render",T],["__scopeId","data-v-703f16a1"]]);var L=F,S=a(65),Y={name:"UsersManagement",components:{EditAccess:L},data(){return{mode:y.Z.get("mode"),page:"users",data:{},status:!1,loading:!0,search:"",modal:"",dataEdit:{name:"",id:0,access:!1}}},methods:{...(0,S.OI)(["SAVE_SYSTEM"]),modeView:function(t){this.mode=t},getUsers:function(){this.status=!1,(0,b.m)({method:"GET",url:"admin/access-systems",params:{system:"ageboard"},headers:{Authorization:"Bearer"+y.Z.get("token")}}).then((t=>{this.data=t.data,this.status=!0,this.loading=!1})).catch((()=>{}))},editAccess:function(t,e,a){this.dataEdit.id=t,this.dataEdit.name=e,this.dataEdit.access=a,this.page="editAccess"},closePage:function(t){this.page=t}},computed:{UsersFiltered:function(){let t=[];return t=this.data.filter((t=>t.name.toLowerCase().indexOf(this.search.toLowerCase())>-1)),t}},mounted(){this.getUsers(),this.SAVE_SYSTEM({loading:!1})}};const G=(0,Z.Z)(Y,[["render",v],["__scopeId","data-v-69043ff0"]]);var H=G}}]);
//# sourceMappingURL=948.977d53f3.js.map