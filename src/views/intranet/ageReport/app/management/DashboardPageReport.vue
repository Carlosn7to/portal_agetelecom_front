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
        <div class="management" v-if="page === 'Usuários' || page === 'Relatórios'">
          <h1>Gerenciamento - {{ page }}</h1>
          <div class="container-mng">
            <div class="menu-mng">
              <nav>
                <ul>
                  <li :class="{ 'selected' : page === 'Usuários' }" @click="page = 'Usuários'">
                    <i class="fi fi-rr-users"></i>
                    <span>Usuários</span>
                  </li>
                  <li :class="{ 'selected' : page === 'Relatórios' }" @click="page = 'Relatórios'">
                    <i class="fi fi-rr-search-alt"></i>
                    <span>Relatórios</span>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="content-users animation-down" v-if="page === 'Usuários'">
              <div class="filters">
                <input type="text" id="search" name="search" placeholder="Buscar e-mail..." autocomplete="off"
                       v-model="search">
              </div>
              <div class="list">
                <div class="list-header">
                  <div class="item-list-header" style="text-align: left; width: 25%">
                    Nome
                  </div>
                  <div class="item-list-header" style="text-align: left; width: 25%">
                    E-mail
                  </div>
                  <div class="item-list-header" style="text-align: center; width: 25%">
                    Acesso
                  </div>
                </div>
                <div class="items-list-body animation-down" v-if="status === true">
                  <div class="list-body" v-for="item in UsersFiltered" :key="item.id" @click="editAccess(item.id, item.name, item.access)">
                    <div class="item-list-body" style="text-align: left; width: 25%">
                      {{ item.name }}
                    </div>
                    <div class="item-list-body" style="text-align: left; width: 25%">
                      {{ item.email }}
                    </div>
                    <div class="item-list-body" style="text-align: center; width: 25%">
                      {{ item.access ? 'Ativo' : 'Inativo' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true">
  </div>
  <EditAccess
      v-if="modal === 'editAccess'"
      @close-page="closePage('users')"
      :data="dataEdit"
  />
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../services/api.ts";
import EditReport from "@/components/ageReport/EditReport";
import EditAccess from "@/components/ageReport/EditAccess";

export default {
  name: "DashboardPageReport",
  components: {
    MenuApp,
    HeaderApp,
    EditReport,
    EditAccess
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      page: 'Usuários',
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
        url: 'agereport/report/reports'
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
  .container-mng {
    @include flex(row, space-between, intial, 0);
    .menu-mng {
      width: 12%;
      height: 25%;
      background-color: #fff;
      border-radius: 5px;
      @include sh;
      margin-top: 2vh;


      nav {

        ul {
          @include flex(column, flex-start, initial, 0);


          li {
            width: 100%;
            padding: 1.5vh 1vw;
            @include flex(row, flex-start, center, 10px);
            font-weight: 500;
            color: $ml-text-menu;
            border-bottom: 2px solid #cccccc30;
            @include tr-p;

            &:nth-last-child(1) {
              border-bottom: none;
            }

            &:hover {
              background-color: #cccccc20;
            }

            i {
              font-size: 1.8rem;
              color: $age-or;
            }

            span {
              font-size: 1.4rem;
              color: $age-bl;
            }
          }

          .selected {
            background-color: #cccccc20;

            &:hover {
              background-color: #cccccc40;
            }
          }
        }
      }
    }

    .content-users {
      width: 86%;
      padding-top: 2vh;


      .list {
        height: 60%;
        margin-top: 2vh;

        .list-header, .list-body {
          @include flex(row, flex-start, initial, 10px);

          .item-list-header, .item-list-body {
            width: calc((100% / 6) - 20px);
          }
        }

        .list-header {
          border-bottom: 2px solid #cccccc80;
          align-items: center;
          margin-bottom: 2vh;
          padding: 2vh 10px;

          .item-list-header {
            color: $ml-text-menu;
            font-size: 1.6rem;
            font-weight: 400;
          }
        }

        .items-list-body {
          max-height: 70%;
          overflow-y: auto;
          padding: 2px;

          .list-body {
            background-color: #fff;
            padding: 2vh 20px;
            border-radius: 3px;
            @include sh-h;
            margin: 2vh 0;
            @include tr-p;

            .item-list-body {
              font-size: 1.2rem;
              color: $ml-text-h1;
              font-weight: 500;
            }
          }
        }

      }

    }

    .filters {
      padding: 3vh 0;
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
        @include button-pattern;
        margin-left: 1vw;
      }
    }

    .content-reports {
      width: 86%;

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


  }
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}


.animation-down {
  animation: down .8s forwards;
}

@keyframes down {
  from {
    opacity: .1;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.loading-bar {
  @include bar;
}

</style>