<template>
  <nav>
    <ul>
      <li :class="{ 'active-route' : menu.selected === 'home' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'home', stage: 'decrease'})">
          <router-link to="/ageReport/home" active-class="active-route">
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
      <li :class="{ 'active-route' : menu.selected === 'management' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'management', stage: 'decrease'})" v-if="permissions.function === 'Admin' || permissions.function === 'Master'">
          <router-link to="/ageReport/gerenciamento" active-class="active-route">
            <div class="item-menu">
              <div class="title-icon">
                <i class="fi fi-rr-settings-sliders"></i>
                <span>Gerenciamento</span>
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
  name: "SubMenuAgeReport",
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