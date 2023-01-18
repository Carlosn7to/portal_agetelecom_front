<template>
  <div class="loading-bar" v-if="loading === true">
  </div>
  <template v-if="!isMobile">
    <div id="content-app">
      <MenuApp
          :mode="mode"
          :system="'ageRv'"
      />
      <div id="layer-app">
        <HeaderApp
            @mode="modeView"
            :mode="mode"
        />
        <div id="content-page"
             :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
          <template v-if="page === 'sales'">
            <div class="section-1" v-if="dashStatus === true">
              <div class="dashboard-commercial">
                <h1>Dashboard de vendas</h1>
                <div class="dashboards">
                  <div class="dashboard"
                       @click="modalView('stars')">
                    <div class="type-value">
                      <span>{{ data.stars }}</span>
                      <span>Estrelas</span>
                    </div>
                    <i class="fi fi-ss-star"></i>
                  </div>
                  <div class="dashboard"
                       @click="extractView('Vendas', data.sales.extract)" style="cursor: pointer">
                    <div class="type-value">
                      <span>{{ data.sales.count }}</span>
                      <span>Vendas totais</span>
                    </div>
                    <i class="fi fi-ss-rocket-lunch"></i>
                  </div>
                  <div class="dashboard">
                    <div class="type-value">
                      <span>{{ data.meta }}</span>
                      <span>Meta</span>
                    </div>
                    <i class="fi fi-rr-chart-histogram"></i>
                  </div>
                  <div class="dashboard">
                    <div class="type-value">
                      <span>R${{ data.valueStar }}</span>
                      <span>Valor da estrela</span>
                    </div>
                    <i class="fi fi-sr-grin-stars"></i>
                  </div>
                  <div class="dashboard"
                       @click="extractView('Cancelamentos', data.cancel.extract)" style="cursor: pointer">
                  <div class="type-value">
                      <span>{{ data.cancel.count }}</span>
                      <span>Cancelamento <br> -7 Dias</span>
                    </div>
                    <i class="fi fi-sr-ban"></i>
                  </div>
                  <div class="dashboard">
                    <div class="type-value">
                      <span>R${{ data.commission }}</span>
                      <span>Comissão</span>
                    </div>
                    <i class="fi fi-sr-sack-dollar"></i>
                  </div>
                  <div class="dashboard">
                    <div class="type-value">
                      <span>{{ data.metaPercent }}%</span>
                      <span>Meta atingida</span>
                    </div>
                    <i class="fi fi-sr-chart-line-up"></i>
                  </div>
                  <div class="dashboard">
                    <template v-if="data.mediator > 0">
                      <div class="type-value">
                        <span>{{ data.mediator }}%</span>
                        <span>Acelerador</span>
                      </div>
                      <i class="fi fi-rr-arrow-square-up"></i>
                    </template>
                    <template v-else>
                      <div class="type-value">
                        <span>{{ data.mediator }}%</span>
                        <span>Deflator</span>
                      </div>
                      <i class="fi fi-rr-arrow-square-down"></i>
                    </template>
                  </div>
                </div>
              </div>
              <div class="filters">
                <span>Selecione o mês</span>
                <div class="buttons-filter">
                  <span :class="{ 'active' : filter.month === '11'}" @click="getSellers('11', '2022')">Novembro - 2022</span>
                  <span :class="{ 'active' : filter.month === '12'}" @click="getSellers('12', '2022')">Dezembro - 2022</span>
                  <span :class="{ 'active' : filter.month === '01'}" @click="getSellers('01', '2023')">Janeiro - 2023</span>
                </div>
              </div>
            </div>
            <div class="section-2">
              <ProjectionSection
                  :mode="mode"
                  :projection="data.projection"
                  v-if="filter.month === filter.actualMonth && projection === true"
              />
            </div>
          </template>
          <ExtractSales
            v-if="page === 'extract'"
            :title="titlePage"
            :data="dataExtract"
            @return-page="returnPage"
            :mode="mode"
          />
        </div>
      </div>
    </div>
  </template>
  <SalesMobile
    v-if="isMobile"
    :dashboardStatus="dashStatus"
    :data="data"
    :month="filter.month"
    :actualMonth="filter.actualMonth"
    :projection="projection"
  />
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import ProjectionSection from "@/components/ageRv/dashboards/ProjectionSection";
import {mapGetters, mapActions} from "vuex";
import SalesMobile from "@/components/ageRv/dashboards/SalesMobile";
import ExtractSales from "@/components/ageRv/dashboards/ExtractSales";

export default {
  name: "SalesPage",
  components: {
    MenuApp,
    HeaderApp,
    ProjectionSection,
    SalesMobile,
    ExtractSales
  },
  data() {
    return {
      mode: Cookie.get('mode'),
      data: {},
      filter: {
        month: '',
        actualMonth: null,
        typeUser: Cookie.get('agerv_function'),
      },
      modal: false,
      dashboard: '',
      dashStatus: false,
      loading: false,
      projection: false,
      page: 'sales',
      titlePage: '',
      dataExtract: null
    }
  },
  methods: {
    ...mapActions([
      'verifyDevice'
    ]),
    modeView: function (mode) {
      this.mode = mode
    },
    getSellers: function (month, year) {

      this.loading = true
      this.filter.month = month
      this.data = null
      this.projection = false
      this.dashStatus = false

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics/payment',
        headers: {
          'Authorization': 'Bearer ' + Cookie.get('token')
        },
        params: {
          year: year,
          month: this.filter.month
        }
      }).then((res) => {
        this.data = res.data
        this.loading = false
        this.projection = true
        this.dashStatus = true
      })
    },
    modalView: function (dash) {
      this.modal = true
      this.dashboard = dash
    },
    getMonth: function () {
      const date = new Date()
      if (date.getMonth() < 10) {
        this.filter.actualMonth = ('' +date.getMonth() + 1) + ''
      } else {
        this.filter.actualMonth = (date.getMonth() + 1).toString()
      }

      this.getSellers(this.filter.actualMonth, '2023')
    },
    extractView: function (title, data) {
      this.page = 'extract'
      this.titlePage = title
      this.dataExtract = data
    },
    returnPage: function () {
      this.page = 'sales'
    }
  },
  computed: {
    ...mapGetters([
      'isMobile'
    ])
  },
  mounted() {
    this.verifyDevice()
    this.getMonth()

  }
}
</script>

<style scoped lang="scss">

.loading-bar {
  @include bar;
}

#content-page {
  @include flex(column, flex-start, initial, 20px);
  padding: 2vh 3vw 4vh 3vw !important;

  .section-1 {
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
          flex-direction: row-reverse;

          .type-value {
            @include flex(column, flex-start, initial, 5px);
            color: #fff;
            font-weight: 600;
            text-align: right;

            span:nth-child(1) {
              font-size: 2rem;
              color: $age-bl;
            }

            span:nth-child(2) {
              font-size: 1.2rem;
              font-weight: 500;
              letter-spacing: .6px;
              color: $age-bl;
            }
          }

          i {
            font-size: 4rem;
            color: $age-or;
          }
        }

      }

    }

    .filters {
      width: 15%;
      background-color: #fff;
      margin-top: 6vh;
      border-radius: 5px;
      @include sh;
      @include flex(column, center, center, 10px);
      padding: 2vh 1vw;
      border: 1px solid #fff;

      span {
        font-size: 1.2rem;
        color: $ml-text-light;
        font-weight: 500;
      }

      .buttons-filter {
        @include flex(row, center, center, 10px);
        flex-wrap: wrap;

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
        user-select: text !important;

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
    background-color: $md-back-l !important;

    .type-value {
      span {
        color: $md-text-light !important;
      }
    }

    i {
      color: $age-or !important;
    }


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