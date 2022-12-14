<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageBoard'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <div class="management" v-if="page === 'Usuários' || page === 'Dashboards'">
          <h1>Gerenciamentos - {{ page }}</h1>
          <div class="container-mng">
            <div class="menu-mng">
              <nav>
                <ul>
                  <li :class="{ 'selected' : page === 'Usuários' }" @click="page = 'Usuários', search = ''">
                    <i class="fi fi-rr-users"></i>
                    <span>Usuários</span>
                  </li>
                  <li :class="{ 'selected' : page === 'Dashboards' }" @click="page = 'Dashboards', search = ''">
                    <i class="fi fi-rr-search-alt"></i>
                    <span>Dashboards</span>
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
                  <div class="list-body" v-for="(item, index) in UsersFiltered" :key="index" @click="editAccess(item.id, item.name, item.access)">
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
            <div class="content-users animation-down" v-if="page === 'Dashboards'">
              <div class="filters">
                <input type="text" id="search" name="search" placeholder="Buscar Dashboard..." autocomplete="off"
                       v-model="search">
                <button @click="modal = 'newDashboard'">Novo dashboard</button>
              </div>
              <div class="list">
                <div class="list-header">
                  <div class="item-list-header" style="text-align: left; width: 25%">
                    Nome
                  </div>
                  <div class="item-list-header" style="text-align: left; width: 25%">
                    Adicionado por
                  </div>
                  <div class="item-list-header" style="text-align: center; width: 25%">
                    Status
                  </div>
                </div>
                <div class="items-list-body animation-down" v-if="status === true">
                  <div class="list-body" v-for="item in DashFiltered" :key="item.id">
                    <div class="item-list-body" style="text-align: left; width: 25%">
                      {{ item.dashboard }}
                    </div>
                    <div class="item-list-body" style="text-align: left; width: 25%">
                      carlos.neto@agetelecom.com.br
                    </div>
                    <div class="item-list-body" style="text-align: center; width: 25%">
                      Ativo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  <NewDashboard
    v-if="modal === 'newDashboard'"
    @close-page="closePage('Dashboards')"

  />
  <EditDashboard
    v-if="modal === 'editDashboard'"
  />

</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../services/api.ts";
import EditAccess from "@/components/ageBoard/EditAccess";
import NewDashboard from "@/components/ageBoard/NewDashboard";
import EditDashboard from "@/components/ageBoard/EditDashboard";

export default {
  name: "DashboardManagement",
  components: {
    MenuApp,
    HeaderApp,
    EditAccess,
    NewDashboard,
    EditDashboard
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      page: 'Dashboards',
      data: {},
      status: false,
      loading: true,
      search: '',
      modal: 'editDashboard',
      dataEdit: {
        name: '',
        id: 0,
        access: false
      },
      dataDash: {}
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
          system: 'ageboard'
        },
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.data = res.data
        this.status = true
        this.loading = false
      }).catch(() => {
      })
    },
    editAccess: function (id, name, access) {
      this.dataEdit.id = id
      this.dataEdit.name = name
      this.dataEdit.access = access
      this.modal = 'editAccess'
    },
    closePage: function (type) {
      if(type === 'Dashboards') {
        this.page = 'Dashboards'
        this.id = 0
        this.modal = ''
        this.getDashboards()
      }

      if(type === 'users') {
        this.modal = ''
      }
    },
    getDashboards: function() {
      AXIOS({
        method: 'GET',
        url: 'ageboard/dashboards',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.dataDash = res.data
      })
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
    DashFiltered: function () {
      let values = []
      values = this.dataDash.filter((value) => {
        return (
            value.dashboard.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getUsers()
    this.getDashboards()
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
          height: 70vh;
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
}

</style>