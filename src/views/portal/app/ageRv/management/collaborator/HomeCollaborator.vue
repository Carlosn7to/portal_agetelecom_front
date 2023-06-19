<script>
import {defineComponent} from 'vue'
import {mapMutations} from "vuex";

export default defineComponent({
  name: "HomeCollaborator",
  data() {
    return {
      title: "Gerenciar - Colaboradores",
      search: '',
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ])
  },
  beforeMount() {
    this.SAVE_SYSTEM({loading: false})
  }
})
</script>

<template>
  <div class="container-users">
    <div class="container-title">
      <h1>{{title}}</h1>
    </div>
    <div class="container-body">
      <div class="search">
        <input type="text" name="search" id="search" v-model="search" autocomplete="off" placeholder="Buscar colaborador...">
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

.container-users {
  @include flex(column, flex-start, initial, 2vh);
  height: 100%;


  .container-title {
    height: 8%;
    h1 {
      font-size: 2.4rem;
    }
  }

  .container-body {
    height: 90%;

    .search {
      width: 100%;
      height: 10%;
      margin-bottom: 2vh;
      input {
        min-width: 30%;
        max-width: 50%;
        height: 100%;
        @include card();
      }
    }

  }
}

</style>