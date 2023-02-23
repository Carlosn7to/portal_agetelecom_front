<template>
  <div class="content-report" :class="{'mode-l-p' : system.mode === 'light'  || system.mode === undefined,
                  'mode-d-p' : system.mode === 'dark'}">
    <div class="btn-new-report">
      <button @click="modal = 'report-new'">
        <i class="fi fi-rr-add-document"></i>
        <span>Novo relato</span>
      </button>
    </div>
    <div id="dashboards">
        <div class="dashboard" @click="modal = 'report-all', typeStatus = 'all'">
          <i class="fi fi-rr-document-signed"></i>
          <div class="info">
            <h6>{{ dataReports.length ? dataReports.length : 0 }}</h6>
            <span>Relatos totais</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-all', typeStatus = 'approved'">
          <i class="fi fi-rs-time-check"></i>
          <div class="info">
            <h6>{{ dataReportsApproved.length ? dataReportsApproved.length : 0 }}</h6>
            <span>Relatos aprovados</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-all', typeStatus = 'pending'">
          <i class="fi fi-rr-time-quarter-to"></i>
          <div class="info">
            <h6>{{ dataReportsPending.length ? dataReportsPending.length : 0 }}</h6>
            <span>Relatos pendentes</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-notsent'">
          <i class="fi fi-rr-time-delete"></i>
          <div class="info">
            <h6>7</h6>
            <span>Relatos não enviados <b style="color: red">Em Dev*</b></span>
          </div>
        </div>
      </div>
    <div id="panel-reports">
      <div id="info">
        <h3>
          Últimos relatos enviados
        </h3>
        <div id="options">
          <span @click="modal = 'report-all'">Ver todos</span>
        </div>
      </div>
      <div id="content-table">
        <table>
          <thead>
          <tr>
            <th>
              <div>
                <span>ID</span>
              </div>
            </th>
            <th style="text-align: left">
              <div class="content">
                <span>Condutor</span>
               </div>
            </th>
            <th>
              <div class="content">
                <span>Grupo</span>
               </div>
            </th>
            <th>
              <div class="content">
                <span>Veículo</span>
                </div>
            </th>
            <th>
              <div class="content">
                <span>Fabricante/Modelo</span>
                </div>
            </th>
            <th>
              <div class="content">
                <span>Data</span>
                </div>
            </th>
            <th>
              <div class="content">
                <span>Referente</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Quilometragem <br> relatada</span>
                </div>
            </th>
            <th>
              <div class="content">
                <span>Status</span>
                </div>
            </th>
            <th style="text-align: center">Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in dataLastReports" :key="item.id">
            <td>
              <div class="select-id">
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

  <ReportManagement
    v-if="modal === 'report-mng'"
    :data="dataReport"
    @close-modal="modal = ''"
  />
  <ReportNew
    v-if="modal === 'report-new'"
    @close-modal="modal = ''"
    @update-data="getReports"
  />
  <ReportAll
    v-if="modal === 'report-all'"
    :reports="dataReports"
    @close-modal="modal = ''"
    :status="typeStatus"
  />
  <ReportNotSent
    v-if="modal === 'report-notsent'"
    @close-modal="modal = ''"
  />

</template>

<script>


import {AXIOS} from "../../../../../services/api.ts";
import Cookie from 'js-cookie';

import ReportManagement from "@/components/ageControl/operatingPanel/reports/ReportManagement";
import ReportNew from "@/components/ageControl/operatingPanel/reports/ReportNew";
import ReportAll from "@/components/ageControl/operatingPanel/reports/ReportAll";
import ReportNotSent from "@/components/ageControl/operatingPanel/reports/ReportNotSent";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "ReportPanel",
  components: {ReportManagement, ReportNew, ReportAll, ReportNotSent},
  emits: ['close-modal', 'update-data'],
  data() {
    return {
      modal: false,
      dataReport: {},
      dataReports: {},
      dataReportsApproved: [],
      dataReportsPending: [],
      dataLastReports: [],
      typeStatus: '',
      reportsStatus: false,
    }
  },
  methods: {
    getReports: function () {
      AXIOS({
        method: 'get',
        url: 'agecontrol/management/reports-complete',
        headers: {
          "Authorization": "Bearer "+Cookie.get('token')
        }

      }).then((res) => {
        this.dataReports = res.data
        this.dataLastReports = this.dataReports.slice(0, 10)
        this.reportsStatus = true

        this.dataReportsApproved = this.dataReports.filter(report => (report.aprovador_id !== null))
        this.dataReportsPending = this.dataReports.filter(report => (report.aprovador_id === null))

      })
    },
    formatDate: function (date){
      let newDate = moment(date).locale('pt-br').format('ll')

      return newDate
    },
  },
  mounted() {
    this.getReports()
  },
  computed: {
    ...mapGetters([
        'system'
    ])
  }
}
</script>

<style scoped lang="scss">

.content-report {
  width: 100%;
  animation: down forwards .2s ease-in-out;

  .btn-new-report {
    position: relative;
    @include flex(row, flex-end, center, 0);
    button {
      @include btn-pattern($blue, $white-grey, $blue-hover, $white);
    }
    margin-bottom: 2vh;
  }

  #dashboards {
    width: 100%;
    padding: 0vh 0;
    @include flex(row, space-between, center, 0);

    .dashboard {
      width: calc((100% / 4) - 20px);
      background-color: #fff;
      border-radius: 5px;
      @include tr-p;
      @include flex(row, flex-start, center, 2vw);
      padding: 1.5vh 2vw;
      @include sh-pattern-hover;

      i {
        font-size: 2.6rem;
        color: $age-or;
      }

      .info {
        @include flex(column, flex-start, initial, 0.5vh);

        h6 {
          font-size: 2rem;
          color: $age-bl;
        }

        span {
          font-size: 1rem;
          color: $ml-text-menu;
          font-weight: 500;
        }
      }
    }
  }

  #panel-reports {
    width: 100%;
    height: 80%;
    border-radius: 5px;
    padding: 4vh 0vw;
    @include flex(column, flex-start, initial, 1vh);

    #info {
      width: 100%;
      padding: 1vh 1vw 0 0vw;
      @include flex(row, space-between, center, 0);

      h3 {
        font-size: 1.6rem;
        font-weight: 500;
        color: $age-bl;
        width: 80%;
      }

      #options {
        @include flex(row, space-between, center, 2vw);

        span {
          font-size: 1.2rem;
          color: $ml-text-menu;
          font-weight: 600;
          @include tr-p;

          &:hover {
            color: $ml-text-h1;
          }
        }


      }
    }

    #content-table {
      width: 100%;
      padding: 1vh 2vw;
      @include table-pattern(true);
    }
  }


}

@keyframes down {
  from {
    opacity: .2;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}


.mode-d-p {
  background-color: $dark-mode-background;

  #dashboards {
    .dashboard {
      background-color: $dark-mode-card;

      i {
        color: $primary;
      }

      .info {
        h6 {
          color: $dark-mode-text-primary;
        }
        span {
          color: $dark-mode-text-secondary;
        }
      }
    }
  }

  #panel-reports {
    #info {
      h3 {
        color: $dark-mode-text-primary;
      }

      #options {
        span {
          color: $dark-mode-text-secondary;
        }
      }
    }

    #content-table {
      @include table-pattern(false);
    }
  }

}

</style>