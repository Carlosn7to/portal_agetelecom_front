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
      dataItems: null
    }
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
        <div class="item">Manhã: 62</div>
        <div class="item">Tarde: 57</div>
        <div class="item">Sábado:</div>
        <div class="item">Manhã: 33</div>
        <div class="item">Tarde: 33</div>
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
              <span>Manhã: <b>{{ item.manha }}</b></span>
            </div>
            <div class="turn">
              <span>Tarde: <b>{{ item.tarde }}</b></span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

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
    width: 50%;
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
          b {
            font-size: 1.2rem;
          }
        }
      }

    }
  }
}

</style>