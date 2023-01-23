<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Filtros</h1>

      <form action="#">
        <div class="inputs">
          <label for="conductor">Condutor</label>
          <select required>
            <option value=""
                    style="padding-left: 0"
                    selected>
              --- Nenhum condutor selecionado ---
            </option>
            <option>
              Carlos Neto
            </option>
            <option>
              Regiane
            </option>
            <option>
              Roni
            </option>
            <option>
              Rhuan
            </option>
          </select>
        </div>
        <div class="inputs">
          <label for="group">Grupo</label>
          <select required>
            <option value=""
                    style="padding-left: 0"
                    selected>
              --- Nenhum grupo selecionado ---
            </option>
            <option>
              Age
            </option>
            <option>
              WT
            </option>
          </select>
        </div>
        <div class="inputs">
          <label for="group">Tipo de veículo</label>
          <select required>
            <option value=""
                    style="padding-left: 0"
                    selected>
              --- Nenhum tipo de veículo selecionado ---
            </option>
            <option>
              Carro
            </option>
            <option>
              Moto
            </option>
          </select>
        </div>
        <div class="inputs">
          <label for="period">Período referente</label>
          <select required name="reference">
            <option value=""
                    style="padding-left: 0"
                    selected>
              --- Nenhum período selecionado ---
            </option>
            <option>
              Entrada
            </option>
            <option>
              Saída para almoço
            </option>
            <option>
              Retorno do almoço
            </option>
            <option>
              Saída
            </option>
          </select>
        </div>
        <div class="inputs">
          <label for="period">Status</label>
          <select required name="reference">
            <option value=""
                    style="padding-left: 0"
                    selected>
              --- Nenhum período selecionado ---
            </option>
            <option>
              Aprovado
            </option>
            <option>
              Pendente
            </option>
          </select>
        </div>
        <div class="inputs date">
          <label for="period">Data</label>
          <div class="inpt-date">
            <input type="date" name="first-date">
            <span>à</span>
            <input type="date" name="last-date">
          </div>
        </div>
        <button>
          Filtrar relatos
        </button>
      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: "FilterReportAll",
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 30vw;
    background-color: $back-main;


    #close-button {
      height: initial;
    }

    h1 {
      text-align: center;
    }

    form {
      margin-top: 2vh;
      width: 100%;
      height: 60%;
      @include flex(column, flex-start, center, 2vh);

      .inputs {
        @include flex(column, flex-start, initial, 1vh);
        width: 70%;

        label {
          font-size: 1.4rem;
          font-weight: 500;
          b {
            color: $red;
          }
        }

        select {
          @include inp-t-g;
          height: 5vh;
          padding: 0;
          font-size: 1.2rem;
          color: $ml-text-h1;
          font-weight: 500;
          option{
            padding-left: 2vw;
          }
        }

        input[type=number] {
          @include inp-t-g;
          background-color: #eaeaea;
        }

        #btn-file {
          @include button-pattern;
          width: 80%;
          margin: 0 auto;
          text-align: center;
          background-color: #fff;
          color: $age-bl;

          &:hover {
            background-color: $age-bl;
            color: #fff;
          }
        }

      }

      .inpt-date {
        @include flex(row, flex-start, center, .5vw);

        span {
          font-size: 1.4rem;
        }


        input {
          height: 5vh;
          padding-left: 5px;
          background-color: #EEEEEE;
          border: 1px solid #1E1F21;
        }
      }

      button {
        @include button-pattern;
        margin: 4vh 0;
        height: 5vh;
      }
    }

  }
}

</style>