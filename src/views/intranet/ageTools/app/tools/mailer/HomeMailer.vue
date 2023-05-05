<template>
  <MailersAvailable
    v-if="page === 'mailers'"
    @view-template="viewTemplate"
  />
  <TemplatesAvailable
    v-if="page === 'templates'"
    :mailer="mailer"
    @back-mailer="page = 'mailers'"
    @options-template="optionsTemplate"
  />
  <TemplateOptions
    v-if="page === 'template-options'"
    :template="template"
    @back-templates="page = 'templates'"
  />
</template>

<script>

import {mapMutations} from "vuex";
import MailersAvailable from "@/components/ageTools/mailer/home/MailersAvailable";
import TemplatesAvailable from "@/components/ageTools/mailer/home/TemplatesAvailable";
import TemplateOptions from "@/components/ageTools/mailer/home/TemplateOptions";

export default {
  name: "HomeMailer",
  components: {MailersAvailable, TemplatesAvailable, TemplateOptions},
  data () {
    return {
      page: 'mailers',
      mailer: {},
      template: {}
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    viewTemplate: function (data) {
      this.mailer = data
      this.page = 'templates'
    },
    optionsTemplate: function (data) {
      this.template = data
      this.page = 'template-options'
    }
  }, beforeMount() {
    this.SAVE_SYSTEM({loading: false})
  }
}
</script>

<style lang="scss">


.container-mail {
  width: 100%;
  height: 100%;

  @include flex(column, flex-start, initial, 2vh);

  h1 {
    font-size: 2rem;
  }

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

}

</style>