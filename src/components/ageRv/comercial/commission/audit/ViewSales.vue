<template>
  <div class="grid animation-up" v-if="page === 'view-sellers'">
    <div class="section-actions">
      <h2>Central de ações</h2>
      <div class="card-actions">
        <div class="actions">
          <span>Filtros</span>
          <div class="items">
            <button @click="[dataFilter(0), filters.selected = 'all']" :class="{ 'selected' : filters.selected === 'all' }">Todos</button>
            <button @click="[dataFilter(1), filters.selected = 'commissionable']" :class="{ 'selected' : filters.selected === 'commissionable' }">Comissionados</button>
            <button @click="[dataFilter(2), filters.selected = 'noCommissionable']" :class="{ 'selected' : filters.selected === 'noCommissionable' }">Não comissionados</button>
          </div>
        </div>
<!--        <div class="actions">-->
<!--          <span>Downloads</span>-->
<!--          <div class="items">-->
<!--            <button>-->
<!--              Consolidado - Resumo-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="actions">-->
<!--          <span>Informações</span>-->
<!--          <div class="items">-->
<!--            <button>-->
<!--              Regras aplicadas-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
        <div class="actions">
          <span>Ações</span>
          <div class="items">
            <button @click="returnPage">
              Voltar
            </button>
          </div>
        </div>

      </div>
    </div>
    <div class="table-list">
      <input type="text" v-model="search" placeholder="Buscar colaborador...">
      <div class="header">
        <div class="data-item">
            <span>
             Colaborador
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
              Mediador
            </span>
        </div>
        <div class="data-item">
            <span>
              Comissão
            </span>
        </div>
      </div>
      <div class="body" v-if="statusData">
        <div class="row-item animation-up"
             :style="'animation-delay: '+key * 0.1+'s'"
          v-for="(item, key) in CollaboratorsFiltered" :key="item.id"
          @click="viewSeller(item)">
          <div class="data-item">
            {{ item.name }}
          </div>
          <div class="data-item">
            {{ item.sales.count }}
          </div>
          <div class="data-item">
            {{ item.meta }}
          </div>
          <div class="data-item">
            {{ item.metaPercent }}%
          </div>
          <div class="data-item" :class="{ 'highlight red' : item.commission !== '0,00' && item.cancel.count > 0 }">
            {{ item.cancel.count }}
          </div>
          <div class="data-item">
            {{ item.stars }}
          </div>
          <div class="data-item">
            R$ {{ item.valueStar }}
          </div>
          <div class="data-item" :class="{ 'highlight green' : item.commission !== '0,00' && item.mediator > 0, 'highlight dark-red' : item.commission !== '0,00' && item.mediator < 0 }">
            {{ item.mediator }}%
          </div>
          <div class="data-item" :class="{ 'highlight green' : item.commission !== '0,00' }">
            R${{ item.commission }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <ViewSeller
    :data="dataSeller"
    v-if="page === 'view-seller'"
    @return-sellers="page = 'view-sellers'"
  />
</template>

<script>

import ViewSeller from "@/components/ageRv/comercial/commission/audit/ViewSeller";

export default {
  name: "ViewSales",
  components: {ViewSeller},
  props: ['data'],
  data () {
    return {
      filters: {
        selected: 'all'
      },
      search: '',
      dataFiltered: this.data,
      statusData: true,
      dataSeller: {},
      page: 'view-sellers'
    }
  },
  methods: {
    returnPage: function (){
      this.$emit('return-page')
    },
    dataFilter: function (t){
      this.dataFiltered = this.data
      this.statusData = false

      if(t === 0){
        this.dataFiltered = this.data
      } else if(t === 1) {

        this.dataFiltered = this.data.filter(value => value.isCommissionable === true)

      } else if(t === 2) {

        this.dataFiltered = this.data.filter(value => value.isCommissionable === false)

      }

      this.statusData = true


    },
    viewSeller: function (data) {
      this.dataSeller = data
      this.page = 'view-seller'
    }
  },
  computed: {
    CollaboratorsFiltered: function () {
      let values = []

      values = this.dataFiltered.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })

      values = values.sort((a, b) => {
        if (a.isCommissionable && !b.isCommissionable) {
          return -1;
        } else if (!a.isCommissionable && b.isCommissionable) {
          return 1;
        } else {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          }
        }

        return 0
      })


      return values
    },
  },
  beforeMount() {
  },

}
</script>

<style scoped lang="scss">

.grid {
  grid-template-areas: 'T P'
                        'T P';
  overflow: hidden;
  max-height: 90%;
  height: 90%;
  grid-template-rows: 100%;
  .table-list {
    width: 100%;
    grid-area: T;
    max-height: 100%;
    height: 100%;

    input[type=text] {
      width: 45%;
      border-radius: 5px;
      outline: none;
      border: none;
      @include card(true);
      padding: 10px 10px;
      margin: 1vh 0;
    }

    .header {
      padding-left: 1vw;
      width: 100%;
      @include flex(row, flex-start, center, 1vw);
      height: 7vh;
      padding-right: calc((15px + 1vw));

      .data-item {
        width: calc((100% / 8) - 10px);
        text-align: center;

        span {
          color: $h1-black;
          font-size: 1.4rem;
        }

      }

      .data-item:nth-child(1) {
        text-align: left;
        width: 20%;
      }
    }

    .body {
      @include flex(column, flex-start, initial, 1vh);
      overflow-y: auto;
      height: 60vh;
      min-height: 60vh;
      max-height: 60vh;
      padding-right: 15px;

      .row-item {
        width: 100%;
        @include card();
        @include flex(row, flex-start, center, 1vw);
        padding: 2vh 1vw 2vh 1vw;
        cursor: pointer;
        opacity: 0;

        .data-item {
          width: calc((100% / 8) - 10px);
          font-size: 1.2rem;
          color: $h1-black;
          text-align: center;
          padding: 5px 3px;
        }

        .data-item:nth-child(1) {
          text-align: left;
          width: 20%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-transform: capitalize;
        }


        .highlight {
          color: #fff;
          border-radius: 3px;
          font-weight: 500;
        }

        .green {
          background-color: $green-card;
        }

        .red {
          background-color: $red-hover-card;
        }

        .dark-red {
          background-color: $red-hover-card;
        }
      }

    }

  }

}

.section-actions {


  .card-actions {
    .actions {

      .selected {
        background-color: $primary !important;
        color: #fff !important;

        &:hover {
          background-color: $primary-hover !important;
        }
      }
    }

  }
}


</style>