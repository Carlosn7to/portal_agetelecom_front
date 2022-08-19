<template>
  <div id="container-login"
       :class="{ 'mode-l' : mode === 'light'   || mode === undefined,
                 'mode-d' : mode === 'dark' }">
    <div id="welcome">
      <img :src="require('@/assets/img/logo/age_orange.png')" alt="">
      <h1>Portal Age Telecom</h1>
      <p>
        Acesse os principais sistemas internos, <br> ferramentas, relatórios, dashboards e mais!
      </p>
      <button
        v-if="page === 'discontinued'"
        @click="page = 'discontinued'">
        Cadastre-se
      </button>
      <button
        v-if="page === 'register'"
        @click="page = 'login'">
        Conecte-se
      </button>
    </div>
    <div id="content-login">
      <div
        id="card-login"
        v-if="page === 'login'"
        >
        <h1>
          Bem-vindo(a) ;)
        </h1>
        <p>Acesse com seu usuário Age Telecom</p>
        <form action="#" @submit.prevent :class="{ 'trigger' : error === true }">
          <div id="msg">
            <span class="trigger" v-if="msg !== null">{{ msg }}</span>
          </div>
          <div class="inputs">
            <i class="fi fi-sr-user"></i>
            <input
              type="text"
              name="username"
              id="username"
              autocomplete="off"
              placeholder="Usuário"
              required
              v-model="inputs.username">
          </div>
          <div class="inputs">
            <i class="fi fi-sr-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="off"
              placeholder="Senha"
              required
              v-model="inputs.password">
          </div>
          <button @click="authenticate">
            <span
              v-if="loading === false">
              Entrar
            </span>
            <span class="loader" v-if="loading === true"></span>
          </button>
        </form>
      </div>
      <div
          id="card-login"
          v-if="page === 'register'"
      >
        <h1>
          Cadastre-se
        </h1>
        <p>Utilize seus dados Age telecom</p>
        <form action="#">
          <div class="inputs">
            <i class="fi fi-sr-envelope"></i>
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="off"
              placeholder="E-mail"
              required>
            <span>
              @agetelecom.com.br
            </span>
          </div>
          <div class="inputs">
            <i class="fi fi-sr-user"></i>
            <input
              type="text"
              name="email"
              id="email"
              autocomplete="off"
              placeholder="Nome de usuário"
              required>
          </div>
          <div class="inputs">
            <i class="fi fi-sr-lock"></i>
            <input
              type="password"
              name="password"
              id="password"
              autocomplete="off"
              placeholder="Senha"
              required>
          </div>
          <button>
            <span>
              Cadastrar
            </span>
          </button>
        </form>
      </div>
    </div>
    <div class="loading-bar" v-if="loading === true">
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import {AXIOS} from "../../../../services/api.ts";

export default {
  name: "LoginPage",
  data () {
    return {
      mode: Cookie.get('mode'),
      page: 'login',
      loading: false,
      inputs: {
        username: null,
        password: null,
      },
      functions: {
        authenticate: false
      },
      msg: null,
      error: false
    }
  },
  methods: {
    authenticate: function () {
      if(this.inputs.username !== null && this.inputs.password !== null && this.functions.authenticate === false) {
        this.loading = true
        this.functions.authenticate = true

        AXIOS({
          method: 'POST',
          url: 'auth/login_ad',
          headers: {
            'Content-Type': 'application/json',
            'Access': 'application/json',
          },
          data: {
            email: this.inputs.username,
            password: this.inputs.password
          }
        }).then((res) => {
          this.msg = null
          this.error = false
          this.functions.authenticate = false
          Cookie.set('token', res.data.access_token, {expires: res.data.expires_in} )
          this.$router.replace('/sistemas')
        }).catch((error) => {
          if(error.response.status === 401) {
            this.loading = false
            this.error = true
            this.functions.authenticate = false
            this.msg = 'Usuário ou senha incorretos!'
          }
        })

      }
    }
  }
}
</script>

<style scoped lang="scss">

#container-login {
  @include container(100%, 100%, 0, #fff);
  @include flex(row, flex-start, initial, 0);

  #welcome {
    @include container(30%, 100%, 0 1vw, transparent);
    @include flex(column, flex-start, center, 5px);
    text-align: center;

    img {
      width: 12vw;
      height: auto;
      margin-top: 20vh;
    }

    h1 {
      color: #f1f1f1;
      font-size: 3rem;
    }

    p {
      color: #dadada;
      font-size: 1.6rem;
      font-weight: 300;
      letter-spacing: .8px;
    }

    button {
      @include btn-r-w(#fff, $age-bl-l);
      margin-top: 2vh;
    }
  }

  #content-login {
    @include container(70%, 100%, 0, transparent);
    @include flex(row, center, center, 0);

    #card-login {
      @include container(65%, 90%, 15vh 1vw, transparent);
      @include flex(column, flex-start, center, 10px);

      h1 {
        color: $age-bl-l;
      }

      p {
        color: #c4c4c4;
        font-size: 1.4rem;
      }

      form {
        @include container(100%, initial, 1vh 4vw, transparent);
        @include flex(column, flex-start, center, 10px);

        .inputs {
          @include inp-t-g;
          border: 1px solid #fff;
        }

        button {
          width: 60%;
          margin-top: 3vh;
          @include flex(row, center, center, 5px);

          i {
            font-size: 1.6rem;
          }

          span {
            margin-bottom: 2px;
          }
        }
      }
    }
  }

}

.mode-l {
  #welcome {
    background-color: $ml-back-l !important;

    h1 {
      color: $ml-text-h1 !important;
    }

    p {
      color: $ml-text-light !important;
    }

    button {
      border-color: $age-bl-l !important;
      color: $age-bl-l !important;
    }
  }

  #content-login {
    button {
      @include inp-s-cd;

      .loader {
        @include spin(20px, 20px, 3px, $age-or);
      }
    }
  }
}

.mode-d {
  #welcome {
    background-color: $md-back-l !important;

    h1 {
      color: $md-text-h1 !important;
    }

    p {
      color: $md-text-light !important;
    }

    button {
      background-color: $age-bl-l !important;
    }
  }

  #content-login {
    button {
      @include inp-s-cd-d;

      .loader {
        @include spin(20px, 20px, 3px, $age-or);
      }
    }
  }
}

.loading-bar {
  @include bar;
}

.trigger {
  .inputs {
    i, span {
      color: $red !important;
    }

    input[type=text], input[type=password], input[type=email] {
      color: $red !important;
    }
  }
    #msg {
      background-color: #ffcbcb;
      padding: 10px 40px;
      border-radius: 5px;
      span {
        font-size: 1.4rem;
        color: $red;
        font-weight: 600;
      }
    }
}



</style>