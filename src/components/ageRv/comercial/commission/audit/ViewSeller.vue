<template>
  <div class="grid animation-up">
    <div class="section-actions">
      <h2>Central de ações</h2>
      <div class="card-actions">
        <div class="actions">
          <span>Filtros</span>
          <div class="items">
            <button @click="[dataFilter(0), filters.selected = 'all']" :class="{ 'selected' : filters.selected === 'all' }">Todos</button>
            <button @click="[dataFilter(1), filters.selected = 'commissionable']" :class="{ 'selected' : filters.selected === 'commissionable' }">Válidas</button>
            <button @click="[dataFilter(2), filters.selected = 'noCommissionable']" :class="{ 'selected' : filters.selected === 'noCommissionable' }">Canceladas</button>
          </div>
        </div>
                <div class="actions">
                  <span>Downloads</span>
                  <div class="items">
                    <button @click="downloadPrintScreen(data.name)">
                      Comprovante de tela
                    </button>
                  </div>
                </div>
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
            <button @click="returnSellers">
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
             Nome do cliente
            </span>
        </div>
        <div class="data-item">
             <span>
              Nº do contrato
            </span>
        </div>
        <div class="data-item">
            <span>
              Status
            </span>
        </div>
        <div class="data-item">
             <span>
              Situação
            </span>
        </div>
        <div class="data-item">
            <span>
              Data da vigência
            </span>
        </div>
        <div class="data-item">
            <span>
              Data do cancelamento
            </span>
        </div>
        <div class="data-item">
            <span>
              Plano
            </span>
        </div>
      </div>
      <div class="body" v-if="statusData">
        <div class="row-item animation-up"

            v-for="(item, index) in SalesFiltered"
             :key="index"
            >
          <div class="data-item">
            {{ item.nome_cliente }}
          </div>
          <div class="data-item">
            {{ item.id_contrato }}
          </div>
          <div class="data-item">
            {{ item.status }}
          </div>
          <div class="data-item">
            {{ item.situacao }}
          </div>
          <div class="data-item">
            {{ item.data_vigencia }}
          </div>
          <div class="data-item">
            {{ item.data_cancelamento }}
          </div>
          <div class="data-item">
            {{ item.plano }}
          </div>
        </div>
      </div>

    </div>
    <div id="printscreen" style="display: none">
      <h1>Comprovante de comissão - <b>{{ data.name.toUpperCase() }}</b> </h1>
      <div class="cards-dashboard">
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-rocket-lunch"></i>
            </div>
            <h3>
              Vendas
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.sales.count }}
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-chart-histogram"></i>
            </div>
            <h3>
              Meta
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.meta }}
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-arrow-trend-up"></i>
            </div>
            <h3>
              Meta atingida
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.metaPercent }}%
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-delete-document"></i>
            </div>
            <h3>
              Cancelamentos
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.cancel.count }}
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-star"></i>
            </div>
            <h3>
              Estrelas
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.stars }}
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-usd-circle"></i>
            </div>
            <h3>
              Valor da estrela
            </h3>
          </div>
          <div class="values">
            <span>
            R$ {{ data.valueStar }}
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-arrow-alt-up" v-if="data.mediator > 0"></i>
              <i class="fi fi-rr-arrow-alt-down" v-else></i>
            </div>
            <h3>
              {{ data.mediator > 0 ? 'Acelerador' : 'Deflator' }}
            </h3>
          </div>
          <div class="values">
            <span>
            {{ data.mediator }}%
            </span>
          </div>
        </div>
        <div class="card">
          <div class="title">
            <div>
              <i class="fi fi-rr-usd-square"></i>
            </div>
            <h3>
              Comissão
            </h3>
          </div>
          <div class="values">
            <span>
            R$ {{ data.commission }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>


import html2canvas from 'html2canvas';
import {mapMutations} from "vuex";

export default {
  name: "ViewSeller",
  props: ['data'],
  data () {
    return {
      filters: {
        selected: 'all'
      },
      search: '',
      dataFiltered: {},
      statusData: false
    }
  },
  computed: {
    SalesFiltered: function () {
      let values = []

      values = this.dataFiltered.filter((value) => {
        return (
            value.nome_cliente.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })

      values = values.sort((a, b) => {
        if (a.nome_cliente < b.nome_cliente) {
          return -1;
        } else if (a.nome_cliente > b.nome_cliente) {
          return 1;
        }
        return 0
      })

      return values
    },
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    returnSellers: function () {
      this.$emit('return-sellers')
    },
    dataFilter: function (t){
      this.dataFiltered = this.data.sales.extract
      this.statusData = false

      if(t === 0){
        this.dataFiltered = this.data.sales.extract
      } else if(t === 1) {

        this.dataFiltered = this.data.sales.extract.filter(value => value.situacao !== 'Cancelado')

      } else if(t === 2) {

        this.dataFiltered = this.data.sales.extract.filter(value => value.situacao === 'Cancelado')

      }

      this.statusData = true


    },
    downloadPrintScreen: function (name) {

      // Obtém a div com o id "printscreen"
      const element = document.getElementById('printscreen');

      element.style.display = 'block'

      // Usa html2canvas para criar uma imagem PNG da div
      html2canvas(element).then(canvas => {
        // Cria uma URL para a imagem
        const url = canvas.toDataURL('image/png');

        // Cria um link para o download da imagem
        const link = document.createElement('a');
        link.href = url;
        link.download = `${name}.png`;

        // Dispara um clique no link para iniciar o download
        link.dispatchEvent(new MouseEvent('click'));
      });

      element.style.display = 'none'

    }
  },
  mounted() {
    this.dataFilter(0)
  }
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
  width: 100%;
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
        width: calc((100% / 7) - 10px);
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
          width: calc((100% / 7) - 10px);
          font-size: 1.2rem;
          color: $h1-black;
          text-align: center;
          padding: 5px 3px;
          white-space: nowrap;
          overflow: hidden;
          text-transform: capitalize;
          text-overflow: ellipsis;

        }

        .data-item:nth-child(1) {
          text-align: left;
          width: 20%;
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

  #printscreen {
    grid-area: S;
    width: 100vw;
    height: 100vh;
    @include flex(column, flex-start, center, 3vh);
    padding: 2vh 3vw;

    h1 {
      text-align: left;
      width: 100%;
    }



    .cards-dashboard {
      @include flex(row, space-between, center, 1vw);
      flex-wrap: wrap;
      margin: 2vh 0;

      .card {
        @include card();
        @include flex(column, space-between, initial, 0);
        width: calc((100% / 4) - 1vw);
        height: 15vh;

        .title {
          @include flex(row, flex-start, center, 1vw);

          div {
            padding: 5px 7px 2px 7px;
            border-radius: 5px;
            i {
              font-size: 1.4rem;
              color: #fff;
            }
          }

          h3 {
            font-weight: 600;
            font-size: 1.4rem;
          }


        }

        .values {
          padding: 5px 15px 5px 0;

          span {
            font-size: 1.6rem;
            color: $h1-black;
            font-weight: 600;
            width: 80%;
            padding: 5px 15px 5px 0;
            border-bottom: 2px solid #fff;

          }
        }
      }


      .card:nth-child(1), .card:nth-child(8) {
        background-color: #F0F9F6;

        .title {
          div {
            background-color: #3CB47F;
          }
        }

        span {
          border-bottom-color: #3CB47F;
        }
      }
      .card:nth-child(2), .card:nth-child(6) {
        background-color: #ECF3F9;

        .title {
          div {
            background-color: #0762B0;
          }
        }

        span {
          border-bottom-color: #0762B0;
        }
      }
      .card:nth-child(3), .card:nth-child(7) {
        background-color: #F2F1FF;

        .title {
          div {
            background-color: #A6A4EE;
          }
        }

        span {
          border-bottom-color: #A6A4EE;
        }
      }
      .card:nth-child(4) {
        background-color: #FDF3F1;

        .title {
          div {
            background-color: #E26741;
          }
        }

        span {
          border-bottom-color: #E26741;
        }
      }

      .card:nth-child(5) {
        background-color: #fffcf0;

        .title {
          div {
            background-color: #e7dd2e;
          }
        }

        span {
          border-bottom-color: rgba(231, 221, 46, 0.62);
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