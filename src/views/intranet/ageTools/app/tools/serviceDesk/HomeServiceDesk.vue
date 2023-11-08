<script>
import {mapMutations} from "vuex";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from "js-cookie";
import { vMaska } from 'maska';
export default {
  name: "HomeServiceDesk",
  directives: {maska: vMaska},
  data() {
    return {
      search: '',
      data: {
        client: [],
        connection: [],
        contract: [],
        financial: [],
        history: []
      },
      loading: {
        client: false,
        connection: false,
        contract: false,
        financial: false,
        history: false
      },
      options: {
        mask: "###.###.###-##",
        eager: true
      }
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ]),
    tradeLoading () {
      this.loading.client = !this.loading.client
      this.loading.connection = !this.loading.connection
      this.loading.contract = !this.loading.contract
      this.loading.financial = !this.loading.financial
      this.loading.history = !this.loading.history

    },
    getClient() {


     this.tradeLoading()

      if(this.search.length < 14) {
        return alert('CPF inválido')
      }

      this.data.client = []
      this.data.contract = []
      this.data.connection = []

      AXIOS({
        method: 'get',
        url: '/agetools/tools/service-desk/client/' + this.search,
        headers: {
           'Authorization': 'Bearer ' + Cookie.get('token')
        }
      }).then((res) => {

        if(res.data.length === 0) {

          this.tradeLoading()
         return alert('Nenhum cliente encontrado!')

        }

        setTimeout(() => {
          this.data.client = res.data[0]
          this.loading.client = false

          this.getContract()
        }, 1000)
      })
    },
    getContract() {
      AXIOS({
        method: 'get',
        url: '/agetools/tools/service-desk/contract/' + this.data.client.id,
        headers: {
          'Authorization': 'Bearer ' + Cookie.get('token')
        }
      }).then((res) => {

        if(res.data.length === 0) {
          this.tradeLoading()
          this.loading.client = false
          return alert("Nenhum contrato vinculado")
        }

        setTimeout(() => {
          this.data.contract = res.data[0]
          this.loading.contract = false
          this.data.contract.id ? this.getConnection() : this.data.contract = [];
        }, 1000)
      })
    },
    getConnection() {
      AXIOS({
        method: 'get',
        url: '/agetools/tools/service-desk/connection/' + this.data.contract.id,
        headers: {
          'Authorization': 'Bearer ' + Cookie.get('token')
        }
      }).then((res) => {

        if(res.data.length === 0) {
          return alert("Nenhuma conexão encontrada")
        }

        setTimeout(() => {
          this.data.connection = res.data[0]
          this.loading.connection = false
        }, 1000)

      })
    }
  },
  created() {
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<template>
  <div class="search-container">
    <div class="search">
      <i class="fi fi-rr-search"></i>
        <input type="text" name="search" id="search"
               v-model="search"
               placeholder="Insira o CPF/CNPJ do cliente"
               autocomplete="off" @keyup.enter="getClient"
                v-maska:[options]>
    </div>
    <div class="cards-container">
      <div class="card" :class="{'data-search' : data.client.id}">
        <div class="header">
          <div class="title">
            <i class="fi fi-rr-user"></i>
            <span>
            Dados do Cliente
          </span>
          </div>
          <div class="lds-dual-ring" v-if="loading.client"></div>
          <i class="fi fi-rr-list-check" v-if="data.client.id"></i>
        </div>

        <div class="table">
          <div class="data-item">
            <div class="item">
              <p>Nome</p>
              <span>{{ this.data.client.name ? this.data.client.name : ' - ' }}</span>
            </div>
            <div class="item">
              <p>CPF / CNPJ</p>
              <span>{{ this.data.client.tx_id ? this.data.client.tx_id : ' - ' }}</span>
            </div>
            <div class="item">
              <p>E-mail</p>
              <span>{{ this.data.client.email ? this.data.client.email : ' - ' }}</span>
            </div>
          </div>
          <div class="data-items">
            <div class="item">
              <p>Telefone Principal</p>
              <span>{{ this.data.client.cell_phone_1 ? this.data.client.cell_phone_1 : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Telefone Secundário</p>
              <span>{{ this.data.client.cell_phone_2 ? this.data.client.cell_phone_2 : ' - ' }}</span>
            </div>
          </div>
          <div class="data-item">
            <div class="item">
              <p>Endereço</p>
              <span>{{ this.data.client.full_address ? this.data.client.full_address : ' - ' }}</span>
            </div>
          </div>
        </div>
        <br>
        <div class="header">
          <div class="title">
            <i class="fi fi-rr-menu-burger"></i>
            <span>
            Histórico do Cliente
          </span>
          </div>
          <div class="lds-dual-ring" v-if="loading.history"></div>
          <i class="fi fi-rr-list-check" v-if="data.history.id"></i>
        </div>
      </div>
      <div class="card" :class="{'data-search' : data.contract.id}">

        <div class="header">
          <div class="title">
            <i class="fi fi-rr-user"></i>
            <span>
            Dados do Contrato
          </span>
          </div>
          <div class="lds-dual-ring" v-if="loading.contract"></div>
          <i class="fi fi-rr-cross-small" style="color: red" v-if="data.client.id && ! data.contract.id"></i>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <p>Nº do contrato</p>
              <span>{{ this.data.contract.id ? this.data.contract.id : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Estagio</p>
              <span :class="{
                          'normal' : data.contract.stage === 'Aprovado',
                          'canceled' : data.contract.stage === 'Cancelado',
                          'suspended' : data.contract.stage === 'Em Aprovação',
                          }" >{{ this.data.contract.stage ? this.data.contract.stage : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Status</p>
              <span :class="{
                          'normal' : data.contract.status === 'Normal',
                          'canceled' : data.contract.status === 'Cancelado',
                          'suspended' : data.contract.status === 'Suspenso',
                          'blocked' : data.contract.status === 'Bloqueio Financeiro',
                          }" >{{ this.data.contract.status ? this.data.contract.status : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Inclusão do contrato</p>
              <span>{{ this.data.contract.date_incluse ? this.data.contract.date_incluse : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Desbloqueios realizados</p>
              <span>{{ this.data.contract.unblock ? '03/02/2022' : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Contrato bloqueado</p>
              <span>{{ this.data.contract.blocked ? 'Não - Último em 08/10/2022' : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Reduzido</p>
              <span>{{ this.data.contract.reduction ? 'Não' : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Informações sobre o plano</p>
              <ul>
                <li>Plano: <b>{{ this.data.contract.plan ? this.data.contract.plan : ' - ' }}</b></li>
                <li>IP FIXO: <b>{{ this.data.contract.ip_fix ? this.data.contract.ip_fix : ' - ' }}</b></li>
                <li>Data da aprovação: <b>{{ this.data.contract.date_approval ? this.data.contract.date_approval : ' - ' }}</b></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card" :class="{'data-search' : data.connection.serial}">

        <div class="header">
          <div class="title">
            <i class="fi fi-rr-broadcast-tower"></i>
            <span>
            Dados da Conexão
          </span>
          </div>
          <div class="lds-dual-ring" v-if="loading.connection"></div>
          <i class="fi fi-br-cross" v-if="!data.connection.serial && data.connection.length !== 0"></i>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <p>Serial do cliente</p>
              <span>{{ this.data.connection.serial ? this.data.connection.serial : ' - ' }}</span>
            </div>
            <div class="item">
              <p>Ponto de acesso</p>
              <ul>
                <li>POP: <b>{{ this.data.connection.pop_olt ? this.data.connection.pop_olt : ' - ' }}</b></li>
                <li>OLT: <b>{{ this.data.connection.olt ? this.data.connection.olt : ' - ' }}</b></li>
                <li>Slot OLT: <b>{{ this.data.connection.slot_olt ? this.data.connection.slot_olt : ' - ' }}</b></li>
                <li>Porta OLT: <b>{{ this.data.connection.port_olt ? this.data.connection.port_olt : ' - ' }}</b></li>
                <li>ID ONU: <b>{{ this.data.connection.serial ? this.data.connection.serial : ' - ' }}</b></li>
              </ul>
            </div>
            <div class="item">
              <p>Dados da rede Wi-Fi</p>
              <ul>
                <li>Usuário: <b>{{ this.data.connection.wifi_name ? this.data.connection.wifi_name : ' - ' }}</b></li>
                <li>Senha: <b>{{ this.data.connection.wifi_password ? this.data.connection.wifi_password : ' - ' }}</b></li>
              </ul>
            </div>
            <div class="item">
              <p>Extrato de conexão</p>
              <ul>
                <li>Data da instalação: <b>{{ this.data.connection.date_activation ? this.data.connection.date_activation : ' - ' }}</b></li>
                <li>Data da última atualização: <b>{{ this.data.connection.date_modified ? this.data.connection.date_modified : ' - ' }}</b></li>
                <li>Consumo de dados (este mês): <b>{{ this.data.connection.consum ? this.data.connection.consum : ' - ' }}</b></li>
                <li>Velocidade da conexão: <b>{{ this.data.connection.plan_speed ? this.data.connection.plan_speed : ' - ' }}</b></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div class="card" :class="{'data-search' : data.financial.id}">
        <div class="header">
          <div class="title">
            <i class="fi fi-rr-search-dollar"></i>
            <span>
            Dados Financeiros
          </span>
          </div>
          <div class="lds-dual-ring" v-if="loading.financial"></div>
          <i class="fi fi-rr-list-check" v-if="data.financial.id"></i>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <p>Nº de faturas em aberto</p>
              <span>-</span>
            </div>
            <div class="item">
              <p>Valor total em aberto</p>
              <span>-</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.search-container {
  height: 100%;
  .search {
    width: 100%;
    height: 7%;
    @include card();
    border: none;
    @include flex(row, flex-start, center, 1vw);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px;
    i {
      font-size: 1.4rem;
      color: $icon-color;
    }

    input {
      border: none;
      width: 90%;
      outline: none;
    }
  }

  .cards-container {
    @include flex(row, space-between, initial, 1vw);
    height: 93%;
    padding: 2vh 0;

    .card {
      width: calc((100% / 4) - 1vw);
      height: 100%;
      @include card();
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
border: none;
      .header {
        border-bottom: 1px solid $border;
        padding: 0 0 .5vh 1vw;
        @include flex(row, space-between, center, 1vw);
        .title {



          @include flex(row, flex-start, center, .5vw);

          i {
            font-size: 1.4rem;
            color: $primary;
          }
          span {
            font-size: 1.2rem;
            font-weight: 600;
            padding-bottom: 3px;
            color: $h1-black;
          }
        }

        .lds-dual-ring {
          display: inline-block;
          width: 30px;
          height: 30px;

        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 20px;
          height: 20px;
          margin: 4px;
          border-radius: 50%;
          border: 3px solid #333;
          border-color: $primary transparent $primary transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        i {
          font-size: 1.8rem;
          color: $primary;
        }
      }

      .table {
        padding: 1vh 0;
        .data-item, .data-items {
          padding: 0vh 1vw;

          .item {
            padding: .3vh 0;

            p:nth-child(1) {
              color: #000;
              font-weight: 600;
              font-size: 1rem;
              padding: 1vh 0;
            }

            span:nth-child(2) {
              color: #666;
              font-size: 1rem;
              font-weight: 500;
              user-select: text !important;
              border-radius: 5px;
            }

            ul {
              padding: .3vh .7vw;
              li {
                list-style: inside;
                user-select: text !important;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                b {
                  user-select: text !important;

                }


              }
            }

            .normal {
              background-color: $alert-success;
              color: #fff !important;
              padding: 5px 8px;

            }

            .canceled {
              background-color: $alert-warning;
              color: #fff !important;
              padding: 5px 8px;

            }

            .suspended {
              background-color: $alert-attention;
              color: #fff !important;
              padding: 5px 8px;

            }

            .blocked {
              background-color: $alert-warning;
              color: #fff !important;
              padding: 5px 8px;

            }
          }
        }

        .data-items {
          @include flex(row, space-between, center, 1vw);
        }
      }
    }

    .data-search {
      box-shadow: $primary 0px 1px 3px, $primary 0px 1px 2px;

    }
  }
}

</style>