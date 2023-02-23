<template>
    <WelcomeSystems
    />
</template>

<script>

import Cookie from "js-cookie";
import {mapActions, mapGetters, mapMutations} from "vuex";
import WelcomeSystems from "@/components/portal/WelcomeSystems";

export default {
  name: "SystemApp",
  components: {
    WelcomeSystems
  },
  data() {
    return {
      mode: Cookie.get('mode'),
      loading: false,
      routes: {
        agerv: '/ageRv/home'
      }
    }
  },
  methods: {
    ...mapActions([
      'verifyDevice'
    ]),
    ...mapMutations([
      'SAVE_MENU',
        'SAVE_SYSTEM'
    ]),
    modeView: function (mode) {
      this.mode = mode
    }
  },
  created() {
    this.verifyDevice()
  },
  mounted() {
    this.SAVE_MENU({system: 'portal', selected: 'home'})
    this.SAVE_SYSTEM({loading: false})
  },
  computed: {
    ...mapGetters([
      'isMobile',
        'system'
    ]),
  }
}
</script>

<style scoped lang="scss">

h1 {
  font-size: 2rem;
  font-weight: 500;
  color: $age-bl;
}

h2 {
  font-size: 2rem;
  font-weight: 500;
  color: $age-bl;
}

#content-page {
  @include flex(column, flex-start, initial, 5vh);


  .systems-on {
    width: 100%;

    .systems {
      padding: 1vh 0;
      width: 100%;
      height: 100%;
      @include flex(row, flex-start, initial, 10px);

      a {
        @include container(calc(100% / 4), initial, 1vh 2vw, #fff);
        @include flex(column, center, initial, 5px);
        border-radius: 5px;
        @include sh-h;
        @include tr;
        border: 1px solid #fff;

        .img-title {
          width: 100%;
          @include flex(row, flex-start, center, 10px);

          i {
            font-size: 3rem;
            color: $age-or;
          }

          span {
            font-size: 2rem;
            color: $age-bl;
            font-weight: 500;
            padding-bottom: 6px;
          }
        }

        p {
          text-align: justify-all;
          font-size: 1.2rem;
          font-weight: 400;
          color: $ml-text-menu;
          margin: 1.5vh 0;
          width: 100%;
        }

        a {
          font-weight: 600;
          color: #fff;
          background-color: $age-bl;
          padding: 5px 12px;
          border-radius: 5px;
          border: 1px solid #fff;
          @include tr-p;
          @include flex(row, center, center, 5px);

          span {
            padding-bottom: 3px;
            font-size: 1.4rem;
          }

          i {
            font-size: 1.6rem;
          }

          &:hover {
            color: $age-or;
            background-color: #fff;
            border: 1px solid $age-or;
          }

        }


      }
    }
  }
}

.mode-l-p {
  background-color: $ml-back-l;
}

.mode-dark {
  background-color: $dark-mode-background;

  h1 {
    color: $md-text-light !important;
  }

  .systems-on {
    .systems {
      a {
        background-color: $dark-mode-card !important;
        border: 1px solid $dark-mode-card !important;

        &:hover {
          border: 1px solid $age-or !important;
        }

        .img-title {
          span {
            color: $md-text-light !important;
          }
        }

        p {
          color: $md-text-op !important;
        }

        a {
          background-color: $age-or !important;
          border: 1px solid $age-or !important;
          color: $md-button !important;

          &:hover {
            background-color: $md-back-l !important;
            border-color: $age-or !important;
            color: #fff !important;
          }
        }
      }
    }
  }
}

.loading-bar {
  @include bar;
}

</style>