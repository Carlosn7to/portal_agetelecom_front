<template>
  <div class="management" v-if="page === 'users'">
    <h1>Gerenciamentos - Usuários</h1>
    <div class="container-mng">
      <div class="content-users animation-down" v-if="page === 'users'">
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
    </div>
  </div>
  <EditAccess
      v-if="page === 'editAccess'"
      @close-page="closePage('users')"
      :data="dataEdit"
  />

</template>

<script>

import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../services/api.ts";
import EditAccess from "@/components/ageBoard/EditAccess";
import {mapMutations} from "vuex";

export default {
  name: "UsersManagement",
  components: {
    EditAccess
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      page: 'users',
      data: {},
      status: false,
      loading: true,
      search: '',
      modal: '',
      dataEdit: {
        name: '',
        id: 0,
        access: false
      }
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
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
      this.page = 'editAccess'
    },
    closePage: function (type) {
      this.page = type
    },

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
    }
  },
  mounted() {
    this.getUsers()
    this.SAVE_SYSTEM({loading:false})
  }
}
</script>

<style scoped lang="scss">

.management {
  padding: 1vh 1vw;
  overflow-y: hidden;
  max-height: 90%;
  animation: up ease-in-out forwards .4s;
  .container-mng {
    @include flex(row, space-between, intial, 0);

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
            border: 2px solid #fff;


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