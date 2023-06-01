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
        <button v-if="dataItems.length" @click="download">
          <i class="fi fi-rs-file-excel"></i>
        </button>
      </div>
      <span>Contagem do resultado: <b>{{ dataItems.length ? dataItems.length : 0 }}</b></span>

    </div>
    <div class="data">
      <div class="table">
        <table  v-if="!loading">
          <thead>
            <tr>
              <th>
                <div class="filters-arrow">
                  <span>Protocolo</span>
                  <div class="filters-options">
                    <i class="fi fi-sr-sort-alt" @click="ordenateData('protocol', 'up')" v-if="orders.protocol === 'no-order'"></i>
                    <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('protocol', 'down')" v-if="orders.protocol === 'up'"></i>
                    <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('protocol', 'no-order')" v-if="orders.protocol === 'down'"></i>
                  </div>
                </div>
              </th>
              <th>Status</th>
              <th>
                <div class="filters-arrow">
                  <span>Turno</span>
                  <div class="filters-options">
                    <i class="fi fi-sr-sort-alt" @click="ordenateData('turn', 'up')" v-if="orders.turn === 'no-order'"></i>
                    <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('turn', 'down')" v-if="orders.turn === 'up'"></i>
                    <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('turn', 'no-order')" v-if="orders.turn === 'down'"></i>
                  </div>
                </div>
              </th>
              <th>Tipo de solicitação</th>
              <th>Nº do contrato</th>
              <th>Nome do cliente</th>
              <th>Equipe</th>
              <th>
                <div class="filters-arrow">
                  <span>Técnico</span>
                  <div class="filters-options">
                    <i class="fi fi-sr-sort-alt" @click="ordenateData('technical', 'up')" v-if="orders.technical === 'no-order'"></i>
                    <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('technical', 'down')" v-if="orders.technical === 'up'"></i>
                    <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('technical', 'no-order')" v-if="orders.technical === 'down'"></i>
                  </div>
                </div>
              </th>
              <th>Data inicio att.</th>
              <th>Data fim att.</th>
              <th>Data inicio agendamento</th>
              <th>Data fim agendamento</th>
              <th>Situacao do contrato</th>
              <th>Status do contrato</th>
              <th>Contexto</th>
              <th>Problema</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataItems" :key="index">
              <td>{{ item.protocol }}</td>
              <td>{{ item.status }}</td>
              <td>{{ this.turnName(item.date_start_schedule) }}</td>
              <td>{{ item.type_note }}</td>
              <td>{{ item.contract_id }}</td>
              <td>{{ item.name_client }}</td>
              <td>{{ item.team }}</td>
              <td>{{ item.technical }}</td>
              <td>{{ item.date_start_attendance }}</td>
              <td>{{ item.date_end_attendance }}</td>
              <td>{{ item.date_start_schedule }}</td>
              <td>{{ item.date_end_schedule }}</td>
              <td>{{ item.stage_contract }}</td>
              <td>{{ item.status_contract }}</td>
              <td>{{ item.context }}</td>
              <td>{{ item.problem }}</td>
            </tr>

          </tbody>
        </table>
        <LoadingSpinner v-if="loading"
        />
      </div>

    </div>
  </div>
  <div class="modal-filters" v-if="modal">
    <div class="card-modal">
      <div class="close-button">
        <i class="fi fi-rs-cross"  @click="modalAction"></i>
      </div>
      <h2>Filtros disponíveis</h2>

      <form action="#" @submit.prevent="getData">
        <div class="filters-available">
          <div class="filter-available">
            <label for="typeNote">Tipo de solicitação: </label>
            <select name="typeNote" id="typeNote" v-model="payload.typeNote">
              <option value="0" selected>--- Selecione um tipo de solicitação ---</option>
              <option v-for="item in this.filters.typeNote" :value="item.id" :key="item.id">{{ item.title }}</option>
            </select>
          </div>
          <div class="filter-available">
            <label for="dateSchedule">Data do agendamento: <b>*</b> </label>
            <input type="date" name="dateSchedule" id="dateSchedule" v-model="payload.dateSchedule" required>
          </div>
          <div class="filter-available">
            <label for="region">Região: </label>
            <select name="region" id="region" v-model="payload.region">
              <option value="0" selected>--- Selecione a região ---</option>
              <option v-for="item in this.filters.region" :value="item.id" :key="item.id">{{ item.title }}</option>
            </select>
          </div>
          <div class="filter-data">
            <button>Filtrar</button>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from 'js-cookie';
import LoadingSpinner from "@/components/portal/_aux/LoadingSpinner";


export default {
  name: "HomeSchedule",
  components: {LoadingSpinner},

  data() {
    return {
      filtered: false,
      modal: false,
      filters: {
        typeNote: {},
        region: {}
      },
      payload: {
        typeNote: 0,
        dateSchedule: null,
        region: 0
      },
      loading: false,
      dataItems: {},
      orders: {
        protocol: 'no-order',
        turn: 'no-order',
        technical: 'no-order',
      }
    }
  },
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ]),
    modalAction() {
      this.modal = !this.modal;
    },
    getFilters: function () {
      AXIOS({
        method: 'GET',
        url: 'agetools/tools/schedule/dashboard/filters',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.filters.typeNote = res.data.typeNotes;
        this.filters.region = res.data.regions;

      })
    },
    getData: function () {

      this.loading = true
      this.modal = false

      AXIOS({
        method: 'GET',
        url: 'agetools/tools/schedule/dashboard/data',
        params: {
          dateSchedule: this.payload.dateSchedule,
          typeNote: this.payload.typeNote,
          region: this.payload.region
        },
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.loading = false
        this.dataItems = res.data;
      })
    },
    download: function () {
      const headersExcel = [
        'Protocolo',
        'Status',
        'Tipo de solicitação',
        'Equipe',
        'Técnico',
        'Data inicio att.',
        'Data fim att.',
        'Data inicio agendamento',
        'Data fim agendamento',
        'Nome do cliente',
        'Nº do contrato',
        'Situacao do contrato',
        'Status do contrato',
        'Contexto',
        'Problema'
      ]

      const data = this.dataItems

      AXIOS({
        method: 'POST',
        url: 'agetools/tools/schedule/dashboard/download-excel',
        data: {
          headersExcel,
          data
        },
        responseType: 'blob',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {

        let blob = new Blob([res.data],
            { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'agenda.xlsx'
        link.click()
      })



    },
    turnName: function (dateHour) {
      let date = new Date(dateHour)
      let hour = date.getHours()

      if (hour >= 6 && hour < 12) {
        return 'Manhã';
      } else if (hour >= 12 && hour < 18) {
        return 'Tarde';
      } else {
        return 'Noite';
      }
    },
    ordenateData: function(item, order) {

      let clearOrders = () => {
        this.orders.turn = 'no-order'
        this.orders.technical = 'no-order'
        this.orders.protocol = 'no-order'
      }


      switch (item) {
        case 'turn':
          clearOrders()
          this.orders.turn = order

          if(order === 'up' || order === 'down') {
            this.dataItems.sort((a, b) => {
              if(a.turn > b.turn)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.turn < b.turn)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }

          if(order === 'no-order') {
            this.dataItems.sort((a, b) => {
              if(a.protocol > b.protocol)
                return -1

              if(a.protocol < b.protocol)
                return 1

            })
          }

          break
        case 'protocol':
          clearOrders()
          this.orders.protocol = order

          if(order === 'up' || order === 'down') {
            this.dataItems.sort((a, b) => {
              if(a.protocol > b.protocol)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.protocol < b.protocol)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }

          if(order === 'no-order') {
            this.dataItems.sort((a, b) => {
              if(a.protocol > b.protocol)
                return -1

              if(a.protocol < b.protocol)
                return 1

            })
          }

          break
        case 'technical':
          clearOrders()
          this.orders.technical = order

          if(order === 'up' || order === 'down') {
            this.dataItems.sort((a, b) => {
              if(a.technical > b.technical)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.technical < b.technical)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }

          if(order === 'no-order') {
            this.dataItems.sort((a, b) => {
              if(a.protocol > b.protocol)
                return -1

              if(a.protocol < b.protocol)
                return 1

            })
          }

          break
      }

    },
  },
  computed: {
    ...mapGetters([
      'system'
    ]),
  },
  beforeMount() {
    this.SAVE_SYSTEM({loading: false})
    this.getFilters();
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

    span {
      font-size: 1.4rem;
    }
  }

  .data {
    width: 100%;
    height: 84%;
    @include card();

    .table {
      width: 100%;
      max-height: 100%;
      height: 100%;
      overflow-y: auto;
      position: relative;

      table {
        width: 100%;
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

            .filters-arrow {
              @include flex(row, flex-start, center, 1vw);

              .filters-options {
                @include flex(column, flex-start, center, 0);
                i {
                  color: $h1-black;
                  font-size: 1.4rem;
                  cursor: pointer;

                  &:hover {
                    opacity: .8;
                  }
                }
              }
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 1vh 1vw;
              border-bottom: 1px solid $border;
              font-size: 1rem;
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

        b {
          color: $red;
        }
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