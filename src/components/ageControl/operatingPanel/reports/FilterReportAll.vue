<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Filtros</h1>

      <div id="form">
        <form action="#" method="post" enctype="multipart/form-data" @submit.prevent="newReport">
          <div class="container-inputs">
            <h6>Informações do condutor</h6>
            <div class="items-inputs">
              <div class="row-inputs">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.conductor' || input.data.conductor !== '') }" >
                    <i class="fi fi-sr-user"></i>
                    <div class="inputs">
                      <label for="conductor">Condutor </label>
                      <select   name="conductor" id="conductor" v-model="input.data.conductor"
                               @focusin="input.selected = 'conductor.conductor'" @focusout="input.selected = ' '">
                        <option value=""> </option>
                        <option v-for="item in input.formData.conductor || []" :value="item.id" :key="item.id">
                          {{ item.primeiro_nome }} {{ item.segundo_nome }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <span>Selecione o condutor responsável pelo relato</span>
                </div>
              </div>
              <div class="row-inputs">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'period' || input.data.period !== '') }" >
                    <i class="fi fi-sr-clock"></i>
                    <div class="inputs">
                      <label for="period">Periodo referente</label>
                      <select   name="period" id="period" v-model="input.data.period"
                               @focusin="input.selected = 'period'" @focusout="input.selected = ' '">
                        <option value=""> </option>
                        <option v-for="item in input.formData.period || []" :value="item.id" :key="item.id">
                         {{ item.periodo }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <span>Selecione o condutor responsável pelo relato</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'first-period' || input.data.firstPeriod !== '') }" >
                    <i class="fi fi-sr-calendar"></i>
                    <div class="inputs">
                      <label for="first-period">Primeira data </label>
                      <input type="date" name="first-period" id="first-period"
                             v-model="input.data.firstPeriod" @focusin="input.selected = 'first-period'" @focusout="input.selected = ''">
                    </div>
                  </div>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'last-period' || input.data.lastPeriod !== '') }" >
                    <i class="fi fi-sr-calendar"></i>
                    <div class="inputs">
                      <label for="last-period">Segunda data </label>
                      <input type="date" name="last-period" id="last-period"
                      v-model="input.data.lastPeriod" @focusin="input.selected = 'last-period'" @focusout="input.selected = ''">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="filterReports">Filtrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "FilterReportAll",
  components: {},

  data () {
    return {
      search: '',
      input: {
        selected: '',
        formData: {
          conductor: null,
          period: null,
          imageName: '',
          imageStatus: true
        },
        data: {
          conductor: '',
          period: '',
          firstPeriod: '',
          lastPeriod: ''
        }
      },
      alert: {
        class: '',
        status: true,
        msg: ''
      }
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    },
    getConductors: function (){
      AXIOS({
        method: 'get',
        url: 'agecontrol/management/conductor',
        headers: {
          "Authorization": "Bearer "+Cookie.get('token')
        }
      }).then((res) => {
        this.input.formData.conductor = res.data
      })
    },
    getPeriods: function () {
      AXIOS({
        method: 'get',
        url: 'agecontrol/management/report-periods',
        headers: {
          "Authorization": "Bearer "+Cookie.get('token')
        }
      }).then((res) => {
        this.input.formData.period = res.data
      })
    },
    filterReports: function () {

      const filters = JSON.stringify(this.input.data)

      AXIOS({
        method: 'get',
        url: 'agecontrol/management/reports-complete',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token'),
          'Content-Type': 'application/json'
        },
        params: {filters}
      }).then((res) => {
        this.$emit('filtered', res.data)
      })
    }
  },
  mounted() {
    this.getConductors()
    this.getPeriods()
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 50vw;
    padding-bottom: 4vh;

    #close-button {
      height: initial;
    }

    h1 {
      text-align: center;
    }


    #form {
      @include form-label-inputs;
    }
  }
}

</style>