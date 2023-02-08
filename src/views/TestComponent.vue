<template>
  <div id="container-1">
    <canvas id="myChart" width="300px" height="300px"></canvas>
  </div>
</template>

<script>

import {Chart} from "chart.js/auto";

export default {
  name: "TestComponent",
  components: {},
  data() {
    return {

    }
  },
  methods: {
    graphLine: function () {
      const ctx = document.getElementById('myChart').getContext("2d");

      var gradient = ctx.createLinearGradient(0, 0, 0, 130);
      gradient.addColorStop(0, 'rgb(43,66,204, .6)');
      gradient.addColorStop(1, 'rgb(95,116,241, 0.01)');

      const dataConfig = {
        labels: ['Jan', 'Fev', 'Mar', 'Jan', 'Fev', 'Mar'],
        datasets: [{
          data: [12, 39, 180, 12, 539, 2],
          label: ["# dos votos"],
          borderWidth: 3,
          pointRadius: 0,
          backgroundColor: gradient,
          fill: true,
        }],
      }


       const mychart = new Chart(ctx, {
        type: 'line',
        data: dataConfig,
        options: {
          scales: {
            y: {
              display: false
            },
            x: {
              display: false
            }
          },
          plugins: {
          },
          elements: {
            line: {
              tension: .4,
              borderColor: "rgba(0,45,187, .3)",
            },
            point: {
              pointStyle: false
            }
          }
        }
      });

       console.log(mychart)
      return mychart


    }
  },
  mounted() {
    this.graphLine()
  }
}
</script>

<style scoped lang="scss">

#container-1 {
  width: 25vw;
  height: 25vh;
  @include flex(row, center, center, 0);

}

</style>