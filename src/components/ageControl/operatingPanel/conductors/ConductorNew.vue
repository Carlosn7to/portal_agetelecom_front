<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Adicionar novo condutor</h1>
      <div id="form">
        <form action="#" method="post" enctype="multipart/form-data" @submit.prevent="newConductor">
          <div class="container-inputs">
            <h6>Informações do condutor</h6>
            <div class="items-inputs">
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.first-name' || input.data.firstName !== '') }" >
                    <i class="fi fi-sr-user"></i>
                    <div class="inputs">
                      <label for="first-name" @click="input.selected = 'conductor.first-name'">Primeiro nome <b>*</b></label>
                      <input required  type="text" name="first-name" id="first-name" placeholder=" "
                              autocomplete="off"
                             @focusin="input.selected = 'conductor.first-name'"  @focusout="input.selected = ' '"
                             v-model="input.data.firstName">
                    </div>
                  </div>
                  <span>João...</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.last-name' || input.data.lastName !== '') }" >
                    <i class="fi fi-sr-user"></i>
                    <div class="inputs">
                      <label for="last-name" @click="input.selected = 'conductor.last-name'">Sobrenome <b>*</b></label>
                      <input required type="text" name="last-name" id="last-name" placeholder=" "
                              autocomplete="off"
                             minlength="5"
                             @focusin="input.selected = 'conductor.last-name'" @focusout="input.selected = ' '"
                             v-model="input.data.lastName">
                    </div>
                  </div>
                  <span>da Silva Sousa...</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.address' || input.data.address !== '') }">
                    <i class="fi fi-sr-map-marker-home"></i>
                    <div class="inputs">
                      <label for="address">Endereço <b>*</b></label>
                      <input required type="text" name="address" id="address" placeholder=" "
                              autocomplete="off"
                             @focusin="input.selected = 'conductor.address'"  @focusout="input.selected = ' '"
                             v-model="input.data.address">
                    </div>
                  </div>
                  <span>Av., Rua, Quadra.</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.city' || input.data.city !== '') }">
                    <i class="fi fi-sr-map-marker"></i>
                    <div class="inputs">
                      <label for="city">Cidade <b>*</b></label>
                      <select  required name="city" id="city" v-model="input.data.city"
                              @focusin="input.selected = 'conductor.city'" @focusout="input.selected = ' '">
                        <option v-for="item in input.formData.city || []" :key="item.id" :value="item.id">{{ item.cidade }}</option>
                      </select>
                    </div>
                  </div>
                  <span>Cidade onde o condutor mora</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.group' || input.data.group !== '') }">
                    <i class="fi fi-sr-users-alt"></i>
                    <div class="inputs">
                      <label for="group">Grupo <b>*</b></label>
                      <select required  name="group" id="group"
                              @focusin="input.selected = 'conductor.group'"  @focusout="input.selected = ' '"
                              v-model="input.data.group">
                        <option v-for="item in input.formData.group || []" :key="item.id" :value="item.id">{{ item.grupo }}</option>
                      </select>
                    </div>
                  </div>
                  <span>Informar se o condutor é Age ou terceirizado</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.type-service' || input.data.typeService !== '') }">
                    <i class="fi fi-sr-mailbox"></i>
                    <div class="inputs">
                      <label for="type-service">Serviço <b>*</b></label>
                      <select required  name="type-service" id="type-service"
                              @focusin="input.selected = 'conductor.type-service'"  @focusout="input.selected = ' '"
                              v-model="input.data.typeService">
                        <option v-for="item in input.formData.services || []" :key="item.id" :value="item.id">{{ item.servico }}</option>

                      </select>
                    </div>
                  </div>
                  <span>Tipo de serviço executado</span>
                </div>
              </div>
            </div>
          </div>
          <div class="container-inputs">
            <h6>Informações de acesso</h6>
            <div class="items-inputs">
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.email' || input.data.email !== '') }" >
                    <i class="fi fi-sr-user"></i>
                    <div class="inputs">
                      <label for="email" @click="input.selected = 'conductor.email'">E-mail <b>*</b></label>
                      <input required type="email" name="email" id="email" placeholder=" "
                              autocomplete="off"
                             @focusin="input.selected = 'conductor.email'"  @focusout="input.selected = ' '"
                             v-model="input.data.email">
                    </div>
                  </div>
                  <span>E-mail do condutor para receber a senha de acesso</span>
                </div>
              </div>
            </div>
          </div>
          <div class="container-inputs">
            <h6>Informações do veículo</h6>
            <div class="items-inputs">
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.type-vehicle' || input.data.typeVehicle !== '') }">
                    <i class="fi fi-sr-cars"></i>
                    <div class="inputs">
                      <label for="type-vehicle">Tipo de veículo <b>*</b></label>
                      <select required  name="type-vehicle" id="type-vehicle"
                              @focusin="input.selected = 'conductor.type-vehicle'" @focusout="input.selected = ' '"
                              v-model="input.data.typeVehicle">
                        <option v-for="item in input.formData.vehicleType || []" :key="item.id" :value="item.id">{{ item.tipo }}</option>
                      </select>
                    </div>
                  </div>
                  <span>Carro, moto, helicóptero...</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.modality' || input.data.modality !== '') }">
                    <i class="fi fi-sr-form"></i>
                    <div class="inputs">
                      <label for="modality">Modalidade <b>*</b></label>
                      <select required  name="modality" id="modality"
                              @focusin="input.selected = 'conductor.modality'" @focusout="input.selected = ' '"
                              v-model="input.data.modality">
                        <option v-for="item in input.formData.vehicleModality || []" :key="item.id" :value="item.id">{{ item.modalidade }}</option>

                      </select>
                    </div>
                  </div>
                  <span>Informar se o veículo é da empresa ou alugado</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.manufacturer' || input.data.manufacturer !== '') }">
                    <i class="fi fi-sr-car-building"></i>
                    <div class="inputs">
                      <label for="manufacturer">Fabricante <b>*</b></label>
                      <input required  type="text" name="manufacturer" id="manufacturer" autocomplete="off"
                             @focusin="input.selected = 'conductor.manufacturer'" @focusout="input.selected = ' '"
                             v-model="input.data.manufacturer" />
                    </div>
                  </div>
                  <span>Honda, Yamaha...</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.model' || input.data.model !== '') }">
                    <i class="fi fi-sr-car-bus"></i>
                    <div class="inputs">
                      <label for="model">Modelo <b>*</b></label>
                      <input required  type="text" name="model" id="model" autocomplete="off"
                             @focusin="input.selected = 'conductor.model'" @focusout="input.selected = ' '"
                             v-model="input.data.model" />
                    </div>
                  </div>
                  <span>CG 160 start, CB 300...</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.tank-capacity' || input.data.tankCapacity !== '') }">
                    <i class="fi fi-sr-gas-pump-alt"></i>
                    <div class="inputs">
                      <label for="tank-capacity">Capacidade do tanque <b>*</b></label>
                      <input required type="number" min="1" max="100" name="tank-capacity" id="tank-capacity"
                             @focusin="input.selected = 'conductor.tank-capacity'" @focusout="input.selected = ' '"
                             v-model="input.data.tankCapacity" />
                    </div>
                  </div>
                  <span>Quantidade de litros que o tanque suporta</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.average-km-l' || input.data.averageKmL !== '') }">
                    <i class="fi fi-sr-oil-can"></i>
                    <div class="inputs">
                      <label for="average-km-l">Média Km/L <b>*</b></label>
                      <input required type="number" min="1" max="100" name="average-km-l" id="average-km-l"
                              @focusin="input.selected = 'conductor.average-km-l'" @focusout="input.selected = ' '"
                              v-model="input.data.averageKmL" />
                    </div>
                  </div>
                  <span>Quilometragem média com um litro de gasolina</span>
                </div>
              </div>
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.initial-km' || input.data.initialKm !== '') }">
                    <i class="fi fi-sr-dashboard"></i>
                    <div class="inputs">
                      <label for="initial-km">Quilometragem inicial <b>*</b></label>
                      <input required type="number" min="1" max="100000" name="initial-km" id="initial-km"
                              @focusin="input.selected = 'conductor.initial-km'" @focusout="input.selected = ' '"
                              v-model="input.data.initialKm" />
                    </div>
                  </div>
                  <span>Primeira quilometragem relatada</span>
                </div>
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.distance-base-house' || input.data.distanceBaseHouse !== '') }">
                    <i class="fi fi-sr-route"></i>
                    <div class="inputs">
                      <label for="distance-base-house">Distância da Sede - Casa <b>*</b></label>
                      <input required  type="number" min="1" max="200" name="distance-base-house" id="distance-base-house"
                              @focusin="input.selected = 'conductor.distance-base-house'" @focusout="input.selected = ' '"
                              v-model="input.data.distanceBaseHouse" />
                    </div>
                  </div>
                  <span>Distância média entre a Sede Rialma e a casa do condutor</span>
                </div>
              </div>

            </div>
          </div>
          <button>Cadastrar</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script>

import {AXIOS} from "../../../../../services/api.ts";
import Cookie from 'js-cookie';

export default {
  name: "ConductorNew",
  emits: ['closeModal'],
  data () {
    return {
      input: {
        selected: '',
        formData: {
          city: null,
          group: null,
          services: null,
          vehicleType: null,
          vehicleModality: null
        },
        data: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
          group: '',
          typeService: '',
          typeVehicle: '',
          modality: '',
          manufacturer: '',
          model: '',
          tankCapacity: '',
          averageKmL: '',
          initialKm: '',
          distanceBaseHouse: '',
          image: null
        }
      },
      alert: {
        class: 'failed',
        msg: '',
        status: false
      }
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    },
    newConductor: function () {
      AXIOS({
        method: 'POST',
        url: 'agecontrol/management/conductor',
        headers: {"Authorization": "Bearer "+Cookie.get('token')},
        data: this.input.data
      }).then((res) => {
        this.alert.class = 'success'
        this.alert.msg = res.data.msg
        this.alert.status = true
        this.input.data.firstName = ''
        this.input.data.lastName = ''
        this.input.data.email = ''
        this.input.data.address = ''
        this.input.data.city = ''
        this.input.data.group = ''
        this.input.data.typeService = ''
        this.input.data.typeVehicle = ''
        this.input.data.modality = ''
        this.input.data.manufacturer = ''
        this.input.data.model = ''
        this.input.data.tankCapacity = ''
        this.input.data.averageKmL = ''
        this.input.data.initialKm = ''
        this.input.data.distanceBaseHouse = ''
        this.closePage()
        this.$emit('form-response', this.alert)
      }).catch((error) => {
        this.alert.class = 'failed'
        this.alert.msg = error.response.data.errors
        this.alert.status = true
        this.closePage()
        this.$emit('form-response', this.alert)
      })
    },
    getCitys: function () {
      AXIOS({
        method: 'GET',
        url: 'city',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
      }).then((res) => {
        this.input.formData.city = res.data
      })
    },
    getGroups: function () {
      AXIOS({
        method: 'GET',
        url: 'collaborators/group',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
      }).then((res) => {
        this.input.formData.group = res.data
      })
    },
    getServices: function () {
      AXIOS({
        method: 'GET',
        url: 'agecontrol/management/services',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
      }).then((res) => {
        this.input.formData.services = res.data
      })
    },
    getVehicleType: function () {
      AXIOS({
        method: 'GET',
        url: 'agecontrol/management/vehicle-type',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
      }).then((res) => {
        this.input.formData.vehicleType = res.data
      })
    },
    getVehicleModality: function () {
      AXIOS({
        method: 'GET',
        url: 'agecontrol/management/vehicle-modality',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
      }).then((res) => {
        this.input.formData.vehicleModality = res.data
      })
    }
  },
  mounted() {
    this.getCitys()
    this.getGroups()
    this.getServices()
    this.getVehicleType()
    this.getVehicleModality()
  }
}
</script>

<style scoped lang="scss">

#modal {
  overflow: hidden;

  #card-modal {
    width: 70vw;
    height: 95vh;

    h1 {
      text-align: center;
      color: $age-bl;
      font-size: 2rem;
      font-weight: 500;
    }

    #form {
      padding: 0 5vw 3vh 5vw;
      @include form-label-inputs;

    }

  }
}
</style>