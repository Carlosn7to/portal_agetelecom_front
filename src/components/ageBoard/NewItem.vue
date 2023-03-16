<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <h1>Adicionar novo item</h1>

      <form action="" @submit.prevent="newItem">
        <div class="inputs">
          <label for="name">Nome do item: <b>*</b></label>
          <input type="text" name="name" id="name" autocomplete="off" required v-model="inputs.name">
        </div>
        <div class="inputs">
          <label for="iframe">Iframe: <b>*</b></label>
          <input type="text" name="iframe" id="iframe" autocomplete="off" required v-model="inputs.iframe">
        </div>
        <input type="submit" value="Cadastrar">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewItem",
  props: {
    data: {
      required: true
    }
  },
  data () {
    return {
      inputs: {
        name: '',
        iframe: '',
        idDash: this.data.id
      }
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    newItem: function () {
      alert('click')
    }
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 30vw;
    height: 50vh;

    #close-button {
      height: 15%;
    }

    h1 {
      font-size: 2rem;
      color: $h1-light;
      text-align: center;
    }

    form {
      @include flex(column, flex-start, center, 3vh);
      padding: 4vh 5vw;
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
        @include btn-dashboard();
        background-color: $primary;
        color: #fff;
      }
    }
  }
}

</style>