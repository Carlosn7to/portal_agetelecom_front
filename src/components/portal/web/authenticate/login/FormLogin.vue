<template>
  <div class="form" @submit.prevent="submit">
    <form action="#">
      <div class="label-input">
        <label for="username">Usuário:</label>
        <div class="input">
          <i class="fi fi-sr-user"></i>
          <input type="text"
                 v-model="payload.username"
                 id="username"
                 placeholder="jose.maria"
                 autocomplete="off">
          <i class="fi fi-rr-question-square"></i>
        </div>
      </div>
      <div class="label-input">
        <label for="password">Senha:</label>
        <div class="input">
          <i class="fi fi-sr-lock"></i>
          <input :type="payload.password.type"
                 id="password"
                 v-model="payload.password.value"
                 placeholder="********"
                 autocomplete="off">
          <i class="fi fi-sr-eye-crossed" v-if="! payload.password.show" @click="showPassword()"></i>
          <i class="fi fi-sr-eye" v-else @click="showPassword()"></i>
        </div>
      </div>

      <div class="submit">
        <button type="submit">Entrar</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  name: "FormLogin",
  data () {
    return {
      payload: {
        username: '',
        password: {
          show: false,
          type: 'password',
          value: ''
        }
      }
    }
  },
  methods: {
    showPassword() {
      this.payload.password.show = !this.payload.password.show
      this.payload.password.type = this.payload.password.show ? 'text' : 'password'
    },
    submit() {
      console.log(this.payload)
    }
  }
}
</script>

<style scoped lang="scss">

.form {
  @include form();
}

</style>