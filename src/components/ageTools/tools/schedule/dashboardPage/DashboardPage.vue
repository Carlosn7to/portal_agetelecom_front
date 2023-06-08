<template>
  <div class="container-dashboard">
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Cidades</h2>
        </div>
        <div class="data" v-for="(region, index) in regions" :key="index">
          <span>{{ region.region }}:</span>
          <span><b>{{ region.count }}</b></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Equipes</h2>
        </div>
        <div class="data" v-for="(team, index) in teams" :key="index">
          <span>{{ team.team }}:</span>
          <span><b>{{ team.count }}</b></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Técnicos</h2>
        </div>
        <div class="data" v-for="(technical, index) in technicals" :key="index">
          <span>{{ technical.technical }}:</span>
          <span><b>{{ technical.count }}</b></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  props: ['dataItems'],
  data () {
    return {
      regions: null,
      technicals: null,
      teams: null
    }
  },
  methods: {
    mountDashboard: function () {
      function getCountsAndSort(dataItems, property) {
        const counts = dataItems.reduce((counts, item) => {
          const value = item[property];
          counts[value] = (counts[value] || 0) + 1;
          return counts;
        }, {});

        const sortedItems = Object.entries(counts).map(([value, count]) => ({
          [property]: value,
          count
        })).sort((a, b) => b.count - a.count);

        return sortedItems;
      }

      this.regions = getCountsAndSort(this.dataItems, 'region');
      this.technicals = getCountsAndSort(this.dataItems, 'technical');
      this.teams = getCountsAndSort(this.dataItems, 'team');

    }
  },
  beforeMount() {
    this.mountDashboard();
  }
}
</script>

<style scoped lang="scss">

.container-dashboard {
  @include flex(row, flex-start, initial, 1vw);
  flex-wrap: wrap;
  padding: 2vh 2vw;

  .item {
    width: calc((100% / 3) - 10px);
    @include card();

    .info {
      @include flex(column, flex-start, initial, 2vh);
      .title {
        h2 {
          font-size: 1.6rem;
          font-weight: 500;
          color: $h1-black;
        }
      }

      .data {
        @include flex(row, flex-start, center, .2vw);

        span {
          font-size: 1.4rem;
          color: $h1-light;
        }
      }
    }
  }
}

</style>