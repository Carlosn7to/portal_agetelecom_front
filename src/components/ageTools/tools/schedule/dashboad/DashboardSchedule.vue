<template>
  <div id="dashboards">
    <div class="dashboard" @click="filterData('all')">
      <div class="container-icon">
        <div class="icon">
          <img :src="require('@/assets/portal/ageTools/tools/schedule/servico-tecnico.png')" alt="servico-tecnico">
        </div>
      </div>
      <div class="container-info">
        <div class="info">
          <div class="title">
            <span>Total do dia</span>
          </div>
          <div class="value">
            <span>{{ data.total }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard" @click="filterData('morning')">
      <div class="container-icon">
        <div class="icon">
          <img :src="require('@/assets/portal/ageTools/tools/schedule/manha.png')" alt="sol-manha">
        </div>
      </div>
      <div class="container-info">
        <div class="info">
          <div class="title">
            <span>Período da Manhã</span>
          </div>
          <div class="value">
            <span>{{ data.turn.morning }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard" @click="filterData('afternoon')">
      <div class="container-icon">
        <div class="icon">
          <img :src="require('@/assets/portal/ageTools/tools/schedule/tarde.png')" alt="sol-tarde">
        </div>
      </div>
      <div class="container-info">
        <div class="info">
          <div class="title">
            <span>Período da Tarde</span>
          </div>
          <div class="value">
            <span>{{ data.turn.afternoon }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="dashboard" @click="filterData('notAtt')">
      <div class="container-icon">
        <div class="icon">
          <img :src="require('@/assets/portal/ageTools/tools/schedule/suporte-tecnico.png')" alt="suporte-tecnico">
        </div>
      </div>
      <div class="container-info">
        <div class="info">
          <div class="title">
            <span>Sem téc. atribuído</span>
          </div>
          <div class="value">
            <span>{{ data.notAtt }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardSchedule",
  props: ['data'],
  emits: ['filterData'],
  methods: {
    filterData(typeFilter) {
      this.$emit('filterData', typeFilter)
    }
  },
}
</script>

<style scoped lang="scss">

#dashboards {
  height: 100%;
  @include flex(row, space-between, center, 1vw);
  .dashboard {
    background-color: #fff;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid transparent;

    width: calc((100% / 4) - 10px);
    height: 100%;
    @include flex(row, space-between, center, 2vw);
    padding: 1vh .5vw;

    .container-icon {
      height: 100%;
      width: 30%;
      @include flex(row, flex-start, center, 0);
      .icon {
        padding: 9px 13px;
        border-radius: 50%;
        font-size: 2rem;
        color: #fff;

        img {
          width: 4vw;
          height: auto;
        }
      }
    }

    .container-info {

      height: 100%;
      .info {
        height: 100%;
        @include flex(column, space-between, initial, 0);


        .title {
          span {
            color: $h1-black;
            font-size: 1.2rem;
            font-weight: 600;
          }
        }

        .value {
          @include flex(row, flex-end, center, 0);
          span {
            font-size: 2.2rem;
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