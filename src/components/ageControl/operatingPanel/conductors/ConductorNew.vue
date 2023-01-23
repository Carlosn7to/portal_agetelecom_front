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
                      <input type="text" name="first-name" id="first-name" placeholder=" "
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
                      <input type="text" name="last-name" id="last-name" placeholder=" "
                              autocomplete="off"
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
                      <input type="text" name="address" id="address" placeholder=" "
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
                      <select  name="city" id="city" v-model="input.data.city"
                              @focusin="input.selected = 'conductor.city'" @focusout="input.selected = ' '">
                        <option value="1">Asa Sul</option>
                        <option value="2">Asa Norte</option>
                        <option value="3">Ceilândia</option>
                        <option value="4">Samambaia</option>
                        <option value="5">Riacho fundo II</option>
                        <option value="6">ValParaíso</option>
                        <option value="7">Taguatinga</option>
                        <option value="8">Riacho I</option>
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
                      <select  name="group" id="group"
                              @focusin="input.selected = 'conductor.group'"  @focusout="input.selected = ' '"
                              v-model="input.data.group">
                        <option value="age">Age</option>
                        <option value="wt">WT</option>
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
                      <select  name="type-service" id="type-service"
                              @focusin="input.selected = 'conductor.type-service'"  @focusout="input.selected = ' '"
                              v-model="input.data.typeService">
                        <option value="1">Logística Reversa</option>
                        <option value="2">Entrega de cartas</option>
                      </select>
                    </div>
                  </div>
                  <span>Tipo de serviço executado</span>
                </div>
              </div>
            </div>
          </div>
          <div class="container-inputs">
            <h6>Informações do veículo</h6>
            <div class="items-inputs">
              <div class="row-inputs double">
                <div class="item-inputs">
                  <div class="content-input" :class="{ 'active-inpts' : (input.selected === 'conductor.vehicle' || input.data.vehicle !== '') }">
                    <i class="fi fi-sr-cars"></i>
                    <div class="inputs">
                      <label for="vehicle">Tipo de veículo <b>*</b></label>
                      <select  name="vehicle" id="vehicle"
                              @focusin="input.selected = 'conductor.vehicle'" @focusout="input.selected = ' '"
                              v-model="input.data.vehicle">
                        <option value="1">Carro</option>
                        <option value="2">Moto</option>
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
                      <select  name="modality" id="modality"
                              @focusin="input.selected = 'conductor.modality'" @focusout="input.selected = ' '"
                              v-model="input.data.modality">
                        <option value="1">Próprio AGE</option>
                        <option value="2">Alugado</option>
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
                      <input  type="text" name="manufacturer" id="manufacturer" autocomplete="off"
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
                      <input  type="text" name="model" id="model" autocomplete="off"
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
                      <input  type="number" min="1" max="100" name="tank-capacity" id="tank-capacity"
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
                      <input  type="number" min="1" max="100" name="average-km-l" id="average-km-l"
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
                      <input  type="number" min="1" max="100" name="initial-km" id="initial-km"
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
                      <input  type="number" min="1" max="200" name="distance-base-house" id="distance-base-house"
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

export default {
  name: "ConductorNew",
  data () {
    return {
      input: {
        selected: '',
        data: {
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          group: '',
          typeService: '',
          vehicle: '',
          modality: '',
          manufacturer: '',
          model: '',
          tankCapacity: '',
          averageKmL: '',
          initialKm: '',
          distanceBaseHouse: '',
          image: null
        }
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
        url: 'teste',
        data: this.input.data
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="scss">

#modal {
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