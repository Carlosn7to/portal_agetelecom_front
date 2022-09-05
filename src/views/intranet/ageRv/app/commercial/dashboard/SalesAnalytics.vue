<template>
  <div class="loading-bar" v-if="loading === true">
  </div>
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

      </div>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";

export default {
  name: "SalesAnalytics",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      loading: true
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getAnalytic: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/analytics',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        console.log(res.data)
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getAnalytic()
  }
}
</script>

<style scoped lang="scss">


.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}

.loading-bar {
  @include bar;
}

</style>