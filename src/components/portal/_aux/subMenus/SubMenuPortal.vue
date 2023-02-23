<template>
  <nav>
    <ul>
      <li :class="{ 'active-route' : menu.selected === 'home' }">
        <div class="container-items" @click="SAVE_MENU({selected: 'home', stage: 'decrease'})">
          <router-link to="/sistemas" active-class="active-route">
            <div class="item-menu">
              <div class="title-icon">
                <i class="fi fi-rr-apps-add"></i>
                <span>Home</span>
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
  name: "SubMenuPortal",
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