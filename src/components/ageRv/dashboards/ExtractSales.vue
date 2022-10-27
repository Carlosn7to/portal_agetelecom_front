<template>
  <div class="content-extract">
    <h1>Extrato - {{ title }}</h1>
    <div id="filters">
      <input type="text"
             name="search"
             id="search"
             autocomplete="off"
             placeholder="Pesquisar"
             v-model="search">
      <button @click="returnPage()">Voltar</button>
    </div>
    <div class="items-header">
      <div class="item" style="width: 12%">
        <span>Contrato</span>
      </div>
      <div class="item" style="justify-content: flex-start; width: 20%">
        <span>Cliente</span>
      </div>
      <div class="item" style="justify-content: flex-start;width: 20%">
        <span>Plano</span>
      </div>
      <div class="item">
        <span>Dt aprovação</span>
      </div>
      <div class="item">
        <span>Dt cancelamento</span>
      </div>
      <div class="item">
        <span>Status</span>
      </div>
      <div class="item">
        <span>Situação</span>
      </div>
    </div>
    <div class="container-body">
      <div class="items-body" v-for="item in ClientsFiltered" :key="item.id_contrato">
        <div class="item" style="width: 12%">
          <span>{{ item.id_contrato }}</span>
        </div>
        <div class="item" style="justify-content: flex-start; width: 20%">
          <span>{{ item.nome_cliente }}</span>
        </div>
        <div class="item" style="justify-content: flex-start;width: 20%">
          <span>{{ item.plano }}</span>
        </div>
        <div class="item">
          <span>{{ item.data_ativacao }}</span>
        </div>
        <div class="item">
          <span>{{ item.data_cancelamento }}</span>
        </div>
        <div class="item">
          <span>{{ item.status }}</span>
        </div>
        <div class="item">
          <span>{{ item.situacao }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtractSales",
  props: {
    title: {
      required: true,
      type: String
    },
    data: {
      required: true
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    returnPage: function () {
      this.$emit('return-page');
    }
  },
  computed: {
    ClientsFiltered: function () {
      let values = []
      values = this.data.filter((value) => {
        return (
            value.nome_cliente.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  }
}
</script>

<style scoped lang="scss">

.content-extract  {
  padding: 2vh 1vw;
  height: 95%;
  @include flex(column, flex-start, initial, 3vh);


  #filters {
    width: 100%;
    height: 10%;
    @include flex(row, flex-start, center, 15px);

    button {
      padding: 7px 30px;
      border-radius: 3px;
      font-weight: 600;
      @include tr-p;
      @include button-pattern;
    }

    input[type=text] {
      width: 25%;
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
      border: none;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      &:focus {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      }
    }
  }

  .items-header {
    @include table-card-headers;
    text-align: center;
  }

  .container-body {
    @include table-card-body;

    .items-body {
      min-height: 15%;

      span {
        padding: 2vh 0 !important;
      }
    }
  }
}

</style>