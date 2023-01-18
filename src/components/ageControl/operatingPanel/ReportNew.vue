<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Incluir relato manualmente</h1>

      <form action="#">
        <div class="inputs">
          <label for="conductor">Condutor: <b>*</b></label>
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
          <label for="km-report">Quilometragem relatada: <b>*</b></label>
          <input type="number" min="1" name="km-report" id="km-report" required>
        </div>
        <div class="inputs">
          <label for="period">Período relatado: <b>*</b></label>
          <select required>
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
              Volta do almoço
            </option>
            <option>
              Saída
            </option>
          </select>
        </div>
        <div class="inputs file">
          <label for="image">Imagem: <i>.PNG, .JPEG</i> <b>*</b></label>
          <label for="image" id="btn-file">Adicionar arquivo</label>
          <input type="file" name="image" id="image" style="display: none" required>
        </div>
        <button>
          Cadastrar relato
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportNew",
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
          height: 6vh;
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

      button {
        @include button-pattern;
        margin: 4vh 0;
        height: 6vh;
      }
    }
  }
}

</style>