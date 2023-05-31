<template>
  <h1>
    Relatórios disponíveis
  </h1>
  <div id="filters">
    <input type="text"
           name="search"
           id="search"
           autocomplete="off"
           placeholder="Pesquisar relatório..."
           v-model="search">
  </div>

  <div id="reports" v-if="status === true">
    <div class="report"
         v-for="(report, key) in ReportsFiltered"
         :key="key"
         :style="'animation-delay: '+key * 0.1+'s'">
      <div class="title">
        <i class="fi fi-rr-document-signed"></i>
        <span>{{ report.nome }}</span>
      </div>
      <div class="actions">
        <button @click="viewReport(report.id)">
          <i class="fi fi-rr-eye"></i>
          <span>Visualizar prévia</span>
        </button>
        <button @click="downloadReport(report.isPeriodoHora,report.isPeriodo,report.url,report.nome_arquivo, report.id)">
          <i class="fi fi-rr-download"></i>
          <span>Baixar relatório</span>
        </button>
        <button>
          <i class="fi fi-rr-envelope"></i>
          <span>Enviar E-mail</span>
        </button>
      </div>
    </div>
  </div>
  <div id="modal" v-if="modal === null">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <h5 style="text-align: center; font-size: 1.4rem">Selecione o período</h5>
      <form action="#" @submit.prevent="downloadReport(0, 0, this.url, this.name, this.reportId)">
        <input type="datetime-local" name="first_period" id="first_period" v-model="firstPeriod" required>
        <input type="datetime-local" name="last_period" id="last_period" v-model="lastPeriod" required>
        <input type="submit" value="Baixar">
      </form>
    </div>
  </div>
  <div id="modal" v-if="modal === true">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <h5>Selecione o período</h5>

      <form action="#" @submit.prevent="downloadReport(0, 0, this.url, this.name, this.reportId)">
        <div class="options-date">
          <label for="type-date">Tipo de filtro: <b>*</b></label>
          <select name="type-date" v-model="typeDate" required>
            <option value="day">Dia</option>
<!--            <option value="month">Mês</option>-->
            <option value="period">Período</option>
          </select>
        </div>

        <div class="options-date" v-if="typeDate === 'day'">
          <label for="date-day">Dia: <b>*</b></label>
          <input type="date" name="date-day" id="date-day" required v-model="dateDay">
        </div>

<!--        <div class="options-date" v-if="typeDate === 'month'">-->
<!--          <label for="date-day">Mês: <b>*</b></label>-->
<!--          <div class="double-options">-->
<!--            <select name="month" id="month" v-model="dateMonth" required>-->
<!--              <option value="01">Janeiro</option>-->
<!--              <option value="02">Fevereiro</option>-->
<!--              <option value="03">Março</option>-->
<!--              <option value="04">Abril</option>-->
<!--              <option value="05">Maio</option>-->
<!--              <option value="06">Junho</option>-->
<!--              <option value="07">Julho</option>-->
<!--              <option value="08">Agosto</option>-->
<!--              <option value="09">Setembro</option>-->
<!--              <option value="10">Outubro</option>-->
<!--              <option value="11">Novembro</option>-->
<!--              <option value="12">Dezembro</option>-->
<!--            </select>-->
<!--            <select name="year" id="year" v-model="dateYear" required>-->
<!--              <option value="2023">2023</option>-->
<!--              <option value="2022">2022</option>-->
<!--              <option value="2021">2021</option>-->
<!--              <option value="2020">2020</option>-->
<!--            </select>-->
<!--          </div>-->
<!--        </div>-->

        <div class="options-date" v-if="typeDate === 'period'">
          <label for="date-period">Período Inicial: <b>*</b></label>
          <input type="date" name="date-period" id="date-period" v-model="firstPeriod" required>
        </div>
        <div class="options-date" v-if="typeDate === 'period'">
          <label for="date-period">Período Inicial: <b>*</b></label>
          <input type="date" name="date-period" id="date-period" v-model="lastPeriod" required>
        </div>

        <div class="submit">
          <button>Baixar relatório</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ReportPage",
  components: {
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      reports: {},
      url: '',
      name: '',
      reportId: 0,
      modal: false,
      typeDate: '',
      dateDay: '',
      dateMonth: '01',
      dateYear: '2023',
      firstPeriod: '',
      lastPeriod: '',
      firstPeriodHour: '',
      lastPeriodHour: '',
      loading: false,
      status: false,
      search: ''
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_MENU',
        'SAVE_SYSTEM'
    ]),
    modeView: function (mode) {
      this.mode = mode
    },
    getReports: function() {

      AXIOS({
        method: 'GET',
        url: 'agereport/report/reports',
        headers: {
          'Authorization': 'Bearer' + Cookie.get('token')
        }
      }).then((res) => {
        this.reports = res.data
        this.status = true
        this.SAVE_SYSTEM({loading: false})
      }).catch((error) => {
        console.log(error)
      })
    },
    viewReport: function (id) {
      alert(id)
    },
    downloadReport: function (periodHour, period, url, name, id) {

      if(period === 1 || periodHour === 1) {
        this.name = name
        this.reportId = id

        this.modal = true

      } else {
        this.loading = true
        this.reportId = id

        this.SAVE_SYSTEM({loading: true})

        let payload = () => {
          switch (this.typeDate) {
            case "day":
              return {
                date: this.dateDay
              }
            case "month":
              return {
                month: this.dateMonth,
                year: this.dateYear
              }
            case "period":
              return {
                firstPeriod: this.firstPeriod,
                lastPeriod: this.lastPeriod,
              }
          }
        }


        AXIOS({
          method: 'GET',
          url: `agereport/report-download/${this.reportId}`,
          headers: {
            'Authorization': 'Bearer '+Cookie.get('token')
          },
          params: payload(),
          responseType: 'blob',
        }).then((res) => {

          this.loading = false

          let blob = new Blob([res.data],
              { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = name
          link.click()
          this.modal = false
          this.typeDate = ''
          this.SAVE_SYSTEM({loading: false})

        })
      }
    }
  },
  computed: {
    ...mapGetters([
        'system'
    ]),
    ReportsFiltered: function () {

      let values = []

      values = this.reports.filter((value) => {
        return (
            value.nome.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getReports()
    this.SAVE_MENU({system: 'agereport', selected: 'home'})
  }
}
</script>

<style scoped lang="scss">

#content-page {
  overflow-y: auto;

  h1 {
    font-size: 2.4rem;
    font-weight: 500;
    color: #777;
    padding: 1vh 1vw;
    animation: up forwards ease-in-out .4s;
    opacity: 0;
  }

  #filters {
    width: 100%;
    padding: 2vh 1vw;
    @include flex(row, flex-start, center, 15px);

    input[type=text] {
      width: 25%;
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
      border: 1px solid $border;
      transition: border ease-in-out .2s;

      &:focus {
        border-color: $border-hover;
      }

    }
  }



  #reports {
    @include container(100%, initial, 1vh 1vw, transparent);
    @include flex(row, flex-start, initial, 20px);
    flex-wrap: wrap;

    .report {
      @include container(initial, initial, 3px 1vw, #fff);
      width: 100%;
      border-radius: 5px;
      @include flex(row, space-between, center, 5px);
      word-break: break-all;
      border: 1px solid $border;
      animation: up forwards ease-in-out .4s;
      opacity: 0;


      .title {
        @include flex(row, flex-start, center, 1vw);

        i {
          font-size: 2.2rem;
          color: $primary;
        }

        span {
          font-size: 1.4rem;
          text-align: center;
          font-weight: 600;
          color: $h1-light;
        }
      }


      .actions {
        @include flex(row, flex-start, center, 1vw);

        button {
          @include flex(row, flex-start, center, 0.5vw);
          span {
            padding-bottom: 3px;
          }


        }

        button:nth-child(1) {
          @include btn-dashboard()
        }

        button:nth-child(2) {
          @include btn-dashboard();
          background-color: $black;
          color: #f1f1f1;
          font-weight: 400;

          &:hover {
            background-color: $black-hover;
            color: #fff;
          }
        }

        button:nth-child(3) {
          @include btn-dashboard(true);
          font-weight: 400;
        }

      }
    }

  }
}

#modal {
  width: 100vw;
  height: 100vh;

  #card-modal {
    width: 40vw;
    padding: 1vh 1vw 4vh 1vw;
    @include flex(column, flex-start, initial, 2vh);

    #close-button {
      padding: 0;
    }

    h5 {
      font-size: 1.6rem;
      font-weight: 500;
      text-align: center;
    }

    .options-date {
      @include flex(column, flex-start, initial, 1vh);

      label {
        font-size: 1.2rem;
        font-weight: 500;
        color: $h1-black;

        b {
          color: $red;
        }
      }

      select, input[type=date], input[type=datetime-local] {
        width: 100%;
        padding: 10px 8px;
        border-radius: 5px;
        outline: none;
        border: 1px solid $border;
        transition: border ease-in-out .2s;
        margin-bottom: 10px;

        &:focus {
          border-color: $border-hover;
        }
      }


      .double-options {
        @include flex(row, flex-start, initial, 1vw);
      }



    }

    .submit {
      @include flex(row, center, center, 0);

      button {
        @include btn-dashboard(true);

      }
    }

    form {
      @include flex(column, flex-initial, initial, 10px);
      padding: 2vh 3vw;

      input[type=date] {
        border: 2px solid #cccccc90;
        padding: 10px 3px;
      }

      input[type=submit] {
        background-color: $age-bl;
        border: 1px solid $age-bl;
        color: #fff;
        margin-top: 10px;
        padding: 5px 15px;
        border-radius: 3px;
        @include tr-p;

        &:hover {
          background-color: #fff;
          border-color: $age-bl;
          color: $age-bl;
        }
      }
    }
  }
}

.loading-bar {
  @include bar;
}


.mode-l-p {
  background-color: $ml-back-l;

}

.mode-dark {
  background-color: $dark-mode-background;

  h1 {
    color: $md-text-h1 !important;
  }

  #reports {

    .report {
      background-color: $dark-mode-card !important;
      border: 2px solid $dark-mode-card !important;

      span {
        color: $md-text-light !important;
      }

      &:hover {
        border: 2px solid $age-or;
      }
    }
  }


  #modal {
    #card-modal {
      background-color: $dark-mode-background;

      h5 {
        color: $dark-mode-text-primary;
      }

      form {
        input[type=datetime-local] {
          background-color: $dark-mode-card !important;
          color: $dark-mode-text-secondary;
        }

        input[type=submit] {
          background-color: $dark-mode-card;
          border-color: $dark-mode-card;
          color: $age-or;
          font-weight: 500;

          &:hover {
            color: $dark-mode-text-primary;
            border-color: $age-or;
          }
        }
      }
    }
  }
}

</style>