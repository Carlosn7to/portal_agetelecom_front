<template>
  <div class="container">
    <div class="filters">
      <div class="search">
        <input type="text" name="search" id="search"
          placeholder="Buscar..."
          autocomplete="off"
        >
      </div>
      <div class="filter">
        <button @click="modalAction">
          <i class="fi fi-rs-filter"></i>
        </button>
        <button v-if="filtered">
          <i class="fi fi-rs-filter-slash"></i>
        </button>
      </div>

    </div>
    <div class="data">
      <div class="table">
        <table>
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Nº do contrato</th>
              <th>Nome do cliente</th>
              <th>Status</th>
              <th>Equipe</th>
              <th>Técnico</th>
              <th>Data inicio att.</th>
              <th>Data fim att.</th>
              <th>Situacao do contrato</th>
              <th>Status do contrato</th>
              <th>Contexto</th>
              <th>Problema</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>

            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>

            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>
            <tr>
              <td>54156</td>
              <td>28316</td>
              <td>Carlos A. M. F. Neto</td>
              <td>Em campo</td>
              <td>Age Técnicos</td>
              <td>Joao gomes da Silva</td>
              <td>31/05/2023</td>
              <td>01/06/2023</td>
              <td>Aprovado</td>
              <td>Normal</td>
              <td>Ativação concluída</td>
              <td>Instalado</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  </div>
  <div class="modal-filters" v-if="modal">
    <div class="card-modal">
      <div class="close-button">
        <i class="fi fi-rs-cross"  @click="modalAction"></i>
      </div>
      <h2>Filtros disponíveis</h2>
      
      <div class="filters-available">
        <div class="filter-available">
          <label for="typeNote">Tipo de solicitação: </label>
          <select name="typeNote" id="typeNote">
            <option value="1">teste</option>
          </select>
        </div>
        <div class="filter-available">
          <label for="dateSchedule">Data do agendamento: </label>
          <input type="date" name="dateSchedule" id="dateSchedule">
        </div>
        <div class="filter-available">
          <label for="region">Região: </label>
          <select name="region" id="region">
            <option value="1">Asa Sul</option>
          </select>
        </div>
        <div class="filter-data">
          <button>Filtrar</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "HomeSchedule",
  data() {
    return {
      filtered: false,
      modal: false
    }
  },
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ]),
    modalAction() {
      this.modal = !this.modal;
    }
  },
  beforeMount() {
      this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style scoped lang="scss">

.container {
  width: 100%;
  height: 100%;
  @include flex(column, space-between, initial, 1vh);

  .filters {
    width: 100%;
    height: 15%;
    @include card();
    @include flex(row, flex-start, center, 1vw);

    .search {
      width: 30%;

      input {
        width: 100%;
        @include card();
      }
    }

    .filter {
      @include flex(row, flex-start, center, 1vw);

      button {
        @include btn-dashboard(true);

        i {
          color: #fff;
        }
      }
    }
  }

  .data {
    width: 100%;
    height: 84%;
    @include card();

    .table {
      width: 100%;
      max-height: 100%;
      overflow-y: auto;

      table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;

        thead {
          tr {
            th {
              padding: 1vh 1vw;
              border-bottom: 1px solid $border;
              font-size: 1.2rem;
              font-weight: 500;
              color: $h1-black;
              text-align: center;
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 1vh 1vw;
              border-bottom: 1px solid $border;
              font-size: 1.2rem;
              font-weight: 400;
              color: $h1-black;
              text-align: center;
              user-select: text;

            }
          }
        }
      }
    }

  }
}

.modal-filters {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #33333330;
  @include flex(row, center, center, 0);


  .card-modal {
    width: 30vw;
    @include card();
    @include flex(column, flex-start, intial, 3vh);

    .close-button {
      @include flex(row, flex-end, center, 1vw);
      i {
        font-size: 1.4rem;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }

    }

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      text-align: center;
      color: $h1-black;
    }

    .filter-available {
      padding: 1vh 3vw;
      @include flex(column, flex-start, initial, 1vh);

      label {
        font-size: 1.2rem;
        font-weight: 500;
        color: $h1-black;
      }

      select, input {
        width: 100%;
        padding: 10px 8px;
        border-radius: 5px;
        outline: none;
        border: 1px solid $border;
        transition: border ease-in-out .2s;
        margin-bottom: 10px;

        &:focus {
          border-color: $border-hover;
        }
      }

    }

    .filter-data {
      @include flex(row, center, center, 0);
      button {
        @include btn-dashboard(true);
      }
    }
  }
}

</style>