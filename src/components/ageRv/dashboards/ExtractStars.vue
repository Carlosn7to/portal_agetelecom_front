<template>
  <div class="content-extract"
       :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
    <h1>Extrato - {{ title }}</h1>
    <div id="filters">
      <input type="text"
             name="search"
             id="search"
             autocomplete="off"
             placeholder="Pesquisar nome..."
             v-model="search">
      <button @click="returnPage()">Voltar</button>
    </div>
    <div class="items-header">
      <div class="item" style="width: 40%; justify-content: flex-start">
        <span>Plano</span>
      </div>
      <div class="item" style="justify-content: center; width: 20%">
        <span>Quantidade</span>
      </div>
      <div class="item" style="justify-content: center;  width: 20%">
        <span>Valor da estrela</span>
      </div>
      <div class="item" style="justify-content: center;width: 20%">
        <span>Estrelas totais</span>
      </div>
    </div>
    <div class="container-body">
      <div class="items-body" v-for="item in data" :key="item.plan">
        <div class="item" style="width: 40%; justify-content: flex-start">
          <span>{{ item.plan }}</span>
        </div>
        <div class="item" style="justify-content: center; width: 20%">
          <span>{{ item.count }}</span>
        </div>
        <div class="item" style="justify-content: center;  width: 20%">
          <span>{{ item.valueStar }}</span>
        </div>
        <div class="item" style="justify-content: center; width: 20%">
          <span>{{ item.stars }}</span>
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
    },
    mode: {
      type: String
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
  computed: {}
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
      padding: 0 .2vw;

      span {
        padding: 2vh 0 !important;
      }
    }
  }
}

.mode-d-p {
  h1 {
    color: $md-text-h1 !important;
  }

  input[type=text] {
    background-color: $md-back-l;
    border: 2px solid $age-or !important;
    color: $age-or !important;
  }

  /*   PLACEHOLDER   */
  ::-webkit-input-placeholder {
    color: $age-or;
  }

  button {
    background-color: $age-or !important;
    border-color: $age-or !important;

    &:hover {
      background-color: $md-back-l !important;
      color: $age-or !important;
    }
  }

  .items-body {
    border-color: $md-back-l !important;
    background-color: transparent !important;

    &:hover {
      border-color: $age-or !important;
    }
  }

  .item {
    background-color: $md-back-l !important;
    span {
      color: $md-text-light !important;
    }
  }

  /*   SCROLL BAR   */
  ::-webkit-scrollbar-track {
    background-color: $md-back-l;
  }
  ::-webkit-scrollbar-thumb {
    background: $age-or !important;
  }
}

</style>