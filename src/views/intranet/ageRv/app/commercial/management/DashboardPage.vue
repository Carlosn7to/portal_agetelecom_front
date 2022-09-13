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
        <template v-if="list === true">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Colaborador</span>
            </div>
            <div class="item">
              <span>Meta atual</span>
            </div>
            <div class="item">
              <span>Usuário vinculado</span>
            </div>
            <div class="item">
              <span>Função</span>
            </div>
            <div class="item">
              <span>Canal</span>
            </div>
            <div class="item">
              <span>Tipo de comissão</span>
            </div>
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Gestor</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in CollaboratorFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.collaborator }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.username }}</span>
              </div>
              <div class="item">
                <span>{{ item.function }}</span>
              </div>
              <div class="item">
                <span>{{ item.channel }}</span>
              </div>
              <div class="item">
                <span>{{ item.type_commission }}</span>
              </div>
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.supervisor }}</span>
              </div>
              <div class="item">
                <span>{{ item.management }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-edit" @click="editCollaborator(item.id)"></i>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
  <div class="loading" v-if="loading === true">
  </div>
  <div id="modal" v-if="modal === true">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <h1>Edição de usuário</h1>
      <form action="#">
        <span>Angela Soares Resende</span>
        <div class="inputs">
          <label for="meta">Meta</label>
          <input type="number" name="meta" id="meta" min="0">
        </div>
        <div class="inputs">
          <label for="meta">Possui usuário?</label>
          <input type="text" name="" id="" value="Não" disabled>
        </div>
        <div class="inputs">
          <label for="meta">Usuário vinculado</label>
          <select name="supervisors" id="supervisors">
            <option selected>--- Nenhum ---</option>
            <option value="1">Debora</option>
            <option value="2">Alisson</option>
          </select>
        </div>
        <div class="inputs">
          <label for="meta">Função</label>
          <input type="text" name="" id="" value="Vendedor" disabled>
        </div>
        <div class="inputs">
          <label for="meta">Canal</label>
          <input type="text" name="" id="" value="MCV" disabled>
        </div>
        <div class="inputs">
          <label for="meta">Tipo de comissão</label>
          <select name="supervisors" id="supervisors">
            <option value="1">MCV</option>
            <option value="2">PAP</option>
            <option value="2">LIDER</option>
          </select>
        </div>
        <div class="inputs">
          <label for="meta">Supervisor</label>
          <select name="supervisors" id="supervisors">
            <option value="1">Debora Rodrigues Acosta</option>
            <option value="2">Alisson Correia</option>
          </select>
        </div>
        <div class="inputs">
          <label for="meta">Gerente</label>
          <select name="supervisors" id="supervisors">
            <option value="1">Washington</option>
            <option value="2">Ivaldo</option>
          </select>
        </div>
        <input type="submit" value="Enviar informações">
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
  name: "DashboardPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      items: {},
      search: '',
      loading: true,
      list: false,
      modal: true
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getCollaborators() {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/collaborators',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.items = res.data
        this.list = true
        this.loading = false
      }).catch((error) => {
        console.log(error)
      })
    },
    editCollaborator(id) {
      alert(id)
    }
  },
  computed: {
    CollaboratorFiltered: function () {
      let values = []
      values = this.items.filter((value) => {
        return (
            value.collaborator.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  },
  created() {
    this.getCollaborators()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  @include flex(column, flex-start, initial, 0vh);

  #filters {
    width: 100%;
    height: 10%;
    @include flex(row, flex-start, center, 15px);


    input[type=text] {
      width: 25%;
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
      border: none;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      &:focus {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
    }

  }

  .items-header {
    @include table-card-headers;
    text-align: center;
  }

  .container-body {
    @include table-card-body;
  }
}

.loading {
  @include bar;
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
    width: 30vw;
    height: 90vh;
    padding: 1vh 0;

    h1 {
      font-size: 2.2rem;
      text-align: center;
      color: $age-bl;
      font-weight: 500;
    }

    form {
      @include flex(column, flex-start, center, 2vh);
      padding: 3vh 1vw;

      span {
        font-size: 1.4rem;
        color: $age-or;
        font-weight: 400;
      }
      .inputs {
        @include flex(column, flex-start, initial, 2px);
        width: 80%;

        label {
          font-size: 1.2rem;
          color: $age-bl;
          font-weight: 500;
        }

        input[type=text] {
          width: 100%;

        }

        input[type=number] {
          width: 50%;
        }
      }


    }
  }
}

</style>