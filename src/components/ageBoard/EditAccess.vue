<template>
  <div class="content-card">
    <button @click="closePage">Voltar</button>

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
      <div class="item" v-for="(item, index) in ItemsFiltered || []" :key="item.id">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              {{ item.item }}
            </span>
        <div class="actions">
          <i class="fi fi-br-check" style="font-size: 1.6rem;" v-if="item.status === false" @click="alterItemAccess(index)"></i>
          <i class="fi fi-br-cross" style="font-size: 1.4rem;" v-if="item.status === true" @click="alterItemAccess(index)"></i>
        </div>
      </div>
    </div>

  </div>
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
  emits: ['close-page'],
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
    },
    alterItemAccess: function (index) {
       AXIOS({
         method: 'PUT',
         url: 'ageboard/dashboard-items-alternate',
         params: {
           idUser: this.dataUser.id,
           idItem: this.dataItems[index].id
         }
       }).then((res) => {
         if(this.dataItems[index].status === true) {
           this.dataItems[index].status = false
         } else {
           this.dataItems[index].status = true
         }

         alert(res.data.msg)

         if(res.data.access === true) {
           this.dataUser.access = true
         }
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



.content-card {
  width: 100%;
  height: 90%;
  padding: 2vh 2vw;
  animation: up ease-in-out forwards .4s;

  button {
    @include btn-pattern($primary, $white, $primary-hover, $white-grey);
  }

  h1 {
    font-size: 2rem;
  }

  .filters {
    padding: 3vh 0;
    @include flex(row, flex-start, center, 2vw);
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


  }


  #list-boards {
    padding: 1vh 3px;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    max-height: 80%;
    overflow-y: auto;
    animation: .2s ease-in-out forwards down;

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
      animation: up ease-in-out forwards .4s;
      animation-delay: .3s;
      opacity: 0;

      &:hover {
        border-color: $primary;

        span {
          color: $h1-black;
        }
      }

      span {
        color: $text-strong;
        font-size: 1.4rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 1vw;

        i {
          color: $primary;
          font-size: 2rem;
        }
      }

      i {
        color: $primary;
        @include tr-p;

        &:hover {
          color: $primary-hover;
        }
      }
    }
  }

}


@keyframes down {
  from {
    transform: translateY(-20px);
    opacity: .6;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.loading-bar {
  @include bar;
}

.mode-dark {
  .content-card {


    .filters {
      input[type=text] {
        background-color: $dark-mode-card;
        border: 2px solid $primary;
        color: $white-grey;
      }
    }

    #list-boards {
      .item {
        background-color: $dark-mode-card;
        border-color: $dark-mode-card;

        &:hover {
          border-color: $primary;

          span {
            color: #fff;
          }
        }
      }
    }
  }
}

</style>