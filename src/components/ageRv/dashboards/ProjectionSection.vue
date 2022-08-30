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
        <div class="item-table" style="color: #009688;">
          <i class="fi fi-ss-rocket-lunch"></i>
          <span>Vendas:</span>
          <span>{{ projection.sales }}</span>
        </div>
        <div class="item-table" style="color: #C571E1">
          <i class="fi fi-sr-chart-line-up"></i>
          <span>Meta atingida:</span>
          <span>{{ projection.metaPercent }}%</span>
        </div>
        <div class="item-table" style="border: none; color: #24A527">
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
      required: true
    },
    projection: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">

.projection {
  padding: 0 1vw;
  @include flex(column, flex-start, initial, 10px);
  .data-projection {
    width: 35%;
    background-color: #fff;
    border-radius: 5px;
    @include sh;
    @include flex(column, flex-start, initial, 10px);
    padding: 2vh 1vw;
    border: 1px solid #fff;

    p {
      font-size: 1.6rem;
      font-weight: 400;
      color: $ml-text-menu;
    }

    .table-projection {
      @include flex(column, flex-start, initial, 10px);

      .item-table {
        width: 100%;
        @include flex(row, flex-start, center, 5px);
        padding: 2vh 0;
        border-bottom: 2px solid #cccccc50;
        color: #FEA11D;
        font-size: 1.6rem;
        font-weight: 600;

        i {
          font-size: 2rem;
        }
      }
    }
  }
}

.mode-d {
  h1 {
    color: $md-text-h1 !important;
  }

  .data-projection {
    background-color: $md-back-l;
    border-color: $age-or !important;
    @include tr;

    p {
      color: $md-text-light;
    }

    .table-projection {


      .item-table {

        border-color: rgba(70, 70, 70, 0.17);
      }
    }
  }
}

</style>