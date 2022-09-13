<template>
  <div id="content-login">
    <h1>Portal</h1>
    <img :src="require('@/assets/img/logo/logo_orange.png')" alt="">
    <form action="#" @submit.prevent="authenticate">
      <input type="text"
             name="username"
             id="username"
             placeholder="E-mail"
             v-model="username"
             required>
      <input type="password"
             name="password"
             id="password"
             placeholder="Senha"
             v-model="password"
             required>
      <input type="submit" value="Entrar" v-if="loading === false">
      <span class="loader" v-if="loading === true"></span>
    </form>
<!--    <span @click="newAccount">Não possui conta? <b>Solicite</b></span>-->
  </div>
  <div class="loading" v-if="loading === true">
  </div>
</template>

<script>
export default {
  name: "LoginMobile",
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    authenticate: function () {
      this.loading = true
      this.$emit('authenticate-mb', {
        payload: {
          username: this.username,
          password: this.password
        }
      })
    },
    newAccount: function () {
      alert('solicitou')
    }
  }
}
</script>

<style scoped lang="scss">

  #content-login {
    width: 100%;
    height: 100%;
    @include flex(column, flex-start, center, 30px);
    padding-top: 15vh;


    h1 {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: 1px;
      color: $ml-text-h1;
    }

    img {
      width: 15vw;
      height: auto;
    }

    form {
      @include flex(column, flex-start, center, 10px);
      width: 80%;
      input {
        border: none;
        width: 100%;
        padding: 15px 10px;
        border-radius: 3px;
        color: $ml-text-h1;
        font-weight: 500;
        font-size: 1.6rem;
      }

      input[type=submit] {
        background-color: $age-or;
        color: #fff;
        margin-top: 20px;
        padding: 10px 10px;
        border-radius: 5px;
      }
    }

    span {
      margin-top: 10px;
      font-size: 1.2rem;
      color: $ml-text-menu;

      b {
        color: $age-bl;
        text-decoration: underline $age-bl !important;
      }
    }
  }

  .loading {
    @include bar;
  }

  .loader {
    @include spin(20px, 20px, 3px, $age-or);
  }

</style>