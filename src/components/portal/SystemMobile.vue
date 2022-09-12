<template>
  <div class="loading" v-if="loading === true">
  </div>
  <div id="content-page">
    <div class="section">
      <h1>Disponíveis</h1>
      <div class="items">
        <router-link to="/agerv/home" @click="loading = true">
          <div class="item">
            <div class="img-title">
              <i class="fi fi-rr-star"></i>
              <span>AgeRV</span>
            </div>
            <p>
              Vendas e comissionamento.
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="section">
      <h1>Em desenvolvimento</h1>
      <div class="items">
        <router-link to="/sistemas">
          <div class="system">
            <div class="img-title">
              <i class="fi fi-rr-document"></i>
              <span>Relatórios</span>
            </div>
            <p>
              Relatórios e planilhas.
            </p>
          </div>
        </router-link>
        <router-link to="/sistemas">
          <div class="system">
            <div class="img-title">
              <i class="fi fi-rr-stats"></i>
              <span>Indicadores</span>
            </div>
            <p>
              Dashboards.
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <MenuMobile
    page="portal"
  />
</template>

<script>

import MenuMobile from "@/components/portal/_aux/MenuMobile";

export default {
  name: "SystemMobile",
  components: {
    MenuMobile
  },
  props: {
    routes: {
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped lang="scss">

.loading {
  @include bar;
}

#content-page {
  padding: 5vh 10vw;
  @include flex(column, flex-start, initial, 3vh);

  .section {

    h1 {
      color: $ml-text-menu;
      font-size: 2rem;
      font-weight: 400;
    }

    .items {
      width: 100%;
      padding: 2vh 0;
      @include flex(column, flex-start, center, 2vh);

      a {
        width: 100%;
        background-color: #fff;
        border-radius: 5px;
        @include sh-h;
        @include flex(column, center, initial, 10px);
        padding: 2vh 8vw;

        .img-title {
          width: 100%;
          @include flex(row, flex-start, center, 10px);
          i {
            font-size: 3rem;
            color: $age-or;
          }
          span {
            font-size: 2rem;
            color: $age-bl;
            font-weight: 500;
            padding-bottom: 6px;
          }
        }

        p {
          text-align: justify-all;
          font-size: 1.2rem;
          font-weight: 400;
          color: $ml-text-menu;
          margin: 1.5vh 0;
          width: 100%;
        }
      }
    }
  }
}

</style>