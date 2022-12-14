<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div class="content-card">
        <h1>Editar Dashboard - </h1>
        <div class="filters">
          <input type="text" id="searchBoard" name="searchBoard" placeholder="Buscar item..." autocomplete="off"
                 v-model="searchBoard">
          <button v-if="page === 'items'" @click="page = 'dashboards', searchBoard = ''">Voltar</button>
          <button>Inativar dashboard</button>
        </div>
        <div id="list-boards" v-if="page === 'dashboards' && status === true">
          <div class="item">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              dashboard
            </span>
            <div class="actions">
              <i class="fi fi-rr-arrow-square-right" style="font-size: 2rem"></i>
            </div>
          </div>
        </div>
        <div id="list-boards"  v-if="page === 'items' && status === true">
          <div class="item">
            <span>
              <i class="fi fi-rr-chart-pie"></i>
              item
            </span>
            <div class="actions">
              <i class="fi fi-br-check" style="font-size: 1.6rem;"></i>
              <i class="fi fi-br-cross" style="font-size: 1.4rem;"></i>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true"></div>
</template>

<script>


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
    getItems: function () {
      alert('getItems')
    }
  },
  computed: {},
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