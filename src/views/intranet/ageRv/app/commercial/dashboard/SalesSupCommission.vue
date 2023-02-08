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
        <template v-if="stage === 'supervisor'">
          <div id="filters">
            <div id="month">
              <span :class="{ 'selectMonth' : month === '11' && mode === 'light',
                              'selectMonthDark' : month === '11' && mode === 'dark' }" @click="getAnalytic('11'), month = '11', year = '2022'">Novembro</span>
              <span :class="{ 'selectMonth' : month === '12' && mode === 'light',
                              'selectMonthDark' : month === '12' && mode === 'dark' }" @click="getAnalytic('12'), month = '12', year = '2022'">Dezembro</span>
            <span :class="{ 'selectMonth' : month === '01' && mode === 'light',
                              'selectMonthDark' : month === '01' && mode === 'dark' }" @click="getAnalytic('01'), month = '01', year = '2023'">Janeiro</span>
            </div>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Nome</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas D-7</span>
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
          <div class="container-body" v-if="loading === false">
            <template v-for="(item, key) in data" :key="key">
              <div class="items-body">
                <div class="item" style="justify-content: flex-start">
                  <span>{{ item.name }}</span>
                </div>
                <div class="item">
                  <span>{{ item.sales.count }}</span>
                </div>
                <div class="item">
                  <span>{{ item.meta }}</span>
                </div>
                <div class="item">
                  <span>{{ item.metaPercent }}%</span>
                </div>
                <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.cancel.count > 0">
                  {{ item.cancel.count }}
                </span>
                  <span v-else>{{ item.cancel.count }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.stars }}</span>
                  <span v-else>{{ item.stars }}</span>
                </div>
                <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                  <span v-else>{{ item.valueStar }}</span>
                </div>
                <div class="item">
                <span v-if="item.mediator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.mediator }}%
                </span>
                  <span v-else-if="item.mediator === -10 && item.commission !== '0,00'"
                        style="background-color: #911515; color: #fff;">
                  {{ item.mediator }}%
                </span>
                  <span v-else>{{ item.mediator }}%</span>
                </div>
                <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                  <span v-else>R${{ item.commission }}</span>
                </div>
                <div class="item">
                  <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'collaborators')"></i>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-if="stage === 'collaborators'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <button @click="stage = 'supervisor', search = ''">Voltar</button>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Colaborador</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas D-7</span>
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
            <div class="items-body" v-for="(item, key) in CollaboratorsFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.name }}</span>
              </div>
              <div class="item">
                <span>{{ item.sales.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.cancel.count > 0">
                  {{ item.cancel.count }}
                </span>
                <span v-else>{{ item.cancel.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.stars }}</span>
                <span v-else>{{ item.stars }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.mediator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.mediator }}%
                </span>
                <span v-else-if="item.mediator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.mediator }}%
                </span>
                <span v-else>{{ item.mediator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item">
                <i class="fi fi-rr-info" @click="extractView(item)"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div id="modal" v-if="extract.status === true">
    <div id="card-modal">
      <ExtractView
          :items="extract.data"
          :mode="mode"
          @close-page="closePage()"
      />
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import {mapGetters} from "vuex";
import ExtractView from "@/components/ageRv/dashboards/ExtractView";

export default {
  name: "SalesSupCommission",
  components: {
    MenuApp,
    HeaderApp,
    ExtractView
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      loading: true,
      data: {},
      dataStage: {},
      month: '11',
      year: '2022',
      stage: 'supervisor',
      search: '',
      extract: {
        status: false,
        data: {},
      }
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getAnalytic: function (month) {

      this.loading = true
      this.data = {}

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics/payment',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          month:  month,
          year: this.year
        }
      }).then((res) => {
        this.loading = false
        this.data = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    getMonth: function () {
      const date = new Date()

      if ((date.getMonth() + 1) < 10) {
        this.month = '0' + (date.getMonth() + 1)
      } else {
        this.month = (date.getMonth() + 1).toString()
      }

      this.getAnalytic(this.month)
    },
    closePage: function () {
      this.extract.status = false
      this.extract.stage = null
    },
    tradeStage: function (data, type) {
      this.stage = type
      this.dataStage = data
    },
    extractView: function (item) {
      this.extract.status = true
      this.extract.data = item
    },
  },
  computed: {
    ...mapGetters(['permissions']),
    CollaboratorsFiltered: function () {
      let values = []
      values = this.dataStage.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  },
  mounted() {
    this.getMonth()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  @include flex(column, flex-start, initial, 0vh);

  #filters {
    width: 100%;
    height: 10%;
    @include flex(row, flex-start, center, 15px);

    button {
      padding: 7px 30px;
      border-radius: 3px;
      font-weight: 600;
      @include tr-p;
    }

    input[type=text] {
      width: 25%;
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
      border: none;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      &:focus {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
    }

    #month {
      @include flex(row, flex-start, center, 5px);
      span {
        font-size: 1.4rem;
        border-radius: 5px;
        padding: 5px 10px;
        @include tr-p;

      }
    }

    .selectMonth {
      color: #fff !important;
      background-color: $age-bl !important;
      border: 1px solid $age-bl !important;

      &:hover {
        opacity: .9;
      }
    }
  }

  .items-header {
    @include table-card-headers;
  }

  .container-body {
    @include table-card-body;
  }
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;

  button {
    background-color: $age-bl;
    color: #fff;
    border: 1px solid $age-bl;

    &:hover {
      border: 1px solid $age-bl;
      background-color: #fff;
      color: $age-bl;
    }
  }

  #month {
    @include flex(row, flex-start, center, 5px);
    span {
      font-size: 1.4rem;
      border-radius: 5px;
      background-color: #fff;
      color: $age-bl;
      border: 1px solid $age-bl;
      padding: 5px 10px;
      @include tr-p;

      &:hover {
        background-color: $age-bl;
        color: #fff;
      }
    }
  }
}

.mode-d-p {
  background-color: #161819;
  @include tr;

  button {
    background-color: $age-or;
    color: #fff;
    border: 1px solid $age-or;

    &:hover {
      border: 1px solid $age-or;
      background-color: $md-back-l;
      color: $age-or;
    }
  }


  input[type=text] {
    background-color: $md-back-l !important;
    border: 1px solid $age-or !important;
    color: #fff;
  }

  /*   PLACEHOLDER   */
  ::-webkit-input-placeholder {
    color: $ml-text-light !important;
    font-weight: 600;
    font-size: 1.4rem;
  }


  .items-body {
    background-color: $md-back-l !important;
    border-color: $md-back-l !important;

    &:hover {
      border-color: $age-or !important;
    }

    .item {
      span {
        color: #fff !important;
      }
    }
  }

  #month {
    span {
      background-color: $md-back-l;
      border: 1px solid $age-or;
      color: $age-or;
    }
  }

  .selectMonthDark {
    background-color: $age-or !important;
    color: #fff !important;
  }
}

.loading-bar {
  @include bar;
}

#modal {
  #card-modal {
    width: 95vw;
    height: 95vh;
    background-color: $back-main;
  }
}
</style>