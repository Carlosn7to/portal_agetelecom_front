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
                 @click="optionsTemplate({template: item, mailer: this.mailer})">
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
import {mapMutations} from "vuex";

export default {
  name: "TemplatesAvailable",
  props: ['mailer'],
  emits: ['back-maier', 'options-template'],
  data () {
    return {
      data: {}
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    backMailers: function () {
      this.$emit('back-mailer')
    },
    optionsTemplate: function (data) {
      this.SAVE_SYSTEM({loading: true})
      this.$emit('options-template', data)
    },
    getTemplates: function () {
      this.SAVE_SYSTEM({loading: true})

      AXIOS({
        method: 'GET',
        url: 'agetools/tools/mailer/templates',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          mailerId: this.mailer.id
        }
      }).then((res) => {
        this.data = res.data
        this.SAVE_SYSTEM({loading: false})
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