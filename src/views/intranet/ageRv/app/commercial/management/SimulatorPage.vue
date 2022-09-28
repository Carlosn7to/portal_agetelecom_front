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
        <div id="filters">
          <button @click="modal = true">Filtros</button>
          <button @click="getSimulator">Aplicar filtros</button>
        </div>
        <template v-if="stage === 'channels'">
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
            <div class="items-body" v-for="(item, key) in data.channels" :key="key">
              <div class="item" style="justify-content: flex-start; width: 50%" >
                <span>{{ item.channel }}</span>
              </div>
              <div class="item">
                <span>{{ item.sales}}</span>
              </div>
              <div class="item">
                <span>R${{ item.commission }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-users" @click="tradePage(item, 'collaborators')"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="stage === 'collaborators'">
          <button id="back" @click="stage = 'channels'">Voltar</button>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start; width: 50%">
              <span>Colaborador</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in dataCollaborator.collaborators" :key="key">
              <div class="item" style="justify-content: flex-start; width: 50%" >
                <span>{{ item.name }}</span>
              </div>
              <div class="item">
                <span>{{ item.sales}}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span>R${{ item.commission }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div id="modal" v-if="modal === true">
    <div id="card-modal">
      <div id="menu-card">
        <nav>
          <ul>
            <li @click="page = 'MCV'" :class="{'selectLi' : page === 'MCV' }">
              <i class="fi fi-rr-filter"></i>
              <span>MCV</span>
            </li>
            <li @click="page = 'PAP'" :class="{'selectLi' : page === 'PAP' }">
              <i class="fi fi-rr-filter"></i>
              <span>PAP</span>
            </li>
            <li @click="page = 'LIDER'" :class="{'selectLi' : page === 'LIDER' }">
              <i class="fi fi-rr-filter"></i>
              <span>LÍDER</span>
            </li>
            <li @click="modal = false">
              <i class="fi fi-rr-arrow-left"></i>
              <span>Voltar</span>
            </li>
          </ul>
        </nav>
      </div>
      <div id="content-card" v-if="page === 'MCV'">
        <button @click="newRule('MCV')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.MCV || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.MCV[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.MCV[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.MCV[key].value">
              </div>
              <div v-if="key > 0 && key < (rulesRange.MCV.length - 1)">
                <i class="fi fi-rr-cross" @click="rmRule('MCV', key)"></i>
              </div>
            </div>
          </template>
          <input type="submit" value="Enviar" v-if="rulesCount > 0">
        </form>
      </div>
      <div id="content-card" v-if="page === 'PAP'">
        <button @click="newRule('PAP')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.PAP || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.PAP[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.PAP[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.PAP[key].value">
              </div>
              <div v-if="key > 0 && key < (rulesRange.PAP.length - 1)">
                <i class="fi fi-rr-cross" @click="rmRule('PAP', key)"></i>
              </div>
            </div>
          </template>
        </form>
      </div>
      <div id="content-card" v-if="page === 'LIDER'">
        <button @click="newRule('LIDER')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.LIDER || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.LIDER[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.LIDER[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.LIDER[key].value">
              </div>
              <div v-if="key > 0 && key < (rulesRange.LIDER.length - 1)">
                <i class="fi fi-rr-cross" @click="rmRule('LIDER', key)"></i>
              </div>
            </div>
          </template>
        </form>
      </div>

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
      stage: 'channels',
      modal: false,
      page: 'MCV',
      rulesRange: {
        MCV: [
            {
              first: 0,
              last: 0,
              value: 0
            },
            {
              first: 0,
              last: null,
              value: 0
            },
        ],
        LIDER: [
          {
            first: 0,
            last: 0,
            value: 0
          },
          {
            first: 0,
            last: null,
            value: null
          },
        ],
        PAP: [
          {
            first: 0,
            last: 0,
            value: 0
          },
          {
            first: 0,
            last: null,
            value: 0
          },
        ]
      },
      rulesCount: 0,
      data: {},
      dataCollaborator: {}
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getSimulator: function () {

      this.stage = 'channels'
      this.data = {}

      AXIOS({
        method: 'POST',
        url: '/agerv/analytics/simulator',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        data: {
          rulesRange: this.rulesRange,
          month: '09'
        }
      }).then((res) => {
        this.data = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    newRule: function (type) {

      if(type === 'MCV') {
        let arr = this.rulesRange.MCV

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }

      if(type === 'PAP') {
        let arr = this.rulesRange.PAP

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }

      if(type === 'LIDER') {
        let arr = this.rulesRange.LIDER

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }



    },
    rmRule: function (type, key) {

      if(type === 'MCV') {
        let arr = this.rulesRange.MCV

        arr.splice(key, 1)
      }

      if(type === 'PAP') {
        let arr = this.rulesRange.PAP

        arr.splice(key, 1)
      }

      if(type === 'LIDER') {
        let arr = this.rulesRange.LIDER

        arr.splice(key, 1)
      }
    },
    tradePage: function (data, stage) {
      this.stage = stage
      this.dataCollaborator = data
    }

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

#back {
  padding: 5px 15px;
  background-color: $age-bl;
  color: #fff;
  font-weight: 500;
  border: 1px solid $age-bl;
  @include tr-p;
  border-radius: 3px;
  margin-top: 2vh;

  &:hover {
    background-color: #fff;
    color: $age-bl;
    border-color: $age-bl;
  }
}

#filters {
  width: 100%;
  @include flex(row, flex-start, initial, 15px);

  button {
    padding: 5px 15px;
    background-color: $age-bl;
    color: #fff;
    font-weight: 500;
    border: 1px solid $age-bl;
    @include tr-p;
    border-radius: 3px;

    &:hover {
      background-color: #fff;
      color: $age-bl;
      border-color: $age-bl;
    }
  }
}

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
    max-height: 90vh;
    background-color: $back-main;
    @include flex(row, space-between, initial, 30px);

    #menu-card {
      width: 20%;
      height: 100%;
      background-color: #fff;
      border-right: 2px solid #cccccc90;
      padding: 4vh 0;

      nav {
        ul {
          li {
            padding-left: 1vw;
            height: 7vh;
            @include flex(row, flex-start, center, 5px);
            border-bottom: 1px solid #cccccc90;
            font-weight: 500;
            color: $ml-text-h1;
            font-size: 1.2rem;
            color: $age-bl;
            @include tr-p;

            i {
              font-size: 2rem;
              @include tr;
            }

            span {
              padding-bottom: 2px;
              @include tr;
            }

            &:hover > i {
              color: $age-or;
            }

            &:hover > span {
              font-weight: 600;
            }
          }

          .selectLi {
            span {
              font-weight: 600 !important;
            }

            i {
              color: $age-or !important;
            }
          }
        }
      }
    }

    #content-card {
      width: 80%;
      height: 100%;
      padding: 4vh 2vw;
      overflow-y: auto;


      button {
        background-color: $age-bl;
        padding: 5px 15px;
        color: #fff;
        border-radius: 3px;
        font-weight: 600;
        font-size: 1.2rem;
        border: solid 1px $age-bl;
        @include tr-p;
        margin-bottom: 2vh;

        &:hover {
          background-color: #fff;
          border-color: $age-bl;
          color: $age-bl;
        }
      }

      form {
        @include flex(column, flex-start, initial, 10px);
        width: 100%;

        .double-items {
          @include flex(row, space-around, initial, 0);
          background-color: #fff;
          @include sh;
          padding: 3vh 1vw;
          width: 60%;
          span {
            font-size: 1.2rem;
            color: $age-bl;
          }


          .double-item {
            @include flex(column, flex-start, initial, 10px);
            width: calc((100% / 3) - 20px);

            label {
              text-align: center;
              font-size: 1.4rem;
              color: $age-bl;
              font-weight: 500;
            }

            input[type=number] {
              text-align: center;
              padding: 5px 5px;
              border: 2px solid #cccccc90;
              font-size: 1.2rem;
              color: $age-bl;
              font-weight: 600;
            }
          }

        }

        i {
          color: red;
          @include tr-p;
          font-size: 1.2rem;
        }
      }

    }
  }
}

</style>