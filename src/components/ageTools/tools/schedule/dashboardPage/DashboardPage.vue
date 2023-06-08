<template>
  <div class="container-dashboard">
    <input type="text" name="search" id="search" v-model="searchTerm" placeholder="Buscar técnico, Equipe ou Cidade..." autocomplete="off">
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Técnicos</h2>
        </div>
        <div class="data" v-for="(technical, index) in filteredTechnicals" :key="index">
          <span>{{ technical.technical }}:</span>
          <span><b>{{ technical.count }}</b></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Equipes</h2>
        </div>
        <div class="data" v-for="(team, index) in filteredTeams" :key="index">
          <span>{{ team.team }}:</span>
          <span><b>{{ team.count }}</b></span>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="info">
        <div class="title">
          <h2>Cidades</h2>
        </div>
        <div class="data" v-for="(region, index) in filteredRegions" :key="index">
          <span>{{ region.region }}:</span>
          <span><b>{{ region.count }}</b></span>
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
      teams: null,
      searchTerm: ''
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
  computed: {
    filteredRegions() {
      if (this.searchTerm) {
        return this.regions.filter(region => region.region.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      return this.regions;
    },
    filteredTechnicals() {
      if (this.searchTerm) {
        return this.technicals.filter(technical => technical.technical.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      return this.technicals;
    },
    filteredTeams() {
      if (this.searchTerm) {
        return this.teams.filter(team => team.team.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
      return this.teams;
    }
  },
  beforeMount() {
    this.mountDashboard();
  }
}
</script>

<style scoped lang="scss">

.container-dashboard {
  @include flex(column, flex-start, initial, 1vh);
  flex-wrap: wrap;
  padding: 2vh 2vw;

  input {
    @include card();
    width: 30%;
    padding: 9px 10px;
  }

  .item {
    width: 100%;
    margin-bottom: 2vh;

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
        @include card();

        span {
          font-size: 1rem;
          color: $h1-light;
        }
      }
    }
  }
}

</style>