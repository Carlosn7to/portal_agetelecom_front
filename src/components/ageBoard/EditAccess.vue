<template>
  <div id="modal">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="closePage"></i>
      </div>
      <div class="content-card">
        <h1>Editar acesso - {{ data.name }}</h1>
        <div class="filters">
          <input type="text" id="searchBoard" name="searchBoard" placeholder="Buscar relatório..." autocomplete="off"
                 v-model="searchBoard">
          <button @click="alternateUserAccess()">{{ dataUser.access ? 'Inativar acesso' : 'Ativar acesso' }}</button>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-bar" v-if="loading === true"></div>
</template>

<script>
import {AXIOS} from "../../../services/api.ts";
import Cookie from "js-cookie";

export default {
  name: "EditAccess",
  props: {
    data: {
      required: true
    }
  },
  data () {
    return {
      searchBoard: '',
      dataReport: {},
      status: false,
      dataUser: this.data,
      loading: true
    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    },
    alternateUserAccess: function () {
      this.loading = true

      AXIOS({
        method: 'PUT',
        url: `admin/access-systems/alternate/${this.data.id}`,
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        },
        params: {
          system: 'agereport'
        }
      }).then((res) => {
        this.dataUser.access = res.data.access
        this.loading = false
        alert(res.data.msg)
      })
    },
  },
  computed: {
    ReportsFiltered: function () {
      let values = []
      values = this.dataReport.filter((value) => {
        return (
            value.report.toLowerCase().indexOf(this.searchBoard.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

#card-modal {
  width: 80vw;
  height: 90vh;
  background-color: $back-main !important;

  .content-card {
    width: 100%;
    height: 90%;
    padding: 2vh 4vw;
    @include flex(column, flex-start, initial, 2vh);

    h1 {
      font-size: 2rem;
      color: $age-bl;
    }

    button {
      @include button-pattern;
      width: 20%;
      padding: 5px 8px !important;

    }

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
        max-height: 70%;
        overflow-y: auto;
        padding: 2px;

        .list-body {
          background-color: #fff;
          padding: 2vh 20px;
          border-radius: 3px;
          @include sh-h;
          margin: 2vh 0;
          @include tr-p;

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
        width: 45%;
        padding: 8px 8px;
        border-radius: 5px;
        outline: none;
        border: none;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

        &:focus {
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
      }

      button {
        @include button-pattern;
        margin-left: 1vw;
      }
    }



    #reports {
      @include container(100%, initial, 4vh 0vw, transparent);
      @include flex(row, flex-start, initial, 20px);
      flex-wrap: wrap;
      overflow-y: auto;
      max-height: 60vh;
      padding: 2vh 2px;


      .report {
        @include container(initial, initial, 1vh 1vw, #fff);
        width: calc((100% / 2) - 20px);
        min-height: 5vh;
        border-radius: 5px;
        @include sh-h;
        @include tr-p;
        @include flex(row, space-between, center, 5px);
        word-break: break-all;
        border: 2px solid #fff;



        div {
          @include flex(row, flex-start, center, 5px);

          i {
            font-size: 2.4rem;
            color: $age-or;
          }

          span {
            font-size: 1.4rem;
            text-align: center;
            font-weight: 600;
            color: $age-bl;
          }

        }

        span {
          font-size: 1.2rem;
          text-align: center;
          font-weight: 600;
          color: $age-bl;
        }
      }

    }
  }

}

.loading-bar {
  @include bar;
}

</style>