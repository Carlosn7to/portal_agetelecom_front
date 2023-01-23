<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div id="info-report">
        <table>
          <tr>
            <th>Condutor</th>
            <th>Veículo</th>
            <th>Período</th>
          </tr>
          <tr>
            <td>Carlos Neto</td>
            <td>Moto</td>
            <td>Manhã</td>
          </tr>
          <tr>
            <th>Grupo</th>
            <th>Fabricante/Modelo</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>Age</td>
            <td>Honda/JSA-2198</td>
            <td>Pendente</td>
          </tr>
        </table>
      </div>
      <div id="content-report">
        <div id="data-report">
          <div id="form">
            <div class="inputs">
              <label for="km-conductor">Quilometragem relatada</label>
              <input type="number" min="1" max="999999" name="km-conductor" id="km-conductor" value="1022">
            </div>
          </div>
          <button>
            <i class="fi fi-rr-check"></i>
            <span>
              Aprovar
            </span>
          </button>
        </div>
        <div id="img-report">
          <img src="https://i.ibb.co/2P3Www1/Whats-App-Image-2023-01-17-at-10-44-48.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "ReportManagement",
  components: {},
  props: {
    data: {
      required: true
    }
  },
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
    width: 80vw;
    height: 95vh;
    background-color: $back-main;

    #info-report {
      width: 60%;
      height: 20%;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 5px;
      border: 2px solid #cccccc70;
      padding: 2vh 2vw;

      table {
        text-align: left;
        width: 100%;
        height: 100%;

        th {
          font-size: 1.2rem;
          color: $age-bl;
        }

        td {
          font-size: 1.2rem;
          color: $ml-text-h1;
          font-weight: 500;
        }
      }

    }

    #content-report {
      width: 60%;
      height: 65%;
      background-color: #fff;
      margin: 2vh auto;
      border: 2px solid #cccccc70;
      @include flex(row, center, center, 1vw);
      border-radius: 5px;

      #data-report {
        width: 50%;
        height: 100%;
        @include flex(column, flex-start, center, 4vh);
        padding: 2vh 2vw;

        #form {
          width: 100%;
          margin-top: 5vh;
          @include flex(column, center, center, 2vh);
          .inputs {
            @include flex(column, flex-start, initial, 1vh);
            width: 100%;

            label {
              font-size: 1.2rem;
              color: $ml-text-menu;
              font-weight: 600;
            }

            input[type=number] {
              @include inp-t-g;
              height: initial;
              padding: 10px 5px;
              width: 100%;
            }
          }

        }

        button {
          @include button-pattern;
          @include flex(row, center, center, .5vw);
          width: 100%;

          i {
            font-size: 1.6rem;
          }

          span {
            font-size: 1.4rem;
            padding-bottom: 2px;

          }
        }
      }

      #img-report {
        width: 50%;
        height: 100%;
        border-left: 2px solid #cccccc70;

        img {
          width: 100%;
          height: 100%;
        }

      }
    }
  }
}

</style>