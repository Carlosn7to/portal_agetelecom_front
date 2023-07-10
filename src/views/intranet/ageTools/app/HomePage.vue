<template>
  <h1>
    Ferramentas e utilitários
  </h1>

  <div class="cards">
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
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "HomePage",
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ])
  },
  beforeMount() {
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style scoped lang="scss">

h1 {
  font-size: 3rem;
}

.cards {
  @include flex(row, flex-start, center, 1.5vw);
  flex-wrap: wrap;
  margin: 4vh 0;
  width: 100%;


  .card {
    width: calc((100% / 5) - 2vw);
    @include card();
    @include flex(column, space-between, center, 3vh);
    border-top: 6px solid $border;
    min-height: 45vh;

    &:hover {
      border-top-color: $primary;
    }

    padding: 3vh 2vw;
    .title {
      @include flex(column, flex-start, center, 1vh);

      i {
        font-size: 4.6rem;
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


.mode-dark {
  .cards {
    .card {
      background-color: $dark-mode-card;
      border-color: $dark-mode-border;


      &:hover {
        border-color: $primary;
      }

      .title {
        i {
          color: $text-light;
        }

        span {
          color: $text-light;
        }
      }

      .description {

        p {
          color: $text-light;
        }
      }


    }
  }
}

</style>