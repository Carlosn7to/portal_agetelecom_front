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
        <div id="reports">
          <div class="report"
               v-for="(report, key) in reports"
               :key="key"
               @click="downloadReport(report.url,report.nome_arquivo)">
            <i class="fi fi-rr-document-signed"></i>
            <span>{{ report.nome }}</span>
          </div>
        </div>
      </div>
    </div>
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
      reports: {}
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getReports: function() {
      AXIOS({
        method: 'GET',
        url: 'agereport/report/reports'

      }).then((res) => {
        this.reports = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    downloadReport: function (url, name) {
      AXIOS({
        method: 'GET',
        url: 'agereport/report/'+url,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        responseType: 'blob',
      }).then((res) => {
        let blob = new Blob([res.data],
            { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = name
        link.click()
      })
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
      @include container(initial, initial, 1vh 2vw, #fff);
      min-width: 10%;
      min-height: 15vh;
      border-radius: 5px;
      @include sh-h;
      @include tr-p;
      @include flex(column, center, center, 5px);
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


.mode-l-p {
  background-color: $ml-back-l;
  @include tr;

}

.mode-d-p {
  background-color: #161819;
  @include tr;

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