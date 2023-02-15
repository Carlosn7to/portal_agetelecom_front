<template>
  <nav>
    <ul>
      <li :class="{ 'active-route' : menu.selected === 'home' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'home', stage: 'decrease'})">
          <router-link to="/agerv/home" active-class="active-route">
            <div class="item-menu">
              <div class="title-icon">
                <i class="fi fi-rr-home"></i>
                <span>Home</span>
              </div>
            </div>
          </router-link>
          <div class="border-nav">
          </div>
        </div>
      </li>
      <li :class="{ 'active-route' : menu.selected === 'sales' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'sales', stage: 'decrease'})">
          <router-link to="/ageRv/comercial/vendas/dashboard" active-class="active-route">
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
              <router-link to="/ageControle" active-class="active-router">
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
          <li>
            <div class="container-items">
              <router-link to="/ageControle/" active-class="active-route">
                <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Regra de negócio</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
          <li>
            <div class="container-items">
              <router-link to="/ageControle/" active-class="active-route">
                <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Permissões</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>

        </ul>
      </li>
      <li :class="{ 'active-route' : menu.selected === 'commission' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'commission', stage: 'decrease'})" v-if="permissions.function === 'Financeiro' || permissions.function === 'Gerente geral'">
          <router-link to="/ageRv/comercial/comissao" active-class="active-route">
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
      'SAVE_MENU'
    ])
  },
  computed: {
    ...mapGetters([
      'menu',
        'permissions'
    ]),
  },
  mounted() {}
}
</script>

<style scoped>

</style>