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
            <button>Ações</button>
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
                <i class="fi fi-rr-edit"
                   @click="editCollaborator(item)"></i>
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
    <EditCollaborator
        :data="dataCollaborator"
        @close-page="closePage()"
    />
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import EditCollaborator from "@/components/ageRv/management/EditCollaborator";

export default {
  name: "DashboardPage",
  components: {
    MenuApp,
    HeaderApp,
    EditCollaborator
  },
  emits: ['closePage'],
  data () {
    return {
      mode: Cookie.get('mode'),
      items: {},
      search: '',
      loading: true,
      list: false,
      modal: false,
      dataCollaborator: {}
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
    editCollaborator(data) {
      this.modal = true
      this.dataCollaborator = data
    },
    closePage: function () {
      this.modal = false
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

    button {
      @include button-pattern;
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


</style>