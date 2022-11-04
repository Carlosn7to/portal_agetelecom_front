<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageBoard'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <template v-if="page.stage === 'all'">
          <div :class="{ 'animation-right' : page.back === true}" v-for="item in data" :key="item.id">
            <h1>{{ item.dashboard }}</h1>
            <div class="divisor">
              <div></div>
            </div>
            <div class="items">
              <div class="item"
                   v-for="item in item.itens" :key="item.id"
                   @click="pageIframe(item.item, item.iframe)">
                <div class="name">
                  <i class="fi fi-rr-chart-pie"></i>
                  <span>{{ item.item }}</span>
                </div>
                <div class="more">
                  <i class="fi fi-rr-arrow-square-right"></i>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div v-if="page.stage === 'view'" class="view animation-left">
          <div class="header">
            <i class="fi fi-rr-arrow-square-left" @click="closePage"></i>
            <h1>{{ page.name }}</h1>
          </div>
          <div class="divisor">
            <div></div>
          </div>
          <iframe width="100%"
                  height="90%"
                  :src="page.iframe" frameborder="0" allowfullscreen="true">
          </iframe>
        </div>
      </div>

    </div>
  </div>
  <div class="loading-bar" v-if="loading === true">
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";

export default {
  name: "HomePage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      page: {
        status: false,
        iframe: null,
        name: '',
        stage: 'all',
        back: false,
      },
      data: {},
      loading: false,
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    pageIframe: function (name, iframe) {
      this.page.status = true
      this.page.name = name
      this.page.iframe = iframe
      this.page.stage = 'view'
      this.loading = false
    },
    closePage: function () {
      this.page.back = true
      this.page.stage = 'all'
      this.page.status = false
      this.page.iframe = null
      this.loading = false
    },
    getBoards: function () {
      AXIOS({
        method: 'GET',
        url: '/ageboard/dashboards',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.data = res.data
      })
    }
  },
  mounted() {
    this.getBoards()
  }
}
</script>

<style scoped lang="scss">

.divisor {
  width: 100%;
  height: 2px;
  @include flex(row, flex-start, center, 0);
  margin: 2vh 0;

  div {
    background-color: #cccccc90;
    height: 100%;
    width: 100%;
  }
}

.items {
  @include flex(row, flex-start, initia, 2vh);
  flex-wrap: wrap;
  padding: 2vh 0;
  margin-bottom: 2vh;
  .item {
    padding: 2vh 2vw;
    width: 100%;
    border-radius: 5px;
    border: 2px solid transparent;
    background-color: #fff;
    color: $age-bl;
    @include flex(row, space-between, center, 0);
    @include tr-p;
    @include sh-h;


    .name {
      @include flex(row, flex-start, center, 10px);

      i {
        font-size: 3rem;
        color: $age-or;
      }

      span {
        font-size: 1.4rem;
        font-weight: 500;
        padding-bottom: 6px;
      }
    }

    .more {
      font-size: 2rem;
      color: $age-or;
      @include tr-p;

      &:hover {
        color: $age-bl;
      }
    }
  }
}

.view {
  height: 100%;

  .header {
    @include flex(row, flex-start, center, 5px);

    i {
      font-size: 2rem;
      color: $age-bl;
      @include tr-p;

      &:hover {
        color: $age-or;
      }
    }

    h1 {
      padding-bottom: 5px;
    }
  }
}

#modal {
  #card-modal {
    width: 90vw;
    height: 90vh;

    h1 {
      text-align: center;
      font-size: 3rem;
      color: $age-bl;
    }

    iframe {
      margin: 2vh auto;
    }
  }
}

.loading-bar {
  @include bar;
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
  h1 {
    color: $md-text-h1 !important;
  }

  .items {

    .item {
      background-color: $md-back-l;
      &:hover {
        border-color: $age-or;
      }

      .name {
        span {
          color: $md-text-light;
        }
      }

      .more {
        i {
          @include tr-p;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }

  .view {

    .header {
      i {
        color: $age-or;
        @include tr-p;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}

.animation-left {
  animation: left forwards ease-in-out .4s;
}

@keyframes left {
  from {
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

.animation-right {
  animation: right forwards ease-in-out .4s;
}

@keyframes right {
  from {
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>