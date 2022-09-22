<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageRv'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <template v-if="stage === 'supervisors'">
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body">
              <div class="item" style="justify-content: flex-start">
                <span>Carlos</span>
              </div>
              <div class="item">
                <span>201</span>
              </div>
              <div class="item">
                <span>548</span>
              </div>
              <div class="item">
                <span>100%</span>
              </div>
              <div class="item">
                <span>54</span>
              </div>
              <div class="item">
                <span>2000</span>
              </div>
              <div class="item">
                <span>R$4.5</span>
              </div>
              <div class="item">
                <span>10%</span>
              </div>
              <div class="item">
                <span>R$5242.20</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info" @click="extractView('supervisor', item)"></i>
                <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'sellers')"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";

export default {
  name: "SimulatorPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      stage: 'supervisors'
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

.items-header {
  @include table-card-headers;
}

.container-body {
  @include table-card-body;
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}

</style>