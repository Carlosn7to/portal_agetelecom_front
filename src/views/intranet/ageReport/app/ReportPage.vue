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
  <div id="modal" v-if="modal === true">
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


        AXIOS({
          method: 'GET',
          url: `agereport/report-download/${this.reportId}`,
          headers: {
            'Authorization': 'Bearer '+Cookie.get('token')
          },
          params: {
            firstPeriod: this.firstPeriod,
            lastPeriod: this.lastPeriod,
          },
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
  #card-modal {
    width: 20vw;
    padding: 1vh 1vw;

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