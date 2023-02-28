<template>
  <div class="graphs-cards">
    <div class="card">
      <div class="icon">
        <i class="fi fi-rr-chart-mixed"></i>
      </div>
      <div class="title-info">
        <h3>{{ data.sales.count }}</h3>
        <h2>Total de vendas</h2>
      </div>
    </div>
    <div class="card">
      <div class="icon">
        <i class="fi fi-rr-trophy-star"></i>
      </div>
      <div class="title-info">
        <h3>{{ data.stars.totalStars }}</h3>
        <h2>Total de estrelas</h2>
      </div>
    </div>
    <div class="card">
      <div class="icon">
        <i class="fi fi-rr-usd-square"></i>
      </div>
      <div class="title-info">
        <h3>R${{ data.commission.liquid }}</h3>
        <h2>Total em comissão</h2>
      </div>
    </div>
    <div class="card">
      <div class="icon">
        <i class="fi fi-rr-ban"></i>
      </div>
      <div class="title-info">
        <h3>{{ data.cancel.count }}</h3>
        <h2>Total de cancelamentos</h2>
      </div>
    </div>


  </div>
</template>

<script>
import {Chart} from "chart.js/auto";


export default {
  name: "GraphCards",
  props: ['data'],
  methods: {
    getLineSales: function () {

      const ctx = document.getElementById('lineSales').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 30);
      gradient.addColorStop(0, 'rgb(52,140,212,0)');
      gradient.addColorStop(1, 'rgba(9,41,65,0.0)');

      const dataConfig = {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          data: [10, 5, 8,3,9,1],
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: gradient,
          fill: true,
          label: 'Vendas'
        }],
      }


      const lineSales = new Chart(ctx, {
        type: 'line',
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
              borderColor: "rgb(52,140,212)",
            }
          }
        }
      });

      return lineSales
    },
    getLineStars: function () {

      const ctx = document.getElementById('lineStars').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 30);
      gradient.addColorStop(0, 'rgb(238,202,21,0)');
      gradient.addColorStop(1, 'rgba(86,73,8,0.0)');

      const dataConfig = {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          data: [3, 1, 5,1,10,3],
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: gradient,
          fill: true,
          label: 'Estrelas'
        }],
      }


      const lineStars = new Chart(ctx, {
        type: 'line',
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
              borderColor: "rgb(238,202,21)",
            }
          }
        }
      });

      return lineStars
    },
    getLineCommission: function () {

      const ctx = document.getElementById('lineCommission').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 30);
      gradient.addColorStop(0, 'rgb(18,161,25,0)');
      gradient.addColorStop(1, 'rgba(10,79,13,0.0)');

      const dataConfig = {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          data: [3, 7, 2,10,6,15],
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: gradient,
          fill: true,
          label: 'Comissão'
        }],
      }


      const lineCommission = new Chart(ctx, {
        type: 'line',
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
              borderColor: "rgb(18,161,25)",
            }
          }
        }
      });

      return lineCommission
    },
    getLineCancels: function () {

      const ctx = document.getElementById('lineCancels').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 30);
      gradient.addColorStop(0, 'rgba(206,5,5,0)');
      gradient.addColorStop(1, 'rgba(56,3,3,0)');


      const dataConfig = {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          data: [10, 3, 2,1,7,1],
          borderWidth: 2,
          pointRadius: 1,
          backgroundColor: gradient,
          fill: true,
          label: 'Cancelamentos'
        }],
      }


      const lineCancels = new Chart(ctx, {
        type: 'line',
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
              borderColor: "rgb(206,5,5)",
            }
          }
        }
      });

      return lineCancels
    },

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">


.graphs-cards {
  @include flex(row, space-between, center, 0);
  .card {
    width: calc((100% / 4) - 1.5vh);
    @include card(true);
    height: 13vh;
    @include flex(row, space-between, center, 1vw);

    .icon {
      padding: 2.5vh 1.5vw;
      border-radius: 50%;

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

    .graph {
      width: 55%;
    }
  }

  .card:nth-child(1) {
    background-color: #8791D5;

    .icon {
      background-color: #7781B7;
    }
  }

  .card:nth-child(2) {
    background-color: #45BBE0;

    .icon {
      background-color: #45A0BF;
    }
  }

  .card:nth-child(3) {
    background-color: #78C350;

    .icon {
      background-color: #6BA653;
    }
  }

  .card:nth-child(4) {
    background-color: #F06292;

    .icon {
      background-color: #C55D84;
    }
  }


}

.mode-dark {
  .graphs-cards {
    .card {
      @include card(false);

      .title-info {
        h2 {
          color: $white-grey;
        }
      }
    }
  }

}


</style>