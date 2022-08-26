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
        <div class="dashboard-commercial">
          <h1>Dashboard de vendas</h1>
          <div class="dashboards">
            <div class="dashboard"
                style="background-color: #FEA11D; cursor: pointer;"
                @click="modalView('stars')">
              <div class="type-value">
                <span>{{ data.stars }}</span>
                <span>Estrelas</span>
              </div>
              <i class="fi fi-ss-star"></i>
            </div>
            <div class="dashboard"
                 style="background-color: #2fa1d0; cursor: pointer;"
                 @click="modalView('salesTotals')">
              <div class="type-value">
                <span>{{ data.salesTotals }}</span>
                <span>Vendas totais</span>
              </div>
              <i class="fi fi-ss-rocket-lunch"></i>
            </div>
            <div class="dashboard" style="background-color: #932b91">
              <div class="type-value">
                <span>{{ data.meta }}</span>
                <span>Meta</span>
              </div>
              <i class="fi fi-rr-chart-histogram"></i>
            </div>
            <div class="dashboard" style="background-color: #F44336">
              <div class="type-value">
                <span>{{ data.cancelTotals }}</span>
                <span>Cancelamentos<br>Totais</span>
              </div>
              <i class="fi fi-ss-delete-document"></i>
            </div>
            <div class="dashboard" style="background-color: #FECA1D">
              <div class="type-value">
                <span>R${{ data.valueStars }}</span>
                <span>Valor da estrela</span>
              </div>
              <i class="fi fi-sr-grin-stars"></i>
            </div>
            <div class="dashboard"
                 style="background-color: #6892d0; cursor: pointer;"
                 @click="modalView('salesAprovation')">
              <div class="type-value">
                <span>{{ data.salesAprovation }}</span>
                <span>Vendas em <br>Aprovação</span>
              </div>
              <i class="fi fi-rr-time-twenty-four"></i>
            </div>
            <div class="dashboard" style="background-color: #983FB5">
              <div class="type-value">
                <span>{{ data.minMeta }}%</span>
                <span>Meta mínima </span>
              </div>
              <i class="fi fi-sr-chart-line-up"></i>
            </div>
            <div class="dashboard"
                 style="background-color: #911515; cursor: pointer;"
                 @click="modalView('cancelD7')">
              <div class="type-value">
                <span>{{ data.cancelD7 }}</span>
                <span>Cancelamento <br> -7 Dias</span>
              </div>
              <i class="fi fi-sr-ban"></i>
            </div>
            <div class="dashboard" style="background-color: #24A527">
              <div class="type-value">
                <span>R${{ data.commission }}</span>
                <span>Comissão</span>
              </div>
              <i class="fi fi-sr-sack-dollar"></i>
            </div>
            <div class="dashboard"
                 style="background-color: #009688; cursor: pointer;"
                 @click="modalView('salesValid')">
              <div class="type-value">
                <span>{{ data.sales }}</span>
                <span>Vendas na base</span>
              </div>
              <i class="fi fi-rr-trophy"></i>
            </div>
            <div class="dashboard" style="background-color: #c571e1">
              <div class="type-value">
                <span>{{ data.metaPercent }}%</span>
                <span>Meta atingida</span>
              </div>
              <i class="fi fi-sr-chart-line-up"></i>
            </div>
            <div class="dashboard" style="background-color: #B3B4B5">
              <div class="type-value">
                <span>{{ data.deflator }}%</span>
                <span>Deflator</span>
              </div>
              <i class="fi fi-sr-settings-sliders"></i>
            </div>
          </div>
        </div>
        <div class="filters">
          <span>Selecione o mês</span>
          <div class="buttons-filter">
            <span :class="{ 'active' : filter.month === '07'}" @click="getSellers('07')">Julho</span>
            <span :class="{ 'active' : filter.month === '08'}" @click="getSellers('08')">Agosto</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal"
       v-if="modal === true"
       :class="{'mode-d-m' : mode === 'dark'}">
    <div id="card-modal" class="stars" v-if="dashboard === 'stars'">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div id="table">
        <h1>Extrato de planos e estrelas</h1>
        <table>
          <thead>
          <tr>
            <th style="text-align: left; width: 50%">Plano</th>
            <th>Quantidade</th>
            <th>Valor da estrela</th>
            <th>Total de estrelas</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in data.extractStars" :key="item.valueStar">
              <td style="text-align: left; width: 50%">{{ item.plan }}</td>
              <td>{{ item.qntd }}</td>
              <td>{{ item.valueStar }}</td>
              <td>{{ item.totals }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="card-modal" class="stars salesTotals" v-if="dashboard === 'salesTotals'">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div id="table">
        <h1>Extrato de todas as vendas instaladas</h1>
        <table>
          <thead>
          <tr>
            <th>Nº contrato</th>
            <th>Nome do cliente</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Situação</th>
            <th>Data do cadastro</th>
            <th>Data da aprovação</th>
            <th>Data da vigência</th>
            <th>Data do cancelamento</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data.extractSalesTotals" :key="item.id">
            <td>{{ item.id_contrato }}</td>
            <td>{{ item.nome_cliente }}</td>
            <td>{{ item.plano }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.situacao }}</td>
            <td>{{ item.data_contrato }}</td>
            <td>{{ item.data_ativacao }}</td>
            <td>{{ item.data_vigencia }}</td>
            <td>{{ item.data_cancelamento }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="card-modal" class="stars salesTotals" v-if="dashboard === 'cancelD7'">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div id="table">
        <h1>Extrato de cancelamentos antes dos 7 dias</h1>
        <table>
          <thead>
          <tr>
            <th>Nº contrato</th>
            <th>Nome do cliente</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Situação</th>
            <th>Data do cadastro</th>
            <th>Data da aprovação</th>
            <th>Data da vigência</th>
            <th>Data do cancelamento</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data.extractCancelsD7" :key="item.id">
            <td>{{ item.id_contrato }}</td>
            <td>{{ item.nome_cliente }}</td>
            <td>{{ item.plano }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.situacao }}</td>
            <td>{{ item.data_contrato }}</td>
            <td>{{ item.data_ativacao }}</td>
            <td>{{ item.data_vigencia }}</td>
            <td>{{ item.data_cancelamento }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="card-modal" class="stars salesAprovation" v-if="dashboard === 'salesAprovation'">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div id="table">
        <h1>Extrato de vendas em aprovação</h1>
        <table>
          <thead>
          <tr>
            <th>Nº contrato</th>
            <th>Nome do cliente</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Situação</th>
            <th>Data do cadastro</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data.extractSalesAprovation" :key="item.id">
            <td>{{ item.id_contrato }}</td>
            <td>{{ item.nome_cliente }}</td>
            <td>{{ item.plano }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.situacao }}</td>
            <td>{{ item.data_contrato }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="card-modal" class="stars salesTotals" v-if="dashboard === 'salesValid'">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div id="table">
        <h1>Extrato de todas as vendas que continuam na base</h1>
        <table>
          <thead>
          <tr>
            <th>Nº contrato</th>
            <th>Nome do cliente</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Situação</th>
            <th>Data do cadastro</th>
            <th>Data da aprovação</th>
            <th>Data da vigência</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data.extractSalesValids" :key="item.id">
            <td>{{ item.id_contrato }}</td>
            <td>{{ item.nome_cliente }}</td>
            <td>{{ item.plano }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.situacao }}</td>
            <td>{{ item.data_contrato }}</td>
            <td>{{ item.data_ativacao }}</td>
            <td>{{ item.data_vigencia }}</td>
          </tr>
          </tbody>
        </table>
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
  name: "SalesPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      data: {},
      filter: {
        month: '08'
      },
      modal: false,
      dashboard: '',
      loading: false
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getSellers: function (month) {

      this.loading = true
      this.filter.month = month
      this.data = null


      AXIOS({
        method: 'GET',
        url: 'agerv/dashboard/seller',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          year: '2022',
          month: this.filter.month
        }
      }).then((res) => {
        this.data = res.data
        this.loading = false
      })
    },
    modalView: function (dash) {
      this.modal = true
      this.dashboard = dash
    }
  },
  mounted() {
    this.getSellers('08')
  }
}
</script>

<style scoped lang="scss">

.loading-bar {
  @include bar;
}

#content-page {
  @include flex(row, space-between, initial, 0px);

  .dashboard-commercial {
    @include container(85%, initial, 1vh 1vw, transparent);

    .dashboards {
      @include container(100%, initial, 1vh 2px, transparent);
      @include flex(row, flex-start, initial, 20px);
      flex-wrap: wrap;

      .dashboard {
        width: calc((100% / 4) - 20px);
        height: 13vh;
        background-color: #fff;
        border-radius: 5px;
        @include sh-h;
        @include tr;
        padding: 2vh 1vw;
        @include flex(row, space-between, center, 0px);

        .type-value {
          @include flex(column, flex-start, initial, 5px);
          color: #fff;
          font-weight: 600;
          span:nth-child(1) {
            font-size: 2rem;
          }

          span:nth-child(2) {
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: .6px;
          }
        }

        i {
          font-size: 4rem;
          color: hsla(0,0%,100%,.502);
        }
      }

    }

  }

  .filters {
    width: 15%;
    height: 17%;
    background-color: #fff;
    margin-top: 6vh;
    border-radius: 5px;
    @include sh;
    @include flex(column, flex-start, center, 10px);
    padding: 2vh 2vw;
    border: 1px solid #fff;

    span {
      font-size: 1.2rem;
      color: $ml-text-light;
      font-weight: 500;
    }

    .buttons-filter {
      @include flex(row, flex-start, center, 10px);
      span {
        font-size: 1.2rem;
        padding: 5px 10px;
        border-radius: 5px;
        color: $age-bl;
        border: 2px solid $age-bl;
        @include tr-p;
      }
    }
    button {
      border: 1px solid $age-bl;
      background-color: $age-bl;
      color: #fff;
      padding: 7px .5vw;
      border-radius: 3px;
      font-weight: 500;
      @include tr-p;
      margin-top: 2vh;

      &:hover {
        background-color: #fff;
        color: $age-bl;
        border: 1px solid $age-bl;
      }
    }

    .active {
        background-color: $age-bl;
        color: #fff !important;
    }
  }
}

.stars {
  width: 60vw;
  #table {
    padding: 2vh 2vw 3vh 2vw;
    h1 {
      font-size: 3rem;
      text-align: center;
      color: $ml-text-menu;
    }
    table {
      @include table;

      th, td {
        text-align: center;
        padding: 0;

      }
    }
  }
}

.salesTotals {
  width: 95vw;

  #table {
    padding: 2vh 1vw 3vh 1vw;

    table {
      th {
        font-size: 1.2rem !important;
        padding: 0 !important;
      }
      td {
        font-size: 1rem !important;
        padding: 0 !important;
      }
    }
  }
}

.salesAprovation {
  width: 70vw;
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;


}

.mode-d-p {
  background-color: #161819;
  @include tr;

  .dashboard {
    &:hover {
      opacity: 0.8 !important;
    }
  }

  h1 {
    color: $md-text-h1 !important;
  }

  .filters {
    background-color: $md-back-l !important;
    border: 1px solid $age-or !important;

    span {
      color: $md-text-menu !important;
    }

    .buttons-filter {
      span {
        color: $age-or !important;
        border-color: $age-or !important;
      }
    }

    .active {
      background-color: $age-or !important;
    }

    button {
      border-color: $age-or !important;
      background-color: $age-or !important;

      &:hover {
        color: $age-or !important;
        border-color: $age-or !important;
        background-color: $md-back-l !important;
      }
    }
  }
}

.mode-d-m {
 #card-modal {
   background-color: $md-back-l !important;

   #close-button {
     i {
       color: #fff !important;

       &:hover {
         color: $red !important;
       }
     }
   }

   table {

     thead {
       tr {
         background-color: #161819 !important;
         th {
           color: $md-text-light !important;
         }
       }
     }

     tbody {
       tr {
         td {
           color: $md-text-op;
         }

         &:nth-child(even) {
           background-color: #1a1a1a !important;
         }
         &:nth-child(odd) {
           background-color: transparent;
         }
       }
     }
   }
 }
}

</style>