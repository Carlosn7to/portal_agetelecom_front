<template>
  <div id="modal">
    <div id="card-modal">
      <div class="content-card">
        <div class="menu">
          <nav>
            <ul>
              <li :class="{ 'page-selected' : page === 'overview'}" @click="page = 'overview'">
                <div>
                  <i class="fi fi-rr-id-badge"></i>
                </div>
              </li>
              <li :class="{ 'page-selected' : page === 'user'}" @click="page = 'user'">
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
        <div class="content" v-if="page === 'user'">
          <h1>Usuário</h1>
          <div class="user" v-if="data.username === '' && user.email === ''">
            <span>Nenhum usuário encontrado!</span>
            <br>
            <br>
            <button @click="newUser(data.id)">Novo usuário</button>
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
          <div class="card-info">

          </div>
          <form action="#">
            <div class="inputs">
              <label for="meta">Nome cadastrado no ERP</label>
              <input type="text" name="" id="" :value="data.collaborator" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Função cadastrada no ERP</label>
              <input type="text" name="" id="" :value="data.function" disabled>
            </div>
            <div class="inputs"  v-if="data.function !== 'Supervisor'" >
              <label for="meta">Supervisor vinculado no ERP</label>
              <input type="text" name="sup-erp" id="sup-erp" :value="data.sup" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Usuário vinculado</label>
              <input type="text" name="user_vinc" id="user_vinc"
                     :value="data.username" v-if="data.username !== ''" disabled>
              <select name="channel" id="channel" v-else>
                <option>--- Nenhum usuário vinculado ---</option>
                <option  v-for="user in res.usersAvaliable"
                         :key="user.id"
                         :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div class="inputs">
              <label for="channel">Canal</label>
              <select name="channel" id="channel" >
                <option  v-for="channel in res.channelsAvaliable"
                         :key="channel.id"
                         :value="channel.id"
                         :selected="data.channel === channel.canal">
                  {{ channel.canal }}
                </option>
              </select>
            </div>
            <div class="inputs">
              <label for="type">Tipo de comissão</label>
              <select name="type" id="type" >
                <option  v-for="channel in res.channelsAvaliable"
                         :key="channel.id"
                         :value="channel.id"
                         :selected="data.typeCommission === channel.canal">
                  {{ channel.canal }}
                </option>
              </select>
            </div>
            <div class="inputs">
              <label for="supImmediate">Supervisor imediato</label>
              <select name="supImmediate" id="supImmediate" >
                <option>--- Nenhum supervisor vinculado ---</option>
                <option  v-for="sup in res.supervisorsAvaliable"
                         :key="sup.id"
                         :value="sup.id" :selected="data.management === sup.name">
                  {{ sup.name }}
                </option>
              </select>
            </div>
            <input type="submit" value="Enviar informações">
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../../services/api.ts";

export default {
  name: "EditCollaborator",
  props: {
    data: {
      required: true
    }
  },
  data() {
    return {
      res: {},
      page: 'user',
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    getInfo: function (id) {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/collaborators/'+id,
      }).then((res) => {
        this.res = res.data
      }).catch((error) => {
        console.log(error)
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
      }).catch((error) => {
        console.log(error)
      })
    },
    newPassword: function (id) {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/new-password/'+id
      }).then((res) => {
        this.user.email = res.data.email
        this.user.password = res.data.password
      }).catch((error) => {
        console.log(error)
      })

    },
    closePage: function() {
      this.$emit('close-page')
    }
  },
  beforeMount() {
    this.getInfo()
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 50vw;
    height: 95vh;
    background-color: $ml-back-l;

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
      }
    }
  }

}

</style>