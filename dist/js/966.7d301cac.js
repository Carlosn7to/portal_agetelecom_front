"use strict";(self["webpackChunkageportal"]=self["webpackChunkageportal"]||[]).push([[966],{5966:function(a,e,t){t.r(e),t.d(e,{default:function(){return na}});var s=t(3396),d=t(7139),i=t(9242);const o=a=>((0,s.dD)("data-v-5819cf86"),a=a(),(0,s.Cn)(),a),n={key:0,class:"management"},r={class:"container-mng"},l={key:0,class:"content-users animation-down"},h={class:"filters"},c={class:"list"},m=o((()=>(0,s._)("div",{class:"list-header"},[(0,s._)("div",{class:"item-list-header",style:{"text-align":"left",width:"25%"}}," Nome "),(0,s._)("div",{class:"item-list-header",style:{"text-align":"left",width:"25%"}}," Adicionado por "),(0,s._)("div",{class:"item-list-header",style:{"text-align":"center",width:"25%"}}," Status ")],-1))),u={key:0,class:"items-list-body animation-down"},b=["onClick"],g={class:"item-list-body",style:{"text-align":"left",width:"25%"}},p=o((()=>(0,s._)("div",{class:"item-list-body",style:{"text-align":"left",width:"25%"}}," carlos.neto@agetelecom.com.br ",-1))),f={class:"item-list-body",style:{"text-align":"center",width:"25%"}};function v(a,e,t,o,v,w){const D=(0,s.up)("NewDashboard"),_=(0,s.up)("EditDashboard");return(0,s.wg)(),(0,s.iD)(s.HY,null,["Usuários"===v.page||"Dashboards"===v.page?((0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("h1",null,"Gerenciamentos - "+(0,d.zw)(v.page),1),(0,s._)("div",r,["Dashboards"===v.page?((0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",h,[(0,s.wy)((0,s._)("input",{type:"text",id:"search",name:"search",placeholder:"Buscar Dashboard...",autocomplete:"off","onUpdate:modelValue":e[0]||(e[0]=a=>v.search=a)},null,512),[[i.nr,v.search]]),(0,s._)("button",{onClick:e[1]||(e[1]=a=>v.modal="newDashboard")},"Novo dashboard")]),(0,s._)("div",c,[m,!0===v.status?((0,s.wg)(),(0,s.iD)("div",u,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(w.DashFiltered,(a=>((0,s.wg)(),(0,s.iD)("div",{class:"list-body",key:a.id,onClick:e=>w.editDashboard(a.id,a.dashboard,a.active)},[(0,s._)("div",g,(0,d.zw)(a.dashboard),1),p,(0,s._)("div",f,(0,d.zw)(1===a.active?"Ativo":"Inativo"),1)],8,b)))),128))])):(0,s.kq)("",!0)])])):(0,s.kq)("",!0)])])):(0,s.kq)("",!0),"newDashboard"===v.modal?((0,s.wg)(),(0,s.j4)(D,{key:1,onClosePage:e[2]||(e[2]=a=>w.closePage("Dashboards"))})):(0,s.kq)("",!0),"editDashboard"===v.page?((0,s.wg)(),(0,s.j4)(_,{key:2,onClosePage:e[3]||(e[3]=a=>w.closePage("Dashboards")),data:v.dataEditDashboard},null,8,["data"])):(0,s.kq)("",!0)],64)}var w=t(680),D=t(8089);const _=a=>((0,s.dD)("data-v-5288cb4e"),a=a(),(0,s.Cn)(),a),k={id:"modal"},y={id:"card-modal"},I={id:"close-button"},C=_((()=>(0,s._)("h1",null,"Novo Dashboard",-1))),E={class:"inputs"},P=_((()=>(0,s._)("label",{for:"dashboard"},[(0,s.Uk)("Nome do Dashboard "),(0,s._)("b",null,"*")],-1))),S=_((()=>(0,s._)("input",{type:"submit",value:"Salvar"},null,-1)));function q(a,e,t,d,o,n){return(0,s.wg)(),(0,s.iD)("div",k,[(0,s._)("div",y,[(0,s._)("div",I,[(0,s._)("i",{class:"fi fi-rr-cross-small",onClick:e[0]||(e[0]=(...a)=>n.closePage&&n.closePage(...a))})]),C,(0,s._)("form",{action:"",onSubmit:e[2]||(e[2]=(0,i.iM)((a=>n.newDashboard()),["prevent"])),id:"newdashboard"},[(0,s._)("div",E,[P,(0,s.wy)((0,s._)("input",{type:"text",name:"dashboard",id:"dashboard",required:"","onUpdate:modelValue":e[1]||(e[1]=a=>o.dashboard=a),autocomplete:"off"},null,512),[[i.nr,o.dashboard]])]),S],32)])])}var x={name:"NewDashboard",emits:["close-page"],data(){return{dashboard:""}},methods:{closePage:function(){this.$emit("close-page")},newDashboard:function(){(0,D.m)({method:"POST",url:"ageboard/dashboard",data:{dashboard:this.dashboard},headers:{Authorization:"Bearer "+w.Z.get("token")}}).then((a=>{alert(a.data.msg),201===a.status&&(this.dashboard="",this.closePage())}))}}},A=t(89);const z=(0,A.Z)(x,[["render",q],["__scopeId","data-v-5288cb4e"]]);var N=z;const B=a=>((0,s.dD)("data-v-10b54d4b"),a=a(),(0,s.Cn)(),a),U={class:"content-card"},Z={class:"filters"},V={key:0,id:"list-boards"},T=B((()=>(0,s._)("i",{class:"fi fi-rr-chart-pie"},null,-1))),Y=B((()=>(0,s._)("div",{class:"actions"},[(0,s._)("i",{class:"fi fi-rr-arrow-square-right",style:{"font-size":"2rem"}})],-1)));function L(a,e,t,o,n,r){const l=(0,s.up)("NewItem");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",U,[(0,s._)("h1",null,"Editar Dashboard - "+(0,d.zw)(t.data.name),1),(0,s._)("div",Z,[(0,s.wy)((0,s._)("input",{type:"text",id:"searchBoard",name:"searchBoard",placeholder:"Buscar item...",autocomplete:"off","onUpdate:modelValue":e[0]||(e[0]=a=>n.search=a)},null,512),[[i.nr,n.search]]),(0,s._)("button",{onClick:e[1]||(e[1]=(...a)=>r.newItem&&r.newItem(...a))},"Adicionar novo item"),(0,s._)("button",{onClick:e[2]||(e[2]=(...a)=>r.tradeStatusDashboard&&r.tradeStatusDashboard(...a))},(0,d.zw)(1===t.data.active?"Inativar Dashboard":"Ativar Dashboard"),1)]),!0===n.status&&"items"===n.page?((0,s.wg)(),(0,s.iD)("div",V,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.ItemsFiltered,(a=>((0,s.wg)(),(0,s.iD)("div",{class:"item",key:a.id},[(0,s._)("span",null,[T,(0,s.Uk)(" "+(0,d.zw)(a.item),1)]),Y])))),128))])):(0,s.kq)("",!0)]),"newItem"===n.modal?((0,s.wg)(),(0,s.j4)(l,{key:0,onClosePage:r.newItem,data:t.data},null,8,["onClosePage","data"])):(0,s.kq)("",!0)],64)}const M=a=>((0,s.dD)("data-v-bc960ada"),a=a(),(0,s.Cn)(),a),F={id:"modal"},H={id:"card-modal"},O={id:"close-button"},j=M((()=>(0,s._)("h1",null,"Adicionar novo item",-1))),G={class:"inputs"},$=M((()=>(0,s._)("label",{for:"name"},[(0,s.Uk)("Nome do item: "),(0,s._)("b",null,"*")],-1))),K={class:"inputs"},J=M((()=>(0,s._)("label",{for:"iframe"},[(0,s.Uk)("Iframe: "),(0,s._)("b",null,"*")],-1))),Q=M((()=>(0,s._)("input",{type:"submit",value:"Cadastrar"},null,-1)));function R(a,e,t,d,o,n){return(0,s.wg)(),(0,s.iD)("div",F,[(0,s._)("div",H,[(0,s._)("div",O,[(0,s._)("i",{class:"fi fi-rr-cross-small",onClick:e[0]||(e[0]=(...a)=>n.closePage&&n.closePage(...a))})]),j,(0,s._)("form",{action:"",onSubmit:e[3]||(e[3]=(0,i.iM)(((...a)=>n.newItem&&n.newItem(...a)),["prevent"]))},[(0,s._)("div",G,[$,(0,s.wy)((0,s._)("input",{type:"text",name:"name",id:"name",autocomplete:"off",required:"","onUpdate:modelValue":e[1]||(e[1]=a=>o.inputs.name=a)},null,512),[[i.nr,o.inputs.name]])]),(0,s._)("div",K,[J,(0,s.wy)((0,s._)("input",{type:"text",name:"iframe",id:"iframe",autocomplete:"off",required:"","onUpdate:modelValue":e[2]||(e[2]=a=>o.inputs.iframe=a)},null,512),[[i.nr,o.inputs.iframe]])]),Q],32)])])}var W={name:"NewItem",props:{data:{required:!0}},data(){return{inputs:{name:"",iframe:"",idDash:this.data.id}}},methods:{closePage:function(){this.$emit("close-page")},newItem:function(){alert("click")}}};const X=(0,A.Z)(W,[["render",R],["__scopeId","data-v-bc960ada"]]);var aa=X,ea={name:"EditAccess",components:{NewItem:aa},props:{data:{required:!0}},emits:["close-page"],data(){return{search:"",dataBoard:this.data,status:!1,loading:!0,dataItems:{},page:"items",modal:""}},methods:{closePage:function(){this.$emit("close-page")},getItems:function(){(0,D.m)({method:"GET",url:"ageboard/dashboard-items",headers:{Authorization:"Bearer "+w.Z.get("token")},params:{id:this.data.id}}).then((a=>{this.dataItems=a.data,this.status=!0,this.loading=!1}))},tradeStatusDashboard:function(){this.loading=!0,(0,D.m)({method:"DELETE",url:"ageboard/dashboard/"+this.data.id,headers:{Authorization:"Bearer "+w.Z.get("token")}}).then((a=>{this.dataBoard.active=1===this.data.active?0:1,this.loading=!1,alert(a.data.msg)}))},newItem:function(){"newItem"===this.modal?this.modal="items":this.modal="newItem"}},computed:{ItemsFiltered:function(){let a=[];return a=this.dataItems.filter((a=>a.item.toLowerCase().indexOf(this.search.toLowerCase())>-1)),a}},mounted(){this.getItems()}};const ta=(0,A.Z)(ea,[["render",L],["__scopeId","data-v-10b54d4b"]]);var sa=ta,da=t(65),ia={name:"DashboardManagement",components:{NewDashboard:N,EditDashboard:sa},data(){return{mode:w.Z.get("mode"),page:"Dashboards",data:{},status:!1,loading:!0,search:"",modal:"",dataEdit:{name:"",id:0,access:!1},dataDash:{},dataEditDashboard:{name:"",active:0,id:0}}},methods:{...(0,da.OI)(["SAVE_SYSTEM"]),modeView:function(a){this.mode=a},closePage:function(a){"Dashboards"===a&&(this.page="Dashboards",this.id=0,this.modal="",this.getDashboards()),"users"===a&&(this.modal="")},getDashboards:function(){(0,D.m)({method:"GET",url:"ageboard/dashboards",headers:{Authorization:"Bearer "+w.Z.get("token")}}).then((a=>{this.dataDash=a.data,this.status=!0}))},editDashboard:function(a,e,t){this.dataEditDashboard.id=a,this.dataEditDashboard.name=e,this.dataEditDashboard.active=t,this.page="editDashboard"}},computed:{DashFiltered:function(){let a=[];return a=this.dataDash.filter((a=>a.dashboard.toLowerCase().indexOf(this.search.toLowerCase())>-1)),a}},mounted(){this.getDashboards(),this.SAVE_SYSTEM({loading:!1})}};const oa=(0,A.Z)(ia,[["render",v],["__scopeId","data-v-5819cf86"]]);var na=oa}}]);
//# sourceMappingURL=966.7d301cac.js.map