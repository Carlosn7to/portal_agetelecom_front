<template>
  <div class="container-mail" v-if="page === 'main'">
    <div class="back">
      <button @click="backTemplates">
        Voltar
      </button>
    </div>
    <div class="options">
      <div class="option" @click="page = 'view-template'">
        <i class="fi fi-rr-eye"></i>
        <h2>Visualizar Template</h2>
      </div>
      <div class="option" @click="page = 'unique-email'">
        <i class="fi fi-rr-envelope"></i>
        <h2>E-mail individual</h2>
      </div>
      <div class="option">
        <i class="fi fi-rr-envelopes"></i>
        <h2>E-mail em massa</h2>
      </div>
      <div class="option">
        <i class="fi fi-rr-envelope-open"></i>
        <h2>Histórico de envios</h2>
      </div>
    </div>
  </div>

  <UniqueEmail
    v-if="page === 'unique-email'"
    @back-options="page = 'main'"
    :dataconfig="this.template"
  />

  <ViewTemplate
      v-if="page === 'view-template'"
      @back-options="page = 'main'"
      :dataconfig="this.template"
  />

</template>

<script>

import UniqueEmail from "@/components/ageTools/mailer/home/templateOptions/UniqueEmail";
import ViewTemplate from "@/components/ageTools/mailer/home/templateOptions/ViewTemplate";
import {mapMutations} from "vuex";

export default {
  name: "TemplateOptions",
  emits: ['back-templates'],
  components: {UniqueEmail, ViewTemplate},
  props: ['template'],
  data () {
    return {
      page: 'main'
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    backTemplates: function () {
      this.$emit('back-templates')
    }
  },
  beforeMount() {
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style scoped lang="scss">



.options {
  @include flex(row, center, center, 3vw);
  width: 100%;
  height: 80%;

  .option {
    width: 15vw;
    height: 30vh;
    @include card();
    cursor: pointer;
    @include flex(column, center, center, 3vh);


    i {
      font-size: 3.4rem;
      color: $primary;
    }

    h2 {
      font-size: 1.6rem;
      text-align: center;
    }
  }
}


.mode-dark {

  .options {

    .option {
      background-color: $dark-mode-card;
      border-color: $dark-mode-border;


      &:hover {
        border-color: $primary;
      }
    }
  }
}

</style>