<template>
  <div class="container-tools">
    <div class="searchs">

      <div class="inputs large">
        <label for="name">Nome:</label>
        <input type="text" name="name" id="name"  autocomplete="off" v-model="inputs.name" @keyup="getInfo">
      </div>
      <div class="inputs large">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email"  autocomplete="off" v-model="inputs.email" @keyup="getInfo">
      </div>
      <div class="inputs small">
        <label for="number">Número:</label>
        <input type="number" name="number" id="number"  autocomplete="off" v-model="inputs.number" @keyup="getInfo">
      </div>
      <div class="inputs small">
        <label for="cep">Cep:</label>
        <input type="text" name="cep" id="cep"  autocomplete="off" v-model="inputs.cep" @keyup="getInfo">
      </div>
      <div class="inputs large">
        <label for="address">Endereço:</label>
        <input type="text" name="address" id="address"  autocomplete="off" v-model="inputs.address" @keyup="getInfo">
      </div>
      <div class="inputs medium">
        <label for="neighborhood">Bairro:</label>
        <input type="text" name="neighborhood" id="neighborhood"  autocomplete="off" v-model="inputs.neighborhood" @keyup="getInfo">
      </div>

      <div class="inputs medium">
        <label for="document">Documento:</label>
        <input type="text" name="document" id="document"  autocomplete="off" v-model="inputs.document" @keyup="getInfo">
      </div>
      <div class="inputs medium">
        <label for="tel">Telefone:</label>
        <input type="text" name="tel" id="tel" v-model="inputs.tel" @keyup="getInfo">
      </div>
      <div class="inputs medium">
        <label for="cel">Celular:</label>
        <input type="text" name="cel" id="cel" v-model="inputs.cel" @keyup="getInfo">
      </div>

    </div>
    <div class="results">

      <div class="item contracts">
        <h1>Contratos</h1>



        <div class="table">
          <table>
            <thead>
            <tr>
              <th>
                id
              </th>
              <th>Nome</th>
              <th>Bairro</th>
              <th>Status</th>
              <th>Estágio</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Número</th>
              <th>Cep</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>

            </tbody>
          </table>

        </div>

      </div>

      <div class="item peoples">
        <h1>Pessoas</h1>

        <div class="table">
          <table>
            <thead>
            <tr>
              <th>
                id
              </th>
              <th>Nome</th>
              <th>Bairro</th>
              <th>Status</th>
              <th>Estágio</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Número</th>
              <th>Cep</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>10</td>
              <td>Carlos Alberto M da f Neto</td>
              <td>Riacho fundo 1</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>619847700440</td>
              <td>carlos.neto@agetelecom.com.br</td>
              <td>Qn 1 conjunto 26 casa xxxxxx</td>
              <td>XXXXX</td>
              <td>XXXXX-XXX</td>
            </tr>
            </tbody>
          </table>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookies from 'js-cookie';

export default {
  name: "HomeAntiFraud",
  data () {
    return {
      inputs: {
        name: '',
        email: '',
        number: null,
        cep: '',
        address: '',
        neighborhood: '',
        document: '',
        tel: '',
        cel: '',
      }
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ]),
    getInfo: function () {
      AXIOS({
        method: 'GET',
        url: '',
        headers: {
          'Authorization': 'Bearer' + Cookies.get('token')
        },
        params: {fields: this.inputs}
      })
          .then((res) => {
            console.log(res)
          })
    }
  },
  beforeMount() {
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style scoped lang="scss">


.container-tools {
  @include flex(column, flex-start, initial, 1vh);


  .searchs {
    width: 100%;
    background-color: #6A6CF610;
    border-radius: 5px;
    @include flex(row, flex-start, initia, .5vw);
    flex-wrap: wrap;
    padding: 2vh 2vw 3vh 2vw;

    .inputs {
      @include flex(column, flex-start, initial, .5vh);

      label {
        font-size: 1rem;
        font-weight: 500;
      }

      input {
        @include inp-form-text;
        height: 5vh;
      }
    }

    .small {
      width: 12%;
    }

    .medium {
      width: 17%;
    }

    .large {
      width: 25%;
    }

  }

  .results {
    width: 100%;
    border-radius: 5px;
    height: 60vh;
    @include flex(column, center, initial, 2vh);
    padding: 1vh 0vw;

    .item {
      height: 45%;
      border: 2px solid $border;
      border-radius: 10px;
      border-top: 5px solid $primary;
      padding: 1vh 1vw;
      background-color: #fff;

      h1 {
        font-size: 2rem;
        text-align: center;
      }

      .table {
        max-height: 80%;
        overflow-y: auto;
        table {
          width: 100%;
          border-collapse: collapse;


          th, td {
            text-align: left;
          }

          th:nth-child(1), td:nth-child(1) {
            width: 5%;
            text-align: center;
          }

          th {
            font-size: 1.2rem;
            color: $h1-light;
            border-bottom: 2px solid $border;
            height: 5vh;
          }

          td {
            height: 6vh;
            border-bottom: 1px solid $border-hover;
            font-size: 1rem;
            color: $h1-black;
            font-weight: 500;
          }
        }

      }

    }

    .contracts {

    }

    .peoples {
    }

  }

}

</style>