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
<!--          <li @click="[dateFiltered.month = '03', getAnalytic(), -->
<!--                      filters.display = false, this.monthName = 'Março']">Março/2023</li>-->
        </ul>
      </div>
    </div>
  </div>

  <div class="grid animation-up" v-if="page === 'view-general'">
    <InformationGeneral
      @view-sales="viewPage"
      :data="dataInfo.channels"
    />
    <DashboardGeneral
        :data="dashboards"
    />
    <div class="section-actions">
      <h2>Central de ações</h2>
      <div class="card-actions">
        <div class="actions">
          <span>Operacional</span>
          <div class="items">
            <button>
              Auditar
            </button>
            <button>
              Contestações
            </button>
          </div>
        </div>
        <div class="actions">
          <span>Downloads</span>
          <div class="items">
            <button>
              Relatório Resumo
            </button>
            <button>
              Relatório Completo
            </button>
          </div>
        </div>
        <div class="actions">
          <span>Informações</span>
          <div class="items">
            <button>
              Regras aplicadas
            </button>
            <button>
              Planos e estrelas
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
  <ViewSales
    v-if="page === 'view-sales'"
    @return-page="viewPage"
    :data="data"
  />
</template>

<script>

import DashboardGeneral from "@/components/ageRv/comercial/commission/audit/DashboardGeneral";
import InformationGeneral from "@/components/ageRv/comercial/commission/audit/InformationGeneral";
import ViewSales from "@/components/ageRv/comercial/commission/audit/ViewSales";
import {AXIOS} from "../../../../../../../services/api.ts";
import Cookie from "js-cookie";
import {mapMutations} from "vuex";

export default {
  name: "AuditCommission",
  components: {DashboardGeneral, InformationGeneral,ViewSales},
  emits: ['view-sales'],
  data () {
    return {
      page: 'view-general',
      monthName: 'Janeiro',
      title: 'Painel de comissões - ',
      data: {},
      dataInfo: {},
      dashboards: {},
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
    viewPage: function (data = null) {

      if(data !== null){
        this.page = data.page
        this.data = data.data
        this.title = data.title
      } else {
        this.page = 'view-general'
        this.title = 'Painel de comissões - '
      }
    },
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
        this.dashboards = res.data.infoTotal
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
  display: grid;
  grid-template-columns: 80% 18%;
  grid-template-rows: 26% 40%;
  justify-content: space-between;
  grid-template-areas: 'D P'
                        'C P';

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

.mode-dark {

  .item {
    @include card(false);
  }

}


</style>