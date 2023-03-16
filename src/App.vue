<template>
  <div id="content-app">
    <NewMenuApp
      v-if="system.login === true"
    />
    <div id="layer-app">
      <NewHeaderApp
          v-if="system.login === true"
      />
      <div id="content-page"
           :class="{'mode-light' : system.mode === 'light'  || system.mode === undefined,
            'mode-dark' : system.mode === 'dark'}">
        <LoadingSpinner
            v-if="system.loading === true"
        />
        <router-view/>
      </div>
    </div>
  </div>
  <CardAlert v-if="system.alert.display === true"/>
</template>

<script>

import LoadingSpinner from "@/components/portal/_aux/LoadingSpinner";
import {mapGetters, mapMutations} from "vuex";
import NewMenuApp from "@/components/portal/_aux/NewMenuApp";
import NewHeaderApp from "@/components/portal/_aux/NewHeaderApp";
import CardAlert from "@/components/portal/_aux/alerts/CardAlert";

export default {
  components: {LoadingSpinner, NewMenuApp, NewHeaderApp, CardAlert},
  computed: {
    ...mapGetters([
        'system'
    ])
  },
  methods: {
    ...mapMutations([
        'SAVE_SYSTEM'
    ])
  },
  mounted() {
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*,
::before,
::after{
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-decoration: none !important;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
  list-style: none;
  box-sizing: border-box;
  letter-spacing: 0.4px;
}

html {
  font-size: 62.5%;
  overflow: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  text-decoration: none solid rgb(245, 244, 243);
  text-indent: 0px;
  color: $h1-black;
  letter-spacing: normal;
  word-spacing: 0px;
  vertical-align: baseline;
}

h1 {
  font-size: 3.6rem;
}

h2 {
  font-size: 1.4rem;
}

.mode-dark {

  h1,h2,h3, h4, h5, h6 {
    color: $h1-white;
  }

}

#modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(3,3,3, .3);
  position: absolute;
  top: 0;
  left: 0;
  @include flex(row, center, center, 0px);

  #card-modal {
    background-color: #fff;
    border-radius: 5px;
    @include sh;
    animation: appears .2s forwards;

    #close-button {
      @include flex(row, flex-end, center, 0);
      @include container(100%, initial, 1vh 1vw, transparent);

      i {
        font-size: 2.4rem;
        @include tr-p;
        &:hover {
          color: $red;
        }
      }
    }
  }
}

@keyframes appears {
  from {
    transform: scale(.6);
  }
  to {
    transform: scale(1);
  }
}

/*   PLACEHOLDER   */
::-webkit-input-placeholder {
  color: #33333360;
  font-weight: 500;
  font-size: 1.4rem;
}



/*   SCROLL BAR   */
::-webkit-scrollbar-track {
  background-color: #F4F4F4;
}
::-webkit-scrollbar {
  width: 4px;
  background: #F4F4F4;
}
::-webkit-scrollbar-thumb {
  background: #dad7d7;
}


#app {
  @include container(100vw, 100vh, 0, $back-main);

  #content-app {
    @include container(100%, 100%, 0, transparent);
    @include flex(row, flex-start, initial, 0);

    #layer-app {
      @include container(100%, 100%, 0, transparent);
      @include flex(column, flex-start, initial, 0);
      position: relative;

      #content-page {
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
        padding: 2vh 2vw;
      }
    }
  }
}

.mode-dark {
  background-color: $dark-mode-background;

  ::-webkit-input-placeholder {
    color: $text-light;
    font-weight: 500;
    font-size: 1.4rem;
  }
}


@keyframes up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes left {
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

@media (min-width: 300px) {
  html {
    font-size: 45%;
  }
}

@media (min-width: 600px) {
  html {
    font-size: 50%;
  }
}

@media (min-width: 600px) {
  html {
    font-size: 60%;
  }
}

@media (min-width: 1000px) {
  html {
    font-size: 65%;
  }
}

@media (min-width: 1500px) {
  html {
    font-size: 70%;
  }
}



@media (min-width: 1800px) {
  html {
    font-size: 80%;
  }
}


</style>
