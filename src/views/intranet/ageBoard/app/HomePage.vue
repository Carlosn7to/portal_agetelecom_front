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
        <h1>TakeBlip</h1>
        <div class="divisor">
          <div></div>
        </div>
        <div class="items">
          <div class="item" @click="modalIframe('https://app.powerbi.com/view?r=eyJrIjoiMWY2NjMzMDctYjYzYS00YjI5LWI5OTktNTc0M2FjNGIzODVmIiwidCI6ImNlYWFmNTNlLTM3YzEtNDBjMy04YjNiLTE1ZmU3YjZhMmJmNCJ9')">
            <i class="fi fi-rr-chart-pie"></i>
            <span>Relatório Geral</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal" v-if="modal.status === true">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Relatório geral</h1>
      <iframe width="100%" height="80%" :src="modal.iframe" frameborder="0" allowfullscreen="true" data-v-400bb1ba=""></iframe>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true">
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";

export default {
  name: "HomePage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      modal: {
        status: false,
        iframe: null
      },
      loading: false
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    modalIframe: function (iframe) {
      this.modal.status = true
      this.modal.iframe = iframe
      this.loading = false
    },
    closePage: function () {
      this.modal.status = false
      this.modal.iframe = null
      this.loading = false
    }
  },
  mounted() {
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
  .item {
    padding: 5vh 2vw;
    border-radius: 10px;
    background-color: #fff;
    color: $age-bl;
    text-align: center;
    word-break: break-word;
    @include flex(column, center, center, 10px);
    @include tr-p;
    @include sh-h;


    i {
      font-size: 3rem;
      color: $age-or;
    }

    span {
      font-size: 1.4rem;
      font-weight: 500;
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
}

</style>