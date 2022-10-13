<template>
  <div id="card-modal">
    <div id="close-button">
      <i class="fi fi-rr-cross-small" @click="closePage"></i>
    </div>
    <div class="header">
      <div class="icons-progress" :class="{ 'select' : step === 0 || step === 1 || step === 2}">
        <i class="fi fi-rr-id-badge"></i>
      </div>
      <div class="line-progress">
        <div  :class="{ 'select' : step === 1 || step === 2}"></div>
      </div>
      <div class="icons-progress" :class="{ 'select' : step === 1 || step === 2}">
        <i class="fi fi-rr-apps-add"></i>
      </div>
      <div class="line-progress">
        <div  :class="{ 'select' : step === 2}"></div>
      </div>
      <div class="icons-progress" :class="{ 'select' : step === 2}">
        <i class="fi fi-rr-search-alt"></i>
      </div>
    </div>
    <div class="body" v-if="page === 'data'">
      <h1>Dados cadastrais</h1>
      <form action="#" @submit.prevent>
        <div class="inputs">
          <label for="name">Nome</label>
          <input type="text" id="name" name="name" autocomplete="off" placeholder="Exemplo: João da silva...">
        </div>
        <div class="inputs">
          <label for="level">Nível de acesso</label>
          <select name="level">
            <option selected>--- Nenhum valor selecionado ---</option>
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
            <option value="master">Master</option>
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
        <div class="item">
          <div class="name">
            <i class="fi fi-rr-stats"></i>
            <span>AgeBoard</span>
          </div>
          <div class="more">
            <i class="fi fi-rr-arrow-square-right"></i>
          </div>
        </div>
        <div class="item">
          <div class="name">
            <i class="fi fi-rr-document"></i>
            <span>AgeReport</span>
          </div>
          <div class="more">
            <i class="fi fi-rr-arrow-square-right"></i>
          </div>
        </div>
        <button @click="step = 2, page = 'revise'">Próxima</button>
      </div>
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
export default {
  name: "NewUser",
  data () {
    return {
      step: 0,
      page: 'data'
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    }
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