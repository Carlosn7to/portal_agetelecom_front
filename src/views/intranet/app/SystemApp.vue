<template>
  <div id="content-app">
    <MenuApp
      :mode="mode"
      :system="'portal'"
    />
    <div id="layer-app">
      <HeaderApp
        @mode="modeView"
      />
      <div id="content-page"
         :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <div class="systems-on">
          <h1>Sistemas</h1>
          <div id="systems">
          </div>
        </div>
        <div class="systems-on">
          <h1>Em desenvolvimento</h1>
          <div id="systems">
            <router-link to="/ageReport/home" @click="loading = true">
              <div class="system">
                <div class="img-title">
                  <i class="fi fi-rr-document"></i>
                  <span>Relatórios</span>
                </div>
                <p>
                  Relatórios e planilhas.
                </p>
              </div>
            </router-link>
            <router-link to="/ageRv/home" @click="loading = true">
              <div class="system">
                <div class="img-title">
                  <i class="fi fi-rr-star"></i>
                  <span>AgeRV</span>
                </div>
                <p>
                  Vendas e comissionamento.
                </p>
              </div>
            </router-link>
            <router-link to="/sistemas" @click="loading = true">
              <div class="system">
                <div class="img-title">
                  <i class="fi fi-rr-stats"></i>
                  <span>Indicadores</span>
                </div>
                <p>
                  Dashboards.
                </p>
              </div>
            </router-link>
          </div>
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

export default {
  name: "SystemApp",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      loading: false
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

#content-page {
  @include flex(column, flex-start, initial, 5vh);



  .systems-on {
    width: 100%;
    padding: 1vh 1vw;
    #systems {
      padding: 1vh 0;
      width: 100%;
      height: 100%;
      @include flex(row, flex-start, initial, 10px);

      a {
        @include container(calc(100% / 4), initial, 1vh 2vw, #fff);
        @include flex(column, center, initial, 5px);
        border-radius: 5px;
        @include sh-h;
        @include tr;
        border: 1px solid #fff;

        .img-title {
          width: 100%;
          @include flex(row, flex-start, center, 10px);
          i {
            font-size: 3rem;
            color: $age-or;
          }
          span {
            font-size: 2rem;
            color: $age-bl;
            font-weight: 500;
            padding-bottom: 6px;
          }
        }

        p {
          text-align: justify-all;
          font-size: 1.2rem;
          font-weight: 400;
          color: $ml-text-menu;
          margin: 1.5vh 0;
          width: 100%;
        }

        a {
          font-weight: 600;
          color: #fff;
          background-color: $age-bl;
          padding: 5px 12px;
          border-radius: 5px;
          border: 1px solid #fff;
          @include tr-p;
          @include flex(row, center, center, 5px);

          span {
            padding-bottom: 3px;
            font-size: 1.4rem;
          }

          i {
            font-size: 1.6rem;
          }

          &:hover {
            color: $age-or;
            background-color: #fff;
            border: 1px solid $age-or;
          }

        }


      }
    }
  }
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;

  h1 {
    color: $md-text-light !important;
  }

  .systems-on {
    #systems {
      a {
        background-color: $md-back-l !important;
        border: 2px solid $md-back-l !important;
        &:hover {
          border: 2px solid $age-or !important;
        }

        .img-title {
          span {
            color: $md-text-light !important;
          }
        }

        p {
          color: $md-text-op !important;
        }

        a {
          background-color: $age-or !important;
          border: 1px solid $age-or !important;
          color: $md-button !important;

          &:hover {
            background-color: $md-back-l !important;
            border-color: $age-or !important;
            color: #fff !important;
          }
        }
      }
    }
  }
}

.loading-bar {
  @include bar;
}

</style>