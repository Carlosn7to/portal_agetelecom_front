<template>
  <div class="grid-container">

    <div class="header">
      <h1>{{ page }} - Agenda</h1>

      <div class="pages">
        <button :class="{'selected' : page === 'Painel'}" @click="page = 'Painel'">Painel</button>
        <button :class="{'selected' : page === 'Dashboard'}" @click="page = 'Dashboard'">Dashboard</button>
      </div>

    </div>

    <div class="calendar">
      <CalendarComponent
          @getDateFilter="getDateFilter"
          :pendingConsult="pendingConsult"
      />
    </div>
    <template v-if="page === 'Painel'">
      <div class="panel">
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
              @getClientUnique="getNameClient"
          />
          <LoadingSpinner v-if="loading"
          />
        </div>
      </div>
    </template>
    <template v-if="page === 'Dashboard'">
      <h1>Em desenvolvimento</h1>
    </template>
    <div class="filters">
      <ShortFilters
          :dataFilters="this.filters.typeNote"
          @filterData="getData"
      />
    </div>
  </div>

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
      page: 'Painel',
      searchClient: '',
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
    getNameClient: function (name) {

      this.loading = true
      this.modal = false
      this.pendingConsult = true

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
          name: name
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
  grid-template-columns: 78% 20%;
  grid-template-rows: 7vh 17vh 25vh 60vh;
  gap: 2vh;
  grid-template-areas: 'H H'
                        'P C'
                        'P C'
                        'P F';
  justify-content: space-between;

  .header {
    grid-area: H;
    @include flex(row, space-between, center, 0);


    h1 {
      font-size: 1.8rem;
      font-weight: 500;

    }

    .pages {
      width: 30%;
      @include flex(row, flex-end, center, 1vw);

      button {
        @include btn-dashboard(false);
      }

      .selected {
        @include btn-dashboard(true);
      }
    }
  }

  .filters {
    grid-area: F;
  }

  .calendar {
    grid-area: C;
  }

  .panel {
    grid-area: P;
    @include flex(column, flex-start, initial, 2vh);
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    .dashboards {
    }

    .list {
      position: relative;
      min-height: 84%;
      max-height: 84%;

    }
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