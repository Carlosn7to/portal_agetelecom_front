<template>
  <div class="content-report">
    <div id="dashboards">
        <div class="dashboard" @click="modal = 'report-all'">
          <i class="fi fi-rr-document-signed"></i>
          <div class="info">
            <h6>{{ dataReports.length }}</h6>
            <span>Relatos totais</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-status', typeStatus = 'approved'">
          <i class="fi fi-rs-time-check"></i>
          <div class="info">
            <h6>{{ dataReportsApproved.length }}</h6>
            <span>Relatos aprovados</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-status', typeStatus = 'pending'">
          <i class="fi fi-rr-time-quarter-to"></i>
          <div class="info">
            <h6>{{ dataReportsPending.length }}</h6>
            <span>Relatos pendentes</span>
          </div>
        </div>
        <div class="dashboard" @click="modal = 'report-notsent'">
          <i class="fi fi-rr-time-delete"></i>
          <div class="info">
            <h6>7</h6>
            <span>Relatos não enviados <br><b style="color: red">Em desenvolvimento</b></span>
          </div>
        </div>
      </div>
    <div id="panel-reports">
      <div id="info">
        <h3>
          Últimos relatos enviados
        </h3>
        <div id="options">
          <button @click="modal = 'report-new'">
            <i class="fi fi-rr-add-document"></i>
            <span>Incluir relato</span>
          </button>
          <span @click="modal = 'report-all'">Ver todos</span>
        </div>
      </div>
      <div id="content-panel">

        <table>
          <thead>
          <tr>
            <th>Condutor</th>
            <th>Grupo</th>
            <th>Veículo</th>
            <th>Fabricante/Modelo</th>
            <th>Data</th>
            <th>Referente</th>
            <th>Quilometragem <br> relatada</th>
<!--            <th>Distância <br> Percorrida</th>-->
            <th>Status</th>
<!--            <th>Ações</th>-->
          </tr>
          </thead>
          <tbody v-if="reportsStatus">
          <tr v-for="item in dataFiveFirst" :key="item.id">
            <td>{{ item.primeiro_nome }} {{ item.segundo_nome }}</td>
            <td>{{ item.grupo }}</td>
            <td>{{ item.tipo }}</td>
            <td>{{ item.fabricante }}/{{ item.modelo }}</td>
            <td>{{ item.created_at }}</td>

            <td>{{ item.periodo }}</td>
            <td>{{ item.quilometragem_aprovada }}  <!--|<span class="down"><i class="fi fi-rr-caret-down"></i> 4,20%</span>--></td>
<!--            <td>87</td>-->
            <td class="status" :class="{ 'approved' : item.aprovador_id !== null, 'pending' : item.aprovador_id === null }">
                <span>
                  {{ item.aprovador_id !== null ? 'Aprovado' : 'Pendente' }}
                </span>
            </td>
<!--            <td>-->
<!--              <i class="fi fi-rr-menu-dots" @click="modal = 'report-mng'"></i>-->
<!--            </td>-->
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
  />
  <ReportsStatus
      v-if="modal === 'report-status'"
      :reports="typeStatus === 'approved' ? dataReportsApproved : dataReportsPending "
      :typeStatus="typeStatus"
      @close-modal="modal = ''"
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
import ReportsStatus from "@/components/ageControl/operatingPanel/reports/ReportsStatus";
import ReportNotSent from "@/components/ageControl/operatingPanel/reports/ReportNotSent";

export default {
  name: "ReportPanel",
  components: {ReportManagement, ReportNew, ReportAll, ReportsStatus, ReportNotSent},
  emits: ['close-modal', 'update-data'],
  data() {
    return {
      modal: false,
      dataReport: {},
      dataReports: {},
      dataReportsApproved: [],
      dataReportsPending: [],
      dataFiveFirst: [],
      typeStatus: '',
      reportsStatus: false
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
        this.dataFiveFirst = this.dataReports.slice(0, 5)
        this.reportsStatus = true

        this.dataReportsApproved = this.dataReports.filter(report => (report.aprovador_id !== null))
        this.dataReportsPending = this.dataReports.filter(report => (report.aprovador_id === null))

      })
    }
  },
  mounted() {
    this.getReports()
  }
}
</script>

<style scoped lang="scss">

.content-report {
  width: 100%;
  height: 100%;
  animation: down forwards .2s ease-in-out;

  #dashboards {
    width: 100%;
    padding: 2vh 0;
    @include flex(row, space-between, center, 0);

    .dashboard {
      width: calc((100% / 4) - 10px);
      background-color: #fff;
      border-radius: 5px;
      @include tr-p;
      @include flex(row, flex-start, center, 2vw);
      padding: 2vh 2vw;
      border: 2px solid #cccccc40;

      &:hover {
        border-color: $age-or;
      }

      i {
        font-size: 3rem;
        color: $age-or;
      }

      .info {
        @include flex(column, flex-start, initial, 0.5vh);

        h6 {
          font-size: 2.2rem;
          color: $age-bl;
        }

        span {
          font-size: 1.2rem;
          color: $ml-text-menu;
          font-weight: 500;
        }
      }
    }
  }

  #panel-reports {
    width: 100%;
    height: 80%;
    background-color: #fff;
    border-radius: 5px;
    padding: 2vh 2vw;
    border: 2px solid #cccccc40;

    #info {
      width: 100%;
      @include flex(row, space-between, center, 0);

      h3 {
        font-size: 2rem;
        color: $ml-text-h1;
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

        button {
          @include button-pattern;
          @include flex(row, center, center, .5vw);
          padding-top: 7px;

          i {
            font-size: 1.6rem;
          }

          span {
            font-size: 1.2rem;
            color: #fff;
            font-weight: 500;
            padding-bottom: 3px;

          }

          &:hover > span {
            color: $age-bl;
          }


        }

      }
    }

    #content-panel {
      width: 100%;
      padding: 2vh 2vw;

      table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;

        thead {
          tr {
            border-bottom: 2px solid #cccccc30;

            th:nth-child(1) {
              text-align: left;
            }
          }
        }



        tbody {
          tr {
            @include tr;


            td:nth-child(1) {
              text-align: left;
            }

            td:nth-last-child(1) {
              i {
                @include tr-p;
                font-size: 1.6rem;

                &:hover {
                  color: $ml-text-h1;
                }
              }
            }

            &:hover {
              background-color: #cccccc60;
            }


            .status {
              span {
                color: #fff;
                padding: 7px 10px;
                font-weight: 400;
                font-size: 1.2rem;
                border-radius: 2px;
              }
            }

            .approved {
              span {
                background-color: #04DBAC;
              }

            }
            .pending {
              span {
                background-color: #FDCB1C;
              }
            }
          }

        }

        thead, tbody {
          tr {
            th {
              width: calc((100% / 8) - 10px);
              font-size: 1.4rem;
              color: $age-bl;
              height: 7vh;
              text-align: center;
              padding: 0 1vw;
            }
            td {
              width: calc((100% / 8) - 10px);
              height: 7vh;
              color: $ml-text-h1;
              font-size: 1.2rem;
              font-weight: 500;
              text-align: center;
              padding: 0 1vw;

              ul {
                li {
                  position: relative;

                  &:hover {
                    .menu-dropdown {
                      display: block;
                    }
                  }

                  .menu-dropdown {
                    position: absolute;
                    right: 4vw;
                    top: -27vh;
                    width: 12vw;
                    background-color: #fff;
                    border-radius: 3px;
                    border: 1px solid #cccccc;
                    @include sh-h;

                    ul {
                      li {
                        text-align: left;
                        padding: 1vh 1vw;
                        @include flex(row, flex-start, center, .5vw);
                        border-bottom: 1px solid #cccccc60;
                        height: 7vh;
                      }

                      li:nth-last-child(1) {
                        border: none;
                      }
                    }
                  }

                  .down {
                    background-color: red;
                  }

                  .up {
                    background-color: blue;
                  }
                }
              }
            }
          }

          tr:nth-child(even) {
            background-color: #cccccc30;

            &:hover {
              background-color: #cccccc60;
            }
          }

        }

        .up {
          color: $red;
          font-weight: 600;
        }

        .down {
          color: #04DBAC;
        }
      }
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

</style>