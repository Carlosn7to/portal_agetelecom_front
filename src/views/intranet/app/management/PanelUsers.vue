<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'portal-mng'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <div class="section">
          <h1>Usuários</h1>
          <div id="options">
            <input type="text" id="search" name="search" placeholder="Buscar e-mail..." autocomplete="off"
                    v-model="search">
            <button>Novo usuário</button>
          </div>
          <div class="list">
            <div class="list-header">
              <div class="item-list-header" style="text-align: left; width: 15%">
                Nome
              </div>
              <div class="item-list-header" style="text-align: left; width: 30%">
                E-mail
              </div>
              <div class="item-list-header" style="text-align: center; width: 12%">
                Tipo de conexão
              </div>
              <div class="item-list-header"  style="text-align: center; width: 12%">
                Nível de acesso
              </div>
              <div class="item-list-header"  style="text-align: center; width: 12%">
                Status
              </div>
              <div class="item-list-header"  style="text-align: center; width: 12%">
                Criado em
              </div>
            </div>
            <div class="items-list-body" v-if="data.length > 0">
              <div class="list-body" v-for="item in UsersFiltered" :key="item.id">
                <div class="item-list-body" style="text-align: left; width: 15%">
                  {{item.name}}
                </div>
                <div class="item-list-body" style="text-align: left; width: 30%">
                  {{item.email}}
                </div>
                <div class="item-list-body" v-if="item.isAD === 1"  style="text-align: center; width: 12%">
                  Interno - AD
                </div>
                <div class="item-list-body" v-else style="text-align: center; width: 12%">
                  Externo
                </div>
                <div class="item-list-body"  style="text-align: center; width: 12%">
                  {{item.nivel}}
                </div>
                <div class="item-list-body"  style="text-align: center; width: 12%">
                  {{item.status}}
                </div>
                <div class="item-list-body"  style="text-align: center; width: 12%">
                  {{item.created_at}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal">
    <NewUser/>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";
import NewUser from "@/components/portal/_aux/management/NewUser";

export default {
  name: "PanelUsers",
  components: {
    MenuApp,
    HeaderApp,
    NewUser
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      data: [],
      search: ''
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getUsers: function () {
      AXIOS({
        method: 'GET',
        url: 'admin/users'
      }).then((res) => {
        this.data = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    UsersFiltered: function () {
      let values = []
      values = this.data.filter((value) => {
        return (
            value.email.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  .section {
    padding: 1vh 1vw;
    height: 95%;

    .list {
      height: 93%;

      .list-header, .list-body {
        @include flex(row, flex-start, initial, 10px);

        .item-list-header, .item-list-body {
          width: calc((100% / 6) - 20px);
        }
      }

      .list-header {
        height: 10%;
        border-bottom: 2px solid #cccccc80;
        align-items: center;
        margin-bottom: 2vh;
        padding: 0 10px;

        .item-list-header {
          color: $ml-text-menu;
          font-size: 1.6rem;
          font-weight: 400;
        }
      }

      .items-list-body {
        max-height: 80%;
        overflow-y: auto;
        padding: 2px;

        .list-body {
          background-color: #fff;
          padding: 3vh 10px;
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

    #options {
      @include flex(row, flex-start, center, 20px);
      padding: 10px 0;


      button {
        padding: 5px 15px;
        background-color: $age-bl;
        color: #fff;
        font-weight: 500;
        border: 1px solid $age-bl;
        @include tr-p;
        border-radius: 3px;

        &:hover {
          background-color: #fff;
          color: $age-bl;
          border-color: $age-bl;
        }
      }

      input[type=text] {
        padding: 10px 10px;
        border-radius: 5px;
        width: 30%;
        border: 2px solid #cccccc60;
        color: $ml-text-menu;
        font-size: 1.2rem;
        font-weight: 500;
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

</style>