<template>
  <div id="modal-loading">
    <div class="loading">
      <div class="loading-log">
        <div class="loadingio-spinner-rolling-i7it2319hb">
          <div class="ldio-et2shv9jupa">
            <div>

            </div>
          </div>
        </div>
      </div>
      <img :src="require('@/assets/img/logo/age_orange_grey.png')" alt="age">
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "LoadingSpinner",
  computed: {
    ...mapGetters([
        'system'
    ])
  }
}
</script>

<style scoped lang="scss">

#modal-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: $back-main;
  z-index: 1;


  .loading {
    @include flex(column, space-between, center, 2vh);
    height: 100%;
    animation: up 0.4s forwards ease-in-out;


    .loading-log {
      @include flex(column, flex-end, center, 0vh);
      height: 50%;

      @keyframes ldio-et2shv9jupa {
        0% { transform: translate(-50%,-50%) rotate(0deg); }
        100% { transform: translate(-50%,-50%) rotate(360deg); }
      }
      .ldio-et2shv9jupa div {
        position: absolute;
        width: 50px;
        height: 50px;
        border: 3px solid $primary;
        border-top-color: transparent;
        border-radius: 50%;
      }
      .ldio-et2shv9jupa div {
        animation: ldio-et2shv9jupa 1s linear infinite;
        top: 50px;
        left: 50px
      }
      .loadingio-spinner-rolling-i7it2319hb {
        width: 100px;
        height: 100px;
        display: inline-block;
        overflow: hidden;
      }
      .ldio-et2shv9jupa {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(1);
        backface-visibility: hidden;
        transform-origin: 0 0;
      }
      .ldio-et2shv9jupa div { box-sizing: content-box; }
    }

    img {
      width: 15vw;
      height: auto;
      margin-bottom: 10vh;
    }
  }

  @keyframes up {
    0% {
      opacity: 0;
      transform: translateY(00px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

}

.mode-dark {
  #modal-loading {
    background-color: $dark-mode-background !important;
    .loading {
      @include flex(column, space-between, center, 2vh);
      height: 100%;
      animation: up 0.4s forwards ease-in-out;


      .loading-log {
        @include flex(column, flex-end, center, 0vh);
        height: 50%;

        @keyframes ldio-et2shv9jupa {
          0% { transform: translate(-50%,-50%) rotate(0deg); }
          100% { transform: translate(-50%,-50%) rotate(360deg); }
        }
        .ldio-et2shv9jupa div {
          position: absolute;
          width: 50px;
          height: 50px;
          border: 3px solid #ffffff80;
          border-top-color: transparent;
          border-radius: 50%;
        }
        .ldio-et2shv9jupa div {
          animation: ldio-et2shv9jupa 1s linear infinite;
          top: 50px;
          left: 50px
        }
        .loadingio-spinner-rolling-i7it2319hb {
          width: 100px;
          height: 100px;
          display: inline-block;
          overflow: hidden;
        }
        .ldio-et2shv9jupa {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          transform-origin: 0 0;
        }
        .ldio-et2shv9jupa div { box-sizing: content-box; }
      }

      img {
        width: 15vw;
        height: auto;
        margin-bottom: 10vh;
      }
    }

    }
}


</style>