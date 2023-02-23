<template>
    <div class="container-sales" v-if="dashStatus && page === 'sales'">
          <div id="sales-display" class="card-grid">
            <div class="info">

              <div class="title" v-if="data.metaPercent >= 100">
                <h2>O sucesso vem para aqueles que não se impõem limites e nunca perdem de vista suas metas.</h2>
                <h3>Parabéns! Meta atingida com sucesso!</h3>
              </div>

              <div class="title" v-if="data.metaPercent >= 70 && data.metaPercent < 100">
                <h2>É o grau do comprometimento que determina o sucesso.</h2>
                <h3>Obrigado pelo seu esforço e dedicação!</h3>
              </div>

              <div class="title" v-if="data.metaPercent >= 20 && data.metaPercent < 70">
                <h2>Sempre há a possibilidade de lutar e crescer!</h2>
                <h3>Você é capaz de alcançar muito mais! Continue assim!</h3>
              </div>

              <div class="title" v-if="data.metaPercent >= 0 && data.metaPercent < 20">
                <h2>O segredo de estar à frente é começar.</h2>
                <h3>Acreditamos em você!</h3>
              </div>

              <div class="values" v-if="dashStatus">
                <h4>{{ data.sales.count }} Vendas</h4>
                <span>Corresponde a {{ data.metaPercent }}% da meta <b style="color: #6C6EF6">({{ data.meta }})</b></span>
              </div>

              <div class="sales">
                <button @click="page = 'extract-sales'">Visualizar vendas</button>
              </div>

            </div>
            <div class="img">
              <img :src="require('@/assets/img/interface/congratulations.png')" alt=""
                   v-if="data.metaPercent > 100">
              <img :src="require('@/assets/img/interface/running.png')" alt="" style="transform: scaleX(-1)"
                   v-if="data.metaPercent >= 70 && data.metaPercent < 100">
              <img :src="require('@/assets/img/interface/running-2.png')" alt="" style="transform: scaleX(-1)"
                   v-if="data.metaPercent >= 20 && data.metaPercent < 70">
              <img :src="require('@/assets/img/interface/letsgo.png')" alt=""
                   v-if="data.metaPercent >= 0 && data.metaPercent < 20">
            </div>
          </div>
          <div id="sales-extract"  class="card-grid">
            <div class="container">
              <div class="title">
                <h1>Vendas</h1>
                <span>Últimos 7 dias</span>
              </div>
              <div class="info-graph">
                <div class="info">
                  <h4>{{ data.sales.salesInfoLast14Days.lastWeek }}</h4>
                  <div class="percent" v-if="data.sales.salesInfoLast14Days.diff >= 0">
                    <i class="fi fi-sr-arrow-small-up" style="color: rgba(151,221,100,1) !important;"></i>
                    <span style="color: rgba(151,221,100,1) !important;">{{ data.sales.salesInfoLast14Days.diff }}%</span>
                  </div>
                  <div class="percent" v-else>
                    <i class="fi fi-sr-arrow-small-down"></i>
                    <span>{{ data.sales.salesInfoLast14Days.diff }}%</span>
                  </div>
                </div>
                <div class="graph min">
                  <canvas id="graphSalesWeek"></canvas>
                </div>

              </div>
            </div>
            <div class="divisor">
              <div></div>
            </div>
            <div class="container">
              <div class="title">
                <h1>Estrelas</h1>
                <span>Últimos 7 dias</span>
              </div>
              <div class="info-graph">
                <div class="info">
                  <h4>{{ data.stars.starsInfoLast14Days.lastWeek }}</h4>
                  <div class="percent" v-if="data.stars.starsInfoLast14Days.diff >= 0">
                    <i class="fi fi-sr-arrow-small-up" style="color: rgba(151,221,100,1) !important;"></i>
                    <span style="color: rgba(151,221,100,1) !important;">{{ data.stars.starsInfoLast14Days.diff }}%</span>
                  </div>
                  <div class="percent" v-else>
                    <i class="fi fi-sr-arrow-small-down"></i>
                    <span>{{ data.stars.starsInfoLast14Days.diff }}%</span>
                  </div>
                </div>
                <div class="graph">
                  <canvas id="graphStarsWeek"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div id="details">
            <div class="items card-grid">
              <img :src="require('@/assets/img/interface/comissao2.png')" alt="">
              <div class="info">
                <h4>Comissão liquida</h4>
                <h3>{{ data.commission.liquid }}</h3>
              </div>
              <span>Valor já com acelerador/deflator aplicado.</span>
              <div class="percent-comparative" style="display: none">
                <i class="fi fi-sr-arrow-small-up" style="color: rgba(151,221,100,1) !important;"></i>
                <span style="color: rgba(151,221,100,1) !important;">31,19%</span>
              </div>
              <i class="fi fi-br-menu-dots-vertical options"></i>
            </div>
            <div class="items card-grid">
              <img :src="require('@/assets/img/interface/estrela.png')" alt="">
              <div class="info">
                <h4>Estrelas</h4>
                <h3>{{ data.stars.totalStars }}</h3>
              </div>
              <span>Total acumulado</span>
              <div class="percent-comparative" style="display: none">
                <i class="fi fi-sr-arrow-small-down"></i>
                <span>-8,32%</span>
              </div>
              <i class="fi fi-br-menu-dots-vertical options"></i>
            </div>
            <div class="items card-grid">
              <img :src="require('@/assets/img/interface/acelerador.png')" alt="" v-if="data.mediator > 0">
              <img :src="require('@/assets/img/interface/deflator.png')" alt="" v-else>
              <div class="info">
                <h4>{{ data.mediator > 0 ? 'Acelerador' : 'Deflator' }}</h4>
                <h3>{{ data.commission.diff }}</h3>
              </div>
              <div class="percent-comparative" v-if="data.mediator > 0">
                <i class="fi fi-sr-arrow-small-up" style="color: rgba(151,221,100,1) !important;"></i>
                <span style="color: rgba(151,221,100,1) !important;">10,00%</span>
              </div>
              <div class="percent-comparative" v-else>
                <i class="fi fi-sr-arrow-small-down" style="color: #EC5032 !important;"></i>
                <span style="color: #EC5032 !important;">-10,00%</span>
              </div>
              <i class="fi fi-br-menu-dots-vertical options"></i>

            </div>
            <div class="items card-grid">
              <img :src="require('@/assets/img/interface/valor_estrela.png')" alt="">
              <div class="info">
                <h4>Valor da estrela</h4>
                <h3>R${{ data.valueStar.value }}</h3>
              </div>
              <div class="percent-comparative">
                <span></span>
              </div>
              <i class="fi fi-br-menu-dots-vertical options"></i>
            </div>


          </div>
          <div id="info-stars"  class="card-grid">
            <div class="sales-stars">
              <div class="title">
                <div class="main">
                  <h2>Vendas</h2>
                  <h3>Compare a quantidade de vendas.</h3>
                </div>
                <span>Por semana</span>
              </div>
              <div class="graph">
                <canvas id="graphSalesMonth"></canvas>
              </div>
            </div>
            <div class="value-stars">
              <div class="title">
                <h2>Faixas das estrelas</h2>
                <span>Quanto maior a porcentagem da meta, mais vale sua estrela</span>
              </div>
              <div class="items" style="flex-direction: column-reverse">
                <div class="item" v-for="(item, index) in data.valueStar.tracks" :key="index">
                  <img :src="require(`@/assets/img/interface/dinheiro${index}.png`)" alt="">
                  <div>
                    <span>
                      {{ data.metaPercent >= item.initial && data.metaPercent <= item.final ?
                        'Você está aqui' : ''}}
                    </span>
                    <br>
                    <span>{{ item.initial }}% - {{ item.final ? item.final+'% - ' : '' }} R${{ item.value }}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
    </div>
  <ExtractSales
      v-if="page === 'extract-sales'"
      @close-page="page = 'sales'"
      :data="data.sales.extract"
  />

</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import {mapGetters, mapMutations} from "vuex";
import {Chart} from "chart.js/auto";
import ExtractSales from "@/components/ageRv/modal/sales/ExtractSales";

export default {
  name: "NewSalesPage",
  components: {
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
    ...mapMutations([
        'SAVE_MENU',
        'SAVE_SYSTEM'
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
        this.projection = true
        this.dashStatus = true
        this.SAVE_SYSTEM({loading: false})
        this.graphSalesWeek()
        this.graphStarsWeek()
        this.graphSalesStars()

      })
    },
    modalView: function (dash) {
      this.modal = true
      this.dashboard = dash
    },
    getMonth: function () {
      const date = new Date()


      if (date.getMonth() < 10) {
        this.filter.actualMonth = '0' + ( date.getMonth() + 1) + ''
      } else {
        this.filter.actualMonth = (date.getMonth() + 1).toString()
      }

      this.getSellers(this.filter.actualMonth, '2023')
    },
    extractView: function (page, title, data) {
      this.page = page
      this.titlePage = title
      this.dataExtract = data
    },
    returnPage: function () {
      this.page = 'sales'
    },
    graphSalesWeek: function () {

      const ctx = document.getElementById('graphSalesWeek').getContext("2d");

      const dayName = []
      const values = []

      this.data.sales.salesLast7Days.forEach((item) => {
        dayName.push(item.dayName)
        values.push(item.sales)
      })

      const barCollors = [
          '#6C6EF6',
          '#F0F0FC',
          '#6C6EF6',
          '#F0F0FC',
          '#6C6EF6',
          '#F0F0FC',
          '#6C6EF6'
      ]

      const dataConfig = {
        labels: dayName,
        datasets: [{
          data: values,
          label: 'Vendas',
          borderWidth: 0,
          pointRadius: 0,
          borderRadius: 30,
          backgroundColor: barCollors,
          borderSkipped: false,
          maxBarThickness: 20,
          categoryPercentage: .8,
          type: 'bar',
        }],
      }


      const graphSalesWeek = new Chart(ctx, {
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: false
            },
            x: {
              display: true,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgba(89, 91, 106, 0.48)'
              },

            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {}
        }
      });

      return graphSalesWeek
    },
    graphStarsWeek: function () {

      const ctx = document.getElementById('graphStarsWeek').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 50);
      gradient.addColorStop(0, 'rgba(151,221,100,0.39)');
      gradient.addColorStop(1, 'rgba(151,221,100,0.01)');


      const dayName = []
      const values = []

      this.data.stars.starsLast7Days.plans.forEach((item) => {
        dayName.push(item.dayName)
        values.push(item.stars)
      })


      const dataConfig = {
        labels: dayName,
        datasets: [{
          data: values,
          borderWidth: 2,
          pointRadius: 3,
          backgroundColor: gradient,
          fill: true,
          label: 'Estrelas'
        }],
      }


      const graphSalesWeek = new Chart(ctx, {
        type: 'line',
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: false
            },
            x: {
              display: true,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgba(89, 91, 106, 0.48)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            line: {
              tension: .5,
              borderColor: "rgba(151,221,100,1)",
            }
          }
        }
      });

      return graphSalesWeek
    },
    graphMetaPercent: function () {

      const ctx = document.getElementById('graphMetaPercent').getContext("2d");


      const dataConfig = {
        labels: ['Meta atingida %', 'Falta %'],
        datasets: [{
          data: [78, 22],
          borderWidth: 0,
          backgroundColor: [ '#6C6EF6','#F0F0FC'],
          fill: true,
          cutout: '80%',

        }],
      }


      const graphMetaPercent = new Chart(ctx, {
        type: 'doughnut',
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: false
            },
            x: {
              display: false,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          aspectRatio: false,
          maintainAspectRatio: false,
          circumference: 180,
          rotation: 270,
          borderRadius: [5, 0],
          responsive: true
        }
      });

      return graphMetaPercent
    },
    graphSalesStars: function () {
      const ctx = document.getElementById('graphSalesMonth').getContext("2d");
      const values = []
      const week = []


      this.data.sales.salesForWeek.forEach((item) => {
        week.push('Sem '+item.week)
        values.push(item.sales)
      })



      const dataConfig = {
        labels: week,
        datasets: [{
          type: 'bar',
          data: values,
          borderWidth: 0,
          backgroundColor: '#6C6EF6',
          fill: true,
          order: 1,
          label: 'Vendas',
          borderRadius: 5,
          maxBarThickness: 50,
        }],
      }


      const graphSalesMonth = new Chart(ctx, {
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: false,
              border: {
                display: false
              },
              ticks: {
                maxTicksLimit: 15
              }
            },
            x: {
              display: true,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgba(89, 91, 106, 0.48)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            line: {
              tension: .4,
            }
          }
        }
      });

      return graphSalesMonth
    },
    graphValueStars: function () {
      const ctx = document.getElementById('graphValueStar').getContext("2d");

      const dataConfig = {
        labels: ['Sem 4'],
        datasets: [{
          data: [51],
          borderWidth: 0,
          backgroundColor: '#F0F0FC',
          fill: true,
          order: 2,
          label: 'Vendas',
          borderRadius: 2,
          maxBarThickness: 10,
        },
          {
            data: [90],
            borderWidth: 0,
            backgroundColor: '#6C6EF6',
            fill: true,
            order: 1,
            label: 'Vendas',
            borderRadius: 2,
            maxBarThickness: 10,
          }],
      }


      const graphSalesMonth = new Chart(ctx, {
        data: dataConfig,
        type: 'bar',
        options: {
          scales: {
            y: {
              display: false,
              border: {
                display: false
              },
              ticks: {
                maxTicksLimit: 15
              },
              stacked: true
            },
            x: {
              display: true,
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: 'rgba(89, 91, 106, 0.48)'
              },
              stacked: true
            }
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            line: {
              tension: .4,
            }
          }
        }
      });

      return graphSalesMonth
    }
  },
  computed: {
    ...mapGetters([
      'user',
        'system',
        'permissions'
    ])
  },
  mounted() {
    this.getSellers()
    this.getMonth()
  }
}
</script>

<style scoped lang="scss">

.loading-bar {
  @include bar;
}

#content-page {
  height: initial;
  margin-top: 10px;
  @include flex(column, flex-start, initial, 2vh);
  .container-sales {
    width: calc(100% - 20px);
    display: grid;
    grid-template-columns: 35% 45%;
    grid-template-rows: 33vh 50vh;
    gap: 20px;
    padding: 0 0 2vh 0;
    border-radius: 7px;
    animation: up ease-in-out forwards .4s;

    .card-grid {
      background-color: #fff;
      border-radius: 7px;
      @include sh-pattern;
      padding: 3vh 1vw 0 1.5vw;

      h1 {
        color: $h1-light;
        font-size: 1.6rem;
        font-weight: 500;
      }

      h2 {
        font-size: 1.4rem;
        color: $h2-light;
        font-weight: 500;
      }

      h3 {
        font-size: 1.2rem;
        color: $h3-light;
        font-weight: 600;
      }

      h4 {
        color: $h4-light;
        font-weight: 600;
      }

      span {
        color: $span-light;
        font-weight: 500;
      }


    }


    #sales-display {
      @include flex(row, flex-start, initial, 0);
      padding-right: 0;

      .info {
        width: 60%;
        @include flex(column, flex-start, initia, 3vh);


        .title, .values {
          @include flex(column, flex-start, initial, .5vh);
        }

        .values {
          h4 {
            font-size: 1.6rem;
            color: $primary;
            font-weight: 500;
          }

          span {
            font-size: 1.1rem;
          }
        }

        .sales {
          button {
            @include btn-pattern($primary, $white, $primary-hover, $white-grey);
          }
        }

      }

      .img {
        width: 40%;
        height: 100%;
        @include flex(column, flex-end, center, 0);

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    #sales-extract {
      @include flex(row, space-between, initial, 1vw);

      .container {
        width: 45%;
        height: 80%;

        .title {
          @include flex(row, space-between, center, 0);
          h1 {
            width: 70%;
          }

          span {
            font-weight: 600;
            font-size: 1.1rem;
          }
        }

        .info-graph {
          width: 100%;
          height: 100%;
          @include flex(row, space-between, center,  1vw);

          .info {
            width: 20%;
            height: 100%;
            padding: 3vh 0;
            @include flex(column, flex-end, initial, 2vh);

            h4 {
              font-size: 3rem;
              font-weight: 500;
            }

            .percent {
              @include flex(row, flex-start, center, 0);

              i {
                font-size: 2rem;
                color: #EC5032;
              }

              span {
                font-size: 1.4rem;
                color: #EC5032;
                padding-bottom: 4px;
              }
            }
          }

          .graph {
            width: 70%;
            height: 90%;
            @include flex(row, flex-end, center, 0);
          }


        }
      }

      .divisor {
        width: 2px;
        border-radius: 3px;
        height: 100%;
        padding: 1vh 0 3vh 0;

        div {
          width: 100%;
          height: 100%;
          background-color: rgba(218, 218, 218, 0.26);
        }
      }
    }

    #details {
      width: calc(100%);
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 30px;


      
      .items {
        @include flex(column, flex-start, initial, 3vh);
        padding: 2vh 1.5vw;
        max-height: 22.5vh;
        min-height: 22.5vh;
        gap: 1vh;
        position: relative;

        img {
          width: 3vw;
          height: auto;
          border-radius: 3px;
        }

        .info {

          h4 {
            font-size: 1.2rem;
            font-weight: 400;
          }

          h3 {
            font-size: 1.8rem;
            color: $h1-light;
            font-weight: 500;
          }
        }


        .percent-comparative {
          @include flex(row, flex-start, center, 0);

          i {
            font-size: 1.8rem;
            color: #EC5032;
          }

          span {
            font-size: 1.2rem;
            color: #EC5032;
            padding-bottom: 4px;
          }
        }

        .options  {
          position: absolute;
          top: 18%;
          right: 10%;
          font-size: 1.4rem;
          color: $h1-light;
          @include tr-p;

          &:hover {
            opacity: .8;
          }
        }
      }


    }

    #info-stars {
      padding: 0 1vw;
      @include flex(row, space-between, initial, 1vw);

      .sales-stars {
        padding: 3vh 0 0 1.5vw;
        width: 60%;
        height: 100%;
        @include flex(column, space-between, initial, 1vh);

        .title {
          @include flex(row, space-between, center, 0);

          span {
            font-weight: 600;
            font-size: 1.1rem;
          }
        }

        .graph {
          width: 100%;
          height: 80%;
          @include flex(row, center, center, 0);
        }
      }

      .value-stars {
        width: 40%;
        height: 100%;
        border-left: 2px solid rgba(218, 218, 218, 0.26);
        padding: 2vh 0 1vh 2vw;
        @include flex(column, flex-start, initial, 1vh);

        .items {
          width: 100%;
          height: 80%;
          @include flex(column, center, initial, 2vh);

          .item {
            width: 80%;
            @include flex(row, flex-start, center, 1vw);
            padding-left: 5px;
            padding-bottom: .5vh;
            border-bottom: 1px solid #F0F0FC;

            img {
              width: 2.5vw;
              height: auto;
              border-radius: 3px;
            }

            div {

              span:nth-child(1) {
                color: $primary;
              }

              span {
                font-size: 1.2rem;
                color: $h2-light;
              }
            }
          }

          .divisor {
            width: 3px;
            height: 4vh;

            div {
              margin: 0 auto;
              background-color: #F0F0FC;
              width: 100%;
              height: 100%;
            }
          }

          .reached {
            div {
              background-color: $primary;
            }
          }
        }
      }
    }

  }

  .container-projection {
    width: 100%;
    background-color: red;

    div {
      height: 50vh;
      width: 100%;
    }
  }
}


.mode-dark {

   .container-sales {

        background-color: $dark-mode-background;

        .card-grid {

          background-color: $dark-mode-card !important;

          h1, h2, h3, h4 {
            color: $dark-mode-text-primary !important;
          }

          span {
            color: $dark-mode-text-secondary !important;
          }
        }

        #info-stars {
          .value-stars {
            .items {
              .item {
                div {
                  span:nth-child(1) {
                    color: $primary !important;
                  }
                  span {
                    color: $dark-mode-text-secondary;
                  }
                }
              }
            }
          }
        }
      }
}


@media (min-width: 260px) and (max-width: 1000px) {

  .container-menu {
    display: none;
  }

  #layer-app {


    #content-page {


      .container-sales {
        @include flex(column, flex-start, center, 2vh);
        width: 100%;
        padding: 0 3vw;

        .card-grid {
          padding: 2vh 4vw;
        }

        #sales-extract, #info-stars {
          width: 100%;
          @include flex(column, flex-start, center, .5vh);


          .divisor {
            width: 100%;
            height: 3px;
            @include flex(row, center, center, 0);

            div {
              width: 90%;
              height: 2px;
            }
          }
        }

        #sales-extract {

          .container {
            width: 100%;
          }
        }

        #details {
          grid-template-rows: 18vh 18vh;

          .items {
            all: unset;
            background-color: #fff;
            @include sh-pattern;
            border-radius: 7px;
            @include flex(column, flex-start, initial, 1vh);
            padding: 2vh 4vw;

            img {
              width: 10vw;
            }
          }

          .options {
            display: none;
          }
        }


        #info-stars {

          .sales-stars {
            padding: 0;
            width: 100%;
          }

          .value-stars {
            width: 100%;
            border: none;
            border-top: 2px solid rgba(218, 218, 218, 0.26);
          }
        }


      }

    }
  }
}

@media (min-width: 1000px) {

  .container-menu {
    display: block;
  }

  #layer-app {


    .container-sales {
      display: grid;
      grid-template-columns: 35% 65%;
      grid-template-rows: 35vh 50vh;
    }

  }
}

</style>