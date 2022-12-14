<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Novo Dashboard</h1>
      <form action="" @submit.prevent="newDashboard()" id="newdashboard">
        <div class="inputs">
          <label for="dashboard">Nome do Dashboard <b>*</b></label>
          <input type="text" name="dashboard" id="dashboard" required v-model="dashboard" autocomplete="off">
        </div>
        <input type="submit" value="Salvar">
      </form>
    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "NewDashboard",
  emits: ['close-page'],
  data () {
    return {
      dashboard: ''
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    newDashboard: function () {
      AXIOS({
        method: 'POST',
        url: 'ageboard/dashboard',
        data: {
          dashboard: this.dashboard
        },
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        alert(res.data.msg)

        if(res.status === 201) {
          this.dashboard = ''
          this.closePage()
        }
      })
    }
  },


}
</script>

<style scoped lang="scss">

#modal {

  #card-modal {
    padding-bottom: 10vh;
    @include flex(column, flex-start, initial, 0);

    h1 {
      font-size: 2rem;
      color: $age-bl;
      text-align: center;
      margin: 2vh 0 5vh 0;
    }

    form {
      @include flex(column, flex-start, center, 3vh);
      width: 35vw;
      padding: 0 5vw;
      .inputs {
        width: 100%;
        @include flex(column, flex-start, initial, .5vh);

        label {
          font-size: 1.4rem;
          color: $ml-text-menu;
          font-weight: 500;

          b {
            color: $red;
          }
        }

        input {
          @include inp-form-text;
        }
      }

      input[type=submit] {
        width: 100%;
        @include button-pattern;
      }
    }
  }

}

</style>