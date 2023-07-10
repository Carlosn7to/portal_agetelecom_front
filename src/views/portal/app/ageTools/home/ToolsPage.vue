<script>
import {defineComponent} from 'vue'
import {mapMutations} from "vuex";

export default defineComponent({
  name: "ToolsPage",
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ])
  },
  created() {
    this.SAVE_SYSTEM({loading:false})
  }
})
</script>

<template>
  <div class="tools-container">
    <h1>
      Ferramentas e utilitários disponíveis
    </h1>

    <div class="tools">
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-search"></i>
          <span>
          Anti-Fraude
        </span>
        </div>
        <div class="description">
          <p>
            Verificar pendências em clientes ou endereço específicos.
          </p>
        </div>
        <router-link to="/ageTools/antifraude" @click="SAVE_SYSTEM({loading: true})">
          Acessar
        </router-link>
      </div>
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-envelope"></i>
          <span>
          Envio de E-mail
        </span>
        </div>
        <div class="description">
          <p>
            Envio de e-mails em massa com excel.
          </p>
        </div>
        <router-link to="/ageTools/envio-email" @click="SAVE_SYSTEM({loading: true})">
          Acessar
        </router-link>
      </div>
      <div class="card">
        <div class="title">
          <i class="fi fi-rr-address-book"></i>
          <span>
          Agenda técnica
        </span>
        </div>
        <div class="description">
          <p>
            Acompanhamento das notas.
          </p>
        </div>
        <router-link to="/ageTools/agenda" @click="SAVE_SYSTEM({loading: true})">
          Acessar
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.tools-container {
  height: 80%;
  @include flex(column, center, center, 4vh);
  animation: up-modal ease-in-out forwards .4s;


  .tools {
    @include flex(row, center, center, 1vw);
    align-items: stretch;


    .card {
      width: calc((100% / 3) - 2vw);
      @include card();
      @include flex(column, space-between, center, 3vh);
      border-top: 6px solid $border;
      animation: up-modal ease-in-out forwards .4s;

      &:hover {
        border-top-color: $primary;
      }

      padding: 3vh 2vw;
      .title {
        @include flex(column, flex-start, center, 1vh);

        i {
          font-size: 3.6rem;
          color: $h1-light;
        }

        span {
          font-size: 2rem;
          font-weight: 600;
          color: $h1-black;
        }
      }

      .description {
        p {
          font-size: 1rem;
          font-weight: 500;
          color: $h1-light;
          text-align: center;
        }
      }

      a {
        @include btn-dashboard(true);
        padding: 1vh 3vw;
        font-size: 1.2rem;
      }


    }

  }

}

</style>