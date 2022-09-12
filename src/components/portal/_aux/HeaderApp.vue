<template>
  <div id="header-top"
       :class="{'mode-l' : mode === 'light' || mode === undefined,
                'mode-d' : mode === 'dark'}">
    <div id="profile">
      <span>Olá, {{ user.firstName }}</span>
    </div>
    <div id="darkmode" @click="modeView">
      <i class="fi fi-rr-sun" v-if="mode === 'light' || mode === undefined"></i>
      <div>

      </div>
      <i class="fi fi-rr-moon-stars" v-if="mode === 'dark'"></i>
    </div>

  </div>
</template>

<script>
import Cookie from "js-cookie";
import {mapGetters} from "vuex";

export default {
  name: "HeaderApp",
  data () {
    return {
      mode: Cookie.get('mode'),
    }
  },
  methods: {
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
    ...mapGetters(['user'])
  }
}
</script>

<style scoped lang="scss">

#header-top {
  width: 100%;
  height: 8%;
  padding: 0 2vw;
  @include flex(row, flex-end, center, 10px);

  #profile {
    @include flex(row, center, center, 10px);
    img {
      width: 2vw;
      height: auto;
      border-radius: 50%;
    }

    span {
      font-size: 1.4rem;
      font-weight: 500;
    }
  }

  #darkmode {
    width: 4vw;
    height: 4vh;
    padding: 4px;
    border-radius: 20px;
    @include flex(row, space-between, center, 0px);
    @include tr-p;

    div {
      border-radius: 50%;
      width: 1.3vw;
      height: 100%;
    }

    i {
      padding: 2px 0 0px 2px;
      font-size: 1.2rem;
    }
  }
}

.mode-l {
  @include tr;
  @include flex(row, center, center, 5px);

  #profile {
    span {
      color: $ml-text-menu;
    }
  }

  #darkmode {
    background-color: $age-or;
    div {
      background-color: #fff;

    }

    i {
      color: #fff;
    }
  }

}

.mode-d {
  background-color: #161819;

  @include tr;

  #profile {
    span {
      color: $md-text-menu;
    }
  }

  #darkmode {
    @include tr-p;
    background-color: $md-back-l !important;

    div {
      background-color: #fff !important;
    }

    i {
      color: #fff !important;
      padding: 2px 4px 0 0 !important;
    }

  }
}
</style>