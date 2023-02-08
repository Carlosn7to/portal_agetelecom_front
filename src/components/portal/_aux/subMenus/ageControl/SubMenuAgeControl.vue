<template>
  <nav>
    <ul>
      <li :class="{ 'active-route' : menu.selected === 'dash' }">
        <div class="container-items" @click="SAVE_MENU({system: 'agecontrol', selected: 'dash', stage: 'increase'})">
          <div class="item-menu">
            <div class="title-icon">
              <i class="fi fi-br-chart-pie"></i>
              <span>Dashboards</span>
            </div>
            <i class="fi fi-br-angle-right" v-if="menu.selected !== 'dash'"></i>
            <i class="fi fi-br-angle-down" v-if="menu.selected === 'dash'"></i>
          </div>
          <div class="border-nav">
          </div>
        </div>
        <ul :class="{ 'selected' : menu.selected === 'dash' }">
          <li>
            <div class="container-items">
              <router-link to="/ageControle/home" active-class="active-router">
                <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Relatos</span>
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
                    <span>Relatos</span>
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
                    <span>Relatos</span>
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
                    <span>Relatos</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>

        </ul>
      </li>
      <li :class="{ 'active-route' : menu.selected === 'operation' }">
        <div class="container-items"
             @click="SAVE_MENU({system: 'agecontrol', selected: 'operation', stage: 'increase'})">
          <div class="item-menu">
            <div class="title-icon">
              <i class="fi fi-rr-head-side-thinking"></i>
              <span>Operacional</span>
            </div>
            <i class="fi fi-br-angle-right" v-if="menu.selected !== 'operation'"></i>
            <i class="fi fi-br-angle-down" v-if="menu.selected === 'operation'"></i>
          </div>
          <div class="border-nav">
          </div>
        </div>
        <ul :class="{ 'selected' : menu.selected === 'operation' }">
          <li>
            <div class="container-items">
              <router-link to="/ageControle" active-class="active-router">
                <div class="item-submenu">
                  <div class="title-icon">
                    <div class="icon-submenu">
                      <div>

                      </div>
                    </div>
                    <span>Relatos</span>
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
                    <span>Relatos</span>
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
                    <span>Relatos</span>
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
                    <span>Relatos</span>
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
  name: "SubMenuAgeControl",
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
      'menu'
    ]),
  },
  mounted() {
    console.log(this.menu)
  }
}
</script>

<style scoped>

</style>