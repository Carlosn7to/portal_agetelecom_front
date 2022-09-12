<template>
  <div>
    <p>
      Hoje é o dia útil <b>{{ projection.dateActual }}</b>, falta(m) <b>{{ projection.daysMissing }}</b> dia(s) para acabar seu mês e caso mantenha esse desempenho, terminará o mês com:
    </p>
    <p>{{ projection }}</p>
  </div>
</template>

<script>
export default {
  name: "ProjectionMobile",
  props: {
    projection:{required: true},

  }
}
</script>

<style scoped lang="scss">

</style>