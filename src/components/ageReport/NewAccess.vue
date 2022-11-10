<template>
  <div class="content-newaccess">
    <h1>Novo acesso</h1>

    <div class="content-users animation-down">
      <div class="filters">
        <input type="text" id="search" name="search" placeholder="Buscar e-mail..." autocomplete="off"
               v-model="search">
      </div>
      <div class="list">
        <div class="list-header">
          <div class="item-list-header" style="text-align: left; width: 25%">
            Nome
          </div>
          <div class="item-list-header" style="text-align: left; width: 25%">
            E-mail
          </div>
        </div>
        <div class="items-list-body animation-down" v-if="status === true">
          <div class="list-body" v-for="item in UsersFiltered" :key="item.id">
            <div class="item-list-body" style="text-align: left; width: 25%">
              {{ item.name }}
            </div>
            <div class="item-list-body" style="text-align: left; width: 25%">
              {{ item.email }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {AXIOS} from "../../../services/api.ts";

export default {
  name: "NewAccess",
  data () {
    return {
      data: {},
      search: '',
      status: false
    }
  },
  methods: {
    getUsers: function () {
      AXIOS({
        method: 'GET',
        url: '/admin/access-systems',
        params: {
          system: 'agereport'
        }
      }).then((res) => {
        this.data = res.data
        this.status = true
      })
    }
  },
  computed: {
    UsersFiltered: function () {
      let values = []
      values = this.data.filter((value) => {
        return (
            value.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  },
  mounted() {
    this.getUsers()
  }
}
</script>

<style scoped lang="scss">

.list {
  height: 60%;
  margin-top: 2vh;

  .list-header, .list-body {
    @include flex(row, flex-start, initial, 10px);

    .item-list-header, .item-list-body {
      width: calc((100% / 6) - 20px);
    }
  }

  .list-header {
    border-bottom: 2px solid #cccccc80;
    align-items: center;
    margin-bottom: 2vh;
    padding: 2vh 10px;

    .item-list-header {
      color: $ml-text-menu;
      font-size: 1.6rem;
      font-weight: 400;
    }
  }

  .items-list-body {
    max-height: 5vh;
    overflow-y: auto;
    padding: 2px;

    .list-body {
      background-color: #fff;
      padding: 2vh 20px;
      border-radius: 3px;
      @include sh;
      margin: 2vh 0;

      .item-list-body {
        font-size: 1.2rem;
        color: $ml-text-h1;
        font-weight: 500;
      }
    }
  }

}

.filters {
  padding: 3vh 0;

  input[type=text] {
    width: 25%;
    padding: 10px 8px;
    border-radius: 5px;
    outline: none;
    border: none;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

    &:focus {
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    }
  }
}

</style>