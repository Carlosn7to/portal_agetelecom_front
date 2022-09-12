<template>
  <div class="content-extract">
    <div class="menu">
        <nav>
          <p>Menu</p>
          <ul>
<!--            <li :class="{ 'selected' : page === 'main' }"-->
<!--                @click="page = 'main'">-->
<!--              <i class="fi fi-rr-search"></i>-->
<!--              <span>Visão geral</span>-->
<!--            </li>-->
            <li :class="{ 'selected' : page === 'sales' }"
                @click="page = 'sales'">
              <i class="fi fi-rr-search-alt"></i>
              <span>Vendas</span>
            </li>
<!--            <li :class="{ 'selected' : page === 'mng' }"-->
<!--                @click="page = 'mng'">-->
<!--              <i class="fi fi-rr-settings-sliders"></i>-->
<!--              <span>Gerenciamento</span>-->
<!--            </li>-->
            <li @click="closePage()">
              <i class="fi fi-rr-enter"></i>
              <span>Voltar</span>
            </li>
          </ul>
        </nav>
    </div>
    <div class="content">
      <div class="card">
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
      required: true,
      type: Object
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: 'sales',
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

      return this.data.sales.slice().sort(compare)
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
    border-right: 2px solid #cccccc60;
    height: 100%;
    background-color: #fff;
    border-radius: 5px 0 0 5px;
    nav{
      margin-top: 7vh;

      p {
        margin-bottom: 1vh;
        font-size: 1rem;
        color: $ml-text-menu;
        padding-left: 1vw;
        font-weight: 600;
      }

      ul {

        li {
          @include flex(row, flex-start, center, 5px);
          height: 5vh;
          border-bottom: 1px solid #cccccc60;
          padding-left: 1vw;
          @include tr-p;
          color: $ml-text-menu;


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
  }
}

</style>