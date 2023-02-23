<template>
  <template v-if="page.stage === 'all'">
    <div v-for="item in data" :key="item.id">
      <h1>{{ item.dashboard }}</h1>
      <div class="divisor">
        <div></div>
      </div>
      <div class="items">
        <div class="item"
             v-for="(item, index) in item.itens" :key="item.id"
             @click="pageIframe(item.item, item.iframe)"
              :style="'animation-delay: '+index * 0.3+'s'">
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
            height="80%"
            :src="page.iframe" frameborder="0" allowfullscreen="true">
    </iframe>
  </div>
</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";
import {mapMutations} from "vuex";

export default {
  name: "HomePage",
  components: {
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
    ...mapMutations([
       'SAVE_SYSTEM',
        'SAVE_MENU'
    ]),
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
        this.SAVE_SYSTEM({loading:false})
      })
    }
  },
  mounted() {
    this.getBoards()
    this.SAVE_MENU({system: 'ageboard', selected: 'home'})
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style scoped lang="scss">

.divisor {
  width: 100%;
  height: 2px;
  @include flex(row, flex-start, center, 0);
  margin: 2vh 0;
  animation: up forwards ease-in-out .2s;


  div {
    background-color: #cccccc90;
    height: 100%;
    width: 100%;
  }
}

h1 {
  animation: up forwards ease-in-out .2s;
}

.items {
  @include flex(row, flex-start, initia, 2vh);
  flex-wrap: wrap;
  padding: 2vh 5px;
  margin-bottom: 2vh;
  overflow: hidden;

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
    animation: left forwards ease-in-out .5s;
    opacity: 0;


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

.mode-dark {
  background-color: $dark-mode-background;
  @include tr;
  h1 {
    color: $md-text-h1 !important;
  }

  .items {

    .item {
      background-color: $dark-mode-card;


      &:hover {
        border-color: $primary;
      }

      .name {
        i {
          color: $primary;
        }

        span {
          color: $md-text-light;
        }
      }

      .more {
        i {
          @include tr-p;
          color: $primary;
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
        color: $primary;
        @include tr-p;

        &:hover {
          color: #fff;
        }
      }
    }
  }
}


</style>