<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div id="content-table">
        <table>
          <thead>
          <tr>
            <th>
              <div>
                <span>ID</span>
              </div>
            </th>
            <th style="text-align: left">
              <div class="content">
                <span>Nome do cliente</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Data da venda</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Data da aprovação</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Data da vigência</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Data do cancelamento</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Plano</span>
              </div>
            </th>
            <th>
              <div class="content">
                <span>Status</span>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in data" :key="item.id">
            <td>
              <div class="select-id">
                <span>
                  # {{ item.id_contrato }}
                </span>
              </div>
            </td>
            <td style="text-align: left; width: 20%">{{ item.nome_cliente }}</td>
            <td>{{ item.data_contrato }}</td>
            <td>{{ item.data_ativacao }}</td>
            <td>{{ item.data_vigencia }}</td>
            <td>{{ item.data_cancelamento }}</td>

            <td style="width: 20%">{{ item.plano }}</td>
            <td>
              <div class="status">
                <div :class="{ 'success' : item.situacao === 'Normal', 'warning' : item.situacao === 'Cancelada'}">
                </div>
                <span>
                  {{ item.situacao }}
                </span>
              </div>
            </td>
          </tr>

          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtractSales",
  props: {
    data: {
      required: true
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>

<style scoped lang="scss">

#modal {
  #card-modal {
    width: 95vw;
    height: 90vh;
    max-height: 90vh;

    #content-table {
      width: 100%;
      height: 90%;
      max-height: 90%;
      overflow-y: auto;
      padding: 1vh 2vw;
      @include table-pattern;
    }
  }
}

</style>