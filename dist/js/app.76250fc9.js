(function(){"use strict";var e={5959:function(e,a,t){var l=t(9242),n=t(3396);function o(e,a){const t=(0,n.up)("router-view");return(0,n.wg)(),(0,n.j4)(t)}var s=t(89);const i={},d=(0,s.Z)(i,[["render",o]]);var r=d,c=t(5431);(0,c.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var u=t(2483),m=t(7139);const p=e=>((0,n.dD)("data-v-46cd0b3b"),e=e(),(0,n.Cn)(),e),_={id:"welcome"},v=["src"],h=p((()=>(0,n._)("h1",null,"Portal Age Telecom",-1))),g=p((()=>(0,n._)("p",null,[(0,n.Uk)(" Acesse os principais sistemas internos, "),(0,n._)("br"),(0,n.Uk)(" ferramentas, relatórios, dashboards e mais! ")],-1))),f={id:"content-login"},w={key:0,id:"card-login"},b=p((()=>(0,n._)("h1",null," Bem-vindo(a) ;) ",-1))),k=p((()=>(0,n._)("p",null,"Acesse com seu usuário Age Telecom",-1))),y={id:"msg"},D={key:0,class:"trigger"},C={class:"inputs"},z=p((()=>(0,n._)("i",{class:"fi fi-sr-user"},null,-1))),A={class:"inputs"},x=p((()=>(0,n._)("i",{class:"fi fi-sr-lock"},null,-1))),V={key:0},S={key:1,class:"loader"},Z={key:1,id:"card-login"},q=(0,n.uE)('<h1 data-v-46cd0b3b> Cadastre-se </h1><p data-v-46cd0b3b>Utilize seus dados Age telecom</p><form action="#" data-v-46cd0b3b><div class="inputs" data-v-46cd0b3b><i class="fi fi-sr-envelope" data-v-46cd0b3b></i><input type="email" name="email" id="email" autocomplete="off" placeholder="E-mail" required data-v-46cd0b3b><span data-v-46cd0b3b> @agetelecom.com.br </span></div><div class="inputs" data-v-46cd0b3b><i class="fi fi-sr-user" data-v-46cd0b3b></i><input type="text" name="email" id="email" autocomplete="off" placeholder="Nome de usuário" required data-v-46cd0b3b></div><div class="inputs" data-v-46cd0b3b><i class="fi fi-sr-lock" data-v-46cd0b3b></i><input type="password" name="password" id="password" autocomplete="off" placeholder="Senha" required data-v-46cd0b3b></div><button data-v-46cd0b3b><span data-v-46cd0b3b> Cadastrar </span></button></form>',3),M=[q],R={key:0,class:"loading-bar"};function E(e,a,o,s,i,d){return(0,n.wg)(),(0,n.iD)("div",{id:"container-login",class:(0,m.C_)({"mode-l":"light"===i.mode||void 0===i.mode,"mode-d":"dark"===i.mode})},[(0,n._)("div",_,[(0,n._)("img",{src:t(4642),alt:""},null,8,v),h,g,"discontinued"===i.page?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:a[0]||(a[0]=e=>i.page="discontinued")}," Cadastre-se ")):(0,n.kq)("",!0),"register"===i.page?((0,n.wg)(),(0,n.iD)("button",{key:1,onClick:a[1]||(a[1]=e=>i.page="login")}," Conecte-se ")):(0,n.kq)("",!0)]),(0,n._)("div",f,["login"===i.page?((0,n.wg)(),(0,n.iD)("div",w,[b,k,(0,n._)("form",{action:"#",onSubmit:a[5]||(a[5]=(0,l.iM)((()=>{}),["prevent"])),class:(0,m.C_)({trigger:!0===i.error})},[(0,n._)("div",y,[null!==i.msg?((0,n.wg)(),(0,n.iD)("span",D,(0,m.zw)(i.msg),1)):(0,n.kq)("",!0)]),(0,n._)("div",C,[z,(0,n.wy)((0,n._)("input",{type:"text",name:"username",id:"username",autocomplete:"off",placeholder:"Usuário",required:"","onUpdate:modelValue":a[2]||(a[2]=e=>i.inputs.username=e)},null,512),[[l.nr,i.inputs.username]])]),(0,n._)("div",A,[x,(0,n.wy)((0,n._)("input",{type:"password",name:"password",id:"password",autocomplete:"off",placeholder:"Senha",required:"","onUpdate:modelValue":a[3]||(a[3]=e=>i.inputs.password=e)},null,512),[[l.nr,i.inputs.password]])]),(0,n._)("button",{onClick:a[4]||(a[4]=(...e)=>d.authenticate&&d.authenticate(...e))},[!1===i.loading?((0,n.wg)(),(0,n.iD)("span",V," Entrar ")):(0,n.kq)("",!0),!0===i.loading?((0,n.wg)(),(0,n.iD)("span",S)):(0,n.kq)("",!0)])],34)])):(0,n.kq)("",!0),"register"===i.page?((0,n.wg)(),(0,n.iD)("div",Z,M)):(0,n.kq)("",!0)]),!0===i.loading?((0,n.wg)(),(0,n.iD)("div",R)):(0,n.kq)("",!0)],2)}var W=t(680),T=t(6265),H=t.n(T);const P=H().create({baseURL:"http://v1.portal.tote.local/api/"});var U={name:"LoginPage",data(){return{mode:W.Z.get("mode"),page:"login",loading:!1,inputs:{username:null,password:null},functions:{authenticate:!1},msg:null,error:!1}},methods:{authenticate:function(){null!==this.inputs.username&&null!==this.inputs.password&&!1===this.functions.authenticate&&(this.loading=!0,this.functions.authenticate=!0,P({method:"POST",url:"auth/login_ad",headers:{"Content-Type":"application/json",Access:"application/json"},data:{email:this.inputs.username,password:this.inputs.password}}).then((e=>{this.msg=null,this.error=!1,this.functions.authenticate=!1,W.Z.set("token",e.data.access_token,{expires:e.data.expires_in}),W.Z.set("name",e.data.name,{expires:e.data.expires_in}),this.$router.replace("/sistemas")})).catch((e=>{401===e.response.status&&(this.loading=!1,this.error=!0,this.functions.authenticate=!1,this.msg="Usuário ou senha incorretos!")})))}}};const O=(0,s.Z)(U,[["render",E],["__scopeId","data-v-46cd0b3b"]]);var B=O;const N={id:"content-app"},j={id:"layer-app"};function I(e,a,t,l,o,s){const i=(0,n.up)("MenuApp"),d=(0,n.up)("HeaderApp");return(0,n.wg)(),(0,n.iD)("div",N,[(0,n.Wm)(i,{mode:o.mode,system:"portal"},null,8,["mode"]),(0,n._)("div",j,[(0,n.Wm)(d,{onMode:s.modeView},null,8,["onMode"]),(0,n._)("div",{id:"content-page",class:(0,m.C_)({"mode-l-p":"light"===o.mode||void 0===o.mode,"mode-d-p":"dark"===o.mode})},null,2)])])}const L=e=>((0,n.dD)("data-v-191573e2"),e=e(),(0,n.Cn)(),e),Y={id:"logo-name"},F=["src"],$=L((()=>(0,n._)("i",{class:"fi fi-rr-angle-small-left"},null,-1))),K=L((()=>(0,n._)("i",{class:"fi fi-rr-menu-burger"},null,-1))),G=[$,K],J={key:0},Q=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-apps-add"})]),(0,n._)("span",null,"Sistemas")],-1))),X=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-sign-out-alt"})]),(0,n._)("span",null,"Logout")],-1))),ee={key:1},ae=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-document"})]),(0,n._)("span",null,"Relatórios")],-1))),te=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-arrow-left"})]),(0,n._)("span",null,"Voltar ao portal")],-1))),le=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-sign-out-alt"})]),(0,n._)("span",null,"Logout")],-1))),ne={key:2},oe=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-chart-histogram"})]),(0,n._)("span",null,"Minhas vendas")],-1))),se=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-arrow-left"})]),(0,n._)("span",null,"Voltar ao portal")],-1))),ie=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-arrow-left"})]),(0,n._)("span",null,"Voltar ao portal")],-1))),de=L((()=>(0,n._)("li",null,[(0,n._)("div",null,[(0,n._)("i",{class:"fi fi-rr-sign-out-alt"})]),(0,n._)("span",null,"Logout")],-1))),re={key:0,class:"loading-bar"};function ce(e,a,l,o,s,i){const d=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",{id:"menu",class:(0,m.C_)({"mode-l":"light"===l.mode||void 0===l.mode,"mode-d":"dark"===l.mode,"decrease-menu":"decrease"===s.menu})},[(0,n._)("div",Y,[(0,n._)("img",{src:t(4642),alt:"age"},null,8,F),(0,n._)("div",{onClick:a[0]||(a[0]=e=>i.closeMenu())},G)]),"portal"===l.system?((0,n.wg)(),(0,n.iD)("nav",J,[(0,n._)("ul",null,[(0,n.Wm)(d,{to:"/sistemas","active-class":"active-li",onClick:a[1]||(a[1]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[Q])),_:1}),(0,n.Wm)(d,{to:"/","active-class":"active-li",style:{position:"absolute",bottom:"1vh"},onClick:a[2]||(a[2]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[X])),_:1})])])):(0,n.kq)("",!0),"report"===l.system?((0,n.wg)(),(0,n.iD)("nav",ee,[(0,n._)("ul",null,[(0,n.Wm)(d,{to:"/ageReport/home","active-class":"active-li",onClick:a[3]||(a[3]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[ae])),_:1}),(0,n.Wm)(d,{to:"/sistemas","active-class":"active-li",style:{position:"absolute",bottom:"7vh"},onClick:a[4]||(a[4]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[te])),_:1}),(0,n.Wm)(d,{to:"/","active-class":"active-li",style:{position:"absolute",bottom:"1vh"}},{default:(0,n.w5)((()=>[le])),_:1})])])):(0,n.kq)("",!0),"ageRv"===l.system?((0,n.wg)(),(0,n.iD)("nav",ne,[(0,n._)("ul",null,[(0,n.Wm)(d,{to:"/ageRv/comercial/vendas","active-class":"active-li",onClick:a[5]||(a[5]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[oe])),_:1}),(0,n.Wm)(d,{to:"/sistemas","active-class":"active-li",style:{position:"absolute",bottom:"7vh"},onClick:a[6]||(a[6]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[se])),_:1}),(0,n.Wm)(d,{to:"/sistemas","active-class":"active-li",style:{position:"absolute",bottom:"7vh"},onClick:a[7]||(a[7]=e=>s.loading=!0)},{default:(0,n.w5)((()=>[ie])),_:1}),(0,n.Wm)(d,{to:"/","active-class":"active-li",style:{position:"absolute",bottom:"1vh"}},{default:(0,n.w5)((()=>[de])),_:1})])])):(0,n.kq)("",!0)],2),!0===s.loading?((0,n.wg)(),(0,n.iD)("div",re)):(0,n.kq)("",!0)],64)}var ue={name:"MenuApp",props:{mode:{type:String},system:{type:String,required:!0}},data(){return{menu:W.Z.get("menu"),loading:!1}},methods:{closeMenu:function(){switch(W.Z.get("menu")){case"decrease":W.Z.set("menu","increase",{expires:7}),this.menu="light";break;case"increase":W.Z.set("menu","decrease",{expires:7}),this.menu="decrease";break;case void 0:W.Z.set("menu","decrease",{expires:7}),this.menu="decrease";break}}}};const me=(0,s.Z)(ue,[["render",ce],["__scopeId","data-v-191573e2"]]);var pe=me;const _e=e=>((0,n.dD)("data-v-30b4b0fe"),e=e(),(0,n.Cn)(),e),ve={id:"profile"},he={key:0,class:"fi fi-rr-sun"},ge=_e((()=>(0,n._)("div",null,null,-1))),fe={key:1,class:"fi fi-rr-moon-stars"};function we(e,a,t,l,o,s){return(0,n.wg)(),(0,n.iD)("div",{id:"header-top",class:(0,m.C_)({"mode-l":"light"===o.mode||void 0===o.mode,"mode-d":"dark"===o.mode})},[(0,n._)("div",ve,[(0,n._)("span",null,"Olá, "+(0,m.zw)(o.username),1)]),(0,n._)("div",{id:"darkmode",onClick:a[0]||(a[0]=(...e)=>s.modeView&&s.modeView(...e))},["light"===o.mode||void 0===o.mode?((0,n.wg)(),(0,n.iD)("i",he)):(0,n.kq)("",!0),ge,"dark"===o.mode?((0,n.wg)(),(0,n.iD)("i",fe)):(0,n.kq)("",!0)])],2)}var be={name:"HeaderApp",data(){return{mode:W.Z.get("mode"),username:W.Z.get("name")}},methods:{modeView:function(){switch(W.Z.get("mode")){case"dark":W.Z.set("mode","light",{expires:7}),this.$emit("mode","light"),this.mode="light";break;case"light":W.Z.set("mode","dark",{expires:7}),this.$emit("mode","dark"),this.mode="dark";break;case void 0:W.Z.set("mode","dark",{expires:7}),this.$emit("mode","dark"),this.mode="dark";break}}}};const ke=(0,s.Z)(be,[["render",we],["__scopeId","data-v-30b4b0fe"]]);var ye=ke,De={name:"PanelDashboard",components:{MenuApp:pe,HeaderApp:ye},data(){return{mode:W.Z.get("mode")}},methods:{modeView:function(e){this.mode=e}},mounted(){}};const Ce=(0,s.Z)(De,[["render",I],["__scopeId","data-v-4afce929"]]);var ze=Ce;const Ae=e=>((0,n.dD)("data-v-377a2e1d"),e=e(),(0,n.Cn)(),e),xe={id:"content-app"},Ve={id:"layer-app"},Se=Ae((()=>(0,n._)("div",{class:"systems-on"},[(0,n._)("h1",null,"Sistemas"),(0,n._)("div",{id:"systems"})],-1))),Ze={class:"systems-on"},qe=Ae((()=>(0,n._)("h1",null,"Em desenvolvimento",-1))),Me={id:"systems"},Re=Ae((()=>(0,n._)("div",{class:"system"},[(0,n._)("div",{class:"img-title"},[(0,n._)("i",{class:"fi fi-rr-document"}),(0,n._)("span",null,"Relatórios")]),(0,n._)("p",null," Relatórios e planilhas. ")],-1))),Ee=Ae((()=>(0,n._)("div",{class:"system"},[(0,n._)("div",{class:"img-title"},[(0,n._)("i",{class:"fi fi-rr-star"}),(0,n._)("span",null,"AgeRV")]),(0,n._)("p",null," Vendas e comissionamento. ")],-1))),We=Ae((()=>(0,n._)("div",{class:"system"},[(0,n._)("div",{class:"img-title"},[(0,n._)("i",{class:"fi fi-rr-stats"}),(0,n._)("span",null,"Indicadores")]),(0,n._)("p",null," Dashboards. ")],-1))),Te={key:0,class:"loading-bar"};function He(e,a,t,l,o,s){const i=(0,n.up)("MenuApp"),d=(0,n.up)("HeaderApp"),r=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n._)("div",xe,[(0,n.Wm)(i,{mode:o.mode,system:"portal"},null,8,["mode"]),(0,n._)("div",Ve,[(0,n.Wm)(d,{onMode:s.modeView},null,8,["onMode"]),(0,n._)("div",{id:"content-page",class:(0,m.C_)({"mode-l-p":"light"===o.mode||void 0===o.mode,"mode-d-p":"dark"===o.mode})},[Se,(0,n._)("div",Ze,[qe,(0,n._)("div",Me,[(0,n.Wm)(r,{to:"/ageReport/home",onClick:a[0]||(a[0]=e=>o.loading=!0)},{default:(0,n.w5)((()=>[Re])),_:1}),(0,n.Wm)(r,{to:"/ageRv/comercial/vendas",onClick:a[1]||(a[1]=e=>o.loading=!0)},{default:(0,n.w5)((()=>[Ee])),_:1}),(0,n.Wm)(r,{to:"/sistemas",onClick:a[2]||(a[2]=e=>o.loading=!0)},{default:(0,n.w5)((()=>[We])),_:1})])])],2)])]),!0===o.loading?((0,n.wg)(),(0,n.iD)("div",Te)):(0,n.kq)("",!0)],64)}var Pe={name:"SystemApp",components:{MenuApp:pe,HeaderApp:ye},data(){return{mode:W.Z.get("mode"),loading:!1}},methods:{modeView:function(e){this.mode=e}},mounted(){}};const Ue=(0,s.Z)(Pe,[["render",He],["__scopeId","data-v-377a2e1d"]]);var Oe=Ue;const Be=e=>((0,n.dD)("data-v-6be97542"),e=e(),(0,n.Cn)(),e),Ne={id:"content-app"},je={id:"layer-app"},Ie=Be((()=>(0,n._)("h1",null," Relatórios disponíveis ",-1))),Le={id:"reports"},Ye=Be((()=>(0,n._)("i",{class:"fi fi-rr-document-signed"},null,-1))),Fe=Be((()=>(0,n._)("span",null,[(0,n.Uk)("Lista de "),(0,n._)("br"),(0,n.Uk)(" conexões")],-1))),$e=[Ye,Fe],Ke=Be((()=>(0,n._)("i",{class:"fi fi-rr-document-signed"},null,-1))),Ge=Be((()=>(0,n._)("span",null,"DICI",-1))),Je=[Ke,Ge];function Qe(e,a,t,l,o,s){const i=(0,n.up)("MenuApp"),d=(0,n.up)("HeaderApp");return(0,n.wg)(),(0,n.iD)("div",Ne,[(0,n.Wm)(i,{mode:o.mode,system:"report"},null,8,["mode"]),(0,n._)("div",je,[(0,n.Wm)(d,{onMode:s.modeView},null,8,["onMode"]),(0,n._)("div",{id:"content-page",class:(0,m.C_)({"mode-l-p":"light"===o.mode||void 0===o.mode,"mode-d-p":"dark"===o.mode})},[Ie,(0,n._)("div",Le,[(0,n._)("div",{class:"report",onClick:a[0]||(a[0]=e=>s.downloadReport("list-connections","lista_conexoes.xlsx"))},$e),(0,n._)("div",{class:"report",onClick:a[1]||(a[1]=e=>s.downloadReport("dici","dici.xlsx"))},Je)])],2)])])}var Xe={name:"ReportPage",components:{MenuApp:pe,HeaderApp:ye},data(){return{mode:W.Z.get("mode")}},methods:{modeView:function(e){this.mode=e},downloadReport:function(e,a){P({method:"GET",url:"report/"+e,headers:{Authorization:"Bearer "+W.Z.get("token")},responseType:"blob"}).then((e=>{let t=new Blob([e.data],{type:"vnd.openxmlformats-officedocument.spreadsheetml.sheet"}),l=document.createElement("a");l.href=window.URL.createObjectURL(t),l.download=a,l.click()}))}},mounted(){}};const ea=(0,s.Z)(Xe,[["render",Qe],["__scopeId","data-v-6be97542"]]);var aa=ea,ta={auth(e,a,t){const l=W.Z.get("token");P({method:"get",url:"validatedToken",headers:{Authorization:"Bearer "+l}}).then((e=>{if(1===e.data)return t()})).catch((()=>t({path:"/"})))},permission_report(e,a,t){const l=W.Z.get("token");P({method:"get",url:"agerreport/Access",headers:{Authorization:"Bearer"+l}}).then((()=>t())).catch((()=>(alert("Você não pode acessar o sistema AgeReport."),t({path:"/sistemas"}))))},permission_rv(e,a,t){const l=W.Z.get("token");P({method:"get",url:"agerv/Access",headers:{Authorization:"Bearer"+l}}).then((()=>t())).catch((()=>(alert("Você não pode acessar o sistema AgeRv."),t({path:"/sistemas"}))))}};const la={id:"content-app"},na={id:"layer-app"};function oa(e,a,t,l,o,s){const i=(0,n.up)("MenuApp"),d=(0,n.up)("HeaderApp");return(0,n.wg)(),(0,n.iD)("div",la,[(0,n.Wm)(i,{mode:o.mode,system:"ageRv"},null,8,["mode"]),(0,n._)("div",na,[(0,n.Wm)(d,{onMode:s.modeView},null,8,["onMode"]),(0,n._)("div",{id:"content-page",class:(0,m.C_)({"mode-l-p":"light"===o.mode||void 0===o.mode,"mode-d-p":"dark"===o.mode})},null,2)])])}var sa={name:"SalesAnalytics",components:{MenuApp:pe,HeaderApp:ye},data(){return{mode:W.Z.get("mode")}},methods:{modeView:function(e){this.mode=e}},mounted(){}};const ia=(0,s.Z)(sa,[["render",oa],["__scopeId","data-v-8840c200"]]);var da=ia;const ra=e=>((0,n.dD)("data-v-215238e0"),e=e(),(0,n.Cn)(),e),ca={key:0,class:"loading-bar"},ua={id:"content-app"},ma={id:"layer-app"},pa={class:"dashboard-commercial"},_a=ra((()=>(0,n._)("h1",null,"Dashboard de vendas",-1))),va={class:"dashboards"},ha={class:"type-value"},ga=ra((()=>(0,n._)("span",null,"Estrelas",-1))),fa=ra((()=>(0,n._)("i",{class:"fi fi-ss-star"},null,-1))),wa={class:"type-value"},ba=ra((()=>(0,n._)("span",null,"Vendas totais",-1))),ka=ra((()=>(0,n._)("i",{class:"fi fi-ss-rocket-lunch"},null,-1))),ya={class:"dashboard",style:{"background-color":"#932b91"}},Da={class:"type-value"},Ca=ra((()=>(0,n._)("span",null,"Meta",-1))),za=ra((()=>(0,n._)("i",{class:"fi fi-rr-chart-histogram"},null,-1))),Aa={class:"dashboard",style:{"background-color":"#F44336"}},xa={class:"type-value"},Va=ra((()=>(0,n._)("span",null,[(0,n.Uk)("Cancelamentos"),(0,n._)("br"),(0,n.Uk)("Totais")],-1))),Sa=ra((()=>(0,n._)("i",{class:"fi fi-ss-delete-document"},null,-1))),Za={class:"dashboard",style:{"background-color":"#FECA1D"}},qa={class:"type-value"},Ma=ra((()=>(0,n._)("span",null,"Valor da estrela",-1))),Ra=ra((()=>(0,n._)("i",{class:"fi fi-sr-grin-stars"},null,-1))),Ea={class:"type-value"},Wa=ra((()=>(0,n._)("span",null,[(0,n.Uk)("Vendas em "),(0,n._)("br"),(0,n.Uk)("Aprovação")],-1))),Ta=ra((()=>(0,n._)("i",{class:"fi fi-rr-time-twenty-four"},null,-1))),Ha={class:"dashboard",style:{"background-color":"#983FB5"}},Pa={class:"type-value"},Ua=ra((()=>(0,n._)("span",null,"Meta mínima ",-1))),Oa=ra((()=>(0,n._)("i",{class:"fi fi-sr-chart-line-up"},null,-1))),Ba={class:"type-value"},Na=ra((()=>(0,n._)("span",null,[(0,n.Uk)("Cancelamento "),(0,n._)("br"),(0,n.Uk)(" -7 Dias")],-1))),ja=ra((()=>(0,n._)("i",{class:"fi fi-sr-ban"},null,-1))),Ia={class:"dashboard",style:{"background-color":"#24A527"}},La={class:"type-value"},Ya=ra((()=>(0,n._)("span",null,"Comissão",-1))),Fa=ra((()=>(0,n._)("i",{class:"fi fi-sr-sack-dollar"},null,-1))),$a={class:"type-value"},Ka=ra((()=>(0,n._)("span",null,"Vendas na base",-1))),Ga=ra((()=>(0,n._)("i",{class:"fi fi-rr-trophy"},null,-1))),Ja={class:"dashboard",style:{"background-color":"#c571e1"}},Qa={class:"type-value"},Xa=ra((()=>(0,n._)("span",null,"Meta atingida",-1))),et=ra((()=>(0,n._)("i",{class:"fi fi-sr-chart-line-up"},null,-1))),at={class:"dashboard",style:{"background-color":"#B3B4B5"}},tt={class:"type-value"},lt=ra((()=>(0,n._)("span",null,"Deflator",-1))),nt=ra((()=>(0,n._)("i",{class:"fi fi-sr-settings-sliders"},null,-1))),ot={class:"filters"},st=ra((()=>(0,n._)("span",null,"Selecione o mês",-1))),it={class:"buttons-filter"},dt={key:0,id:"card-modal",class:"stars"},rt={id:"close-button"},ct={id:"table"},ut=ra((()=>(0,n._)("h1",null,"Extrato de planos e estrelas",-1))),mt=ra((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",{style:{"text-align":"left",width:"50%"}},"Plano"),(0,n._)("th",null,"Quantidade"),(0,n._)("th",null,"Valor da estrela"),(0,n._)("th",null,"Total de estrelas")])],-1))),pt={style:{"text-align":"left",width:"50%"}},_t={key:1,id:"card-modal",class:"stars salesTotals"},vt={id:"close-button"},ht={id:"table"},gt=ra((()=>(0,n._)("h1",null,"Extrato de todas as vendas instaladas",-1))),ft=ra((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Nº contrato"),(0,n._)("th",null,"Nome do cliente"),(0,n._)("th",null,"Plano"),(0,n._)("th",null,"Status"),(0,n._)("th",null,"Situação"),(0,n._)("th",null,"Data do cadastro"),(0,n._)("th",null,"Data da aprovação"),(0,n._)("th",null,"Data da vigência"),(0,n._)("th",null,"Data do cancelamento")])],-1))),wt={key:2,id:"card-modal",class:"stars salesTotals"},bt={id:"close-button"},kt={id:"table"},yt=ra((()=>(0,n._)("h1",null,"Extrato de cancelamentos antes dos 7 dias",-1))),Dt=ra((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Nº contrato"),(0,n._)("th",null,"Nome do cliente"),(0,n._)("th",null,"Plano"),(0,n._)("th",null,"Status"),(0,n._)("th",null,"Situação"),(0,n._)("th",null,"Data do cadastro"),(0,n._)("th",null,"Data da aprovação"),(0,n._)("th",null,"Data da vigência"),(0,n._)("th",null,"Data do cancelamento")])],-1))),Ct={key:3,id:"card-modal",class:"stars salesAprovation"},zt={id:"close-button"},At={id:"table"},xt=ra((()=>(0,n._)("h1",null,"Extrato de vendas em aprovação",-1))),Vt=ra((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Nº contrato"),(0,n._)("th",null,"Nome do cliente"),(0,n._)("th",null,"Plano"),(0,n._)("th",null,"Status"),(0,n._)("th",null,"Situação"),(0,n._)("th",null,"Data do cadastro")])],-1))),St={key:4,id:"card-modal",class:"stars salesTotals"},Zt={id:"close-button"},qt={id:"table"},Mt=ra((()=>(0,n._)("h1",null,"Extrato de todas as vendas que continuam na base",-1))),Rt=ra((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Nº contrato"),(0,n._)("th",null,"Nome do cliente"),(0,n._)("th",null,"Plano"),(0,n._)("th",null,"Status"),(0,n._)("th",null,"Situação"),(0,n._)("th",null,"Data do cadastro"),(0,n._)("th",null,"Data da aprovação"),(0,n._)("th",null,"Data da vigência")])],-1)));function Et(e,a,t,l,o,s){const i=(0,n.up)("MenuApp"),d=(0,n.up)("HeaderApp");return(0,n.wg)(),(0,n.iD)(n.HY,null,[!0===o.loading?((0,n.wg)(),(0,n.iD)("div",ca)):(0,n.kq)("",!0),(0,n._)("div",ua,[(0,n.Wm)(i,{mode:o.mode,system:"ageRv"},null,8,["mode"]),(0,n._)("div",ma,[(0,n.Wm)(d,{onMode:s.modeView},null,8,["onMode"]),(0,n._)("div",{id:"content-page",class:(0,m.C_)({"mode-l-p":"light"===o.mode||void 0===o.mode,"mode-d-p":"dark"===o.mode})},[(0,n._)("div",pa,[_a,(0,n._)("div",va,[(0,n._)("div",{class:"dashboard",style:{"background-color":"#FEA11D",cursor:"pointer"},onClick:a[0]||(a[0]=e=>s.modalView("stars"))},[(0,n._)("div",ha,[(0,n._)("span",null,(0,m.zw)(o.data.stars),1),ga]),fa]),(0,n._)("div",{class:"dashboard",style:{"background-color":"#2fa1d0",cursor:"pointer"},onClick:a[1]||(a[1]=e=>s.modalView("salesTotals"))},[(0,n._)("div",wa,[(0,n._)("span",null,(0,m.zw)(o.data.salesTotals),1),ba]),ka]),(0,n._)("div",ya,[(0,n._)("div",Da,[(0,n._)("span",null,(0,m.zw)(o.data.meta),1),Ca]),za]),(0,n._)("div",Aa,[(0,n._)("div",xa,[(0,n._)("span",null,(0,m.zw)(o.data.cancelTotals),1),Va]),Sa]),(0,n._)("div",Za,[(0,n._)("div",qa,[(0,n._)("span",null,"R$"+(0,m.zw)(o.data.valueStars),1),Ma]),Ra]),(0,n._)("div",{class:"dashboard",style:{"background-color":"#6892d0",cursor:"pointer"},onClick:a[2]||(a[2]=e=>s.modalView("salesAprovation"))},[(0,n._)("div",Ea,[(0,n._)("span",null,(0,m.zw)(o.data.salesAprovation),1),Wa]),Ta]),(0,n._)("div",Ha,[(0,n._)("div",Pa,[(0,n._)("span",null,(0,m.zw)(o.data.minMeta)+"%",1),Ua]),Oa]),(0,n._)("div",{class:"dashboard",style:{"background-color":"#911515",cursor:"pointer"},onClick:a[3]||(a[3]=e=>s.modalView("cancelD7"))},[(0,n._)("div",Ba,[(0,n._)("span",null,(0,m.zw)(o.data.cancelD7),1),Na]),ja]),(0,n._)("div",Ia,[(0,n._)("div",La,[(0,n._)("span",null,"R$"+(0,m.zw)(o.data.commission),1),Ya]),Fa]),(0,n._)("div",{class:"dashboard",style:{"background-color":"#009688",cursor:"pointer"},onClick:a[4]||(a[4]=e=>s.modalView("salesValid"))},[(0,n._)("div",$a,[(0,n._)("span",null,(0,m.zw)(o.data.sales),1),Ka]),Ga]),(0,n._)("div",Ja,[(0,n._)("div",Qa,[(0,n._)("span",null,(0,m.zw)(o.data.metaPercent)+"%",1),Xa]),et]),(0,n._)("div",at,[(0,n._)("div",tt,[(0,n._)("span",null,(0,m.zw)(o.data.deflator)+"%",1),lt]),nt])])]),(0,n._)("div",ot,[st,(0,n._)("div",it,[(0,n._)("span",{class:(0,m.C_)({active:"07"===o.filter.month}),onClick:a[5]||(a[5]=e=>s.getSellers("07"))},"Julho",2),(0,n._)("span",{class:(0,m.C_)({active:"08"===o.filter.month}),onClick:a[6]||(a[6]=e=>s.getSellers("08"))},"Agosto",2)])])],2)])]),!0===o.modal?((0,n.wg)(),(0,n.iD)("div",{key:1,id:"modal",class:(0,m.C_)({"mode-d-m":"dark"===o.mode})},["stars"===o.dashboard?((0,n.wg)(),(0,n.iD)("div",dt,[(0,n._)("div",rt,[(0,n._)("i",{class:"fi fi-rr-cross-small",onClick:a[7]||(a[7]=e=>this.modal=!1)})]),(0,n._)("div",ct,[ut,(0,n._)("table",null,[mt,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.data.extractStars,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e.valueStar},[(0,n._)("td",pt,(0,m.zw)(e.plan),1),(0,n._)("td",null,(0,m.zw)(e.qntd),1),(0,n._)("td",null,(0,m.zw)(e.valueStar),1),(0,n._)("td",null,(0,m.zw)(e.totals),1)])))),128))])])])])):(0,n.kq)("",!0),"salesTotals"===o.dashboard?((0,n.wg)(),(0,n.iD)("div",_t,[(0,n._)("div",vt,[(0,n._)("i",{class:"fi fi-rr-cross-small",onClick:a[8]||(a[8]=e=>this.modal=!1)})]),(0,n._)("div",ht,[gt,(0,n._)("table",null,[ft,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.data.extractSalesTotals,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e.id},[(0,n._)("td",null,(0,m.zw)(e.id_contrato),1),(0,n._)("td",null,(0,m.zw)(e.nome_cliente),1),(0,n._)("td",null,(0,m.zw)(e.plano),1),(0,n._)("td",null,(0,m.zw)(e.status),1),(0,n._)("td",null,(0,m.zw)(e.situacao),1),(0,n._)("td",null,(0,m.zw)(e.data_contrato),1),(0,n._)("td",null,(0,m.zw)(e.data_ativacao),1),(0,n._)("td",null,(0,m.zw)(e.data_vigencia),1),(0,n._)("td",null,(0,m.zw)(e.data_cancelamento),1)])))),128))])])])])):(0,n.kq)("",!0),"cancelD7"===o.dashboard?((0,n.wg)(),(0,n.iD)("div",wt,[(0,n._)("div",bt,[(0,n._)("i",{class:"fi fi-rr-cross-small",onClick:a[9]||(a[9]=e=>this.modal=!1)})]),(0,n._)("div",kt,[yt,(0,n._)("table",null,[Dt,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.data.extractCancelsD7,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e.id},[(0,n._)("td",null,(0,m.zw)(e.id_contrato),1),(0,n._)("td",null,(0,m.zw)(e.nome_cliente),1),(0,n._)("td",null,(0,m.zw)(e.plano),1),(0,n._)("td",null,(0,m.zw)(e.status),1),(0,n._)("td",null,(0,m.zw)(e.situacao),1),(0,n._)("td",null,(0,m.zw)(e.data_contrato),1),(0,n._)("td",null,(0,m.zw)(e.data_ativacao),1),(0,n._)("td",null,(0,m.zw)(e.data_vigencia),1),(0,n._)("td",null,(0,m.zw)(e.data_cancelamento),1)])))),128))])])])])):(0,n.kq)("",!0),"salesAprovation"===o.dashboard?((0,n.wg)(),(0,n.iD)("div",Ct,[(0,n._)("div",zt,[(0,n._)("i",{class:"fi fi-rr-cross-small",onClick:a[10]||(a[10]=e=>this.modal=!1)})]),(0,n._)("div",At,[xt,(0,n._)("table",null,[Vt,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.data.extractSalesAprovation,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e.id},[(0,n._)("td",null,(0,m.zw)(e.id_contrato),1),(0,n._)("td",null,(0,m.zw)(e.nome_cliente),1),(0,n._)("td",null,(0,m.zw)(e.plano),1),(0,n._)("td",null,(0,m.zw)(e.status),1),(0,n._)("td",null,(0,m.zw)(e.situacao),1),(0,n._)("td",null,(0,m.zw)(e.data_contrato),1)])))),128))])])])])):(0,n.kq)("",!0),"salesValid"===o.dashboard?((0,n.wg)(),(0,n.iD)("div",St,[(0,n._)("div",Zt,[(0,n._)("i",{class:"fi fi-rr-cross-small",onClick:a[11]||(a[11]=e=>this.modal=!1)})]),(0,n._)("div",qt,[Mt,(0,n._)("table",null,[Rt,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(o.data.extractSalesValids,(e=>((0,n.wg)(),(0,n.iD)("tr",{key:e.id},[(0,n._)("td",null,(0,m.zw)(e.id_contrato),1),(0,n._)("td",null,(0,m.zw)(e.nome_cliente),1),(0,n._)("td",null,(0,m.zw)(e.plano),1),(0,n._)("td",null,(0,m.zw)(e.status),1),(0,n._)("td",null,(0,m.zw)(e.situacao),1),(0,n._)("td",null,(0,m.zw)(e.data_contrato),1),(0,n._)("td",null,(0,m.zw)(e.data_ativacao),1),(0,n._)("td",null,(0,m.zw)(e.data_vigencia),1)])))),128))])])])])):(0,n.kq)("",!0)],2)):(0,n.kq)("",!0)],64)}var Wt={name:"SalesPage",components:{MenuApp:pe,HeaderApp:ye},data(){return{mode:W.Z.get("mode"),data:{},filter:{month:"08"},modal:!1,dashboard:"",loading:!1}},methods:{modeView:function(e){this.mode=e},getSellers:function(e){this.loading=!0,this.filter.month=e,this.data=null,P({method:"GET",url:"agerv/dashboard/seller",headers:{Authorization:"Bearer "+W.Z.get("token")},params:{year:"2022",month:this.filter.month}}).then((e=>{this.data=e.data,this.loading=!1}))},modalView:function(e){this.modal=!0,this.dashboard=e}},mounted(){this.getSellers("08")}};const Tt=(0,s.Z)(Wt,[["render",Et],["__scopeId","data-v-215238e0"]]);var Ht=Tt;const Pt=[{path:"/",name:"login",component:B},{path:"/sistemas",name:"SystemApp",component:Oe,beforeEnter:[ta.auth]},{path:"/gerenciamento",name:"PanelDashboard",component:ze,beforeEnter:[ta.auth]},{path:"/ageReport/home",name:"ReportPage",component:aa,beforeEnter:[ta.auth,ta.permission_report]},{path:"/ageRv/comercial/analitico",name:"SalesAnalytics",component:da,beforeEnter:[ta.auth,ta.permission_rv]},{path:"/ageRv/comercial/vendas",name:"SalesPage",component:Ht,beforeEnter:[ta.auth,ta.permission_rv]}],Ut=(0,u.p7)({history:(0,u.PO)(),routes:Pt});var Ot=Ut,Bt=t(65),Nt=(0,Bt.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});(0,l.ri)(r).use(Nt).use(Ot).mount("#app")},4642:function(e,a,t){e.exports=t.p+"img/age_orange.57916d66.png"}},a={};function t(l){var n=a[l];if(void 0!==n)return n.exports;var o=a[l]={exports:{}};return e[l](o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(a,l,n,o){if(!l){var s=1/0;for(c=0;c<e.length;c++){l=e[c][0],n=e[c][1],o=e[c][2];for(var i=!0,d=0;d<l.length;d++)(!1&o||s>=o)&&Object.keys(t.O).every((function(e){return t.O[e](l[d])}))?l.splice(d--,1):(i=!1,o<s&&(s=o));if(i){e.splice(c--,1);var r=n();void 0!==r&&(a=r)}}return a}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[l,n,o]}}(),function(){t.n=function(e){var a=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(a,{a:a}),a}}(),function(){t.d=function(e,a){for(var l in a)t.o(a,l)&&!t.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:a[l]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(a){return 0===e[a]};var a=function(a,l){var n,o,s=l[0],i=l[1],d=l[2],r=0;if(s.some((function(a){return 0!==e[a]}))){for(n in i)t.o(i,n)&&(t.m[n]=i[n]);if(d)var c=d(t)}for(a&&a(l);r<s.length;r++)o=s[r],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(c)},l=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];l.forEach(a.bind(null,0)),l.push=a.bind(null,l.push.bind(l))}();var l=t.O(void 0,[998],(function(){return t(5959)}));l=t.O(l)})();
//# sourceMappingURL=app.76250fc9.js.map