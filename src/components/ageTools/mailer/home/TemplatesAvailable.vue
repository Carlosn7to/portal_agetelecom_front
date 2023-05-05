<template>
  <div class="container-mail">
    <h1>Templates disponíveis - <b>{{ mailer.name }}</b></h1>
    <div class="back">
      <button @click="backMailers">Voltar</button>

    </div>
    <div class="mailers">
      <div class="section">
        <div class="table-list">
          <div class="header">
            <div class="data-item">
            <span>
             Template
            </span>
            </div>
            <div class="data-item">
              <span>
               Lotes enviados
              </span>
            </div>
            <div class="data-item">
              <span>
               E-mails enviados
              </span>
            </div>
          </div>
          <div class="body">
            <div class="row-item"
                 v-for="item in data" :key="item.id"
                 @click="optionsTemplate({id: item.id, name: item.name, template: item.template})">
              <div class="data-item">
                {{ item.name }}
              </div>
              <div class="data-item">
                {{ item.info.batch }}
              </div>
              <div class="data-item">
                {{ item.info.emails }}
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {AXIOS} from "../../../../../services/api.ts";
import Cookie from 'js-cookie';

export default {
  name: "TemplatesAvailable",
  props: ['mailer'],
  data () {
    return {
      data: {}
    }
  },
  methods: {
    backMailers: function () {
      this.$emit('back-mailer')
    },
    optionsTemplate: function (data) {
      this.$emit('options-template', data)
    },
    getTemplates: function () {
      AXIOS({
        method: 'GET',
        url: 'agetools/tools/templates',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          mailerId: this.mailer.id
        }
      }).then((res) => {
        this.data = res.data
      })
    }
  },
  beforeMount() {
    this.getTemplates()
  }
}
</script>

<style scoped lang="scss">

h1 {
  b {
    font-weight: 500;
    color: $primary;
  }
}

.back {
  button {
    @include btn-dashboard(true);
  }
}


</style>