<template>
  <div class="container-mail">
    <h1>Mailers disponíveis</h1>
    <div class="mailers">
      <div class="section">
        <div class="table-list">
          <div class="header">
            <div class="data-item">
            <span>
             E-mail
            </span>
            </div>
            <div class="data-item">
              <span>
               Limite diário
              </span>
            </div>
            <div class="data-item">
              <span>
               Limite atingido
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
            <div class="data-item">
              <span>
               Templates disponíveis
              </span>
            </div>
          </div>
          <div class="body">
            <div class="row-item"
                 v-for="item in data"
                 :key="item.id"
                 @click="viewTemplate({name: item.mailer, id: item.id})">
              <div class="data-item">
                {{ item.mailer }}
              </div>
              <div class="data-item">
                {{ item.limit_daily }}
              </div>
              <div class="data-item">
                {{ item.limit_reached }}
              </div>
              <div class="data-item">
                {{ item.info.batch }}
              </div>
              <div class="data-item">
                {{ item.info.emails }}
              </div>
              <div class="data-item">
                {{ item.templates }}
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
  name: "MailersAvailable",
  data () {
    return {
      data: {}
    }
  },
  methods: {
    viewTemplate: function (data) {
      this.$emit('view-template', data)
    },
    getMailers: function () {
      AXIOS({
        method: 'GET',
        url: 'agetools/tools/mailers',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        }
      }).then((res) => {
        this.data = res.data
      })
    }
  },
  beforeMount() {
    this.getMailers()
  }
}
</script>

<style scoped lang="scss">



</style>