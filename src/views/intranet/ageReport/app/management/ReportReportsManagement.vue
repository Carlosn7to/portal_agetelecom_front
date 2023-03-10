<template>
  <div class="management" v-if="page === 'Relatórios'">
    <h1>Gerenciamentos - Relatórios</h1>
    <div class="container-mng">
      <div class="content-reports animation-down" v-if="page === 'Relatórios'">
        <div class="filters">
          <input type="text" id="searchReport" name="searchReport" placeholder="Buscar relatório..." autocomplete="off"
                 v-model="searchReport">
          <button @click="editReport(0, '')">Novo relatório</button>

        </div>
        <div id="reports" class="animation-down" v-if="status === true">
          <div class="report"
               v-for="(report, key) in ReportsFiltered"
               :key="key"
               @click="editReport(report.id, report.nome)">
            <i class="fi fi-rr-document-signed"></i>
            <span>{{ report.nome }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <EditReport
      v-if="page === 'editReport'"
      :id="id"
      :name="report"
      @msg="editMsg"
      @close-page="closePage('reports')"
  />
</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../services/api.ts";
import EditReport from "@/components/ageReport/EditReport";

export default {
  name: "ReportReportsManagement",
  components: {
    EditReport,
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      page: 'Relatórios',
      search: '',
      data: null,
      status: false,
      dataReport: null,
      searchReport: '',
      loading: true,
      id: 0,
      report: '',
      modal: '',
      dataEdit: {
        name: '',
        id: 0,
        access: false
      }
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getUsers: function () {
      this.status = false

      AXIOS({
        method: 'GET',
        url: 'admin/access-systems',
        params: {
          system: 'agereport'
        },
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.data = res.data
        this.status = true
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    getReports: function () {
      this.status = false

      AXIOS({
        method: 'GET',
        url: 'agereport/report/reports',
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.dataReport = res.data
        this.status = true
        this.loading = false
      })
    },
    editReport: function (id, report) {
      this.page = 'editReport'
      this.id = id
      this.report = report
    },
    editMsg: function (data) {
      alert(data.msg)
    },
    closePage: function (type) {
      if(type === 'reports') {
        this.page = 'Relatórios'
        this.id = 0
        this.report = ''
      }

      if(type === 'users') {
        this.modal = ''
      }
    },
    editAccess: function (id, name, access) {
      this.dataEdit.id = id
      this.dataEdit.name = name
      this.dataEdit.access = access
      this.modal = 'editAccess'
    }
  },
  computed: {
    UsersFiltered: function () {
      let values = []
      values = this.data.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
    ReportsFiltered: function () {
      let values = []
      values = this.dataReport.filter((value) => {
        return (
            value.nome.toLowerCase().indexOf(this.searchReport.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getUsers()
    this.getReports()
  }
}
</script>

<style scoped lang="scss">

.management {
  padding: 1vh 1vw;
  overflow-y: hidden;
  max-height: 90%;
  width: 100%;
  animation: up ease-in-out forwards .4s;
  .container-mng {
    @include flex(row, space-between, intial, 0);
    width: 100%;

    .content-reports {
      width: 100%;

      #reports {
        @include container(100%, initial, 4vh 0vw, transparent);
        @include flex(row, flex-start, initial, 20px);
        flex-wrap: wrap;
        overflow-y: auto;
        max-height: 60vh;
        padding: 2vh 2px;


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

    .filters {
      padding: 3vh 0;
      @include flex(row, flex-start, center, 0);
      input[type=text] {
        width: 25%;
        padding: 10px 8px;
        border-radius: 5px;
        outline: none;
        border: none;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        &:focus {
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
      }

      button {
        @include btn-dashboard();
        margin-left: 1vw;
        background-color: $primary;
        color: #fff;
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

.mode-dark{

  .management {

    .container-mng {

      .content-users {

        .filters {

          input[type=text] {
            background-color: $dark-mode-card;
            border: 2px solid $primary;
            color: $h1-white;
          }


        }

        .list {

          .list-header {
            border-bottom: 2px solid $primary;

            .item-list-header {
              color: $h1-white;
            }
          }

          .items-list-body {

            .list-body {
              background-color: $dark-mode-card;

              .item-list-body {
                color: $h1-white;

              }

              border: 2px solid $dark-mode-card;

              &:hover {
                border-color: $primary;
              }
            }
          }

        }

      }

    }
  }

}

</style>