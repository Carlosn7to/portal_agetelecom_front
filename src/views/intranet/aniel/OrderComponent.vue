<script>
import {AXIOS} from "../../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "OrderComponent",
  methods: {
    download () {
      AXIOS({
        method: 'GET',
        url: `aniel/order`,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
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
  </div>
</template>

<style scoped lang="scss">

</style>