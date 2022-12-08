<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div class="content-card">
        <h1>Editar acesso - {{ data.name }}</h1>
        <div class="filters">
          <input type="text" id="searchBoard" name="searchBoard" placeholder="Buscar dashboard..." autocomplete="off"
                 v-model="searchBoard">
          <button v-if="page === 'items'" @click="page = 'dashboards', searchBoard = ''">Voltar</button>
          <button @click="alternateUserAccess()">{{ dataUser.access ? 'Inativar acesso' : 'Ativar acesso' }}</button>
        </div>
        <div id="list-boards" v-if="page === 'dashboards' && status === true">
          <div class="item" v-for="item in DashboardsFiltered || []" :key="item.id">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              {{ item.dashboard }}
            </span>
            <div class="actions">
              <i class="fi fi-rr-arrow-square-right" @click="getItems(item.id)" style="font-size: 2rem"></i>
            </div>
          </div>
        </div>
        <div id="list-boards"  v-if="page === 'items' && status === true">
          <div class="item" v-for="item in ItemsFiltered || []" :key="item.id">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              {{ item.item }}
            </span>
            <div class="actions">
              <i class="fi fi-br-check" style="font-size: 1.6rem;" v-if="item.status === false"></i>
              <i class="fi fi-br-cross" style="font-size: 1.4rem;" v-if="item.status === true"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true"></div>
</template>

<script>
import {AXIOS} from "../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "EditAccess",
  props: {
    data: {
      required: true
    }
  },
  data () {
    return {
      searchBoard: '',
      dataReport: {},
      status: false,
      dataUser: this.data,
      loading: true,
      dataBoards: {},
      dataItems: {},
      page: 'dashboards'
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    alternateUserAccess: function () {
      this.loading = true

      AXIOS({
        method: 'PUT',
        url: `admin/access-systems/alternate/${this.data.id}`,
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        },
        params: {
          system: 'ageboard'
        }
      }).then((res) => {
        this.dataUser.access = res.data.access
        this.loading = false
        alert(res.data.msg)
      })
    },
    getBoards: function () {
      this.status = false
      AXIOS({
        method: 'GET',
        url: `ageboard/dashboard`,
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.dataBoards = res.data
        this.loading = false
        this.status = true
      })
    },
    getItems: function (dashboardId) {
      this.status = false
      this.page = 'items'
      this.loading = true
      this.searchBoard = ''
      AXIOS({
        method: 'GET',
        url: `ageboard/dashboard-items-management`,
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        },
        params: {
          dashboardId: dashboardId,
          userId: this.data.id
        }
      }).then((res) => {
        this.dataItems = res.data
        this.loading = false
        this.status = true
      })
    }
  },
  computed: {
    DashboardsFiltered: function () {
      let values = []
      values = this.dataBoards.filter((value) => {
        return (
            value.dashboard.toLowerCase().indexOf(this.searchBoard.toLowerCase()) > -1
        )
      })
      return values
    },
    ItemsFiltered: function () {
      let values = []
      values = this.dataItems.filter((value) => {
        return (
            value.item.toLowerCase().indexOf(this.searchBoard.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getBoards()
  }
}
</script>

<style scoped lang="scss">

#card-modal {
  width: 80vw;
  height: 90vh;
  background-color: $back-main !important;

  .content-card {
    width: 100%;
    height: 90%;
    padding: 2vh 4vw;
    @include flex(column, flex-start, initial, 2vh);

    h1 {
      font-size: 2rem;
      color: $age-bl;
    }

    button {
      @include button-pattern;
      width: 20%;
      padding: 5px 8px !important;

    }

    .filters {
      padding: 3vh 0;
      input[type=text] {
        width: 45%;
        padding: 8px 8px;
        border-radius: 5px;
        outline: none;
        border: none;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        &:focus {
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
      }

      button:nth-child(2) {
        @include button-pattern;
        margin-left: 1vw;
      }

      button:nth-child(3) {
        @include button-pattern;
        background-color: #fff;
        color: $age-bl;
        border-color: $age-bl;
        margin-left: 1vw;

        &:hover {
          background-color: $age-bl;
          color: #fff;
        }
      }
    }


    #list-boards {
      padding: 1vh 3px;
      display: flex;
      flex-direction: column;
      gap: 2vh;
      max-height: 80%;
      overflow-y: auto;

      .item {
        width: 100%;
        background-color: #fff;
        display: flex;
        align-items: center;
        padding: 10px 20px;
        justify-content: space-between;
        border: 2px solid #ffff;
        transition: .2s ease-in-out;
        border-radius: 5px;

        &:hover {
          border-color: $age-bl;
        }

        span {
          color: $age-bl;
          font-size: 1.4rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 1vw;

          i {
            color: $age-or;
            font-size: 2rem;
          }
        }

        i {
          color: $age-bl;
          @include tr-p;

          &:hover {
            color: $age-or;
          }
        }
      }
    }

  }

}

.loading-bar {
  @include bar;
}

</style>