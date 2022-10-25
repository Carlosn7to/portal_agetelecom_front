<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'portal-mng'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <h1 style="font-size: 2.6rem; text-align: center">Novo usuário</h1>
        <form action="#" @submit.prevent>
          <h1>Dados do portal</h1>
          <div class="identify">
            <div class="inputs">
              <label for="name">Nome completo <b>*</b></label>
              <input type="text" name="name" id="name" autocomplete="off" v-model="data.name">
            </div>
            <div class="inputs">
              <label for="level">Nível de acesso ao Portal <b>*</b></label>
              <select :disabled="levelData === null" name="level" id="level">
                <option selected>--- Nenhum valor selecionado ---</option>
                <template v-for="item in levelData" :key="item.id">
                  <option :value="item.id">
                    {{ item.nivel }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <h1>Módulos disponíveis</h1>
          <div class="systems">
            <div class="system">
              <div class="modal">
                <div class="name">
                  <i class="fi fi-rr-star"></i>
                  <span><b>AgeRv</b> - Remuneração variável</span>
                </div>
                <div class="more">
                  <i class="fi fi-rr-arrow-square-down" v-if="data.agerv.status === false" @click="data.agerv.status = true"></i>
                  <i class="fi fi-rr-arrow-square-up" v-else @click="data.agerv.status = false"></i>
                </div>
              </div>
              <div class="divisor">
                <div></div>
              </div>

              <template v-if="data.agerv.status === true">
                <div class="form-system animation-down">
                  <div class="inputs-check">
                    <input type="checkbox" name="agerv-permmitted" id="agerv-permmitted" v-model="data.agerv.permmitted">
                    <label for="agerv-permmitted">Permitir acesso</label>
                  </div>
                  <div class="inputs">
                    <label for="level">Nível de acesso ao AgeRv <b>*</b></label>
                    <select :disabled="data.agerv.permmitted === false" name="level" id="level" v-model="data.agerv.level">
                      <option selected>--- Nenhum valor selecionado ---</option>
                      <template v-for="item in levelData" :key="item.id">
                        <option :value="item.id">
                          {{ item.nivel }}
                        </option>
                      </template>
                    </select>
                  </div>
                  <div class="inputs">
                    <label for="level">Função do colaborador <b>*</b></label>
                    <select :disabled="data.agerv.permmitted === false" name="function" id="function" v-model="data.agerv.function">
                      <option selected>--- Nenhuma função selecionada ---</option>
                      <template v-for="item in functionData" :key="item.id">
                        <option :value="item.id">
                          {{ item.funcao }}
                        </option>
                      </template>
                    </select>
                  </div>
                  <div class="inputs animation-down" v-if="data.agerv.function === 1 || data.agerv.function === 3">
                    <label for="collaborator">Vincular colaborador</label>
                    <input :disabled="data.agerv.permmitted === false" list="collaborator" type="text" @keyup="getCollaboratorsRv" v-model="collaboratorSearch">
                    <datalist id="collaborator">
                      <template v-for="item in collaboratorData" :key="item.id">
                        <option :value="item.nome"></option>
                      </template>
                    </datalist>
                  </div>
                  <button id="vinc-collab" class="animation-down" v-if="data.agerv.function === 4" @click="vincCollab()">Vincular supervisores</button>
                </div>
              </template>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../services/api.ts";

export default {
  name: "NewUser",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      levelData: null,
      functionData: {},
      data: {
        name: '',
        level: null,
        agerv: {
          status: false,
          permmitted: false,
          function: '--- Nenhuma função selecionada ---',
          level: '--- Nenhum valor selecionado ---'
        }
      },
      collaboratorData: {},
      collaboratorSearch: ''
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getLevel: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/level'
      })
          .then((res) => {
            this.levelData = res.data
          })
    },
    getFunction: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/function'
      })
          .then((res) => {
            this.functionData = res.data
          })
    },
    getCollaboratorsRv: function (){
      AXIOS({
        method: 'GET',
        url: 'agerv/management/collaborator/list/',
        params: {
          name: JSON.stringify(this.collaboratorSearch)
        }
      })
          .then((res) => {
            this.collaboratorData = res.data
          })
    },
    vincCollab: function () {
      alert('click')
    }
  },
  mounted() {
    this.getFunction()
    this.getLevel()
    this.getCollaboratorsRv()
  }
}
</script>

<style scoped lang="scss">

h1 {
  padding: 1vh 1vw;
}

form {
  padding: 0 25vw;


  .inputs {
    width: 100%;
    @include flex(column, flex-start, initial, 5px);

    label {
      font-size: 1.4rem;
      color: $ml-text-h1;

      b {
        color: $red;
      }
    }

    input, select {
      border: 2px solid #F4F4F4;
      padding: 10px 5px;
      border-radius: 3px;
      @include tr;
      color: #1a1a1a;
      font-size: 1.2rem;
      background-color: $b-inp-g-f;
    }

    input[type=text] {

      &:focus {
        border-color: $age-bl;
        background-color: #fff;
      }
    }
  }

  .inputs-check {
    @include flex(row, flex-start, center, 5px);

    label {
      font-size: 1.4rem;
      color: $ml-text-h1;
      @include tr-p;
      font-weight: 500;

      b {
        color: $red;
      }
    }

    input {
      @include tr-p;

    }
  }


  .identify {
    padding: 2vh 1vw;
    @include flex(column, flex-start, initial, 2vh);
  }
  .systems {
    @include flex(column, flex-initial, initial, 2vh);
    padding: 2vh 1vw;

    .system {
      padding: 10px 10px;
      width: 100%;

      .divisor {
        height: 2px;
        width: 100%;
        margin: 2vh 0;
        @include flex(row, center, center, 0);

        div {
          width: 80%;
          height: 100%;
          background-color: #cccccc60;
        }
      }

      .modal {
        @include flex(row, space-between, center, 0);
        .name {
          @include flex(row, flex-start, center, 5px);

          span {
            font-size: 1.4rem;
            padding-bottom: 2px;
            color: $age-bl;

            b {
              font-size: 1.6rem;
            }
          }

          i {
            font-size: 2.2rem;
            color: $age-or;
          }
        }

        .more {

          i {
            @include tr-p;
            font-size: 1.8rem;
            color: $age-bl;

            &:hover {
              color: $age-or;
            }
          }
        }
      }

      .form-system {
        @include flex(column, flex-start, initial, 2vh);

        .inputs {
          width: 100%;
        }


      }


      }
  }
}

.animation-down {
  animation: down forwards .2s ease;
}

#vinc-collab {
  @include button-pattern;
  width: 50%;
  margin: 0 auto;
}

@keyframes down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}

</style>