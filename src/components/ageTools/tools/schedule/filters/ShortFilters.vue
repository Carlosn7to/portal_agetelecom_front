<template>
  <div id="filters">
    <div class="top">
      <div class="title">
        <h2>Filtrar tipo de solicitação</h2>


        <div class="filter-items">
          <input type="text" name="filter-item" id="filter-item" v-model="search" autocomplete="off" placeholder="Filtrar tipo de solicitação...">
        </div>
      </div>

      <div class="items">
        <div class="item" v-for="filter in FiltersFiltered" :key="filter.id" >
          <div class="checkbox">
            <label class="container-checkbox">
              <input type="checkbox" :name="`filter${filter.id}`" :id="filter.id" v-model="checkboxId" :value="filter.id">
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="title-item">

          <span @click="pushCheckboxId(filter.id)">
            {{ filter.title }}
          </span>

          </div>
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
      search: '',
    }
  },
  methods: {
    filterData() {
      this.$emit('filterData', this.checkboxId)
    },
    pushCheckboxId(id) {
      if(this.checkboxId.includes(id)) {
        this.checkboxId = this.checkboxId.filter(item => item !== id)
      } else {
        this.checkboxId.push(id)
      }
    }
  },
  computed: {
    FiltersFiltered: function () {
      let values = []

      if(this.dataFilters.length > 0) {
        values = this.dataFilters.filter((value) => {
          return (
              value.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          )
        })
      }

      return values
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
  @include flex(column, space-between, initial, 2vh);

  .top {
    max-height: 60%;

    h2 {
      font-size: 1.4rem;
      text-align: center;
      font-weight: 500;
      color: $h1-black;
    }

    .filter-items {
      input {
        width: 100%;
        @include card();
        padding: 5px 7px;
        margin: 2vh 0;
      }
    }

    .items {
      @include flex(column, flex-start, initial, 2vh);
      overflow-y: auto;
      max-height: 80%;
      min-height: 80%;

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

    .filter-items {
      input {
        background-color: $dark-mode-card;
        color: $h1-white;
      }
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