<template>
  <div id="content-conductor">
    <div class="filters">
      <input type="text" id="search" name="search" placeholder="Buscar condutor, placa..." autocomplete="off"
             v-model="search">
      <button @click="modal = 'conductor-new'">
        <i class="fi fi-rr-user-add"></i>
        <span>Novo condutor</span>
      </button>
    </div>
    <div id="content-panel">
      <table>
        <thead>
        <tr>
          <th>Condutor</th>
          <th>Grupo</th>
          <th>Veículo</th>
          <th>Fabricante/Modelo</th>
          <th>Data do cadastro</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in dataConductors" :key="item.id">
          <td>
            {{ item.primeiro_nome }}
            {{ item.segundo_nome }}
          </td>
          <td>{{ item.grupo }}</td>
          <td>{{ item.tipo }}</td>
          <td>
            {{ item.fabricante }}/{{ item.modelo }}
          </td>
          <td>
            {{ formatDate(item.created_at) }}
          </td>
          <td class="status approved">
                <span>
                  Ativo
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

  <ConductorNew
    v-if="modal === 'conductor-new'"
    @close-modal="modal = ''"
    @form-response="responseForm"
  />

  <AlertResponse
      :response="alert"
      v-if="alert.status === true"
      @close="alert.status = false"
  />
</template>

<script>

import ConductorNew from "@/components/ageControl/operatingPanel/conductors/ConductorNew";
import AlertResponse from "@/components/_aux/AlertResponse";
import {AXIOS} from "../../../../../services/api.ts";
import Cookie from 'js-cookie';
import moment from 'moment'

export default {
  name: "ConductorPanel",
  components: {ConductorNew, AlertResponse},
  emits: ['close-modal', 'form-response'],
  data () {
    return {
      search: '',
      modal: '',
      alert: {
        msg: '',
        class: '',
        status: false
      },
      dataConductors: {},
    }
  },
  computed: {},
  methods: {
    responseForm: function(data) {
      this.alert = data
    },
    getConductors: function () {
      AXIOS({
        method: 'get',
        url: 'agecontrol/management/conductor-complete',
        headers: {
          "Authorization": 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.dataConductors = res.data
      })
    },
    formatDate: function (date) {
      var newDate = moment.locale('pt-br')
      newDate = moment(date).format('L')
      return newDate
    }
  },
  mounted() {
    this.getConductors()
  }
}
</script>

<style scoped lang="scss">

#content-conductor {
  animation: down forwards .2s ease-in-out;
  height: 60vh;


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
  }
  #content-panel {
    width: 100%;
    height: 100%;
    max-height: 100%;
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


          .warning {
            span {
              background-color: $red;
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