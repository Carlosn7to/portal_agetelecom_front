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
            <i class="fi fi-rr-file excel"></i>
            <span>Baixar relatório</span>
          </button>
        </div>
        <div id="content-table">
          <table>
            <thead>
            <tr>
              <th>
                <input type="checkbox" name="all" id="all" @click="selectAllCheckbox" v-model="checkboxAll">
                ID
              </th>
              <th style="text-align: left">Condutor</th>
              <th>Grupo</th>
              <th>Veículo</th>
              <th>Fabricante/Modelo</th>
              <th>Data</th>
              <th>Referente</th>
              <th>Quilometragem <br> Relatada</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in ConductorsFiltered" :key="item.id">
              <td>
                <div class="select-id">
                  <input type="checkbox" name="id" :id="item.id" v-model="checkboxId" :value="item.id">
                  <span>
                  # {{ item.id }}
                </span>
                </div>
              </td>
              <td style="text-align: left">{{ item.primeiro_nome }} {{ item.segundo_nome }}</td>
              <td>{{ item.grupo }}</td>
              <td>{{ item.tipo }}</td>
              <td>{{ item.fabricante }}/{{ item.modelo }}</td>
              <td>{{ item.data_referencia }}</td>

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
                <td>
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
      checkboxAll: false
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
        @include flex(row, flex-start, center, 0);
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
          background-color: $green;
          border-color: $green;

          &:hover {
            border-color: $green;
            color: $green;
          }

          span {
            padding-bottom: 2px;
          }
        }

        button {
          @include button-pattern;
          @include flex(row, center, center, .5vw);

          i {
            font-size: 1.6rem;
          }

          span {
            font-size: 1.4rem;
            padding-bottom: 2px;
          }
          margin-left: 1vw;
        }

        .clear-filter {
          all: unset;
          margin: 0 1vw;
          padding: 5px 15px;
          border-radius: 3px;
          background-color: $red;
          color: #fff;
          border: 1px solid $red;
          @include tr-p;

          &:hover {
            background-color: #fff;
            border-color: $red;
            color: $red;
          }
        }
      }


      #content-table {
        width: 100%;
        height: 75%;
        max-height: 75%;
        padding: 2vh 2vw;
        overflow: auto;
        @include table-pattern;
      }
    }

  }
}

</style>