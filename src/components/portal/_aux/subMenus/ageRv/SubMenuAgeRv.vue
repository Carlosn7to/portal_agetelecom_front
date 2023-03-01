<template>
  <nav>
    <ul>
<!--      <li :class="{ 'active-route' : menu.selected === 'home' }">-->
<!--        <div class="container-items">-->
<!--          <router-link @click="[loadingPage(),-->
<!--                                SAVE_MENU({selected: 'home', stage: 'decrease'})]" to="/agerv/home" active-class="active-route">-->
<!--            <div class="item-menu">-->
<!--              <div class="title-icon">-->
<!--                <i class="fi fi-rr-home"></i>-->
<!--                <span>Home</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--          <div class="border-nav">-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
      <li :class="{ 'active-route' : menu.selected === 'sales' }"
          v-if="permissions.function === 'Vendedor' || permissions.function === 'Supervisor'">
        <div class="container-items">
          <router-link  @click="[loadingPage(), SAVE_MENU({selected: 'sales', stage: 'decrease'})]" to="/ageRv/comercial/vendas/dashboard" active-class="active-route">
            <div class="item-menu">
              <div class="title-icon">
                <i class="fi fi-rr-handshake"></i>
                <span>Vendas</span>
              </div>
            </div>
          </router-link>
          <div class="border-nav">
          </div>
        </div>
      </li>
<!--      <li :class="{ 'active-route' : menu.selected === 'dashboard-sales' }"-->
<!--          v-if="permissions.function === 'Vendedor' || permissions.function === 'Supervisor'">-->
<!--        <div class="container-items">-->
<!--          <router-link  @click="[loadingPage(), SAVE_MENU({selected: 'dashboard-sales', stage: 'decrease'})]" to="/ageRv/comercial/vendas/dashboard/extrato"-->
<!--                        active-class="active-route">-->
<!--            <div class="item-menu">-->
<!--              <div class="title-icon">-->
<!--                <i class="fi fi-rr-chart-histogram"></i>-->
<!--                <span>Dashboard</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--          <div class="border-nav">-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
      <li :class="{ 'active-route' : menu.selected === 'management' }" v-if="permissions.function === 'Admin' || permissions.function === 'Master'">
        <div class="container-items"
             @click="SAVE_MENU({selected: 'management', stage: 'increase'})">
          <div class="item-menu">
            <div class="title-icon">
              <i class="fi fi-rr-settings-sliders"></i>
              <span>Gerenciamento</span>
            </div>
            <i class="fi fi-br-angle-right" v-if="menu.selected !== 'management'"></i>
            <i class="fi fi-br-angle-down" v-if="menu.selected === 'management'"></i>
          </div>
          <div class="border-nav">
          </div>
        </div>
        <ul :class="{ 'selected' : menu.selected === 'management' }">
          <li>
            <div class="container-items">
              <router-link to="/ageRv/comercial/gerenciamento"
                           active-class="active-route-submenu"
                           @click="loadingPage">
              <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Usuários</span>
                  </div>
                </div>

              </router-link>
            </div>
          </li>
        </ul>
      </li>
      <li :class="{ 'active-route' : menu.selected === 'commission' }">
        <div class="container-items" v-if="permissions.function === 'Financeiro' || permissions.function === 'Gerente geral'">
          <router-link @click="[loadingPage(), SAVE_MENU({selected: 'commission', stage: 'decrease'})]"  to="/ageRv/comercial/comissao" active-class="active-route">
            <div class="item-menu">
              <div class="title-icon">
                <i class="fi fi-rr-usd-square"></i>
                <span>Comissão</span>
              </div>
            </div>
          </router-link>
          <div class="border-nav">
          </div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";


export default {
  name: "SubMenuAgeRv",
  data() {
    return {}
  },
  methods: {
    ...mapMutations([
      'SAVE_MENU',
        'SAVE_SYSTEM'
    ]),
    loadingPage: function () {
      this.SAVE_SYSTEM({loading: true})
    }
  },
  computed: {
    ...mapGetters([
      'menu',
        'permissions'
    ]),
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>