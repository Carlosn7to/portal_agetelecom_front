<template>
  <div class="projection">
    <p>
      Hoje é o dia útil <b>{{ projection.dateActual }}</b>, falta(m) <b>{{ projection.daysMissing }}</b> dia(s) para acabar seu mês e caso mantenha esse desempenho, terminará o mês com:
    </p>
    <div class="card">
      <ul>
        <li>
          <i class="fi fi-ss-star"></i>
          <span> Estrelas: <b>{{ projection.stars }}</b> </span>
        </li>
        <li>
          <i class="fi fi-ss-rocket-lunch"></i>
          <span>Vendas: <b>{{ projection.sales }}</b></span>
        </li>
        <li>
          <i class="fi fi-sr-chart-line-up"></i>
          <span>Meta atingida: <b>{{ projection.metaPercent }}%</b></span>
        </li>
        <li>
          <i class="fi fi-sr-sack-dollar"></i>
          <span>Comissão: <b>R${{ projection.commission }}</b></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectionMobile",
  props: {
    projection:{required: true},

  }
}
</script>

<style scoped lang="scss">
  .projection {
    @include flex(column, flex-start, initial, 10px);
    p {
      padding-left: 2vw;
    }
    .card {
      width: 100%;
      padding: 0 2vw;
      background-color: #fff;

      ul {
        li {
          border-bottom: 1px solid #cccccc50;
          height: 5vh;
          @include flex(row, flex-start, center, 5px);
          color: $age-or;
          font-weight: 600;

          i {
            font-size: 1.6rem;
          }

          span {
            padding-bottom: 2px;
            font-weight: 400;
            color: $age-bl;
            font-size: 1.2rem;

            b {
              font-weight: 600;
              font-size: 1.3rem;
            }
          }
        }

        li:nth-last-child(1) {
          border: none;
        }
      }
    }
  }
</style>