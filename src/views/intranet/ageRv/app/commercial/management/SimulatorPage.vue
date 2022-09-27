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
              <div class="item" style="justify-content: flex-start; width: 50%" >
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
  <div id="modal" v-if="modal === true">
    <div id="card-modal">
      <div id="menu-card">
        <nav>
          <ul>
            <li @click="page = 'mcv'" :class="{'selectLi' : page === 'mcv' }">
              <i class="fi fi-rr-filter"></i>
              <span>MCV</span>
            </li>
            <li @click="page = 'pap'" :class="{'selectLi' : page === 'pap' }">
              <i class="fi fi-rr-filter"></i>
              <span>PAP</span>
            </li>
            <li @click="page = 'lider'" :class="{'selectLi' : page === 'lider' }">
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
      <div id="content-card" v-if="page === 'mcv'">
        <button @click="newRule('mcv')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.mcv || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.mcv[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.mcv[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.mcv[key].value">
              </div>
            </div>
          </template>
          <input type="submit" value="Enviar" v-if="rulesCount > 0">
        </form>
      </div>
      <div id="content-card" v-if="page === 'pap'">
        <button @click="newRule('pap')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.pap || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.pap[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.pap[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.pap[key].value">
              </div>
            </div>
          </template>
        </form>
      </div>
      <div id="content-card" v-if="page === 'lider'">
        <button @click="newRule('lider')">Add nova faixa</button>
        <br>
        <br>
        <form action="" @submit.prevent="getSimulator" >
          <template v-for="(field, key) in rulesRange.lider || []" :key="key">
            <div class="double-items">
              <div class="double-item">
                <label for="">Inicial</label>
                <input type="number" name="" id="" v-model="rulesRange.lider[key].first">
              </div>
              <div class="double-item" v-if="field.last !== null">
                <label for="">Final</label>
                <input type="number" name="" id="" v-model="rulesRange.lider[key].last">
              </div>
              <div class="double-item">
                <label for="">Valor</label>
                <input type="number" name="" id="" v-model="rulesRange.lider[key].value">
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
      stage: 'supervisors',
      modal: false,
      page: 'mcv',
      rulesRange: {
        mcv: [
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
        lider: [
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
        pap: [
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
          rulesRange: this.rulesRange
        }
      }).then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    // newField: function () {
    //
    //     this.rulesRange.push({
    //       count: `1º - Faixa`,
    //       first: 0,
    //       last: 0,
    //       value: 0
    //     })
    //   this.rulesCount++
    //
    // },
    newRule: function (type) {

      if(type === 'mcv') {
        let arr = this.rulesRange.mcv

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }

      if(type === 'pap') {
        let arr = this.rulesRange.pap

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }

      if(type === 'lider') {
        let arr = this.rulesRange.lider

        arr.splice(1, 0, {
          first: 0,
          last: 0,
          value: 0
        })
      }



    },
    tradePage: function () {

    }

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

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
      }

    }
  }
}

</style>