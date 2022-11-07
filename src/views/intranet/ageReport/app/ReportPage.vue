<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'report'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <h1>
          Relatórios disponíveis
        </h1>
        <div id="reports" v-if="status === true">
          <div class="report"
               v-for="(report, key) in reports"
               :key="key"
               @click="downloadReport(report.isPeriodo ,report.url,report.nome_arquivo, report.id)">
            <i class="fi fi-rr-document-signed"></i>
            <span>{{ report.nome }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal" v-if="modal === true">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <h5 style="text-align: center; font-size: 1.4rem">Selecione o período</h5>
      <form action="#" @submit.prevent="downloadReport(0, this.url, this.name)">
        <input type="datetime-local" name="first_period" id="first_period" v-model="firstPeriod">
        <input type="datetime-local" name="last_period" id="last_period" v-model="lastPeriod">
        <input type="submit" value="Baixar">
      </form>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true">
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";

export default {
  name: "ReportPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      reports: {},
      url: '',
      name: '',
      modal: false,
      firstPeriod: '',
      lastPeriod: '',
      firstPeriodHour: '',
      lastPeriodHour: '',
      loading: false,
      status: false
    }
  },
  methods: {
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
      }).catch((error) => {
        console.log(error)
      })
    },
    downloadReport: function (period, url, name, id) {
      if(period === 1) {
        this.url = url
        this.name = name

        this.modal = true

      } else {
        this.loading = true

        AXIOS({
          method: 'GET',
          //url: `agereport/report-download/${id}`,
          url: 'agereport/report/'+url,
          headers: {
            'Authorization': 'Bearer '+Cookie.get('token')
          },
          params: {
            firstPeriod: this.firstPeriod,
            lastPeriod: this.lastPeriod
          },
          responseType: 'blob',
        }).then((res) => {
          console.log(id)

          this.loading = false

          let blob = new Blob([res.data],
              { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = name
          link.click()
          this.modal = false
        })
      }
    }
  },
  mounted() {
    this.getReports()
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
  }


  #reports {
    @include container(100%, initial, 1vh 1vw, transparent);
    @include flex(row, flex-start, initial, 20px);
    flex-wrap: wrap;

    .report {
      @include container(initial, initial, 1vh 1vw, #fff);
      width: calc((100% / 3) - 20px);
      min-height: 5vh;
      border-radius: 5px;
      @include sh-h;
      @include tr-p;
      @include flex(row, flex-start, center, 5px);
      word-break: break-all;
      border: 2px solid #fff;

      i {
        font-size: 2.4rem;
        color: $age-or;
      }

      span {
        font-size: 1.4rem;
        text-align: center;
        font-weight: 600;
        color: $age-bl;
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
  @include tr;

}

.mode-d-p {
  background-color: #161819;
  @include tr;

  h1 {
    color: $md-text-h1 !important;
  }

  #reports {

    .report {
      background-color: $md-back-l !important;
      border: 2px solid $md-back-l !important;

      span {
        color: $md-text-light !important;
      }

      &:hover {
        border: 2px solid $age-or;
      }
    }
  }
}

</style>