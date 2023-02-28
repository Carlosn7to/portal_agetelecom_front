<template>
  <div class="card">
    <div class="title-info">
      <h1>Vendas e média de estrelas do período</h1>
      <h3>Apenas vendas aprovadas e válidas</h3>
    </div>
    <div class="graph">
      <canvas id="lineSalesDaily"></canvas>
    </div>
  </div>
</template>

<script>
import {Chart} from "chart.js/auto";
import {mapGetters} from "vuex";

export default {
  name: "GraphSales",
  props: ['data_sales', 'data_stars'],
  computed: {
    ...mapGetters([
        'system'
    ])
  },
  methods: {
    getLineSales: function () {

      const ctx = document.getElementById('lineSalesDaily').getContext("2d");

      const barCollors = [
        '#6C6EF6',
        '#d4d4e1',
        '#6C6EF6',
        '#d4d4e1',
        '#6C6EF6'
      ]

      const values_sales = []
      const week_sales = []
      const values_stars = []

      this.data_sales.salesForWeek.forEach((item) => {
        week_sales.push('Sem '+item.week)
        values_sales.push(item.sales)
      })

      this.data_stars.starsForWeek.forEach((item) => {
        values_stars.push(item.sales)
      })


      const dataConfig = {
        labels: week_sales,
        datasets: [{
          type: 'bar',
          data: values_sales,
          label: 'Vendas',
          borderWidth: 0,
          pointRadius: 0,
          borderRadius: 15,
          backgroundColor: barCollors,
          borderSkipped: false,
          maxBarThickness: 50,
          categoryPercentage: .8,
          order: 2
        },
          {
            type: 'line',
            order: 1,
            data: values_stars,
            borderWidth: 2,
            pointRadius: 4,
            backgroundColor: '#6A6CF6',
            fill: false,
            label: 'Estrelas'
          }],
      }


      const lineSalesDaily = new Chart(ctx, {
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: true,
              grid: {
                display: false
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
                font: {
                  size: 8
                },
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
              tension: .3,
              borderColor: "rgb(52,140,212)",
            }
          }
        }
      });

      return lineSalesDaily
    },
  },
  mounted() {
    this.getLineSales()
  }
}
</script>

<style scoped lang="scss">

.card {
  @include card();
  width: 100%;
  height: 100%;
  @include flex(column, space-between, initial, 1vh);

  h1 {
    font-size: 2rem;
  }



  .graphs {
    height: 100%;
  }
}

.mode-dark {

  .card {
    @include card(false);

    .title-info {


      h3 {
        color: $white-grey;
      }
    }
  }

}
</style>