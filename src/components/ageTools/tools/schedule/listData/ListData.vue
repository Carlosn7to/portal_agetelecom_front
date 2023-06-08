<template>
  <div class="container-list-data">
    <div class="options-list-data">

      <div class="search">
        <input type="text" name="search" id="search" placeholder="Buscar cliente..." autocomplete="off" v-model="search" @keyup.enter="getClientUnique">
      </div>

      <div class="buttons"  v-if="data.length > 0">
        <button @click="downloadExcel">Download excel</button>
      </div>

    </div>
    <div id="list-data" v-if="data.length > 0">
      <div class="headers-list">
        <div class="header" v-for="(header, index) in table.headers" :key="index">
          <span>{{ header }}</span>
        </div>
      </div>
      <div class="body-list" >
        <template v-for="(item, index) in ClientFiltered" :key="index">
          <div class="body-row">
            <div class="body"  style="display: flex; align-items: center; gap: .5vw; justify-content: center">
              <button class="checked" v-if="item.executed === false" @click="executeNote(item.protocol, item.date_start_attendance, item.date_end_attendance, item.date_start_schedule, item.date_end_schedule)">
                <i class="fi fi-rs-comment-alt-check"></i>
              </button>
              <button  @click="searchInVoalle(item.protocol)">
                <i class="fi fi-rs-redo"></i>
              </button>
            </div>
            <div class="body">
              <span>{{ item.type_note}}</span>
            </div>
            <div class="body">
              <span>{{ item.protocol}}</span>
            </div>
            <div class="body">
              <span>{{ item.name_client}}</span>
            </div>
            <div class="body">
              <span>{{ item.turnName}}</span>
            </div>
            <div class="body">
              <span>{{ item.region}}</span>
            </div>
            <div class="body">
              <span>{{ item.contract_id}}</span>
            </div>
            <div class="body">
              <span>{{ item.team}}</span>
            </div>
            <div class="body">
              <span>{{ item.technical}}</span>
            </div>
            <div class="body">
              <span>{{ item.date_start_attendance}}</span>
            </div>
            <div class="body">
              <span>{{ item.date_end_attendance}}</span>
            </div>
            <div class="body">
              <span>{{ item.date_start_schedule}}</span>
            </div>
            <div class="body">
              <span>{{ item.date_end_schedule}}</span>
            </div>
            <div class="body">
              <span>{{ item.status}}</span>
            </div>
            <div class="body">
              <span>{{ item.stage_contract}}</span>
            </div>
            <div class="body">
              <span>{{ item.status_contract}}</span>
            </div>
            <div class="body">
              <span>{{ item.context}}</span>
            </div>
            <div class="body">
              <span>{{ item.problem}}</span>
            </div>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script>

import {AXIOS} from "../../../../../../services/api.ts";
import Cookie from 'js-cookie';


export default {
  name: "ListData",
  props: ['data', 'typeFilter'],
  emits: ['downloadExcel', 'getClientUnique'],
  data () {
    return {
      search: '',
      table: {
        headers: ['Ações', 'Tipo de solicitação', 'Protocolo', 'Cliente','Turno', 'Região', 'Nº do contrato', 'Equipe', 'Técnico', 'Data inicio Att.',
                'Data fim att.', 'Data inicio agendamento', 'Data fim agendamento', 'Status', 'Situação do contrato', 'Status do contrato', 'Contexto', 'Problema'],
          body: ['', 'type_note', 'protocol', 'name_client','turnName', 'region', 'contract_id', 'team', 'technical', 'date_start_attendance',
              'date_end_attendance', 'date_start_schedule', 'date_end_schedule', 'status', 'stage_contract', 'status_contract', 'context', 'problem']
      }
    }
  },
  methods: {
    downloadExcel() {
      this.$emit('downloadExcel')
    },
    copyProtocol: function(protocol) {
      const copyProtocol = protocol;

      // Cria um elemento de input temporário
      const inputTemp = document.createElement("input");
      inputTemp.setAttribute("value", copyProtocol);
      document.body.appendChild(inputTemp);

      // Seleciona o conteúdo do input temporário
      inputTemp.select();

      // Copia o conteúdo selecionado para a área de transferência
      document.execCommand("copy");

      // Remove o input temporário do corpo do documento
      document.body.removeChild(inputTemp);
    },
    searchInVoalle: function(protocol) {



      const url = `https://erp.agetelecom.com.br/service_dashboard#list`;
      this.copyProtocol(protocol);
      window.open(url, '_blank');
    },
    getClientUnique: function () {
      this.$emit('getClientUnique', this.search)
    },
    executeNote: function (protocol, date_start_attendance, date_end_attendance, date_start_schedule, date_end_schedule) {

      this.$emit('executeNote', protocol)

      const payload = {
        protocol: protocol,
        date_start_attendance: date_start_attendance,
        date_end_attendance: date_end_attendance,
        date_start_schedule: date_start_schedule,
        date_end_schedule: date_end_schedule
      };

      AXIOS({
        method: 'POST',
        url: 'agetools/tools/schedule/notes/new-executed',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        data: {payload: payload}
      }).then((res) => {
        console.log(res)
      })
    }
  },
  computed: {
    ClientFiltered: function () {
      let values = []
      values = this.data.filter((value) => {
        return (
            value.name_client.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    }
  }
}
</script>

<style scoped lang="scss">

.container-list-data {
  @include flex(column,flex-start, initial, 1vh);
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 1vh 1vw;

  .options-list-data {
    width: 100%;
    @include flex(row, space-between, center, 0);
    padding: 1vh 0;

    .search {
      width: 40%;
      input {
        width: 100%;
        @include card();
        padding: 7px 10px;
      }
    }

    .buttons {


      button {
        @include btn-dashboard();

        &:hover {
          @include btn-dashboard(true);
        }
      }


    }
  }

  #list-data {
    @include flex(column, flex-start, initial, 1vh);
    overflow-x: scroll;

    .headers-list {
      @include flex(row, flex-start, center, 0vw);
      text-align: center;
      width: 100%;

      .header {
        text-align: center;
        height: 10vh;
        font-size: 1.4rem;
        font-weight: 500;
        border-bottom: 1px solid $border-hover;
        @include flex(row, center, center, 0);
        min-width: 15%;
      }
    }

    .body-list {
      @include flex(column, flex-start, initial, 1vh);
      max-height: 50%;
      min-height: 50%;

      .body-row {
        @include flex(row, flex-start, center, 0);
        height: 6vh;
        padding: 2vh 0;

        .body {
          text-align: center;
          min-width: 15%;
          font-size: 1.2rem;



          button {
            @include btn-dashboard(true);

            i {
              font-size: 1rem;
            }
          }

          .checked {
            background-color: #35c475;
            border-color: #35c475;


            &:hover {
              background-color: #35c475;
              border-color: #35c475;
              opacity: .8;
            }
          }
        }
      }


    }

    table {
      border-collapse: collapse;
      width: 100%;
      max-width: 100%;

      thead {
        position: sticky;
        top: 0;
        background-color: #fff;

        tr {
          th {
            border-bottom: 1px solid $border-hover;
            height: 8vh;
            color: $h1-black;
            font-size: 1.2rem;
            font-weight: 400;
            min-width: 10vw;
          }
        }
      }

      tbody {
        tr {
          td {
            border-bottom: 1px solid $border;
            font-size: 1.2rem;
            color: $h1-light;
            text-align: center;
            font-weight: 500;
            user-select: text;
            min-width: 10vw;

            .actions {
              @include flex(row, center, center, 1vw);

              button {
                @include btn-dashboard(false);

                &:hover {
                  @include btn-dashboard(true);
                }
              }
            }
          }
        }
      }
    }

    .alert {
      width: 100%;
      height: 50%;
      padding-top: 25vh;
      @include flex(row, center, center, 1vw);

      span {
        font-size: 2.6rem;
        color: $h1-light;
        font-weight: 400;
        text-align: center;
      }

      i {
        font-size: 7rem;
        color: $h1-light;
      }
    }
  }
}

.mode-dark {
  .container-list-data {
    background-color: $dark-mode-card;


    .options-list-data {
      .search {
        input {
          background-color: $dark-mode-background;
          color: $h1-white;
        }
      }

      .buttons {
        button {
          @include btn-dashboard(true);
        }
      }
    }


    #list-data {

      table {
        thead {
          background-color: $dark-mode-card;
          tr {
            th {
              color: $dark-mode-text-primary;
            }
          }
        }

        tbody {
          tr {
            td {
              color: $dark-mode-text-secondary;

              .actions {
                button {
                  @include btn-dashboard(true);
                }
              }
            }
          }
        }
      }

      .alert {
        span {
          color: $h1-white;
        }

        i {
          color: $dark-mode-text-secondary;
        }
      }
    }
  }
}

</style>