<template>
  <div id="header-top"
       :class="{'mode-l' : mode === 'light' || mode === undefined,
                'mode-d' : mode === 'dark'}">
    <div id="profile">
      <span>Carlos</span>
      <img :src="require('@/assets/img/users/user.jpg')" alt="carlos">
    </div>
    <button @click="modeView()">mode</button>
  </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
  name: "HeaderApp",
  data () {
    return {
      mode: Cookie.get('mode')
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
}

.mode-l {
  background-color: #fff;
  border-bottom: 2px solid #cccccc90;
  @include tr;

  #profile {
    span {
      color: $ml-text-menu;
    }
  }
}

.mode-d {
  background-color: $age-bl-l;
  border-bottom: 2px solid rgba(70, 70, 70, 0.17);

  @include tr;

  #profile {
    span {
      color: $md-text-menu;
    }
  }
}
</style>