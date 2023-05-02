<template>
  <div class="container-tools">
    <div class="searchs">
        <h2>
          Filtros
        </h2>
      <div class="inputs large">
        <label for="name">Nome:</label>
        <input type="text" name="name" id="name"  autocomplete="off" v-model="fields.name" @keypress.enter="getInfo">
      </div>
      <div class="inputs large">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email"  autocomplete="off" v-model="fields.email" @keypress.enter="getInfo">
      </div>
      <div class="inputs small">
        <label for="number">Número:</label>
        <input type="text" name="number" id="number"  autocomplete="off" v-model="fields.number" @keypress.enter="getInfo">
      </div>
      <div class="inputs small">
        <label for="cep">Cep:</label>
        <input type="text" name="cep" id="cep"  autocomplete="off" v-model="fields.cep" @keypress.enter="getInfo">
      </div>
      <div class="inputs large">
        <label for="address">Endereço:</label>
        <input type="text" name="address" id="address"  autocomplete="off" v-model="fields.address" @keypress.enter="getInfo">
      </div>
      <div class="inputs medium">
        <label for="neighborhood">Bairro:</label>
        <input type="text" name="neighborhood" id="neighborhood"  autocomplete="off" v-model="fields.neighborhood" @keypress.enter="getInfo">
      </div>

      <div class="inputs medium">
        <label for="document">Documento:</label>
        <input type="text" name="document" id="document"  autocomplete="off" v-model="fields.document" @keypress.enter="getInfo">
      </div>
      <div class="inputs medium">
        <label for="tel">Telefone:</label>
        <input type="text" name="tel" id="tel" v-model="fields.tel" @keypress.enter="getInfo">
      </div>
      <div class="inputs medium">
        <label for="cel">Celular:</label>
        <input type="text" name="cel" id="cel" v-model="fields.cel" @keypress.enter="getInfo">
      </div>

    </div>
    <div class="results">

      <div class="item peoples">
        <h1>Pessoas</h1>

        <div class="table"  v-if="data.length > 0 && !loading">
          <table>
            <thead>
            <tr>
              <th>Nome</th>
              <th>Bairro</th>
              <th>Celular</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Número</th>
              <th>Cep</th>
              <th>Situação</th>
              <th>Status</th>
              <th>Conexão</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in data || []" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.neighborhood }}</td>
              <td>{{ item.cell_phone_1 }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.street }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.postal_code }}</td>
              <td>{{ item.v_stage }}</td>
              <td>{{ item.v_status }}</td>
              <td>{{ item.user }}</td>
            </tr>
            </tbody>
          </table>

        </div>

        <div class="not-data" v-if="!data.length && !loading">
          <i class="fi fi-rr-search"></i>
          <h1>Nenhum valor retornado, utilize os campos de filtro.</h1>
        </div>

        <div class="loading" v-if="loading">
            <LoadingSpinner/>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookies from 'js-cookie';
import LoadingSpinner from "@/components/portal/_aux/LoadingSpinner";

export default {
  name: "HomeAntiFraud",
  components: {LoadingSpinner},
  data () {
    return {
      fields: {
        name: '',
        email: '',
        number: null,
        cep: '',
        address: '',
        neighborhood: '',
        document: '',
        tel: '',
        cel: '',
      },
      data: {},
      loading: false
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ]),
    getInfo: function () {
      this.loading = true
      AXIOS({
        method: 'GET',
        url: '/agetools/tools/antifraud',
        headers: {
          'Authorization': 'Bearer' + Cookies.get('token')
        },
        params: this.fields
      })
      .then((res) => {
        this.loading = false
        this.data = res.data[0]
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
  @include flex(row, space-between, initial, 2vw);
  height: 100%;


  .searchs {
    width: 20%;
    height: 100%;
    @include card();
    border-radius: 5px;
    @include flex(column, center, center, .5vh);
    flex-wrap: wrap;
    padding: 2vh 2vw 3vh 2vw;

    .inputs {
      @include flex(column, flex-start, initial, .5vh);
      width: 100%;

      label {
        font-size: 1rem;
        font-weight: 500;
      }

      input {
        @include inp-t-g();
        height: 5vh;
        width: 100%;
      }
    }


  }

  .results {
    width: 80%;
    max-width: 80%;
    height: 100%;
    @include flex(column, center, initial, 2vh);

    .item {
      height: 100%;
      padding: 1vh 1vw;
      @include card();

      h1 {
        font-size: 2rem;
        text-align: center;
      }

      .table {
        max-height: 100%;
        overflow-y: auto;
        table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 10px;
          table-layout: fixed;


          th, td {
            text-align: left;
          }

          th:nth-child(3), th:nth-child(6),th:nth-child(7),
          td:nth-child(3), td:nth-child(6),td:nth-child(7),{
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
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            text-transform: capitalize;
            user-select: text;

          }
        }

      }

    }


    .peoples {
      overflow: hidden !important;

    }


    .not-data {
      height: 80%;
      @include flex(column, center, center, 0);


      i {
        font-size: 6rem;
        color: $h1-light;
      }

      h1 {
        font-size: 2rem;
        color: $h1-black;
        font-weight: 500;
      }
    }

    .loading {
      width: 100%;
      height: 80%;
      @include flex(row, center, center, 0);
      position: relative;


    }

  }

}

</style>