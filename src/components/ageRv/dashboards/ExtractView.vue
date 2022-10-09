<template>
  <div class="content-extract"
       :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
    <div class="menu">
        <nav>
          <p>Menu {{ mode }}</p>
          <ul>
            <li :class="{ 'selected' : page === 'main' }"
                @click="page = 'main'">
              <i class="fi fi-rr-search"></i>
              <span>Visão geral</span>
            </li>
            <li :class="{ 'selected' : page === 'sales' }"
                @click="page = 'sales'">
              <i class="fi fi-rr-search-alt"></i>
              <span>Vendas</span>
            </li>
            <li @click="closePage()">
              <i class="fi fi-rr-enter"></i>
              <span>Voltar</span>
            </li>
          </ul>
        </nav>
    </div>
    <div class="content">
      <h1>{{ data.name }}</h1>
      <div class="cards" v-if="page === 'main'">
        <div class="card">
          <i class="fi fi-ss-rocket-lunch"></i>
          <div class="type-value">
            <span>{{ data.sales.count }}</span>
            <span>Vendas totais</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-rr-chart-histogram"></i>
          <div class="type-value">
            <span>{{ data.meta }}</span>
            <span>Meta</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-sr-chart-line-up"></i>
          <div class="type-value">
            <span>{{ data.metaPercent }}%</span>
            <span>Meta atingida</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-sr-ban"></i>
          <div class="type-value">
            <span>{{ data.cancel.count }}</span>
            <span>Canceladas D-7</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-ss-star"></i>
          <div class="type-value">
            <span>{{ data.stars }}</span>
            <span>Estrelas</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-sr-grin-stars"></i>
          <div class="type-value">
            <span>R${{ data.valueStar }}</span>
            <span>Valor da estrela</span>
          </div>
        </div>
        <div class="card" v-if="data.mediator === 10">
          <i class="fi fi-rr-arrow-alt-square-up"></i>
          <div class="type-value">
            <span>{{ data.mediator }}%</span>
            <span>Acelerador</span>
          </div>
        </div>
        <div class="card" v-if="data.mediator === -10">
          <i class="fi fi-rr-arrow-alt-square-down"></i>
          <div class="type-value">
            <span>{{ data.mediator }}%</span>
            <span>Deflator</span>
          </div>
        </div>
        <div class="card" v-if="data.mediator === 0">
          <i class="fi fi-rr-arrow-alt-square-right"></i>
          <div class="type-value">
            <span>{{ data.mediator }}%</span>
            <span>Acelerador</span>
          </div>
        </div>
        <div class="card">
          <i class="fi fi-sr-sack-dollar"></i>
          <div class="type-value">
            <span>{{ data.commission }}</span>
            <span>Comissão</span>
          </div>
        </div>
      </div>
      <div class="card" v-if="page === 'sales'">
        <div class="items-header">
          <div class="item" style="justify-content: flex-start; width: 20%">
            <span>Cliente</span>
          </div>
          <div class="item">
            <span>Data do cadastro</span>
          </div>
          <div class="item">
            <span>Data da vigência</span>
          </div>
          <div class="item">
            <span>Situação</span>
          </div>
          <div class="item">
            <span>Data do cancelamento</span>
          </div>
          <div class="item" style="width: 30%">
            <span>Plano</span>
          </div>
        </div>
        <div class="container-body">
            <template v-for="(item, key) in sortData" :key="key">
              <div class="items-body">
                <div class="item" style="justify-content: flex-start; width: 20%">
                  <span>{{ item.nome_cliente }}</span>
                </div>
                <div class="item">
                  <span>{{ item.data_contrato }}</span>
                </div>
                <div class="item">
                  <span>{{ item.data_vigencia }}</span>
                </div>
                <div class="item">
                  <span>{{ item.situacao }}</span>
                </div>
                <div class="item">
                  <span>{{ item.data_cancelamento }}</span>
                </div>
                <div class="item" style="width: 30%">
                  <span>{{ item.plano }}</span>
                </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtractView",
  props: {
    items: {
      required: true
    },
    mode: {
      required: true
    }
  },
  data() {
    return {
      page: 'main',
      data: this.items,
      getSales: false

    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
  },
  computed: {
    sortData: function () {
      function compare(a, b) {
        if(a.nome_cliente < b.nome_cliente)
          return -1
        if(a.nome_cliente > b.nome_cliente)
          return 1
        return 0
      }

      return this.data.sales.extract.slice().sort(compare)
    }
  }
}
</script>

<style scoped lang="scss">

.content-extract {
  width: 100%;
  height: 100%;
  @include flex(row, flex-start, initial, 10px);

  .menu {
    width: 12%;
    height: 100%;
    border-radius: 5px 0 0 5px;

    nav{
      margin-top: 7vh;

      p {
        margin-bottom: 1vh;
        font-size: 1rem;
        padding-left: 1vw;
        font-weight: 600;
      }

      ul {

        li {
          @include flex(row, flex-start, center, 5px);
          height: 6vh;
          padding-left: 1vw;
          @include tr-p;


          span {
            font-size: 1.4rem;
            @include tr;
            padding-bottom: 2px;
            font-weight: 500;
          }

          i {
            font-size: 1.6rem;
            @include tr;

          }

        }
      }
    }
  }

  .content {
    width: 88%;
    height: 100%;
    padding: 5vh 2vw;
    @include flex(column, flex-start, initial, 1vh);
    .card {
      height: 100%;

      .items-header {
        @include table-card-headers;
      }

      .container-body {
        @include table-card-body;
      }

    }

    h1 {
      color: $age-bl;
      font-size: 2rem;
      margin-bottom: 2vh;
      font-weight: 500;
    }

    .cards {
      width: 100%;
      @include flex(row, flex-start, initial, 10px);
      flex-wrap: wrap;

      .card {
        width: calc((100% / 4) - 20px);
        height: 13vh;
        background-color: #fff;
        border-radius: 5px;
        @include sh-h;
        @include tr;
        padding: 2vh 1vw;
        @include flex(row, space-between, center, 0px);

        .type-value {
          @include flex(column, flex-start, initial, 5px);
          color: #fff;
          font-weight: 600;
          text-align: right;

          span:nth-child(1) {
            font-size: 2rem;
            color: $age-bl;
          }

          span:nth-child(2) {
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: .6px;
            color: $age-bl;
          }
        }

        i {
          font-size: 4rem;
          color: $age-or;
        }
      }
    }
  }
}

.mode-l-p {
  .menu {
    border-right: 2px solid #cccccc60;
    background-color: #fff;
    nav{
      p {
        color: $ml-text-menu;
      }

      ul {

        li {
          border-bottom: 1px solid #cccccc60;
          color: $ml-text-menu;

          &:hover > span {
            color: $age-bl;
          }

          &:hover > i {
            color: $age-or;
          }

          &:hover {
            background-color: #cccccc20;
          }
        }

        .selected {
          span {
            color: $age-bl;
          }

          i {
            color: $age-or;
          }
        }
      }
    }
  }

  .content {

    .card {

      .items-header {
        @include table-card-headers;
      }

      .container-body {
        @include table-card-body;
      }

    }
  }
}

.mode-d-p {
  .menu {
    border-right: 2px solid #cccccc60;
    background-color: $md-back-l;
    nav{
      p {
        color: $md-text-menu;
      }

      ul {

        li {
          border-bottom: 1px solid #cccccc60;
          color: $md-text-menu;

          &:hover > span {
            color: $age-or;
          }

          &:hover > i {
            color: $age-or;
          }

          &:hover {
            background-color: #cccccc20;
          }
        }

        .selected {
          span {
            color: #fff;
          }

          i {
            color: $age-or;
          }
        }
      }
    }
  }

  .content {

    .card {

      .items-header {
        @include table-card-headers;
      }

      .container-body {
        @include table-card-body;

        .items-body {
          background-color: $md-back-l !important;
          border-color: $md-back-l !important;

          .item {
            span {
              color: $md-text-light !important;
            }
          }

          &:hover {
            border-color: $age-or !important;
          }
        }
      }

    }
  }
}
</style>