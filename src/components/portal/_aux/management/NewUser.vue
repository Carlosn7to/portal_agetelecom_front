<template>
  <div id="card-modal">
    <div id="close-button">
      <i class="fi fi-rr-cross-small" @click="closePage"></i>
    </div>
    <div class="header">
      <div class="icons-progress" :class="{ 'select' : step === 0 || step === 1 || step === 2}">
        <i class="fi fi-rr-id-badge" @click="page = 'data'"></i>
      </div>
      <div class="line-progress">
        <div  :class="{ 'select' : step === 1 || step === 2}"></div>
      </div>
      <div class="icons-progress" :class="{ 'select' : step === 1 || step === 2}">
        <i class="fi fi-rr-apps-add" @click="page = 'modules'"></i>
      </div>
      <div class="line-progress">
        <div  :class="{ 'select' : step === 2}"></div>
      </div>
      <div class="icons-progress" :class="{ 'select' : step === 2}">
        <i class="fi fi-rr-search-alt" @click="page = 'revise'"></i>
      </div>
    </div>
    <div class="body" v-if="page === 'data'">
      <h1>Dados cadastrais</h1>
      <form action="#" @submit.prevent>
        <div class="inputs">
          <label for="name">Nome</label>
          <input type="text" id="name" name="name" autocomplete="off" v-model="data.name" placeholder="Exemplo: João da silva...">
        </div>
        <div class="inputs">
          <label for="level">Nível de acesso</label>
          <select name="level" v-model="data.level">
            <option disabled selected>--- Nenhum valor selecionado ---</option>
            <template v-for="item in levelData" :key="item.id">
              <option :value="item.id">{{ item.nivel }}</option>
            </template>
          </select>
        </div>
        <button @click="step = 1, page = 'modules'">Próxima</button>
      </form>
    </div>
    <div class="body animation-left" v-if="page === 'modules'">
      <h1>Módulos disponíveis</h1>
      <div class="items">
        <div class="item">
          <div class="name">
            <i class="fi fi-rr-star"></i>
            <span>AgeRv</span>
          </div>
          <div class="more">
            <i class="fi fi-rr-arrow-square-right" @click="page = 'agerv'"></i>
          </div>
        </div>
<!--        <div class="item">-->
<!--          <div class="name">-->
<!--            <i class="fi fi-rr-stats"></i>-->
<!--            <span>AgeBoard</span>-->
<!--          </div>-->
<!--          <div class="more">-->
<!--            <i class="fi fi-rr-arrow-square-right" @click="page = 'ageboard'"></i>-->
<!--          </div>-->
<!--        </div>-->
        <div class="item">
          <div class="name">
            <i class="fi fi-rr-document"></i>
            <span>AgeReport</span>
          </div>
          <div class="more">
            <i class="fi fi-rr-arrow-square-right" @click="page = 'agereport'"></i>
          </div>
        </div>
        <button @click="step = 2, page = 'revise'">Próxima</button>
      </div>
    </div>
    <div class="body animation-left" v-if="page === 'agerv'">
      <h1>Módulo - AgeRv</h1>
      <form action="#">
        <div class="inputs">
          <label for="level">Nível de acesso</label>
          <select name="level" v-model="data.systems.agerv.level">
            <option disabled selected> --- Nenhum nível selecionado ---</option>
            <template v-for="item in levelData" :key="item.id">
              <option :value="item.id">{{ item.nivel }}</option>
            </template>
          </select>
        </div>
        <div class="inputs">
          <label for="function">Função</label>
          <select name="function" v-model="data.systems.agerv.function">
            <option disabled selected> --- Nenhuma função selecionada ---</option>
            <template v-for="item in functionData" :key="item.id">
              <option :value="item.id" >{{ item.funcao }}</option>
            </template>
          </select>
        </div>
        <div class="buttons">
          <button @click="page = 'modules'">Voltar</button>
          <button v-if="data.systems.agerv.permmitted === false" @click="data.systems.agerv.permmitted = true, page = 'modules'" style="width: 85%">Liberar permissão</button>
          <button v-else @click="data.systems.agerv.permmitted = false, page = 'modules'" style="width: 85%">Revogar permissão</button>
        </div>
      </form>
    </div>
    <div class="body animation-left" v-if="page === 'agereport'">
      <h1>Módulo - AgeReport</h1>
      <form action="#">
        <div class="inputs">
          <label for="level">Nível de acesso</label>
          <select name="level"  v-model="data.systems.agereport.level">
            <option selected disabled> --- Nenhum nível selecionado ---</option>
            <template v-for="item in levelData" :key="item.id">
              <option :value="item.id">{{ item.nivel }}</option>
            </template>
          </select>
        </div>
        <div class="inputs">
          <label for="function">Função</label>
          <select name="function" v-model="data.systems.agereport.function">
            <option selected> --- Nenhuma função selecionada ---</option>
            <template v-for="item in functionData" :key="item.id">
              <option :value="item.id">{{ item.funcao }}</option>
            </template>
          </select>
        </div>
        <div class="buttons">
          <button @click="page = 'modules'">Voltar</button>
          <button v-if="data.systems.agereport.permmitted === false" @click="data.systems.agereport.permmitted = true, page = 'modules'" style="width: 85%">Liberar permissão</button>
          <button v-else @click="data.systems.agereport.permmitted = false, page = 'modules'" style="width: 85%">Revogar permissão</button>
        </div>
      </form>
    </div>
    <div class="body animation-left" v-if="page === 'revise'">
      <h1>Revise os dados</h1>
      <form action="#">
        <div class="checkbox">
          <label for="systems">Sistemas</label>
          <input type="checkbox" name="agerv" id="agerv" value="agerv">
        </div>
        <button @click="step = 0, page = 'data'">Finalizar cadastro</button>
      </form>
    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../../../services/api.ts";

export default {
  name: "NewUser",
  data () {
    return {
      step: 0,
      page: 'data',
      levelData: {},
      functionData: {},
      data: {
        name: '',
        level: '--- Nenhum valor selecionado ---',
        systems: {
          agerv: {
            level: null,
            function: null,
            permmitted: false
          },
          agereport: {
            level: null,
            function: null,
            permmitted: false
          },
          ageboard: {
            level: null,
            function: null,
            permmitted: false
          }
        }
      }
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    getLevel: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/level'
      })
      .then((res) => {
        this.levelData = res.data
      })
    },
    getFunction: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/function'
      })
        .then((res) => {
          this.functionData = res.data
        })
    }
  },
  beforeMount() {
    this.getLevel()
    this.getFunction()
  }
}
</script>

<style scoped lang="scss">

  #card-modal {
    width: 80vw;
    height: 90vh;
    background-color: $back-main !important;

    .header {
      @include flex(row, space-around, center, 3vw);
      padding: 3vh 5vw;

      .icons-progress {
        border: 3px solid #cccccc;
        border-radius: 50%;
        padding: 15px 18px;
        color: #cccccc;

        i {
          font-size: 2.4rem;
          padding-top: 2px;
          @include tr-p;
        }
      }

      .select {
        border-color: $age-or;

        i {
          color: $age-bl;
        }


      }

      .line-progress {
        height: .2rem;
        width: 30%;

        div {
          height: 100%;
          background: #777;
        }

        .select {
          background-color: $age-or !important;
        }

      }
    }

    .body {
      
      h1 {
        text-align: center;
        font-size: 2.4rem;
        color: $ml-text-h1;
        margin-bottom: 3vh;
      }
      form {
        margin: 0 auto;
        width: 60%;
        @include flex(column, flex-start, initial, 3vh);
        .inputs {
          @include flex(column, flex-start, initial, 5px);

          label {
            font-size: 1.4rem;
            color: #333;
          }
          input[type=text], select {
            height: 6vh;
            padding: 5px;
            border: 2px solid #cccccc70;
            border-radius: 3px;
            color: #333;
          }

          }

        span {
          font-size: 1.4rem;
          font-weight: 500;
          color: $ml-text-h1;
        }

        .checkbox {
          @include flex(row, flex-start, center, 5px);
          font-size: 1.2rem;
          font-weight: 500;
        }

        button {
          width: 60%;
          margin: 0 auto;
          margin-top: 3vh;
          height: 6vh;
          padding: 7px 15px;
          background-color: $age-bl;
          color: #fff;
          font-weight: 500;
          border: 1px solid $age-bl;
          @include tr-p;
          border-radius: 3px;

          &:hover {
            background-color: #fff;
            color: $age-bl;
            border-color: $age-bl;
          }
        }
      }

      .buttons {
        @include flex(row, flex-start, center, 10px);

        button:nth-child(1) {
          width: 15%;
          background-color: $age-or;
          border-color: $age-or;

          &:hover {
            background-color: #fff;
            border-color: $age-or;
            color: $age-or;
          }
        }
      }

      .items {
        @include flex(column, flex-start, initial, 3vh);
        width: 60%;
        margin: 0 auto;

        .item {
          background-color: #fff;
          width: 100%;
          border-radius: 3px;
          @include sh-h;
          @include flex(row, space-between, center, 0);
          padding: 3vh 2vw;

          .name {
            @include flex(row, flex-start, center, 10px);

            span {
              font-size: 1.6rem;
              padding-bottom: 2px;
              font-weight: 500;
              color: $age-bl;
            }

            i {
              font-size: 2.2rem;
              color: $age-or;
            }
          }

          .more {

            i {
              @include tr-p;
              font-size: 1.8rem;
              color: $age-bl;

              &:hover {
                color: $age-or;
              }
            }

          }

        }
      }

      button {
        width: 60%;
        margin: 0 auto;
        margin-top: 3vh;
        height: 6vh;
        padding: 7px 15px;
        background-color: $age-bl;
        color: #fff;
        font-weight: 500;
        border: 1px solid $age-bl;
        @include tr-p;
        border-radius: 3px;

        &:hover {
          background-color: #fff;
          color: $age-bl;
          border-color: $age-bl;
        }
      }
    }
  }

  .animation-left {
    animation: left .4s forwards;
  }

  @keyframes left {
    from {
      transform: translateX(100px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

</style>