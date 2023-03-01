<template>
  <div class="content-card">
    <div class="menu">
      <nav>
        <ul>
          <li :class="{ 'page-selected' : page === 'overview'}" @click="page = 'overview'">
            <div>
              <i class="fi fi-rr-id-badge"></i>
            </div>
          </li>
          <li :class="{ 'page-selected' : page === 'user'}" @click="page = 'user'" v-if="statusReq === false && (data.isAD === 0 || data.isAD === null)">
            <div>
              <i class="fi fi-rr-user"></i>
            </div>
          </li>
          <li :class="{ 'page-selected' : page === 'meta'}" @click="page = 'meta'">
            <div>
              <i class="fi fi-rr-chat-arrow-grow"></i>
            </div>
          </li>
          <li @click="closePage()">
            <div>
              <i class="fi fi-rr-arrow-left"></i>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <div class="content" v-if="page === 'overview'">
      <h1>Visão geral</h1>
      <div class="card-info">
        <div>
          <h6>Dados do ERP</h6>
          <span>
                <b>Nome:</b> {{ data.collaborator }}
              </span>
          <span>
                <b>Função:</b> {{ data.function }}
              </span>
          <span>
                <b>Supervisor:</b> {{ data.supervisor  }}
              </span>
        </div>
        <div>
          <h6>Dados do usuário</h6>
          <span>
                <b>Usuário vinculado:</b> {{ data.username }}
              </span>
          <span>
                <b>E-mail:</b> {{ data.email }}
              </span>
          <span>
                <b>Nível de acesso:</b> {{ data.accessLevel }}
              </span>
          <span>
                <b>Status de acesso:</b> {{ data.status }}
              </span>
        </div>
        <div>
          <h6>Dados complementares</h6>
          <span>
                <b>Supervisor imediato:</b> {{ data.management }}
              </span>
          <span>
                <b>Canal:</b> {{ data.channel }}
              </span>
          <span>
                <b>Tipo de comissão:</b> {{ data.type_commission }}
              </span>
        </div>
      </div>
    </div>
    <div class="content" v-if="page === 'user' && (data.isAD === 0 || data.isAD === null) ">
      <h1>Usuário</h1>
      <div class="user" v-if="data.username === '' && user.email === ''">
        <span>Nenhum usuário encontrado!</span>
        <br>
        <br>
        <button @click="newUser(data.id)">Novo usuário</button>
      </div>
      <div class="user"  v-if="data.username === '' && user.email === ''">
        <span>Vincular usuário manualmente</span>
        <br>
        <br>
        <button @click="modal = 'vinc-user'">Vincular usuário</button>
      </div>
      <div class="user" v-if="data.username !== '' || user.email !== ''">
        <span>Dados de acesso</span>
        <br>
        <br>
        <br>
        <div class="info-user">
          <span v-if="user.email === '' && data.email !== '' "><b>E-mail:</b> {{ data.email }}</span>
          <span v-if="user.email !== ''"><b>E-mail:</b> {{ user.email }}</span>
          <span v-if="user.password !== ''">Nova senha: {{ user.password }}</span>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <button @click="newPassword(data.user_id)">Solicitar nova senha</button>
      </div>
    </div>
    <div class="content" v-if="page === 'meta'">
      <h1>Meta</h1>
      <button v-if="data.meta === null && newMeta.state === false" @click="newMeta.status = true">Adicionar meta</button>
      <div class="items-header">
        <div class="item" style="justify-content: center; width: 10%">
          <span>ID</span>
        </div>
        <div class="item" style="width: 30%">
          <span>Mês referência</span>
        </div>
        <div class="item" style="justify-content: center">
          <span>Meta</span>
        </div>
        <div class="item" style="width: 20%">
          <span>Alterado por</span>
        </div>
        <div class="item" style="width: 20%">
          <span>Ações</span>
        </div>
      </div>
      <div class="container-body">
        <div class="items-body" v-for="meta in this.meta" :key="meta.id">
          <div class="item" style="justify-content: center; width: 10%">
            <span>{{ meta.id }}</span>
          </div>
          <div class="item" style="width: 30%">
            <span>{{ meta.mes_competencia }}</span>
          </div>
          <div class="item" style="justify-content: center">
            <span>{{ meta.meta }}</span>
          </div>
          <div class="item" style="width: 20%">
            <span>{{ meta.modified_by }}</span>
          </div>
          <div class="item" style="gap: 5px;width: 20%" v-if="meta.mes_competencia === this.month">
            <i class="fi fi-rr-edit" @click="actualMeta.status = true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal" v-if="newMeta.status === true">
    <div id="card-modal" style="width: 20vw; height: 30vh">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="newMeta.status = false"></i>
      </div>
      <form action="#" id="newMeta" @submit.prevent="addMeta">
        <input type="number" name="meta" id="meta" placeholder="Meta" v-model="newMeta.value">
        <input type="submit" value="Salvar meta">
      </form>
    </div>
  </div>
  <div id="modal" v-if="actualMeta.status === true">
    <div id="card-modal" style="width: 20vw; height: 30vh">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="actualMeta.status = false"></i>
      </div>
      <form action="#" id="newMeta" @submit.prevent="editMeta">
        <input type="number" name="meta" id="meta" placeholder="Meta" v-model="actualMeta.value">
        <input type="submit" value="Salvar meta">
      </form>
    </div>
  </div>
  <VincUser
    v-if="modal === 'vinc-user'"
    @close-modal="modal = ''"
    @close-req="closeReq()"
    :collab="data"
  />
</template>

<script>
import {AXIOS} from "../../../../services/api.ts";
import VincUser from "@/components/ageRv/management/VincUser";

export default {
  name: "EditCollaborator",
  components: {
    VincUser
  },
  emits: ['close-page', 'successReq'],
  props: {
    data: {
      required: true
    }
  },
  data() {
    return {
      res: {},
      page: 'overview',
      user: {
        email: '',
        password: ''
      },
      meta: {},
      month: '',
      newMeta: {
        status: false,
        value: null,
        state: false
      },
      actualMeta: {
        status: false,
        value: this.data.meta,
      },
      modal: '',
      statusReq: false
    }
  },
  methods: {
    getInfo: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/collaborators/'+this.data.id,
      }).then((res) => {
        this.res = res.data
        this.getMeta()
      })
    },
    newUser: function (id) {
      AXIOS({
        method: 'POST',
        url: 'agerv/management/new-user',
        data: {
          id: id
        }
      }).then((res) => {
        this.user.email = res.data.email
        this.user.password = res.data.password
      })
    },
    newPassword: function (id) {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/new-password/'+id
      }).then((res) => {
        this.user.email = res.data.email
        this.user.password = res.data.password
      })

    },
    closePage: function() {
      this.$emit('close-page')
    },
    getMeta: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/meta/'+this.data.id
      }).then((res) => {
        this.meta = res.data
      })
    },
    addMeta: function () {
      AXIOS({
        method: 'POST',
        url: 'agerv/management/meta',
        data: {
          id: this.data.id,
          meta: this.newMeta.value
        }
      }).then(() => {
        this.newMeta.status = false
        this.newMeta.state = true
        this.newMeta.value = 0
        this.getMeta()
      })
    },
    editMeta: function () {
      AXIOS({
        method: 'PUT',
        url: `agerv/management/meta/${this.data.id}`,
        params: {
          meta: this.actualMeta.value
        }
      }).then(() => {
        this.actualMeta.status = false
        this.getMeta()
      })
    },
    getMonth: function () {
      const date = new Date()
      if (date.getMonth() < 10) {
        this.month = (date.getMonth() + 1) + ''
      } else {
        this.month = (date.getMonth() + 1).toString()
      }
    },
    closeReq: function () {
      this.page = 'overview'
      this.modal = ''
      this.statusReq = true
    }
  },
  beforeMount() {
    this.getInfo()
    this.getMonth()
  }
}
</script>

<style scoped lang="scss">

.content-card {
  @include flex(row, flex-start, initial, 10px);
  width: 100%;
  height: 100%;


  .menu {
    width: 10%;
    height: 100%;
    @include flex(column, flex-start, initial, 0);
    padding-top: 5vh;
    background-color: #fff;
    border-right: 2px solid #cccccc90;
    border-radius: 5px 0 0 5px;

    nav {

      ul {
        li {
          @include flex(row, center, center, 5px);
          height: 6vh;
          color: $ml-text-menu;

          i {
            font-size: 2rem;
            @include tr-p;
          }

          div {
            @include tr-p;
            padding: 5px 7px 3px 7px;
            border-radius: 5px;
          }

          &:hover {
            color: $age-or;
          }

        }

        .page-selected {

          div {
            background-color: #EFF0F2;
            i {
              color: $age-or;
            }
          }

        }
      }
    }

  }
  .content {
    width: 91%;
    height: 100%;
    padding: 4vh 1vw;
    overflow-y: auto;

    .card-info {
      width: 100%;
      margin: 2vh 0;
      padding: 1vh 2vw;
      @include flex(column, flex-start, initial, 30px);
      flex-wrap: wrap;


      div {
        @include flex(column, flex-start, initial, 10px);

        h6 {
          font-size: 1.6rem;
          color: $age-bl;
          margin-bottom: 2vh;
        }

        span {
          font-size: 1.2rem;
          color: $ml-text-menu;

          b {
            color: $ml-text-h1;
          }
        }
      }

    }

    .user {
      padding: 5vh 2vw;
      span {
        font-size: 1.6rem;
        font-weight: 500;
        color: $age-bl;
      }

      button {
        padding: 8px 15px;
        border-radius: 3px;
        border: 1px solid $age-bl;
        background-color: $age-bl;
        color: #fff;
        font-weight: 500;
        font-size: 1.4rem;
        @include tr-p;


        &:hover {
          background-color: #fff;
          border-color: $age-bl;
          color: $age-bl;
        }
      }

      .info-user {
        @include flex(column, flex-start, initial, 5px);
        span {
          font-size: 1.2rem;
          color: $ml-text-menu;
          user-select: text;
        }
      }

      input[type=text] {
        @include inp-form-text;
      }

      button {
        width: 30%;
      }
    }

    h1 {
      font-size: 2.2rem;
      text-align: center;
      color: $age-bl;
      font-weight: 500;
    }

    form {
      @include flex(column, flex-start, center, 2vh);
      padding: 3vh 1vw;

      p {
        font-size: 1.4rem;
        color: $age-or;
        font-weight: 400;
        text-align: left;
        width: 80%;
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
          padding: 5px 5px;
          border: 1px solid #cccccc;
          border-radius: 3px;
        }

        select {
          border: 1px solid #cccccc40;
        }

        input[type=number] {
          width: 50%;
          padding: 5px 5px;
          border: 1px solid #cccccc;
          border-radius: 3px;
        }
      }
    }

    button {
      background-color: $age-bl;
      color: #fff;
      border: 1px solid $age-bl;
      @include tr-p;
      padding: 5px 10px;
      border-radius: 3px;
      font-weight: 500;

      &:hover {
        background-color: #fff;
        color: $age-bl;
        border-color: $age-bl;
      }
    }

    .items-header {
      @include table-card-headers;
      text-align: center;
    }

    .container-body {
      @include table-card-body;
      height: 60%;
    }
  }
}


#modal {
  #card-modal {
    width: 50vw;
    height: 95vh;
    background-color: $ml-back-l;


    #close-button {
      padding: 0.5vh 0.5vw;
      height: 20%;
    }

    #newMeta {
      @include flex(column, flex-start, initial, 20px);
      padding: 3vh 5vw;


      input[type=number] {
        border-radius: 5px;
        width: 100%;
        border: none;
        border: 1px solid #cccccc80;
        height: 5vh;
        padding: 5px 10px;
      }

      input[type=submit] {
        background-color: $age-bl;
        color: #fff;
        border: 1px solid $age-bl;
        @include tr-p;
        padding: 5px 10px;
        border-radius: 3px;
        font-weight: 500;

        &:hover {
          background-color: #fff;
          color: $age-bl;
          border-color: $age-bl;
        }
      }
    }
  }

}

</style>