<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div class="filters">
        <input type="text" id="search" name="search" placeholder="Buscar condutor, placa..." autocomplete="off"
               v-model="search">
        <button @click="modal = 'filter'">
          <i class="fi fi-rr-filter"></i>
          <span>Filtro</span>
        </button>
        <button v-if="filtered === true" @click="getReports" class="clear-filter"><i class="fi fi-sr-filter-slash"></i></button>
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
            <th>Quilometragem <br> Relatada</th>
<!--            <th>Distância <br> Percorrida</th>-->
            <th>Status</th>
<!--            <th>Ações</th>-->
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in ConductorsFiltered" :key="item.id">
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
      filtered: false
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

      this.alert.msg = 'Relatório filtrado com sucesso!'
      this.alert.class = 'success'
      this.alert.status = true
    },
    getReports: function () {
      this.filtered = false
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
    width: 95vw;
    height: 95vh;
    background-color: $back-main;

    #close-button {
      height: 8%;
    }

    .filters {
      padding: 3vh 2vw;
      width: 100%;
      @include flex(row, flex-start, center, 0);
      input[type=text] {
        width: 25%;
        padding: 10px 8px;
        border-radius: 5px;
        outline: none;
        border: none;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        &:focus {
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
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


    #content-panel {
      width: 100%;
      height: 75%;
      max-height: 75%;
      padding: 2vh 2vw;
      overflow: auto;

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

        .up {
          color: $red;
        }

        .down {
          color: #04DBAC;
        }
      }
    }

  }
}

</style>