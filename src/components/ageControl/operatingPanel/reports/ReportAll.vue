<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div id="content-card">
        <div class="filters">
          <input type="text" id="search" name="search" placeholder="Buscar condutor, placa..." autocomplete="off"
                 v-model="search">
          <button @click="modal = 'filter'">
            <i class="fi fi-rr-filter"></i>
            <span>Filtro</span>
          </button>
          <button v-if="filtered === true" @click="getReports" class="clear-filter"><i class="fi fi-sr-filter-slash"></i></button>
          <button class="download-excel" @click="downloadReport">
            <i class="fi fi-sr-folder-download"></i>
            <span>Baixar relatório</span>
          </button>
        </div>
        <div id="content-table">
          <table>
            <thead>
            <tr>
              <th>
                <div>
                  <label class="container-checkbox">
                    <input type="checkbox" name="all" id="all" @click="selectAllCheckbox" v-model="checkboxAll">
                    <span class="checkmark"></span>
                  </label>
                  <span>ID</span>
                </div>
              </th>
              <th style="text-align: left">
                <div class="content">
                  <span>Condutor</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('conductor', 'up')" v-if="orders.conductor === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('conductor', 'down')" v-if="orders.conductor === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('conductor', 'no-order')" v-if="orders.conductor === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Grupo</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('group', 'up')" v-if="orders.group === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('group', 'down')" v-if="orders.group === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('group', 'no-order')" v-if="orders.group === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Veículo</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('vehicleType', 'up')" v-if="orders.vehicleType === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('vehicleType', 'down')" v-if="orders.vehicleType === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('vehicleType', 'no-order')" v-if="orders.vehicleType === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Fabricante/Modelo</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('vehicleManufacturer', 'up')" v-if="orders.vehicleManufacturer === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('vehicleManufacturer', 'down')" v-if="orders.vehicleManufacturer === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('vehicleManufacturer', 'no-order')" v-if="orders.vehicleManufacturer === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Data</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('date', 'up')" v-if="orders.date === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('date', 'down')" v-if="orders.date === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('date', 'no-order')" v-if="orders.date === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Referente</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('period', 'up')" v-if="orders.period === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('period', 'down')" v-if="orders.period === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('period', 'no-order')" v-if="orders.period === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Quilometragem <br> relatada</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('kmReport', 'up')" v-if="orders.kmReport === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('kmReport', 'down')" v-if="orders.kmReport === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('kmReport', 'no-order')" v-if="orders.kmReport === 'down'"></i>
                </div>
              </th>
              <th>
                <div class="content">
                  <span>Status</span>
                  <i class="fi fi-sr-sort-alt" @click="ordenateData('status', 'up')" v-if="orders.status === 'no-order'"></i>
                  <i class="fi fi-rs-arrow-alt-up" @click="ordenateData('status', 'down')" v-if="orders.status === 'up'"></i>
                  <i class="fi fi-rs-arrow-alt-down" @click="ordenateData('status', 'no-order')" v-if="orders.status === 'down'"></i>
                </div>
              </th>
              <th style="text-align: center">Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ConductorsFiltered" :key="item.id">
              <td>
                <div class="select-id">
                  <label class="container-checkbox">
                    <input type="checkbox" name="id" :id="item.id" v-model="checkboxId" :value="item.id">
                    <span class="checkmark"></span>
                  </label>
                  <span>
                  # {{ item.id }}
                </span>
                </div>
              </td>
              <td style="text-align: left">{{ item.primeiro_nome }} {{ item.segundo_nome }}</td>
              <td>{{ item.grupo }}</td>
              <td>{{ item.tipo }}</td>
              <td>{{ item.fabricante }}/{{ item.modelo }}</td>
              <td>{{ formatDate(item.data_referencia) }}</td>

              <td>{{ item.periodo }}</td>
              <td>{{ item.quilometragem_aprovada }}  <!--|<span class="down"><i class="fi fi-rr-caret-down"></i> 4,20%</span>--></td>
              <td>
                <div class="status">
                  <div :class="{ 'success' : item.aprovador_id !== null, 'pending' : item.aprovador_id === null }">
                  </div>
                  <span>
                  {{ item.aprovador_id !== null ? 'Aprovado' : 'Pendente' }}
                </span>
                </div>
              </td>
              <td style="text-align: center">
                <i class="fi fi-rr-menu-dots" @click="modal = 'report-mng'"></i>
              </td>
            </tr>

            </tbody>
          </table>

        </div>
      </div>

    </div>
  </div>
  <FilterReportAll
    v-if="modal === 'filter'"
    @close-modal="modal = ''"
    @filtered="reportsFiltered"
  />

  <AlertResponse
      :response="alert"
      v-if="alert.status === true"
      @close="alert.status = false"
  />
</template>

<script>

import FilterReportAll from "@/components/ageControl/operatingPanel/reports/FilterReportAll";
import AlertResponse from "@/components/_aux/AlertResponse";
import {AXIOS} from "../../../../../services/api.ts";
import Cookie from "js-cookie";
import moment from "moment";


export default {
  name: "ReportAll",
  components: {FilterReportAll, AlertResponse},
  props: {
    reports: {
      required: true
    },
    status: {
      required: true,
      default: 'all'
    }
  },
  emits: ['close-modal'],
  data () {
    return {
      search: '',
      modal: '',
      data: this.reports,
      alert: {
        class: '',
        msg: '',
        status: false
      },
      filtered: false,
      checkboxId: [],
      checkboxAll: false,
      orders: {
        conductor: 'no-order',
        group: 'no-order',
        vehicleType: 'no-order',
        vehicleManufacturer: 'no-order',
        date: 'no-order',
        period: 'no-order',
        kmReport: 'no-order',
        status: 'no-order',
      }
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    },
    reportsFiltered: function (data) {
      this.data = data
      this.modal = ''
      this.filtered = true
      this.checkboxId = []
      this.checkboxAll = false



      this.alert.msg = 'Relatório filtrado com sucesso!'
      this.alert.class = 'success'
      this.alert.status = true
    },
    getReports: function () {
      this.filtered = false
      this.checkboxId = []
      this.checkboxAll = false

      AXIOS({
        method: 'get',
        url: 'agecontrol/management/reports-complete',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token'),
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        this.alert.msg = 'Filtros desfeitos com sucesso!'
        this.alert.class = 'success'
        this.alert.status = true
        this.data = res.data
      })
    },
    selectAllCheckbox: function () {
      if(! this.checkboxAll) {
        this.data.forEach((item) => {
          this.checkboxId.push(item.id)
        })
      } else {
        this.checkboxId = []
      }

      this.checkboxAll = !this.checkboxAll

    },
    downloadReport: function () {

      if(this.checkboxId.length === 0) {
        this.alert.msg = 'Selecione ao menos um relato!'
        this.alert.class = 'warning'
        this.alert.status = true

      } else {
        AXIOS({
          method: 'GET',
          url: 'agecontrol/management/reports-complete',
          headers: {
            'Authorization': 'Bearer '+Cookie.get('token')
          },
          params: {idReports: this.checkboxId},
          responseType: 'blob',
        }).then((res) => {
          let blob = new Blob([res.data],
              { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'relatorio_relatos_'+`${moment().format('D-MM-YYYY-SSS')}`+'.xlsx'
          link.click()
        })
      }

    },
    formatDate: function (date){
      let newDate = moment(date).locale('pt-br').format('ll')

      return newDate
    },
    ordenateData: function(item, order) {

      let clearOrders = () => {
        this.orders.conductor = 'no-order'
        this.orders.group = 'no-order'
        this.orders.vehicleType = 'no-order'
        this.orders.vehicleManufacturer = 'no-order'
        this.orders.date = 'no-order'
        this.orders.period = 'no-order'
        this.orders.kmReport = 'no-order'
        this.orders.status = 'no-order'
      }


      switch (item) {
        case 'conductor':
          clearOrders()
          this.orders.conductor = order

            if(order === 'up' || order === 'down') {
              this.data.sort((a, b) => {
                if(a.primeiro_nome > b.primeiro_nome)
                  if(order === 'up')
                    return 1;
                  else
                    return -1

                if(a.primeiro_nome < b.primeiro_nome)
                  if(order === 'down')
                    return 1;
                  else
                    return -1
              })
            }

          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if(a.id > b.id)
                return -1

              if(a.id < b.id)
                return 1

            })
          }

          break
        case 'group':
          clearOrders()
          this.orders.group = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.grupo > b.grupo)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.grupo < b.grupo)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }

          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if(a.id > b.id)
                return -1

              if(a.id < b.id)
                return 1

            })
          }

          break
        case 'vehicleType':
          clearOrders()
          this.orders.vehicleType = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.tipo > b.tipo)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.tipo < b.tipo)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }

          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if(a.id > b.id)
                return -1

              if(a.id < b.id)
                return 1

            })
          }

          break
        case 'vehicleManufacturer':
          clearOrders()
          this.orders.vehicleManufacturer = order
          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.fabricante > b.fabricante)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.fabricante < b.fabricante)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }
          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if (a.id > b.id)
                return -1

              if (a.id < b.id)
                return 1

            })
          }
          break
        case 'date':
          clearOrders()
          this.orders.date = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.data_referencia > b.data_referencia)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.data_referencia < b.data_referencia)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }
          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if (a.id > b.id)
                return -1

              if (a.id < b.id)
                return 1

            })
          }

          break
        case 'period':
          clearOrders()
          this.orders.period = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.periodo > b.periodo)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.periodo < b.periodo)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }
          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if (a.id > b.id)
                return -1

              if (a.id < b.id)
                return 1

            })
          }

          break
        case 'kmReport':
          clearOrders()
          this.orders.kmReport = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.quilometragem_aprovada > b.quilometragem_aprovada)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.quilometragem_aprovada < b.quilometragem_aprovada)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }
          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if (a.id > b.id)
                return -1

              if (a.id < b.id)
                return 1

            })
          }

          break
        case 'status':
          clearOrders()
          this.orders.status = order

          if(order === 'up' || order === 'down') {
            this.data.sort((a, b) => {
              if(a.aprovador_id > b.aprovador_id)
                if(order === 'up')
                  return 1;
                else
                  return -1

              if(a.aprovador_id < b.aprovador_id)
                if(order === 'down')
                  return 1;
                else
                  return -1
            })
          }
          if(order === 'no-order') {
            this.data.sort((a, b) => {
              if (a.id > b.id)
                return -1

              if (a.id < b.id)
                return 1

            })
          }

          break
      }

    },
    filterReports: function () {
      switch (this.status) {
        case 'pending':
          this.data = this.reports.filter(report => (report.aprovador_id === null))
        break
        case 'approved':
          this.data = this.reports.filter(report => (report.aprovador_id !== null))
        break
      }
    }

  },
  computed: {
    ConductorsFiltered: function () {
      let values = []

      values = this.data.filter((value) => {
        return (
            value.primeiro_nome.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })

      return values

    }
  },
  mounted() {
    this.filterReports()
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 98vw;
    height: 98vh;
    background-color: $back-main;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px !important;

    #close-button {
      height: 8%;
    }

    #content-card {
      padding: 0vh 2vw;
      height: 100%;
      .filters {
        padding: 3vh 0vw;
        width: 100%;
        @include flex(row, flex-start, center, 1vw);
        input[type=text] {
          width: 25%;
          padding: 10px 8px;
          border-radius: 5px;
          outline: none;
          border: none;
          box-shadow: rgba(128, 128, 166, 0.1) 0px 0px 16px;
          @include sh-pattern-hover;
        }

        .download-excel {
          @include flex(row, center, center, .5vw);
          background-color: $black;
          border-color: $black;
          @include tr-p;
          color: #efefef;

          &:hover {
            background-color: $black-hover;
            color: #fff;
          }

          span {
            padding-bottom: 2px;
          }
        }

        button {
          @include btn-pattern($blue, $white-grey, $blue-hover, $white);
          @include flex(row, center, center, .5vw);

          i {
            font-size: 1.6rem;
          }

          span {
            font-size: 1.4rem;
            padding-bottom: 2px;
          }
        }

        .clear-filter {
          @include btn-pattern($red, $white-grey, $red-hover, $white);
        }
      }


      #content-table {
        width: 100%;
        height: 75%;
        max-height: 75%;
        padding: 2vh 2vw;
        overflow: auto;
        @include table-pattern(true);
      }
    }

  }
}

</style>