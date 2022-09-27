<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageRv'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">

        <template v-if="stage === 'supervisors'">
          <div class="items-header">
            <div class="item" style="justify-content: flex-start; width: 50%">
              <span>Canal</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body">
              <div class="item" style="justify-content: flex-start; width: 50%">
                <span>MCV</span>
              </div>
              <div class="item">
                <span>1042</span>
              </div>
              <div class="item">
                <span>R$35.293,11</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info" @click="extractView('supervisor', item)"></i>
                <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'sellers')"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div id="modal">
    <div id="card-modal">
      <button @click="newField()">Add nova faixa</button>
      <br>
      <br>
      <form action="" @submit.prevent="getSimulator" >
        <template v-for="(field, key) in rulesRange || []" :key="key">
          <div class="double-items">
            <span v-if="rulesRange.length !== 1 && key === 0">Faixa inicial</span>
            <span v-if="key > 0 && (rulesRange.length - 1) !== key">Faixa intermediária</span>
            <span v-if="(rulesRange.length - 1) === key"> Faixa final</span>
            <div class="double-item">
              <label for="">Inicial {{ key }}</label>
              <input type="number" name="" id="" v-model="rulesRange[key].first">
            </div>
            <div class="double-item" v-if="(rulesRange.length - 1) !== key">
              <label for="">Final</label>
              <input type="number" name="" id="" v-model="rulesRange[key].last">
            </div>
            <div class="double-item">
              <label for="">Valor</label>
              <input type="number" name="" id="" v-model="rulesRange[key].value">
            </div>
          </div>
        </template>
        <input type="submit" value="Enviar" v-if="rulesCount > 0">
      </form>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";

export default {
  name: "SimulatorPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      stage: 'supervisors',
      rulesRange: [],
      rulesCount: 0
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getSimulator: function () {

      AXIOS({
        method: 'GET',
        url: '/teste',
        params: {
          rulesRange: {
            mcv: this.mcv
          }
        }
      }).then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    newField: function () {

        this.rulesRange.push({
          count: `1º - Faixa`,
          first: 0,
          last: 0,
          value: 0
        })
      this.rulesCount++

    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

.items-header {
  @include table-card-headers;
}

.container-body {
  @include table-card-body;
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}

#modal {
  #card-modal {
    width: 50vw;
    height: 90vh;
    padding: 3vh 1vw;
    max-height: 90vh;
    overflow-y: auto;

    form {
      @include flex(column, flex-start, initial, 10px);
      width: 60%;

      .double-items {
        @include flex(column, flex-start, initial, 10px);
        span {
          font-size: 1.2rem;
          color: $age-bl;
        }

        .double-item {
          @include flex(column, flex-start, initial, 10px);
        }

      }
    }
  }
}

</style>