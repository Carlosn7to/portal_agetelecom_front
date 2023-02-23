<template>
  <button @click="closePage">Voltar</button>
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



button {
  @include btn-pattern($primary, #fff, $primary, $primary);
  margin-bottom: 2vh;
}

#content-table {
  width: 100%;
  height: 90%;
  max-height: 90%;
  overflow-y: auto;
  @include table-pattern(true);
  animation: up ease-in-out forwards .4s;


}

.mode-dark {

  button {
    @include btn-pattern($primary, $white, $primary-hover, $white-grey);
    margin-bottom: 2vh;
  }

  #content-table {
    @include table-pattern(false);
  }
}

</style>