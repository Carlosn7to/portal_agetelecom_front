<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Incluir relato manualmente</h1>

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
                      <label for="conductor">Condutor <b>*</b></label>
                      <select  required name="conductor" id="conductor" v-model="input.data.conductor"
                               @focusin="input.selected = 'conductor.conductor'" @focusout="input.selected = ' '">
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
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'km-report' || input.data.kmReport !== '') }">
                    <i class="fi fi-sr-map-marker-home"></i>
                    <div class="inputs">
                      <label for="km-report">Quilometragem relatada <b>*</b></label>
                      <input type="number" name="km-report" id="km-report" placeholder=" "
                             required autocomplete="off"
                             @focusin="input.selected = 'km-report'"
                             v-model="input.data.kmReport">
                    </div>                  </div>
                  <span>Inserir a quilometragem conforme a imagem</span>
                </div>
              </div>
              <div class="row-inputs">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'period' || input.data.period !== '') }">
                    <i class="fi fi-sr-users-alt"></i>
                    <div class="inputs">
                      <label for="period">Periodo relatado <b>*</b></label>
                      <select  required name="period" id="period" v-model="input.data.period"
                               @focusin="input.selected = 'period'" @focusout="input.selected = ' '">
                        <option v-for="item in input.formData.period" :key="item.id" :value="item.id">{{ item.periodo }}</option>
                      </select>
                    </div>
                  </div>
                  <span>Informar o período que o relato faz referencia</span>
                </div>
              </div>
              <div class="row-inputs">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'image' || input.formData.imageName !== '') }">
                    <i class="fi fi-sr-mode-portrait"></i>
                    <div class="inputs file">
                      <div class="container-file">
                        <label for="image">Adicionar arquivo <b>*</b></label>
                        <input v-if="input.formData.imageStatus" required type="file" name="image" accept="image/jpeg, image/png" id="image" @change="uploadImage">
                      </div>
                    </div>
                  </div>
                  <span>{{ input.formData.imageName }}</span>
                  <span><i>Arquivos compatíveis: .JPEG, .PNG</i></span>
                </div>
              </div>
            </div>
          </div>
          <button>Cadastrar</button>
        </form>
      </div>
    </div>

    <AlertResponse
      v-if="alert.status"
      @close="alert.status = false"
      :response="alert"
    />
  </div>
</template>

<script>

import {AXIOS} from "../../../../../services/api.ts";
import Cookie from 'js-cookie';
import AlertResponse from "@/components/_aux/AlertResponse";

export default {
  name: "ReportNew",
  components: {AlertResponse},

  data () {
    return {
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
          kmReport: '',
          period: '',
          image: null
        }
      },
      alert: {
        class: '',
        msg: '',
        status: false
      },
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    },
    newReport: function () {
      this.input.formData.imageStatus = false
      AXIOS({
        method: 'POST',
        url: 'agecontrol/management/report',
        headers: {
          "Authorization": "Bearer "+Cookie.get('token')
        },
        data: this.input.data
      }).then((res) => {
        this.alert.class = 'success'
        this.alert.msg = res.data.msg
        this.alert.status = true
        this.input.data.conductor = ''
        this.input.data.kmReport = ''
        this.input.data.period = ''
        this.input.data.image = null
        this.input.formData.imageName = ''
        this.input.formData.imageStatus = true
      })
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
    uploadImage: function (e){
      console.log('esteve aqui')
      const image = e.target.files[0];
      this.input.formData.imageName = e.target.files[0].name

      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.input.data.image = e.target.result;
      };

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
    width: 40vw;
    #close-button {
      height: initial;
    }

    h1 {
      text-align: center;
    }

    #form {
      padding: 0 2vw 3vh 2vw;
      @include form-label-inputs;
    }
  }
}

</style>