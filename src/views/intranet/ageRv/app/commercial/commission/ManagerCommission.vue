<template>
  <div class="title">
    <span>{{ title }} {{ monthName }}</span>
    <div class="options" v-if="page === 'view-general'">
      <i class="fi fi-rr-caret-down" @click="filters.display = !filters.display"></i>
      <div class="items" v-if="filters.display">
        <ul>
          <li @click="[dateFiltered.month = '01', getAnalytic(),
                      filters.display = false, this.monthName = 'Janeiro']">Janeiro/2023</li>
          <li @click="[dateFiltered.month = '02', getAnalytic(),
                      filters.display = false, this.monthName = 'Fevereiro']">Fevereiro/2023</li>
          <li @click="[dateFiltered.month = '03', getAnalytic(),
                      filters.display = false, this.monthName = 'Março']">Março/2023</li>
        </ul>
      </div>
    </div>
  </div>
  <template v-if="this.monthName.length > 0">
    <div class="grid animation-up" v-if="page === 'view-general'">
      <div class="section">
        <h2>Informações gerais</h2>
        <div class="table-list">
          <div class="header">
            <div class="data-item">
            <span>
             Canal
            </span>
            </div>
          </div>
          <div class="body">
            <template
                v-for="(item, index) in dataInfo" :key="index">
              <div class="row-item"
                   v-if="item.supervisors.length > 0"
                   @click="viewSupervisors(item.supervisors)">
                <div class="data-item">
                  {{ item.channel }}
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
    <div class="grid animation-up" v-if="page === 'view-supervisors'">
      <div class="button-back">
        <button @click="page = 'view-general'">Voltar</button>
      </div>
      <div class="section">
        <h2>Informações gerais</h2>
        <div class="table-list">
          <div class="header">
            <div class="data-item">
            <span>
             Supervisor
            </span>
            </div>
            <div class="data-item">
            <span>
             Vendas
            </span>
            </div>
            <div class="data-item">
            <span>
             Meta
            </span>
            </div>
            <div class="data-item">
            <span>
             Meta atingida
            </span>
            </div>
            <div class="data-item">
            <span>
             Canceladas
            </span>
            </div>
            <div class="data-item">
            <span>
             Estrelas
            </span>
            </div>
            <div class="data-item">
            <span>
             Valor da estrela
            </span>
            </div>
            <div class="data-item">
            <span>
             Acelerador/Deflator
            </span>
            </div>
            <div class="data-item">
            <span>
             Comissão
            </span>
            </div>
            <div class="data-item">
            <span>
             Competência
            </span>
            </div>
          </div>
          <div class="body">
            <template
                v-for="(item, index) in supervisorData" :key="index">
              <div class="row-item"
                   @click="viewSellers(item.sellersData)">
                <div class="data-item">
                  {{ item.supervisorData[0].colaborador }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].vendas }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].meta }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].meta_atingida }}%
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].vendas_canceladas }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].estrelas }}
                </div>
                <div class="data-item">
                  R${{ item.supervisorData[0].valor_estrela }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].acelerador_deflator }}%
                </div>
                <div class="data-item">
                  R${{ item.supervisorData[0].comissao }}
                </div>
                <div class="data-item">
                  {{ item.supervisorData[0].competencia }}
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
    <div class="grid animation-up" v-if="page === 'view-sellers'">
      <div class="button-back">
        <button @click="page = 'view-supervisors'">Voltar</button>
      </div>
      <div class="section">
        <h2>Informações gerais</h2>
        <div class="table-list">
          <div class="header">
            <div class="data-item">
            <span>
             Vendedor
            </span>
            </div>
            <div class="data-item">
            <span>
             Vendas
            </span>
            </div>
            <div class="data-item">
            <span>
             Meta
            </span>
            </div>
            <div class="data-item">
            <span>
             Meta atingida
            </span>
            </div>
            <div class="data-item">
            <span>
             Canceladas
            </span>
            </div>
            <div class="data-item">
            <span>
             Estrelas
            </span>
            </div>
            <div class="data-item">
            <span>
             Valor da estrela
            </span>
            </div>
            <div class="data-item">
            <span>
             Acelerador/Deflator
            </span>
            </div>
            <div class="data-item">
            <span>
             Comissão
            </span>
            </div>
            <div class="data-item">
            <span>
             Competência
            </span>
            </div>
          </div>
          <div class="body">
            <template
                v-for="(item, index) in sellerData" :key="index">
              <div class="row-item" style="cursor: default">
                <div class="data-item">
                  {{ item.data[0].colaborador }}
                </div>
                <div class="data-item">
                  {{ item.data[0].vendas }}
                </div>
                <div class="data-item">
                  {{ item.data[0].meta }}
                </div>
                <div class="data-item">
                  {{ item.data[0].meta_atingida }}%
                </div>
                <div class="data-item">
                  {{ item.data[0].vendas_canceladas }}
                </div>
                <div class="data-item">
                  {{ item.data[0].estrelas }}
                </div>
                <div class="data-item">
                  R${{ item.data[0].valor_estrela }}
                </div>
                <div class="data-item">
                  {{ item.data[0].acelerador_deflator }}%
                </div>
                <div class="data-item">
                  R${{ item.data[0].comissao }}
                </div>
                <div class="data-item">
                  {{ item.data[0].competencia }}
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>

import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from "js-cookie";
import {mapMutations} from "vuex";

export default {
  name: "ManagerCommission",
  emits: ['view-sales'],
  data () {
    return {
      page: 'view-general',
      monthName: '',
      title: 'Painel de comissões - ',
      data: {},
      dataInfo: {},
      supervisorData: {},
      sellerData: {},
      filters: {
        display: false
      },
      dateFiltered: {
        month: null,
        year: 2023
      }
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    getAnalytic: function () {

      this.dataInfo = {}
      this.SAVE_SYSTEM({loading: true})

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics/payment',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          month: this.dateFiltered.month,
          year: 2023
        }
      }).then((res) => {
        this.dataInfo = res.data
        this.SAVE_SYSTEM({loading: false})

      }).catch(() => {
      })
    },
    getMonth: function () {
      const date = new Date()
      if (date.getMonth() < 10) {
        this.dateFiltered.month = '0' + (date.getMonth() - 1)
      } else {
        this.dateFiltered.month = (date.getMonth() + 1).toString()
      }

      return this.dateFiltered.month
    },
    viewSupervisors: function (data) {
      this.supervisorData = data
      this.page = 'view-supervisors'
    },
    viewSellers: function (data) {
      this.sellerData = data
      this.page = 'view-sellers'
    }
  },
  beforeMount() {
    this.getMonth()
    this.getAnalytic()
  }

}
</script>

<style lang="scss">

h1 {
  font-size: 2.4rem;
}

.title {
  @include flex(row, flex-start, center, .5vw);


  span {
    font-size: 2.4rem;
  }

  .options {
    position: relative;

    i {
      cursor: pointer;
      font-size: 2.4rem;

      &:hover {
        opacity: .8;
      }
    }

    .items {
      @include card();
      padding: 0;
      position: absolute;
      z-index: 999;
      animation: up-list forwards ease-in-out .2s;
      overflow: hidden;

      ul {
        li {
          font-size: 1.4rem;
          padding: 2vh 5vw 2vh 1vw;
          border-bottom: 1px solid $border;
          cursor: pointer;
          transition: background-color ease-in-out .2s, color ease-in-out .2s;

          &:hover {
            background-color: rgba(204, 204, 204, 0.2);
          }
        }

        li:nth-last-child(1) {
          border: none;
        }
      }

    }
  }
}

h2 {
  font-size: 1.4rem;
  line-height: 3rem;
}

.grid {
  height: 100%;
  margin-top: 2vh;
  @include flex(column, flex-start, initial, 1vh);

  .section-actions {
    grid-area: P;
    .card-actions {
      @include card();
      @include flex(column, flex-start, initial, 3vh);

      .actions {
        @include flex(column, flex-start, initial, 1vh);

        span {
          font-size: 1.2rem;
          color: $title-strong;
          font-weight: 600;
        }

        .items {
          @include flex(column, flex-start, initial, 1vh);

          button {
            @include btn-dashboard();
            margin: 0;

            justify-content: flex-start;


          }
        }
      }
    }
  }


  .button-back {
    button {
      @include btn-dashboard(true);
    }
  }


}


.animation-up {
  animation: up-list forwards ease-in-out .2s;
}

@keyframes up-list {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  grid-area: C;
  width: 100%;



  .table-list {
    width: 100%;


    .header {
      padding-left: 1vw;
      width: 100%;
      @include flex(row, flex-start, center, 0);
      height: 7vh;

      .data-item {
        width: calc((100% / 5) - 10px);
        text-align: center;

        span {
          color: $h1-black;
          font-size: 1.4rem;
        }

      }

      .data-item:nth-child(1) {
        text-align: left;
      }
    }

    .body {
      @include flex(column, flex-start, initial, 1vh);


      .row-item {
        width: 100%;
        @include card();
        @include flex(row, flex-start, center, 0);
        padding: 2vh 0 2vh 1vw;
        cursor: pointer;

        .data-item {
          width: calc((100% / 5) - 10px);
          font-size: 1.2rem;
          color: $h1-black;
          text-align: center;
        }

        .data-item:nth-child(1) {
          text-align: left;
        }
      }

    }

  }
}


.mode-dark {

  .item {
    @include card(false);
  }

}


</style>