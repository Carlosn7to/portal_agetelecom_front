<template>
  <div class="back">
    <button @click="backOptions">
      Voltar
    </button>
  </div>
  <div class="form-container">
    <div class="form">
      <h1>Carta de cobrança - Débito e ONU</h1>

      <form action="#" @submit.prevent="sendEmail">
        <div class="input" v-for="(input, index) in form" :key="index">
          <label :for="input.name">{{ input.title }}: <b v-if="input.required">*</b></label>
          <input :type="input.type" v-model="input.data" :required="input.required" :name="input.name" autocomplete="off">
        </div>
        <div class="input">
          <label for="email">E-mail: <b>*</b></label>
          <input type="email" name="email" id="email" v-model="email" required autocomplete="off">
        </div>
        <div class="send">
          <button>Enviar e-mail</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../../../../services/api.ts";
import Cookie from 'js-cookie';

export default {
  name: "UniqueEmail",
  emits: ['back-options'],
  props: ['dataconfig'],
  data () {
    return {
      form: {},
      email: ''
    }
  },
  methods: {
    backOptions: function () {
      this.$emit('back-options')
    },
    sendEmail: function () {

      const dataSending = {
        mailerId: this.dataconfig.mailer.id,
        templateId: this.dataconfig.template.id,
        email: this.email,
        form: this.form
      };


      AXIOS({
        method: 'post',
        url: 'agetools/tools/mailer/email/sending',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        data: {data: JSON.stringify(dataSending)}
      }).then((res) => {
        console.log(res)
      })

    },
    convertForm: function () {
      this.form = JSON.parse(this.dataconfig.template.form)


    }
  },
  beforeMount() {
    this.convertForm()
  }
}
</script>

<style scoped lang="scss">

.back {
  position: absolute;
  top: 13%;
}

.form-container {
  width: 100%;
  height: 100%;
  @include flex(row, center, center, 0);

  .form {
    width: 40vw;
    height: 80vh;
    @include card();
    overflow-y: auto;
    max-height: 80vh;

    h1 {
      font-size: 2rem;
      text-align: center;
    }

    form {
      @include flex(column, flex-start, center, 2vh);
      margin: 4vh 0;
      padding: 1vh 5vw;

      .input {
        width: 100%;
        @include flex(column, flex-start, initial, .5vh);

        label {
          font-size: 1.4rem;

          b {
            color: $red;
          }
        }

        input[type=text], input[type=email], input[type=number], input[type=date] {
          @include inp-t-g;
          width: 100%;
          border: 1px solid #ffffff;
        }
      }

      button {
        @include btn-dashboard(true);
      }
    }

  }
}

.mode-dark {

  .form-container {

    .form {
      @include card(false);

      form {

        .input {

          label {
            color: $text-light;

            b {
              color: $primary;
            }
          }

          input {
            background-color: $dark-mode-background;
            color: $text-light;
            border-color: $dark-mode-background;

            &:hover, &:focus {
              border-color: $primary;
              background-color: $dark-mode-background;
            }
          }
        }
      }
    }
  }
}

</style>