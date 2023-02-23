<template>
  <nav>
    <ul>
      <li :class="{ 'active-route' : menu.selected === 'home' }">
        <div class="container-items">
          <router-link @click="[loadingPage(),
                                SAVE_MENU({selected: 'home', stage: 'decrease'})]"
                       to="/ageboard/home" active-class="active-route">
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
      <li :class="{ 'active-route' : menu.selected === 'management' }"
          v-if="permissions.function === 'Admin' || permissions.function === 'Master'">
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
              <router-link to="/ageboard/gerenciamento/usuarios"
                           active-class="active-route-submenu"
                           @click="[loadingPage(),
                                SAVE_MENU({stage: 'decrease'})]">
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
              <router-link to="/ageboard/gerenciamento/dashboards"
                           active-class="active-route-submenu"
                           @click="[loadingPage(),
                                SAVE_MENU({stage: 'decrease'})]">
                <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Dashboards</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";


export default {
  name: "SubMenuAgeBoard",
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