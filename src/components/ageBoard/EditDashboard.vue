<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div class="content-card">
        <h1>Editar Dashboard - {{ data.name }}</h1>
        <div class="filters">
          <input type="text" id="searchBoard" name="searchBoard" placeholder="Buscar item..." autocomplete="off"
                 v-model="search">
          <button @click="newItem">Adicionar novo item</button>
          <button @click="tradeStatusDashboard">{{ data.active === 1 ? 'Inativar Dasboard' : 'Ativar Dashboard' }}</button>
        </div>
        <div id="list-boards" v-if="status === true && page === 'items'">
          <div class="item" v-for="item in ItemsFiltered" :key="item.id">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              {{ item.item }}
            </span>
            <div class="actions">
              <i class="fi fi-rr-arrow-square-right" style="font-size: 2rem"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true"></div>
  <NewItem
    v-if="modal === 'newItem'"
    @close-page="newItem"
    :data="data"
  />
</template>

<script>


import {AXIOS} from "../../../services/api.ts";
import Cookie from "js-cookie";
import NewItem from "@/components/ageBoard/NewItem";

export default {
  name: "EditAccess",
  components: { NewItem },
  props: {
    data: {
      required: true
    }
  },
  emits: ['close-page'],
  data () {
    return {
      search: '',
      dataBoard: this.data,
      status: false,
      loading: true,
      dataItems: {},
      page: 'items',
      modal: ''
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    getItems: function () {
      AXIOS({
        method: 'GET',
        url: 'ageboard/dashboard-items',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          id: this.data.id
        }
      }).then((res) => {
        this.dataItems = res.data
        this.status = true
        this.loading = false

      })
    },
    tradeStatusDashboard: function () {
      this.loading = true
      AXIOS({
        method: 'DELETE',
        url: 'ageboard/dashboard/'+this.data.id,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.dataBoard.active = this.data.active === 1 ? 0 : 1
        this.loading = false
        alert(res.data.msg)
      })
    },
    newItem: function () {
      if(this.modal === 'newItem') {
        this.modal = 'items'
      } else {
        this.modal = 'newItem'
      }
    }
  },
  computed: {
    ItemsFiltered: function () {
      let values = []
      values = this.dataItems.filter((value) => {
        return (
            value.item.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getItems()
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

</style>