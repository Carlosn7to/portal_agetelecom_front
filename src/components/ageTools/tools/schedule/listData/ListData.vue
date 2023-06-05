<template>
  <div class="container-list-data">
    <div class="options-list-data" v-if="data.length > 0">

      <div class="search">
        <input type="text" name="search" id="search" placeholder="Buscar..." autocomplete="off" v-model="search">
      </div>

      <div class="buttons">
        <button @click="downloadExcel">Download excel</button>
      </div>

    </div>
    <div id="list-data">
      <table v-if="data.length > 0">
        <thead>
          <tr>
            <th>Tipo de solicitação</th>
            <th>Protocolo</th>
            <th>Nome do cliente</th>
            <th>Turno</th>
            <th>Região</th>
            <th>Nº do contrato</th>
            <th>Equipe</th>
            <th>Técnico</th>
            <th>Data inicio Att.</th>
            <th>Data Fim Att.</th>
            <th>Status</th>
            <th>Data inicio agendamento</th>
            <th>Data fim agendamento</th>
            <th>Situação do contrato</th>
            <th>Status do contrato</th>
            <th>Contexto</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ClientFiltered" :key="index">
            <td>{{ item.type_note }}</td>
            <td>{{ item.protocol }}</td>
            <td>{{ item.name_client }}</td>
            <td>{{ item.turnName }}</td>
            <td>{{ item.region }}</td>
            <td>{{ item.contract_id }}</td>
            <td>{{ item.team }}</td>
            <td>{{ item.technical }}</td>
            <td>{{ item.date_start_attendance }}</td>
            <td>{{ item.date_end_attendance }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.date_start_schedule }}</td>
            <td>{{ item.date_end_schedule }}</td>
            <td>{{ item.stage_contract }}</td>
            <td>{{ item.status_contract }}</td>
            <td>{{ item.context }}</td>
            <td>{{ item.problem }}</td>
            <td>
              <div class="actions">
                <button @click="copyProtocol(item.protocol)">
                  <i class="fi fi-rr-copy-alt"></i>
                </button>
                <button @click="searchInVoalle(item.protocol, item.id_client)">
                  <i class="fi fi-rr-redo"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="alert" v-else>
        <span>
          Nenhum dado encontrado!
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListData",
  props: ['data', 'typeFilter'],
  emits: ['downloadExcel'],
  data () {
    return {
      jsonHash: {
        "personID": 0,
        "pbxInfo": {},
        "availability": true
      },
      search: ''
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
    searchInVoalle: function(protocol, idClient) {

      this.jsonHash.personID = idClient


      const url = `https://erp.agetelecom.com.br/service_dashboard#list`;
      this.copyProtocol(protocol);
      window.open(url, '_blank');
    },
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
  @include flex(column,space-between, initial, 1vh);
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 1vh 1vw;

  .options-list-data {
    height: 14%;
    width: 100%;
    @include flex(row, space-between, center, 0);
    padding: 2vh 0;

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

    height: 83%;
    max-height: 83%;
    overflow: auto;
    max-width: 100%;

    padding: 0 1vw 0 0;
    table {
      border-collapse: collapse;
      width: 100%;
      thead {
        tr {
          th {
            border-bottom: 1px solid $border-hover;
            height: 8vh;
            color: $h1-black;
            font-size: 1.2rem;
            font-weight: 400;
            min-width: 13vw;
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
            min-width: 13vw;


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