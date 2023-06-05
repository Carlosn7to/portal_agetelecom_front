<template>
  <template v-if="page !== 'new'">
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
        <div class="period">
          <span>Período</span>
          <div class="turns">
            <p>Manhã: <b>{{ countTurns.morning }}</b></p>
            <p>Tarde: <b>{{ countTurns.afternoon }}</b></p>
            <p>Noite: <b>{{ countTurns.night }}</b></p>
          </div>
        </div>
      </div>
      <div class="data">
        <div class="table">
          <table  v-if="!loading">
            <thead>
            <tr>
              <th>Tipo de solicitação</th>
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
              <th>Nome do cliente</th>
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
              <th>
                <div class="filters-arrow">
                  <span>Região</span>
                  <div class="filters-options">
                    <i class="fi fi-sr-sort-alt" @click="ordenateData('region', 'up')" v-if="orders.region === 'no-order'"></i>
                    <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('region', 'down')" v-if="orders.region === 'up'"></i>
                    <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('region', 'no-order')" v-if="orders.region === 'down'"></i>
                  </div>
                </div>
              </th>
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
              <th>Status</th>
              <th>Data inicio agendamento</th>
              <th>Data fim agendamento</th>
              <th>Nº do contrato</th>
              <th>Situacao do contrato</th>
              <th>Status do contrato</th>
              <th>Contexto</th>
              <th>Problema</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in dataItems" :key="index">
              <td>{{ item.type_note }}</td>
              <td>{{ item.protocol }}</td>
              <td>{{ item.name_client }}</td>
              <td>{{ item.turnName }}</td>
              <td>{{ item.region }}</td>
              <td>{{ item.team }}</td>
              <td>{{ item.technical }}</td>
              <td>{{ item.date_start_attendance }}</td>
              <td>{{ item.date_end_attendance }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.date_start_schedule }}</td>
              <td>{{ item.date_end_schedule }}</td>
              <td>{{ item.contract_id }}</td>
              <td>{{ item.stage_contract }}</td>
              <td>{{ item.status_contract }}</td>
              <td>{{ item.context }}</td>
              <td>{{ item.problem }}</td>
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

        <form action="#" @submit.prevent="getData">
          <div class="filters-available">
            <div class="filter-available">
              <label for="typeNote">Tipo de solicitação: </label>
              <select multiple v-model="selectedOptions">
                <option v-for="(option, index) in options" :value="option.value" :key="index">{{ option.label }}</option>
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
  <template v-else>
    <div class="grid-container">
      <div class="calendar">
        <CalendarComponent
        @getDateFilter="getDateFilter"
        :pendingConsult="pendingConsult"
        />
      </div>
      <div class="dashboards">
        <DashboardSchedule
          :data="dashboardData"
          @filterData="filteredData"
        />
      </div>
      <div class="list">
        <ListData
            :data="this.listData.data"
            :typeFilter="this.listData.typeFilter"
            @downloadExcel="download"
            v-if="! loading"
        />
        <LoadingSpinner v-if="loading"
        />
      </div>
      <div class="filters">
        <ShortFilters
            :dataFilters="this.filters.typeNote"
            @filterData="getData"
        />
      </div>
    </div>
  </template>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from 'js-cookie';
import LoadingSpinner from "@/components/portal/_aux/LoadingSpinner";
import CalendarComponent from "@/components/portal/_aux/calendar/CalendarComponent";
import DashboardSchedule from "@/components/ageTools/tools/schedule/dashboad/DashboardSchedule";
import ListData from "@/components/ageTools/tools/schedule/listData/ListData";
import ShortFilters from "@/components/ageTools/tools/schedule/filters/ShortFilters";

export default {
  name: "HomeSchedule",
  components: {LoadingSpinner, CalendarComponent, DashboardSchedule, ListData, ShortFilters},
  data() {
    return {
      page: 'new',
      filtered: false,
      modal: false,
      filters: {
        typeNote: {},
        region: {}
      },
      payload: {
        typeNote: null,
        dateSchedule: null,
        region: 0
      },
      loading: false,
      dataItems: {},
      orders: {
        protocol: 'no-order',
        turn: 'no-order',
        technical: 'no-order',
        region: 'no-order'
      },
      countTurns: {
        morning: 0,
        afternoon: 0,
        night: 0
      },
      options: [
      ],
      selectedOptions: [],
      pendingConsult: false,
      dashboardData: {
        turn: {
          morning: 0,
          afternoon: 0,
          night: 0
        },
        total: 0,
        notAtt: 0
      },
      listData: {
        typeFilter: 'all',
        data: {}
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

        this.filters.typeNote.forEach((item) => {
          this.options.push({
            label: item.title,
            value: item.id
          })
        })

        this.filters.region = res.data.regions;

      })
    },
    getData: function (typeNotes) {

      this.loading = true
      this.modal = false
      this.pendingConsult = true
      this.payload.typeNote = typeNotes;

      this.dashboardData.total = 0
      this.dashboardData.turn.morning = 0
      this.dashboardData.turn.afternoon = 0
      this.dashboardData.notAtt = 0
      this.listData.typeFilter = 'all'

      AXIOS({
        method: 'GET',
        url: 'agetools/tools/schedule/dashboard/data',
        params: {
          dateSchedule: this.payload.dateSchedule,
          typeNote: this.payload.typeNote,
        },
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.loading = false
        this.dataItems = res.data;
        this.listData.data = res.data;
        this.pendingConsult = false

        this.dataItems.forEach((item) => {
          let date = new Date(item.date_start_schedule)
          let hour = date.getHours()

          let turn = ''

          if (hour >= 6 && hour < 12) {
            turn = 'Manhã';
            this.dashboardData.turn.morning++
          } else if (hour >= 12 && hour < 18) {
            turn = 'Tarde';
            this.dashboardData.turn.afternoon++
          } else {
            turn = 'Noite';
            this.dashboardData.turn.night++
          }

          item['turnName'] = turn

          if(item.technical === null) {
            this.dashboardData.notAtt++
          }

        })

        this.dashboardData.total = this.dataItems.length

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
        'id_client',
        'Nome do cliente',
        'Nº do contrato',
        'Situacao do contrato',
        'Status do contrato',
        'Contexto',
        'Problema',
        'Região',
        'Turno'
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
    ordenateData: function(item, order) {

      let clearOrders = () => {
        this.orders.turn = 'no-order'
        this.orders.technical = 'no-order'
        this.orders.protocol = 'no-order'
        this.orders.region = 'no-order'
      }


      switch (item) {
        case 'turn':
          clearOrders()
          this.orders.turn = order

          if(order === 'up' || order === 'down') {
            this.dataItems.sort((a, b) => {
              if(a.turnName > b.turnName)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.turnName < b.turnName)
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
        case 'region':
          clearOrders()
          this.orders.region = order

          if(order === 'up' || order === 'down') {
            this.dataItems.sort((a, b) => {
              if(a.region > b.region)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.region < b.region)
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
    getDateFilter: function (date) {
      this.payload.dateSchedule = date

    },
    filteredData: function (typeFilter) {

        if(typeFilter === 'all') {
          this.listData.data = this.dataItems
        } else if (typeFilter === 'morning') {
            this.listData.data = this.dataItems.filter((item) => {
              return item.turnName === 'Manhã'
            })
          } else if (typeFilter === 'afternoon') {
            this.listData.data = this.dataItems.filter((item) => {
              return item.turnName === 'Tarde'
            })
        } else if (typeFilter === 'notAtt') {
          this.listData.data = this.dataItems.filter((item) => {
            return item.technical === null
          })
        }
    }
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

.grid-container {
  display: grid;
  height: 100%;
  grid-template-columns: 78% 20%;
  grid-template-rows: 15% 23% 58%;
  gap: 2vh;
  grid-template-areas: 'A C'
                        'L C'
                        'L F';
  justify-content: space-between;


  .calendar {
    grid-area: C;
  }

  .dashboards {
    grid-area: A;
  }

  .list {
    grid-area: L;
    position: relative;
    max-width: 100%;
    overflow: auto;
  }
}




//.container {
//  width: 100%;
//  height: 100%;
//  @include flex(column, space-between, initial, 1vh);
//
//  .filters {
//    width: 100%;
//    height: 15%;
//    @include card();
//    @include flex(row, flex-start, center, 1vw);
//
//    .search {
//      width: 30%;
//
//      input {
//        width: 100%;
//        @include card();
//      }
//    }
//
//    .filter {
//      @include flex(row, flex-start, center, 1vw);
//
//      button {
//        @include btn-dashboard(true);
//
//        i {
//          color: #fff;
//        }
//      }
//
//
//    }
//
//    span {
//      font-size: 1.4rem;
//    }
//
//    .period {
//      span {
//        font-size: 1rem;
//        font-weight: 600;
//      }
//    }
//  }
//
//  .data {
//    width: 100%;
//    height: 84%;
//    @include card();
//
//    .table {
//      width: 100%;
//      max-height: 100%;
//      height: 100%;
//      overflow-y: auto;
//      position: relative;
//
//      table {
//        width: 100%;
//        border-collapse: collapse;
//
//        thead {
//          tr {
//            th {
//              padding: 1vh 1vw;
//              border-bottom: 1px solid $border;
//              font-size: 1.2rem;
//              font-weight: 500;
//              color: $h1-black;
//              text-align: center;
//            }
//
//            .filters-arrow {
//              @include flex(row, flex-start, center, 1vw);
//
//              .filters-options {
//                @include flex(column, flex-start, center, 0);
//                i {
//                  color: $h1-black;
//                  font-size: 1.4rem;
//                  cursor: pointer;
//
//                  &:hover {
//                    opacity: .8;
//                  }
//                }
//              }
//            }
//          }
//        }
//        tbody {
//          tr {
//            td {
//              padding: 1vh 1vw;
//              border-bottom: 1px solid $border;
//              font-size: 1rem;
//              font-weight: 400;
//              color: $h1-black;
//              text-align: center;
//              user-select: text;
//
//            }
//
//
//          }
//        }
//      }
//    }
//
//  }
//}
//
//.modal-filters {
//  width: 100%;
//  height: 100%;
//  position: absolute;
//  left: 0;
//  top: 0;
//  z-index: 999;
//  background-color: #33333330;
//  @include flex(row, center, center, 0);
//
//
//  .card-modal {
//    width: 30vw;
//    @include card();
//    @include flex(column, flex-start, intial, 3vh);
//
//    .close-button {
//      @include flex(row, flex-end, center, 1vw);
//      i {
//        font-size: 1.4rem;
//        cursor: pointer;
//
//        &:hover {
//          opacity: 0.8;
//        }
//      }
//
//    }
//
//    h2 {
//      font-size: 1.4rem;
//      font-weight: 500;
//      text-align: center;
//      color: $h1-black;
//    }
//
//    .filter-available {
//      padding: 1vh 3vw;
//      @include flex(column, flex-start, initial, 1vh);
//
//      label {
//        font-size: 1.2rem;
//        font-weight: 500;
//        color: $h1-black;
//
//        b {
//          color: $red;
//        }
//      }
//
//      select, input {
//        width: 100%;
//        padding: 10px 8px;
//        border-radius: 5px;
//        outline: none;
//        border: 1px solid $border;
//        transition: border ease-in-out .2s;
//        margin-bottom: 10px;
//
//        &:focus {
//          border-color: $border-hover;
//        }
//      }
//
//      select:nth-child(1) {
//        width: 200px;
//        height: 200px;
//        overflow-y: scroll;
//      }
//
//      option {
//        background-color: #fff;
//        padding: 5px;
//      }
//
//      option:checked {
//        background-color: #ccc;
//      }
//
//    }
//
//    .filter-data {
//      @include flex(row, center, center, 0);
//      button {
//        @include btn-dashboard(true);
//      }
//    }
//  }
//}

</style>