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
    getClient() {



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

         return alert('Nenhum cliente encontrado!')

        }
        this.data.client = res.data[0]

        this.getContract()
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
          return alert("Nenhum contrato vinculado")
        }

        this.data.contract = res.data[0]


        this.data.contract.id ? this.getConnection() : this.data.contract = [];
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

        this.data.connection = res.data[0]
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
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-user"></i>
          <span>
            Dados do Cliente
          </span>
        </div>

        <div class="table">
          <div class="data-item">
            <div class="item">
              <span>Nome</span>
              <span>{{ this.data.client.name ? this.data.client.name : ' - ' }}</span>
            </div>
            <div class="item">
              <span>CPF / CNPJ</span>
              <span>{{ this.data.client.tx_id ? this.data.client.tx_id : ' - ' }}</span>
            </div>
            <div class="item">
              <span>E-mail</span>
              <span>{{ this.data.client.email ? this.data.client.email : ' - ' }}</span>
            </div>
          </div>
          <div class="data-items">
            <div class="item">
              <span>Telefone Principal</span>
              <span>{{ this.data.client.cell_phone_1 ? this.data.client.cell_phone_1 : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Telefone Secundário</span>
              <span>{{ this.data.client.cell_phone_2 ? this.data.client.cell_phone_2 : ' - ' }}</span>
            </div>
          </div>
          <div class="data-item">
            <div class="item">
              <span>Endereço</span>
              <span>{{ this.data.client.full_address ? this.data.client.full_address : ' - ' }}</span>
            </div>
          </div>
        </div>
        <br>
        <div class="title">
          <i class="fi fi-rr-menu-burger"></i>
          <span>
            Histórico do Cliente
          </span>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-user"></i>
          <span>
            Dados do Contrato
          </span>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <span>Nº do contrato</span>
              <span>{{ this.data.contract.id ? this.data.contract.id : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Status</span>
              <span>{{ this.data.contract.status ? this.data.contract.status : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Estagio</span>
              <span>{{ this.data.contract.stage ? this.data.contract.stage : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Inclusão do contrato</span>
              <span>{{ this.data.contract.date_incluse ? this.data.contract.date_incluse : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Desbloqueios realizados</span>
              <span>{{ this.data.contract.unblock ? '03/02/2022' : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Contrato bloqueado</span>
              <span>{{ this.data.contract.blocked ? 'Não - Último em 08/10/2022' : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Reduzido</span>
              <span>{{ this.data.contract.reduction ? 'Não' : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Informações sobre o plano</span>
              <ul>
                <li>Plano: <b>{{ this.data.contract.plan ? this.data.contract.plan : ' - ' }}</b></li>
                <li>IP FIXO: <b>{{ this.data.contract.ip_fix ? this.data.contract.ip_fix : ' - ' }}</b></li>
                <li>Data da aprovação: <b>{{ this.data.contract.date_approval ? this.data.contract.date_approval : ' - ' }}</b></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-broadcast-tower"></i>
          <span>
            Dados da Conexão
          </span>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <span>Serial do cliente</span>
              <span>{{ this.data.connection.serial ? this.data.connection.serial : ' - ' }}</span>
            </div>
            <div class="item">
              <span>Ponto de acesso</span>
              <ul>
                <li>POP: <b>{{ this.data.connection.pop_olt ? this.data.connection.pop_olt : ' - ' }}</b></li>
                <li>OLT: <b>{{ this.data.connection.olt ? this.data.connection.olt : ' - ' }}</b></li>
                <li>Slot OLT: <b>{{ this.data.connection.slot_olt ? this.data.connection.slot_olt : ' - ' }}</b></li>
                <li>Porta OLT: <b>{{ this.data.connection.port_olt ? this.data.connection.port_olt : ' - ' }}</b></li>
                <li>ID ONU: <b>{{ this.data.connection.serial ? this.data.connection.serial : ' - ' }}</b></li>
              </ul>
            </div>
            <div class="item">
              <span>Dados da rede Wi-Fi</span>
              <ul>
                <li>Usuário: <b>{{ this.data.connection.wifi_name ? this.data.connection.wifi_name : ' - ' }}</b></li>
                <li>Senha: <b>{{ this.data.connection.wifi_password ? this.data.connection.wifi_password : ' - ' }}</b></li>
              </ul>
            </div>
            <div class="item">
              <span>Extrato de conexão</span>
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

      <div class="card">

        <div class="title">
          <i class="fi fi-rr-search-dollar"></i>
          <span>
            Dados Financeiros
          </span>
        </div>
        <div class="table">
          <div class="data-item">
            <div class="item">
              <span>Nº de faturas em aberto</span>
              <span>-</span>
            </div>
            <div class="item">
              <span>Valor total em aberto</span>
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
      .title {
        border-bottom: 1px solid $border;
        padding: 0 0 .5vh 1vw;


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

      .table {
        padding: 1vh 0;
        .data-item, .data-items {
          padding: 0vh 1vw;
          @include flex(column, flex-start, initial, .5vh);

          .item {
            @include flex(column, flex-start, initial, .5vh);
            padding: .3vh 0;

            span:nth-child(1) {
              color: #000;
              font-weight: 600;
              font-size: 1rem;
            }

            span:nth-child(2) {
              color: #666;
              font-size: 1rem;
              font-weight: 500;
              user-select: text !important;

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
          }
        }

        .data-items {
          @include flex(row, space-between, center, 1vw);
        }
      }
    }
  }
}

</style>