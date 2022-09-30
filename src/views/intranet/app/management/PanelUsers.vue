<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'portal-mng'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <div class="section">
          <h1>Usuários</h1>
          <div class="list">
            <div class="list-header">
              <div class="item-list-header">
                Nome
              </div>
              <div class="item-list-header">
                E-mail
              </div>
              <div class="item-list-header">
                AD
              </div>
              <div class="item-list-header">
                Nível de acesso
              </div>
              <div class="item-list-header">
                Status
              </div>
              <div class="item-list-header">
                Primeiro login
              </div>
            </div>
            <div class="list-body">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";

export default {
  name: "PanelUsers",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode')
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

#content-page {
  .section {
    padding: 1vh 1vw;
  }
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