<template>
  <div class="edit-report">
    <h1>Relatório - {{ name }}</h1>
  </div>
</template>

<script>
export default {
  name: "EditReport",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

.edit-report {
  padding: 1vh 1vw;
}

</style>