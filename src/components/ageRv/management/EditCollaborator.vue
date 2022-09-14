<template>
  <div id="modal">
    <div id="card-modal">
      <div class="content-card">
        <div class="menu">

        </div>
        <div class="content">
          <h1>Edição de usuário</h1>
          <form action="#">
            <div class="inputs">
              <label for="meta">Nome cadastrado no ERP</label>
              <input type="text" name="" id="" value="Angela Soares Resende" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Função cadastrada no ERP</label>
              <input type="text" name="" id="" value="Vendedor" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Supervisor vinculado no ERP</label>
              <input type="text" name="sup-erp" id="sup-erp" value="Debora Rodrigues Acosta" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Usuário vinculado</label>
              <input type="text" name="user_vinc" id="user_vinc" value="Angela" disabled>
            </div>
            <div class="inputs">
              <label for="meta">Canal</label>
              <select name="supervisors" id="supervisors">
                <option value="1">MCV</option>
                <option value="2">PAP</option>
                <option value="2">LIDER</option>
              </select>
            </div>
            <div class="inputs">
              <label for="meta">Tipo de comissão</label>
              <select name="supervisors" id="supervisors">
                <option value="1">MCV</option>
                <option value="2">PAP</option>
                <option value="2">LIDER</option>
              </select>
            </div>
            <div class="inputs">
              <label for="meta">Supervisor imediato</label>
              <select name="supervisors" id="supervisors">
                <option value="1">Debora Rodrigues Acosta</option>
                <option value="2">Alisson Correia</option>
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
import Cookie from "js-cookie";

export default {
  name: "EditCollaborator",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    getInfo: function () {
      AXIOS({
        method: 'GET',
        url: 'agerv/management/collaborators/'+6,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 70vw;
    height: 80vh;
    background-color: $ml-back-l;

    .content-card {
      @include flex(row, flex-start, initial, 10px);
      width: 100%;
      height: 100%;


      .menu {
        width: 20%;
        height: 100%;
        background-color: #fff;
      }
      .content {
        width: 80%;
        height: 100%;
        padding: 2vh 1vw;

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