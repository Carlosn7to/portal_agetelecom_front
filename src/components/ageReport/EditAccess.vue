<template>
  <button @click="closePage">Voltar</button>
  <div class="content-card">
    <h1>Editar acesso - {{ data.name }}</h1>
    <div class="filters">
      <input type="text" id="searchReport" name="searchReport" placeholder="Buscar relatório..." autocomplete="off"
             v-model="searchReport">
      <button @click="alternateUserAccess()">{{ dataUser.access ? 'Inativar acesso' : 'Ativar acesso' }}</button>
    </div>
    <div id="reports" class="animation-down" v-if="status === true">
      <div class="report" v-for="item in ReportsFiltered" :key="item.id" @click="alternateReportAccess(dataUser.id,item.id)">
        <div>
          <i class="fi fi-rr-document-signed"></i>
          <span>{{ item.report }}</span>
        </div>
        <span>{{ item.access ? 'Ativo' : 'Inativo' }}</span>
      </div>
    </div>
  </div>
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
      searchReport: '',
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
    getReports: function () {
      this.loading = true
      this.status = false

      this.dataReport = {}
      AXIOS({
        method: 'GET',
        url: `admin/reports-permitteds/${this.data.id}`,
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.dataReport = res.data
        this.loading = false
        this.status = true
      })
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
    alternateReportAccess: function (idUser, idReport) {
      this.loading = true

      AXIOS({
        method: 'PUT',
        url: `admin/reports-permitteds/alternate/${idUser}/${idReport}`,
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.loading = false
        alert(res.data.msg)
        this.getReports()
      })
    }
  },
  computed: {
    ReportsFiltered: function () {
      let values = []
      values = this.dataReport.filter((value) => {
        return (
            value.report.toLowerCase().indexOf(this.searchReport.toLowerCase()) > -1
        )
      })
      return values
    }
  },
  mounted() {
    this.getReports()
  }
}
</script>

<style scoped lang="scss">


button {
  @include btn-dashboard();
  background-color: $primary;
  color: #ffffff;
}

.content-card {
  width: 100%;
  height: 90%;
  padding: 1vh 0vw;
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
    @include flex(row, flex-start, center, 0);
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
      @include btn-dashboard();
      margin-left: 1vw;
      padding: 9px 15px !important;
      background-color: $primary;
      color: #ffffff;
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

</style>