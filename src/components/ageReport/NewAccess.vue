<template>
  <div class="content-newaccess">
    <h1>Novo acesso</h1>

  </div>
</template>

<script>
import {AXIOS} from "../../../services/api.ts";

export default {
  name: "NewAccess",
  methods: {
    getUsers: function () {
      AXIOS({
        method: 'GET',
        url: ''
      }).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">

</style>