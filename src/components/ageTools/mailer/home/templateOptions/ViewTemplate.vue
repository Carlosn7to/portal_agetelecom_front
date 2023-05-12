<template>
  <div class="back">
    <button @click="backOptions">
      Voltar
    </button>
  </div>
  <div class="template-container">


    <SlotViewTemplate :html="dataconfig.template.template"></SlotViewTemplate>

  </div>
</template>

<script>

import SlotViewTemplate from "@/components/ageTools/mailer/home/templateOptions/SlotViewTemplate";

export default {
  name: "ViewTemplate",
  components: {SlotViewTemplate},

  emits: ['back-options'],
  props: ['dataconfig'],
  methods: {
    backOptions: function () {
      this.$emit('back-options')
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped lang="scss">

.template-container {
  @include card();
  max-width: 90%;

}

</style>