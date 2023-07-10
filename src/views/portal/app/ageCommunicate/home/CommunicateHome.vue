<script>
import {defineComponent} from 'vue'
import {mapMutations} from "vuex";

export default defineComponent({
  name: "CommunicateHome",
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ])
  },
  mounted() {
    this.SAVE_SYSTEM({loading: false})
  }
})
</script>

<template>
  <div>
    Communicate
  </div>
</template>

<style scoped lang="scss">

</style>