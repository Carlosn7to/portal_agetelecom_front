<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div id="container-card">
        <h1>Vincular usuário</h1>

        <div class="items-header">
          <div class="item" style="justify-content: flex-start">
            <span>Usuário</span>
          </div>
          <div class="item" style="justify-content: flex-start">
            <span>E-mail</span>
          </div>
        </div>
        <div class="container-body" v-if="status === true">
          <div class="items-body" v-for="item in data || []"  :key="item.id" @click="modal = 'confirm-vinc', email = item.email, id = item.id">
            <div class="item" style="justify-content: flex-start">
              <span>{{ item.name }}</span>
            </div>
            <div class="item" style="justify-content: flex-start; padding: 0">
              <span>{{ item.email }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ConfirmVincUser
      :collaborator="this.collab"
      :email="email"
      :id="id"
      v-if="modal === 'confirm-vinc'"
      @close-modal="modal = ''"
      @success-req="modal = '', successReq()"
  />
</template>

<script>

import {AXIOS} from "../../../../services/api.ts";
import Cookie from "js-cookie";
import ConfirmVincUser from "@/components/ageRv/management/ConfirmVincUser";

export default {
  name: "VincUser",
  components: {
    ConfirmVincUser
  },
  emits: ['close-modal', 'success-req'],
  props: {
    collab: {
      required: true
    }
  },
  data () {
    return {
      search: '',
      data: {},
      status: false,
      email: '',
      modal: '',
      id: 0
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-modal')
    },
    successReq: function () {
      this.$emit('close-req')
    },
    getUsersNotVinc: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/users-not-link',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          name: this.collab.collaborator
        }
      }).then((res) => {
        this.data = res.data
        this.status = true
      })
    }
  },
  beforeMount() {
    this.getUsersNotVinc()
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 80vw;
    height: 85vh;
    background-color: $back-main;

    #container-card {
      padding: 2vh 3vw;
      @include flex(column, flex-start, initial, 4vh);
      max-height: 90%;
      height: 90%;


      h1 {
        color: $age-bl;
        font-size: 2rem;
      }

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

        .item {
          height: 5vh;
        }
      }

      .container-body {
        @include table-card-body;

        .items-body {

          min-height: 15%;

          @include tr-p;
        }
      }
    }
  }
}

</style>