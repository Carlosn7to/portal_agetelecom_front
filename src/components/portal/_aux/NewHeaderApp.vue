<template>
  <div id="container-header" :class="{ 'dark-mode' : system.mode === 'dark' }">
    <div class="header-top">
      <div class="search">
        <i class="fi fi-rr-search"></i>
        <input disabled type="text" name="search" id="search" placeholder="Buscar..." autocomplete="off">
      </div>
      <div class="options">
        <div class="icons-system">
<!--          <div class="box-icon">-->
<!--            <i class="fi fi-rr-headset"></i>-->
<!--          </div>-->
          <div class="box-icon" v-if="system.mode === 'light'" @click="SAVE_SYSTEM({mode: 'dark'})">
            <i class="fi fi-rs-moon"></i>
          </div>
          <div class="box-icon" v-if="system.mode === 'dark'" @click="SAVE_SYSTEM({mode: 'light'})">
            <i class="fi fi-rr-brightness"></i>
          </div>
<!--          <div class="box-icon">-->
<!--            <i class="fi fi-rr-cowbell"></i>-->
<!--          </div>-->
        </div>
        <div class="image-user">
          <img :src="require('@/assets/img/users/padrao.png')" alt="user">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "NewHeaderApp",
  data () {
    return {
      mode: Cookie.get('mode'),
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    modeView: function () {
      switch (Cookie.get('mode')) {
        case 'dark':
          Cookie.set('mode', 'light', { expires: 7 })
          this.$emit('mode', 'light')
          this.mode = 'light'
              break
        case 'light':
          Cookie.set('mode', 'dark', { expires: 7 })
          this.$emit('mode', 'dark')
          this.mode = 'dark'
          break
        case undefined:
          Cookie.set('mode', 'dark', { expires: 7 })
          this.$emit('mode', 'dark')
          this.mode = 'dark'
          break
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'system'])
  }
}
</script>

<style scoped lang="scss">

#container-header {
  padding: 1vh 2vw;
  .header-top {
    background-color: #ffffff;
    @include sh-pattern;
    border-radius: 5px;
    padding: 1vh 1.5vw;
    @include flex(row, space-between, center, 0);

    .search {
      @include flex(row, flex-start, center, 1vw);
      width: 50%;

      i {
        font-size: 1.8rem;
        color: $text-strong;
        padding-top: 3px;
      }

      input[type=text] {
        border: none;
        outline: none;
        width: 90%;
        padding: 1vh 0;
        background-color: transparent;
        font-size: 1.4rem;
        color: $text-strong;
        font-weight: 500;
      }
    }

    .options {
      @include flex(row, flex-start, center, .5vw);

      .image-user {
        img {
          width: 3vw;
          height: auto;
          border-radius: 50%;
          border: 1px solid #e7e5e5;
        }
      }

      .icons-system {
        @include flex(row, flex-start, center, 0);

        .box-icon {
          border-radius: 3px;
          padding: 7px 10px 4px 10px;
          @include tr-p;

          i {
            font-size: 1.8rem;
            color: $icon-color;

            &:hover {
              color: $icon-color-hover;
            }
          }

          &:hover {
            background-color: $icon-box-hover;
          }
        }
      }
    }

  }


}

.dark-mode {
  background-color: $dark-mode-background;

  .header-top {
    background-color: $dark-mode-card !important;

    .search {

      input {
        background-color: $dark-mode-card;
      }


    }
  }

  /*   PLACEHOLDER   */
  ::-webkit-input-placeholder {
    color: $dark-mode-text-primary;
    font-weight: 500;
    font-size: 1.4rem;
  }

}


@media (min-width: 360px) and (max-width: 700px) {
  #container-header {
    padding: 1vh 5vw;

    .header-top {
      padding: 1vh 4vw;
      .search {
        width: 70%;
        input {
          width: 100%;
          background-color: transparent;
        }
      }

      .options {
        .image-user {
          img {
            width: 8vw;
          }
        }
      }
    }
  }
}

</style>