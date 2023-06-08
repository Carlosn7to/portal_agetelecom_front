<template>
  <div id="dashboards">
    <div class="dashboard" v-for="(item, index) in dashboards" @click="filterData(item.typeFilter)" :key="index">
      <div class="container-icon">
        <div class="icon">
          <img :src="require('@/assets/portal/ageTools/tools/schedule/'+item.img_src)" alt="icone">
        </div>
      </div>
      <div class="container-info">
        <div class="info">
          <div class="title">
            <span>{{ item.label }}</span>
          </div>
          <div class="value">
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSchedule",
  props: ['dataDashboards'],
  emits: ['filterData'],
  data () {
    return {
      dashboards: [],
      dashboardData: null,
    }
  },
  methods: {
    filterData(typeFilter) {
      this.$emit('filterData', typeFilter)
    },
    updateDashboard: function () {
      console.log('updateDashboard')
      this.dashboards = [
        {img_src: 'servico-tecnico.png', label: 'Total do dia', value: this.dataDashboards.total, typeFilter: 'all'},
        {img_src: 'manha.png', label: 'Período da manhã', value: this.dataDashboards.turn.morning, typeFilter: 'morning'},
        {img_src: 'tarde.png', label: 'Período da tarde', value: this.dataDashboards.turn.afternoon, typeFilter: 'afternoon'},
        {img_src: 'suporte-tecnico.png', label: 'Sem téc. atribuído', value: this.dataDashboards.notAtt, typeFilter: 'notAtt'},
        {img_src: 'agendado.png', label: 'Executada', value: this.dataDashboards.executed, typeFilter: 'executed'},
        {img_src: 'nao-agendado.png', label: 'Não Executada', value: this.dataDashboards.notExecuted, typeFilter: 'notExecuted'},
        {img_src: 'bug.png', label: 'Em desenvolvimento', value: 0, typeFilter: 'dev'},
        {img_src: 'bug.png', label: 'Em desenvolvimento', value: 0, typeFilter: 'dev'},
      ]
    }
  },
  beforeMount() {
    this.dashboards = [
      {img_src: 'servico-tecnico.png', label: 'Total do dia', value: this.dataDashboards.total, typeFilter: 'all'},
      {img_src: 'manha.png', label: 'Período da manhã', value: this.dataDashboards.turn.morning, typeFilter: 'morning'},
      {img_src: 'tarde.png', label: 'Período da tarde', value: this.dataDashboards.turn.afternoon, typeFilter: 'afternoon'},
      {img_src: 'suporte-tecnico.png', label: 'Sem téc. atribuído', value: this.dataDashboards.notAtt, typeFilter: 'notAtt'},
      {img_src: 'agendado.png', label: 'Executada', value: this.dataDashboards.executed, typeFilter: 'scheduled'},
      {img_src: 'nao-agendado.png', label: 'Não Executada', value: this.dataDashboards.notExecuted, typeFilter: 'notScheduled'},
      {img_src: 'bug.png', label: 'Em desenvolvimento', value: 0, typeFilter: 'dev'},
      {img_src: 'bug.png', label: 'Em desenvolvimento', value: 0, typeFilter: 'dev'},
    ]
  }
}
</script>

<style scoped lang="scss">

#dashboards {
  @include flex(row, space-between, center, 1vw);
  flex-wrap: wrap;
  height: 100%;
  .dashboard {
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;

    width: calc((24%) - 10px);
    @include flex(row, space-between, center, 0vw);
    padding: 1vh .5vw;

    .container-icon {
      height: 100%;
      width: 30%;
      @include flex(row, flex-start, center, 0);
      .icon {
        padding: 9px 13px;
        border-radius: 50%;

        img {
          width: 2vw;
          height: auto;
        }
      }
    }

    .container-info {

      height: 100%;
      .info {
        height: 100%;
        @include flex(column, space-between, initial, 1.5vh);


        .title {
          span {
            color: $h1-black;
            font-size: 1rem;
            font-weight: 600;
          }
        }

        .value {
          @include flex(row, flex-end, center, 0);
          span {
            font-size: 1.6rem;
            font-weight: 600;
            color: $h1-light;
            text-align: right;
          }
        }
      }


    }

    &:hover {
      border-color: $border;
    }
  }
}

.mode-dark {
  #dashboards {
    .dashboard {
      background-color: $dark-mode-card;

      .info {
        .title {
          span {
            color: $dark-mode-text-secondary;
          }
        }

        .value {
          span {
            color: $dark-mode-text-primary;
          }
        }
      }
    }
  }
}

</style>