<template>
  <MenuMobile page="agerv"/>
  <div class="content-page" v-if="dashboardStatus === true">
    <div class="section">
      <h1>Dashboard de vendas</h1>
      <div class="items">
        <div class="item">
          <div class="values">
            <span>{{ data.stars }}</span>
            <span>Estrelas</span>
          </div>
          <i class="fi fi-ss-star"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>{{ data.salesTotals }}</span>
            <span>Instaladas</span>
          </div>
          <i class="fi fi-ss-rocket-lunch"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>{{ data.meta }}</span>
            <span>Meta</span>
          </div>
          <i class="fi fi-rr-chart-histogram"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>{{ data.metaPercent }}%</span>
            <span>Atingida</span>
          </div>
          <i class="fi fi-sr-chart-line-up"></i>
        </div>
        <div class="item" v-if="data.deflator === -10" style="background-color: #B3B4B5;">
          <div class="values">
            <span>{{ data.deflator }}%</span>
            <span>Deflator</span>
          </div>
          <i class="fi fi-rr-arrow-alt-square-down"></i>
        </div>
        <div class="item" v-if="data.deflator === 10" style="background-color: #009688">
          <div class="values">
            <span>{{ data.deflator }}%</span>
            <span>Acelerador</span>
          </div>
          <i class="fi fi-rr-arrow-square-up"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>R${{ data.valueStars }}</span>
            <span>Valor da <br> estrela</span>
          </div>
          <i class="fi fi-sr-grin-stars"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>{{ data.cancelTotals }}</span>
            <span>Canceladas</span>
          </div>
          <i class="fi fi-ss-delete-document"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>{{ data.cancelD7 }}</span>
            <span>Canceladas <br> D-7</span>
          </div>
          <i class="fi fi-sr-ban"></i>
        </div>
        <div class="item">
          <div class="values">
            <span>R${{ data.commission }}</span>
            <span>Comissão</span>
          </div>
          <i class="fi fi-sr-sack-dollar"></i>
        </div>
      </div>
    </div>
    <div class="section">
      <h1>Projeção de vendas</h1>
      <ProjectionMobile
          :projection="data.projection"
          v-if="month === actualMonth && projection === true"
          :mode="'light'"
      />
    </div>
  </div>
</template>

<script>

import MenuMobile from "@/components/portal/_aux/MenuMobile";
import ProjectionMobile from "@/components/ageRv/dashboards/ProjectionMobile";
export default {
  name: "SalesMobile",
  components: {
    MenuMobile,
    ProjectionMobile
  },
  props: {
    data: {required: true},
    dashboardStatus: {required: true},
    month: {required: true},
    actualMonth: {required: true},
    projection: {required: true}
  }
}
</script>

<style scoped lang="scss">

.content-page {
  padding: 5vh 7vw 2vh 7vw;
  @include flex(column, flex-start, initial, 30px);
  max-height: 90%;
  height: 90%;
  overflow-y: auto;
  .section {
    @include flex(column, flex-start, initial, 10px);

    h1 {
      font-size: 2rem;
      color: $age-bl;
    }

    .items {
      @include flex(row, flex-start, initial, 10px);
      flex-wrap: wrap;
      width: 100%;
      .item {
        width: 45%;
        height: 10vh;
        border-radius: 5px;
        color: #fff;
        @include sh;
        @include flex(row, space-between, center, 10px);
        flex-direction: row-reverse;
        padding: 0 15px 0 15px;
        background-color: #fff !important;

        .values {
          @include flex(column, flex-start, initial, 0);
          text-align: right;

          span:nth-child(1) {
            font-size: 1.8rem;
            font-weight: 600;
            color: $age-bl;
          }

          span:nth-child(2) {
            font-size: 1.4rem;
            color: $age-bl;
          }
        }

        i {
          font-size: 2.6rem;
          //color: hsla(0, 0%, 100%, .502);
          color: $age-or;
        }
      }

      //.item:nth-child(1) {
      //  background-color: #FEA11D;
      //}
      //.item:nth-child(2) {
      //  background-color: #2fa1d0;
      //}
      //.item:nth-child(3) {
      //  background-color: #932b91;
      //}
      //.item:nth-child(4) {
      //  background-color: #c571e1;
      //}
      //.item:nth-child(6) {
      //  background-color: #FECA1D;
      //}
      //.item:nth-child(7) {
      //  background-color: #F44336;
      //}
      //.item:nth-child(8) {
      //  background-color: #911515;
      //}
      .item:nth-child(9) {
        width: 93%;
      //  background-color: #24A527;
      }
    }

  }
}

</style>