<template>
  <template v-if="stage === 'channels' && !extract.status">
    <div id="filters">
      <input type="text"
             name="search"
             id="search"
             autocomplete="off"
             placeholder="Pesquisar"
             v-model="search">
    </div>
    <div class="items-header">
      <div class="item" style="justify-content: flex-start; width: 80%">
        <span>Canal</span>
      </div>
      <div class="item">
        <span>Ações</span>
      </div>
    </div>
    <div class="container-body" v-if="loading === false">
      <template v-for="(item, key) in ChannelsFiltered" :key="key">
        <div class="items-body">
          <div class="item" style="justify-content: flex-start; width: 80%">
            <span>{{ item.name }}</span>
          </div>
          <div class="item">
            <i class="fi fi-rr-users" @click="tradeStage(item.collaborators, 'collaborators')"></i>
          </div>
        </div>
      </template>
    </div>
  </template>
  <template v-if="stage === 'collaborators'  && !extract.status">
    <div id="filters">
      <input type="text"
             name="search"
             id="search"
             autocomplete="off"
             placeholder="Pesquisar"
             v-model="search">
      <button @click="stage = 'channels', search = ''">Voltar</button>
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
          <span>{{ item.metaPercent.toFixed(2) }}%</span>
        </div>
        <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.cancel.count > 0">
                  {{ item.cancel.count }}
                </span>
          <span v-else>{{ item.cancel.count }}</span>
        </div>
        <div class="item">
          <span style="background-color: #FEA11D; color: #fff" v-if="item.commission > 0">{{ item.stars }}</span>
          <span v-else>{{ item.stars }}</span>
        </div>
        <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission > 0">R${{ item.valueStar }}
                </span>
          <span v-else>{{ item.valueStar.toFixed(2) }}</span>
        </div>
        <div class="item">
                <span v-if="item.mediator === 10 && item.commission > 0"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.mediator }}%
                </span>
          <span v-else-if="item.mediator === -10 && item.commission > 0"
                style="background-color: #911515; color: #fff;">
                  {{ item.mediator }}%
                </span>
          <span v-else>{{ item.mediator }}%</span>
        </div>
        <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission > 0">R${{ item.commission.toFixed(2) }}</span>
          <span v-else>R$ {{ item.commission.toFixed(2) }}</span>
        </div>
        <div class="item">
          <i class="fi fi-rr-info" @click="extractView( item)"></i>
        </div>
      </div>
    </div>
  </template>
  <ExtractView
      :items="extract.data"
      :mode="mode"
      @close-page="closePage()"
      v-if="extract.status"
  />
</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import {mapGetters, mapMutations} from "vuex";
import ExtractView from "@/components/ageRv/dashboards/ExtractView";

export default {
  name: "SalesAnalytics",
  components: {
    ExtractView
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      loading: true,
      data: {},
      dataStage: {},
      month: '',
      year: '2023',
      stage: 'channels',
      search: '',
      extract: {
        status: false,
        data: {},
      }
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ]),
    modeView: function (mode) {
      this.mode = mode
    },
    getAnalytic: function () {

      this.loading = true
      this.data = {}
      this.getMonth()

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics/payment',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          month: this.month,
          year: this.year
        }
      }).then((res) => {
        this.loading = false
        this.data = res.data
        this.SAVE_SYSTEM({loading:false})

      }).catch((error) => {
        console.log(error)
      })
    },
    getMonth: function () {
      const date = new Date()
      if (date.getMonth() < 10) {
        this.month = '0' + (date.getMonth() - 1)
      } else {
        this.month = (date.getMonth() + 1).toString()
      }

      return this.month
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
    ChannelsFiltered: function () {
      let values = []
      values = this.data.channels.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
    CollaboratorsFiltered: function () {
      let values = []

      values = this.dataStage.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })

      values = values.sort((a, b) => {
        if (a.isCommissionable && !b.isCommissionable) {
          return -1;
        } else if (!a.isCommissionable && b.isCommissionable) {
          return 1;
        } else {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
        }

        return 0
      })

      console.log(values)

      return values
    },
  },
  mounted() {
    this.getAnalytic()
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

.mode-dark {
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