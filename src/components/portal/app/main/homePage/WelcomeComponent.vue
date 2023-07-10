<script>
import {defineComponent} from 'vue'
import {mapMutations} from "vuex";

export default defineComponent({
  name: "WelcomeComponent",
  components: {},
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ])
  },
  created() {
    this.SAVE_SYSTEM({loading: false})
  }
})
</script>

<template>
  <div class="welcome">
    <div class="text">
      <h2>
        Seja bem-vindo(a),
      </h2>
      <h1>Carlos Neto!</h1>
    </div>
    <div class="img">
      <img :src="require('@/assets/img/logo/age_orange.png')" alt="logo">
    </div>
  </div>

</template>

<style scoped lang="scss">

.welcome {
  text-align: center;
  width: 100%;
  height: 100%;
  @include flex(column, center, center, 15vh);

  .text {
    h2 {
      font-size: 1.8rem;
    }

    h1 {
      font-size: 4rem;
    }

  }

  .img {
    width: 100%;
    opacity: 0;
    min-height: 30vh;
    animation: appears-img ease forwards .4s .5s;
    img {
      width: 12vw;
      height: auto;
    }
  }


  @keyframes appears-img {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

}


</style>