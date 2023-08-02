<script>
import {defineComponent} from 'vue'
import CalendarComponent from "@/components/portal/_aux/calendar/CalendarComponent.vue";
import {AXIOS} from "../../../../../../services/api.ts";

export default defineComponent({
  name: "CapacitySchedule",
  components: { CalendarComponent},
  emits: ['returnPage'],
  data () {
    return {
      modalFilter: true,
      pendingConsult: false,
      filters: {

      },
      dataItems: null,
      modal: false,
      dataModal: {
        typeNote: '',
        turn: '',
        clients: []
      },
      search: ''
    }
  },
  computed: {
    ClientsFiltered: function () {
      let values = []
      values = this.dataModal.clients[0].filter((value) => {
        return (
            value.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  },
  methods: {
    getDataCapacity(day) {

      AXIOS({
        method: 'post',
        url: 'agetools/tools/schedule/dashboard/schedule-available',
        data: {
          dateSchedule: day
        }
      }).then((res) => {
        this.dataItems = res.data;

      })
    },
    returnPage () {
      this.$emit('returnPage')
    },
    openModalClients (typeNote, turn, clients) {
      this.modal = true;
      this.dataModal.typeNote = typeNote;
      this.dataModal.turn = turn;
      this.dataModal.clients = clients;
    }
  }
})
</script>

<template>

  <div class="container">
    <button @click="returnPage">Voltar</button>
    <div class="modal-filters" :style="{ display: modalFilter ? 'block' : 'none' }">
      <div class="calendar">
        <CalendarComponent
            :pendingConsult="pendingConsult"
            @getDateFilter="getDataCapacity"
        />
      </div>
    </div>

    <div class="capacity">
      <div class="box">
        <div class="title">Capacidade de instalações</div>
        <div class="item">Seg a Sex:</div>
        <div class="item">Manhã: 116</div>
        <div class="item">Tarde: 174</div>
        <div class="item">Sábado:</div>
        <div class="item">Manhã: 70</div>
        <div class="item">Tarde: 106</div>
      </div>
      <div class="box">
        <div class="title">Capacidade de visitas técnicas</div>
        <div class="item">Seg a Sex:</div>
        <div class="item">Manhã: 57</div>
        <div class="item">Tarde: 57</div>
        <div class="item">Sábado:</div>
        <div class="item">Manhã: 24 </div>
        <div class="item">Tarde: 24 </div>
      </div>
      <div class="box">
        <div class="title">Capacidade de MP/PME</div>
        <div class="item">Seg a Sex:</div>
        <div class="item">Manhã: 10</div>
        <div class="item">Tarde: 10</div>
        <div class="item">Sábado:</div>
        <div class="item">Manhã: 10</div>
        <div class="item">Tarde: 10</div>
      </div>
    </div>
    <div class="capacity-available">
      <h2 style="font-weight: 600">Agendadas</h2>
      <div class="card" v-for="(item, index) in dataItems" :key="index">
          <div class="type-note">
            <div class="title">
              <h3><b>{{ index }}</b></h3>
            </div>
          </div>
          <div class="turns">
            <div class="turn">
              <span>Manhã: <b>{{ item.manha.count }}</b></span>
              <i class="fi fi-rr-rectangle-list" v-if="item.manha.count > 0" @click="openModalClients(index, 'Manhã', item.manha.clients)"></i>
            </div>
            <div class="turn">
              <span>Tarde: <b>{{ item.tarde.count }}</b></span>
              <i class="fi fi-rr-rectangle-list" v-if="item.tarde.count > 0" @click="openModalClients(index, 'Tarde', item.tarde.clients)"></i>
            </div>
          </div>
      </div>
    </div>
  </div>
  <div class="modal" v-if="modal">
    <div class="card-modal">
      <div class="title-exit">
        <span>Listagem de clientes - {{ dataModal.typeNote }} - Período {{ dataModal.turn }}</span>
        <i class="fi fi-rr-cross" @click="modal = false"></i>
      </div>

      <div class="search">
        <input type="text" name="search" id="search" placeholder="Buscar cliente..." autocomplete="off" v-model="search">
      </div>

      <div class="list">
        <div class="client" v-for="(client, index) in ClientsFiltered" :key="index">
          <span>{{ client }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

.modal {
  width: 50vw;

  position: absolute;
  top: 18%;
  left: 2vw;
  z-index: 99;

  .card-modal {
    @include card();
    min-height: 70vh;
    max-height: 70vh;

    @include flex(column, flex-star, initial, 3vh);

    .search {
      input {
        @include card();
        padding: 10px 5px;
        width: 40%;
        font-size: 1rem;
      }

      ::placeholder {
        font-size: 1rem;
      }
    }


    .title-exit {
      @include flex(row, space-between, center, 0);
      span {
        font-size: 1.4rem;
        font-weight: 600;
      }
      i {
        font-size: 1.2rem;
        color: #333;
        cursor: pointer;

        &:hover {
          opacity: .8;
        }
      }
    }


    .list {
      @include flex(column, flex-start, initial, .5vh);
      max-height: 70vh;
      overflow-y: auto;
      padding: 2vh 0;

      .client {
        padding: 1vh 0;
        border-bottom: 1px solid #33333330;
      }
    }
  }
}

.modal-filters {
  @include flex(column, flex-start, initial, 2vh);
  position: absolute;
  top: 20%;
  right: 2%;
  padding: 1vh 1vw;
  width: 20vw;
  max-width: 20vw;
  z-index: 5;
  background-color: #ffffff;
  border-radius: 10px;
  .filters {
    height: 70%;
  }

  .calendar {
  }
}


.container {
  @include flex(column, flex-start, initial, 3vh);
  button {
    @include btn-dashboard(true);
    width: 10%;
  }
  .capacity {
    width: 70%;
    height: 100%;
    @include flex(row, center, center, 0);

    .box {
      width: 100%;
      @include flex(row, space-between, center, 0);
      flex-wrap: wrap;

      .title {
        width: 100%;
        font-size: 1.2rem;
        font-weight: 500;
        border: 1px solid $border-hover;
        padding: 5px;
      }

      .item {
        width: calc(100% / 3);
        font-size: 1rem;
        border: 1px solid $border-hover;
        padding: 5px;
      }

    }
  }

  .capacity-available {
    width: 50%;
    @include flex(column, flex-start, initial, 1vh);
    padding: 2vh 2vw;
    .card {
      width: 50%;
      @include card();
      @include flex(column, flex-start, initial, 1vh);

      .turns {
        @include flex(column,flex-start,initial, 1vh);

        .turn {
          @include flex(row, flex-start, center, 1vw);

          i {
            font-size: 1.2rem;
            color: $primary;
            margin-left: auto;
            cursor: pointer;

            &:hover {
              opacity: .8;
            }
          }

          b {
            font-size: 1.2rem;
          }
        }
      }

    }
  }
}

</style>