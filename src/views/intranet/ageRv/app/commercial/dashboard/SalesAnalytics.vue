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

        <template v-if="stage === 'channels'">
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Canal</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <template v-for="(item, key) in data.channels" :key="key">
              <div class="items-body">
                <div class="item" style="justify-content: flex-start">
                  <span>{{ item.channel }}</span>
                </div>
                <div class="item">
                  <span>{{ item.salesTotal.count }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #F44336; color: #fff">{{ item.salesCancelled.count }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #FEA11D; color: #fff">{{ item.starsTotal }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #24A527; color: #fff">R${{ item.commission }}</span>
                </div>
                <div class="item">
                  <i class="fi fi-rr-users" @click="tradeStage(item.supervisors, 'supervisors')"></i>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-if="stage === 'supervisors'">
          <button @click="stage = 'channels'">Voltar</button>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in dataStage.supervisors" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.supervisor }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info"></i>
                <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'sellers')"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="stage === 'sellers'">
          <button @click="stage = 'supervisors'">Voltar</button>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Vendedor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in dataStage.sellers" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.seller }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item">
                <i class="fi fi-rr-info"></i>
              </div>
            </div>
          </div>
        </template>
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
      loading: true,
      data: {},
      dataStage: {
        channels: {},
        supervisors: {},
        sellers: {}
      },
      stage: ''
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
        this.data = res.data
        this.stage = 'channels'
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    tradeStage: function (data, type) {
      if(type === 'channels') {
        this.dataStage.channels = data
      }

      if(type === 'supervisors') {
        this.dataStage.supervisors = data
      }

      if(type === 'sellers') {
        this.dataStage.sellers = data
      }

      this.stage = type
    }
  },
  mounted() {
    this.getAnalytic()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  @include flex(column, flex-start, initial, 0vh);

  button {
    margin-top: 1vh;
    width: 10%;
    height: 5%;
    background-color: $age-bl;
    color: #fff;
    border-radius: 3px;
    font-weight: 600;
    @include tr-p;
    border: 1px solid $age-bl;

    &:hover {
      border: 1px solid $age-bl;
      background-color: #fff;
      color: $age-bl;
    }
  }

  .items-header {
    width: 99.8%;
    height: 12%;
    border-bottom: 2px solid #cccccc40;
    @include flex(row, flex-start, center, 0);
    margin: 1vh 0;

    .item {
      width: 15%;
      height: 80%;
      @include flex(row, center, center, 0);
      padding-left: 1vw;


      span {
        font-size: 1.4rem;
        color: $ml-text-light;
        font-weight: 300;
        letter-spacing: .4px;
      }
    }

    .item:nth-child(1) {
      width: 30%;
    }
  }

  .container-body {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    max-height: 80%;
    @include flex(column, flex-start, initial, 10px);

    .items-body {
      width: 100%;
      min-height: 10%;
      background-color: #fff;
      border: 2px solid #fff;
      border-radius: 3px;
      @include flex(row, flex-start, center, 0);
      @include tr;
      font-weight: 500;

      &:hover {
        border: 2px solid $age-bl;
      }

      .item {
        width: 15%;
        height: 90%;
        @include flex(row, center, center, 5px);
        padding-left: 1vw;

        span {
          font-size: 1.2rem;
          color: $ml-text-menu;
          padding: 5px 10px;
          border-radius: 3px;        }

        i {
          font-size: 2rem;
          color: $ml-text-menu;
          @include tr-p;

          &:hover {
            color: $age-or;
          }
        }
      }

      .item:nth-child(1) {
        width: 30%;
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
}

.loading-bar {
  @include bar;
}

</style>