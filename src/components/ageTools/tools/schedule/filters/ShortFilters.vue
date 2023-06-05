<template>
  <div id="filters">
    <div class="title">
      <h2>Filtrar tipo de solicitação</h2>
    </div>

    <div class="items">
      <div class="item" v-for="filter in dataFilters" :key="filter.id">
        <div class="checkbox">
          <label class="container-checkbox">
            <input type="checkbox" :name="`filter${filter.id}`" :id="filter.id" v-model="checkboxId" :value="filter.id">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="title-item">

          <span>
            {{ filter.title }}
          </span>

        </div>
      </div>
    </div>
    <button @click="filterData">Filtrar</button>

  </div>
</template>

<script>
export default {
  name: "ShortFilters",
  props: ['dataFilters'],
  emits: ['filterData'],
  data () {
    return {
      checkboxId: [],
    }
  },
  methods: {
    filterData() {
      this.$emit('filterData', this.checkboxId)
    }
  },
  beforeMount() {
  }
}
</script>

<style scoped lang="scss">

#filters {
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 2vh 1vw;
  @include flex(column, flex-start, initial, 2vh);

  h2 {
    font-size: 1.4rem;
    text-align: center;
    font-weight: 500;
    color: $h1-black;
  }


  .items {
    @include flex(column, flex-start, initial, 2vh);
    overflow-y: auto;
    max-height: 75%;

    .item {
      width: 100%;
      height: 5vh;

      @include flex(row, flex-start, center, 0);


      .title-item {
        height: 100%;
        @include flex(row, flex-start, center, 0);
        span {
          font-size: 1.2rem;
          font-weight: 500;
          color: $h1-black;
        }
      }
    }
  }

  button {
    @include btn-dashboard(false);

    &:hover {
      @include btn-dashboard(true);
    }
  }
}

.mode-dark {
  #filters {
    background-color: $dark-mode-card;
    h2 {
      color: $h1-white;
    }

    .items {

      .item {

        .title-item {
          span {
            color: $dark-mode-text-secondary;
          }
        }


      }


    }

    button {
      @include btn-dashboard(true);
    }
  }
}

</style>