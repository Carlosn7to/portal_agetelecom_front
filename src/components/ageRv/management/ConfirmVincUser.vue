<template>
  <div id="modal">
    <div id="card-modal">
      <h1>Vincular colaborador</h1>

      <div id="info">
        <h3>Dados do vínculo</h3>
        <div id="content">
          <span><b>Colaborador:</b> {{ collaborator.collaborator }}</span>
        </div>
        <div id="content">
          <span><b>Usuário:</b> {{ email }}</span>
        </div>
      </div>

      <div id="buttons">
        <button @click="closeModal">Cancelar</button>
        <button id="vinc" @click="linkUser">Vincular</button>
      </div>
    </div>
  </div>
</template>

<script>
import {AXIOS} from "../../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "ConfirmVincUser",
  props: {
    collaborator: {
      required: true
    },
    email: {
      required: true
    },
    id: {
      required: true
    }
  },
  methods: {
    closeModal: function () {
      this.$emit('close-modal')
    },
    successReq: function () {
      this.$emit('success-req')
    },
    linkUser: function () {
      AXIOS({
        method: 'PUT',
        url: 'agerv/management/user-link',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        data: {
          idUser: this.id,
          idCollab: this.collaborator.id
        }
      }).then((res) => {
        alert(res.data)
        this.successReq()
      })
    }
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 40vw;
    padding: 4vh 2vw;


    h1 {
      text-align: center;
      color: $age-bl;
      font-size: 3rem;
    }

    #info {
      padding: 4vh 2vw;

      h3 {
        color: $age-bl;
        font-size: 1.4rem;
        margin-bottom: 2vh;
      }

      @include flex(column, flex-start, initial, 1vh);

      span {
        font-size: 1.2rem;
      }

    }

    #buttons {
      padding: 4vh 2vw;
      @include flex(row, space-between, center, 0);

      button {
        width: 49%;
        padding: 5px 0;
        @include tr-p;
        @include button-pattern;
        background-color: #cccccc90;
        border-color: #cccccc90;
        color: #fff;

        &:hover {
          background-color: #cccccc;
          border-color: #cccccc;
          color: #333;
        }

      }

      #vinc {
        @include button-pattern;

      }

    }
  }
}

</style>