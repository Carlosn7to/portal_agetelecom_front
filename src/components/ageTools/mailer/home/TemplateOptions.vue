<template>
  <div class="container-mail">
    <div class="back">
      <button @click="backTemplates">
        Voltar
      </button>
    </div>
    <div class="options">
      <div class="option">
        <i class="fi fi-rr-eye"></i>
        <h2>Visualizar Template</h2>
      </div>
      <div class="option">
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
</template>

<script>
export default {
  name: "TemplateOptions",
  props: ['template'],
  methods: {
    backTemplates: function () {
      this.$emit('back-templates')
    }
  }
}
</script>

<style scoped lang="scss">


.back {
  button{
    @include btn-dashboard(true);
  }
}
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
      color: $h1-light;
    }

    h2 {
      font-size: 1.6rem;
      text-align: center;
    }
  }
}

</style>