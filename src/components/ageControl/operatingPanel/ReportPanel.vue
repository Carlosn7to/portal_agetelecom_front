<template>
  <div class="content-report">
    <div id="dashboards">
        <div class="dashboard">
          <i class="fi fi-rr-document-signed"></i>
          <div class="info">
            <h6>51</h6>
            <span>Relatos totais</span>
          </div>
        </div>
        <div class="dashboard">
          <i class="fi fi-rs-time-check"></i>
          <div class="info">
            <h6>33</h6>
            <span>Relatos aprovados</span>
          </div>
        </div>
        <div class="dashboard">
          <i class="fi fi-rr-time-quarter-to"></i>
          <div class="info">
            <h6>11</h6>
            <span>Relatos pendentes</span>
          </div>
        </div>
        <div class="dashboard">
          <i class="fi fi-rr-time-delete"></i>
          <div class="info">
            <h6>7</h6>
            <span>Relatos não enviados</span>
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
          <span>Ver todos</span>
        </div>
      </div>
      <div id="content-panel">

        <table>
          <thead>
            <tr>
              <th>Condutor</th>
              <th>Grupo</th>
              <th>Veículo</th>
              <th>Modelo/Placa</th>
              <th>Período</th>
              <th>Km inicial</th>
              <th>Km final</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carlos Netos</td>
              <td>Age</td>
              <td>Moto</td>
              <td>Honda/JSA-2198</td>
              <td>Manhã</td>
              <td>1202</td>
              <td>1259</td>
              <td class="status pending">
                <span>
                  Pendente
                </span>
              </td>
              <td>
                <i class="fi fi-rr-menu-dots" @click="modal = 'report-mng'"></i>
              </td>
            </tr>
            <tr>
              <td>Carlos Netos</td>
              <td>Age</td>
              <td>Moto</td>
              <td>Honda/JSA-2198</td>
              <td>Manhã</td>
              <td>1202</td>
              <td>1259</td>
              <td class="status approved">
                <span>
                  Aprovado
                </span>
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

  <ReportManagement
    v-if="modal === 'report-mng'"
    :data="dataReport"
    @close-modal="modal = ''"
  />
  <ReportNew
    v-if="modal === 'report-new'"
    @close-modal="modal = ''"
  />
</template>

<script>

import ReportManagement from "@/components/ageControl/operatingPanel/ReportManagement";
import ReportNew from "@/components/ageControl/operatingPanel/ReportNew";

export default {
  name: "ReportPanel",
  components: {ReportManagement, ReportNew},
  emits: ['close-modal'],
  data() {
    return {
      menuDrop: '',
      modal: false,
      dataReport: {}
    }
  },
  methods: {
    openDropdown: function (id) {
      const element = this.$el.querySelector('#'+id)
      const domRect = element.getBoundingClientRect();
      const space = window.innerHeight - domRect.bottom;


      if(space > 100) {
        this.menuDrop = 'down'
      } else {
        this.menuDrop = 'up'
      }
    }
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
      height: 80%;
      padding: 2vh 0;

      table {
        width: 100%;
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