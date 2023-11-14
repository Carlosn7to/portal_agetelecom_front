<script>
import {AXIOS} from "../../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "OrderComponent",
  data() {
    return {
      protocols: ''
    }
  },
  methods: {
    download () {

      const protocols = this.protocols.split('\n');


      AXIOS({
        method: 'GET',
        url: `aniel/order`,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          'protocols': protocols
        },
        responseType: 'blob',
      }).then((res) => {
        let blob = new Blob([res.data],
            { type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'import_order.xlsx'
        link.click()

      })
    }
  }
}
</script>

<template>
  <div>
    <button @click="download">
      Baixar excel
    </button>
    <br>
    <br>

    <textarea v-model="protocols">

    </textarea>
  </div>
</template>

<style scoped lang="scss">

button {
  @include btn-dashboard(true);
}

textarea {
  width: 50vw;
  outline: none;
  height: 50vh;
  @include card();
}

</style>