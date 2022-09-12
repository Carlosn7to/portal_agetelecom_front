<template>
  <div class="projection"
       :class="{'mode-l' : mode === 'light' || mode === undefined,
                'mode-d' : mode === 'dark'}">
    <h1>Projeção de vendas para o mês atual</h1>
    <div class="data-projection">
      <p>
        Hoje é o dia útil <b>{{ projection.dateActual }}</b>, falta(m) <b>{{ projection.daysMissing }}</b> dia(s) para acabar seu mês e caso mantenha esse desempenho, terminará o mês com:
      </p>
      <div class="table-projection">
        <div class="item-table">
          <i class="fi fi-ss-stars"></i>
          <span>Estrelas:</span>
          <span>{{ projection.stars }}</span>
        </div>
        <div class="item-table">
          <i class="fi fi-ss-rocket-lunch"></i>
          <span>Vendas:</span>
          <span>{{ projection.sales }}</span>
        </div>
        <div class="item-table">
          <i class="fi fi-sr-chart-line-up"></i>
          <span>Meta atingida:</span>
          <span>{{ projection.metaPercent }}%</span>
        </div>
        <div class="item-table">
          <i class="fi fi-sr-sack-dollar"></i>
          <span>Comissão:</span>
          <span>R${{ projection.commission }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectionSection",
  props: {
    mode: {
      type: String
    },
    projection: {required: true, type: Object}
  }
}
</script>

<style scoped lang="scss">

.projection {
  padding: 0 1vw;
  @include flex(column, flex-start, initial, 10px);
  .data-projection {
    width: 35%;
    @include flex(column, flex-start, initial, 10px);
    padding: 2vh 0vw;

    p {
      font-size: 1.6rem;
      font-weight: 400;
      color: $ml-text-menu;
      padding-left: 1vw;
    }

    .table-projection {
      @include flex(column, flex-start, initial, 10px);
      background-color: #fff;
      border-radius: 5px;
      @include sh;
      padding: 0 1vw;

      .item-table {
        width: 100%;
        @include flex(row, flex-start, center, 5px);
        padding: 2vh 0;
        border-bottom: 2px solid #cccccc50;
        color: #FEA11D;
        font-size: 1.6rem;
        font-weight: 600;

        span {
          color: $age-bl;
          font-weight: 400;
        }

        span:nth-child(3) {
          font-weight: 600;
        }

        i {
          font-size: 2.4rem;
          color: $age-or;
        }
      }

      .item-table:nth-last-child(1) {
        border: none;
      }
    }
  }
}

.mode-d {
  h1 {
    color: $md-text-h1 !important;
  }

  .data-projection {
    @include tr;

    p {
      color: $md-text-light;
    }

    .table-projection {
      background-color: $md-back-l;
      border: 1px solid $age-or !important;
      @include tr;

      .item-table {
        border-color: rgba(70, 70, 70, 0.17);

        span {
          color: $md-text-light !important;
        }
      }
    }
  }
}

</style>