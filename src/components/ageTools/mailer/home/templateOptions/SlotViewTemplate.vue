<template>
  <div v-html="html">
  </div>
</template>

<script>
export default {
  name: "SlotViewTemplate",
  props: {
    html: {
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">

div {
  overflow: hidden;
  padding: 2vh 2vw;

}


</style>