<template>
  <div class="section">
    <h2>Informações gerais</h2>
    <div class="table-list">
      <div class="header">
        <div class="data-item">
            <span>
             Canal
            </span>
        </div>
        <div class="data-item">
             <span>
              Vendas
            </span>
        </div>
        <div class="data-item">
            <span>
              Comissão
            </span>
        </div>
        <div class="data-item">
             <span>
              Comissionados
            </span>
        </div>
        <div class="data-item">
            <span>
              Não comissionados
            </span>
        </div>
      </div>
      <div class="body">
        <div class="row-item"
             v-for="(item, index) in data" :key="index"
             @click="viewSales(item.collaborators, item.name)">
          <div class="data-item">
            {{ item.name }}
          </div>
          <div class="data-item">
            {{ item.infoTotal.salesTotal }}
          </div>
          <div class="data-item">
            R$ {{ item.infoTotal.commissionTotal }}

          </div>
          <div class="data-item">
            {{ item.infoTotal.commissionedTotal }}
          </div>
          <div class="data-item">
            {{ item.infoTotal.noCommissionedTotal }}

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InformationGeneral",
  props: ['data'],
  methods: {
    viewSales: function (data, channel){
      this.$emit('view-sales', {data: data, page: 'view-sales', title: `Painel de comissão do Canal ${channel.toUpperCase()} - `})
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  grid-area: C;
  width: 100%;



.table-list {
  width: 100%;


.header {
  padding-left: 1vw;
  width: 100%;
  @include flex(row, flex-start, center, 0);
  height: 7vh;

.data-item {
  width: calc((100% / 5) - 10px);
  text-align: center;

span {
  color: $h1-black;
  font-size: 1.4rem;
}

}

.data-item:nth-child(1) {
  text-align: left;
}
}

.body {
  @include flex(column, flex-start, initial, 1vh);


.row-item {
  width: 100%;
  @include card();
  @include flex(row, flex-start, center, 0);
  padding: 2vh 0 2vh 1vw;
  cursor: pointer;

.data-item {
  width: calc((100% / 5) - 10px);
  font-size: 1.2rem;
  color: $h1-black;
  text-align: center;
}

.data-item:nth-child(1) {
  text-align: left;
}
}

}

}
}

</style>