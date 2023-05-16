<template>
  <div class="container-dashboard" v-if="status === true">
    <div class="filters">
      <h1>DASHBOARD</h1>

      <div class="buttons">
        <button :disabled="filters.pending === true"
                :class="{ 'selected' : filters.dataType === 'penultimate-month'  }"
                @click="getData('penultimate-month')">
        <span>
          Penúltimo mês
        </span>
        </button>
        <button :disabled="filters.pending === true"
                :class="{ 'selected' : filters.dataType === 'month'  }"
                @click="getData('month')">
        <span>
          Último mês
        </span>
        </button>
      </div>
    </div>
    <GraphCards
        :data="data"
    />
    <div class="graphs">
      <GraphSales
          :data_sales="data.sales"
          :data_stars="data.stars"
          v-if="updateChart === false"
      />
      <div class="group-third">
        <div class="card">
          <h2>Cancelamentos</h2>

          <div class="table">
            <table>
              <thead>
              <tr>
                <th>Nº do contrato</th>
                <th>Nome do cliente</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in data.cancel.extract" :key="index">
                <td>{{ item.id_contrato }}</td>
                <td>{{ item.nome_cliente }}</td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="card">
          <div class="icon">
            <i class="fi fi-rr-star"></i>
          </div>
          <div class="title-info">
            <h3>R${{ data.valueStar.value }}</h3>
            <h2>Valor da estrela</h2>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <i class="fi fi-rr-star"></i>
          </div>
          <div class="title-info">
            <h3>R${{ data.valueStar.value }}</h3>
            <h2>Valor da estrela</h2>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <i class="fi fi-rr-rocket-lunch"></i>
          </div>
          <div class="title-info">
            <h3>{{ data.meta }}</h3>
            <h2>Meta</h2>
          </div>
        </div>
        <div class="card">
          <div class="icon">
            <i class="fi fi-rr-chart-line-up"></i>
          </div>
          <div class="title-info">
            <h3>{{ data.metaPercent }}%</h3>
            <h2>Meta atingida</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from "vuex";
import GraphSales from "@/components/ageRv/dashboards/sales/graphs/GraphSales";
import GraphCards from "@/components/ageRv/dashboards/sales/graphs/GraphCards";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "DashboardSales",
  components: {GraphSales, GraphCards},

  data () {
    return {
      filters: {
        dataType: 'month',
        pending: false,
        month: null,
        year: null
      },
      data: {},
      status: false,
      updateChart: false
    }
  },
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ]),
    getData: function (type) {
      this.filters.dataType = type
      this.filters.pending = true

      this.updateChart = true
      this.getSellers()
    },
    getSellers: function () {

      this.SAVE_SYSTEM({loading: true})

      if(this.filters.dataType === 'penultimate-month') {
        this.filters.month = this.filters.month - 1;
        this.filters.month = '0' + this.filters.month + ''
      } else {
        this.getMonth()
      }

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics/payment',
        headers: {
          'Authorization': 'Bearer ' + Cookie.get('token')
        },
        params: {
          dashboard: true,
          year: '2023',
          month: this.filters.month
        }
      }).then((res) => {
        this.data = res.data
        this.SAVE_SYSTEM({loading: false})
        this.status = true
        this.filters.pending = false
        this.updateChart = false

      })
    },
    getMonth: function () {
      const date = new Date()


      if (date.getMonth() < 10) {
        this.filters.month = '0' + ( date.getMonth()) + ''
      } else {
        this.filters.month = (date.getMonth() + 1).toString()
      }
    },
  },
  computed: {
    ...mapGetters([
        'system'
    ])
  },
  mounted() {
    this.getMonth()
    this.getSellers()

  }
}
</script>

<style scoped lang="scss">

.container-dashboard {
  width: 100%;
  @include flex(column, flex-start, initial, 2vh);

  .card {
    @include card(true);
  }


  .filters {
    @include flex(row, space-between, center, .5vw);

    .buttons {
      @include flex(row, flex-start, center, 1vw);

      button {
        @include btn-dashboard(false);
      }

      .selected {
        @include btn-dashboard(true)
      }
    }
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
  }

  .graphs {
  }


  .graphs {
    display: grid;
    grid-template-rows: 60vh;
    grid-template-columns: 49.5% 50%;
    justify-content: space-between;
    gap: 2vh;

    .group-third {
      display: grid;
      grid-template-rows: 13vh 13vh 30vh;
      grid-template-columns: 48.5% 48.5%;
      gap: 2vh;
      grid-template-areas: 'T T'
                            'T T'
                           'F F';

      .card:nth-child(1) {
        grid-area: F;
        overflow-y: auto;
      }

      .card:nth-child(2) {
        background-color: #FF9800;
        @include flex(row, space-between, center, 1vw);

        .icon {
          padding: 2.5vh 1.5vw;
          border-radius: 50%;
          background-color: #e18702;

          i {
            font-size: 2rem;
            color: #fff;
          }
        }

        .title-info {
          width: 45%;
          @include flex(column, flex-start, initial, 0);
          text-align: right;

          h2 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #ffffff;
          }

          h3 {
            font-size: 2.2rem;
            font-weight: 500;
            color: #ffffff;

          }
        }
      }

      .card:nth-child(3) {
        background-color: $primary-hover;
        @include flex(row, space-between, center, 1vw);

        .icon {
          padding: 2.5vh 1.5vw;
          border-radius: 50%;
          background-color: $primary;

          i {
            font-size: 2rem;
            color: #fff;
          }
        }

        .title-info {
          width: 45%;
          @include flex(column, flex-start, initial, 0);
          text-align: right;

          h2 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #ffffff;
          }

          h3 {
            font-size: 2.2rem;
            font-weight: 500;
            color: #ffffff;

          }
        }

      }

      .card:nth-child(4) {
        background-color: #b158e1;
        @include flex(row, space-between, center, 1vw);

        .icon {
          padding: 2.5vh 1.5vw;
          border-radius: 50%;
          background-color: #8542a8;

          i {
            font-size: 2rem;
            color: #fff;
          }
        }

        .title-info {
          width: 45%;
          @include flex(column, flex-start, initial, 0);
          text-align: right;

          h2 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #ffffff;
          }

          h3 {
            font-size: 2.2rem;
            font-weight: 500;
            color: #ffffff;

          }
        }
      }

      .card:nth-child(5) {
        background-color: #47ded9;
        @include flex(row, space-between, center, 1vw);

        .icon {
          padding: 2.5vh 1.5vw;
          border-radius: 50%;
          background-color: #38aba7;

          i {
            font-size: 2rem;
            color: #fff;
          }
        }

        .title-info {
          width: 45%;
          @include flex(column, flex-start, initial, 0);
          text-align: right;

          h2 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #ffffff;
          }

          h3 {
            font-size: 2.2rem;
            font-weight: 500;
            color: #ffffff;

          }
        }
      }


      .table {
        margin: 2vh 0;

        table {
          text-align: left;
          width: 100%;
          border-collapse: collapse;

          thead {
            tr {
              border-bottom: 1px solid $border-hover;
              height: 5vh;

              th {
                font-size: 1.2rem;
                color: $h1-light;
                padding: 1vh 1vw;
              }
            }
          }

          tbody {
            tr {
              height: 5vh;
              border-bottom: 1px solid $border;

            }

            td {
              padding: 1vh 1vw;
              user-select: text !important;
            }
          }
        }
      }
    }
  }

}


.mode-dark {

  .container-dashboard {

    .card {
      @include card(false);
    }

    .filters {

      button {
        @include btn-dashboard(false, false);
      }

      .selected {
        @include btn-dashboard(true, false)
      }
    }



  }

}

</style>