<template>
  <router-view/>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

*,
::before,
::after{
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
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
}

h1 {
  font-size: 3.6rem;
}

#modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(3,3,3, .3);
  position: absolute;
  top: 0;
  @include flex(row, center, center, 0px);

  #card-modal {
    background-color: #fff;
    border-radius: 5px;
    @include sh;
    animation: appears .2s forwards;

    #close-button {
      @include flex(row, flex-end, center, 0);
      @include container(100%, 6%, 1vh 1vw, transparent);

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
  font-weight: 600;
  font-size: 1.4rem;
}

/*   SCROLL BAR   */
::-webkit-scrollbar-track {
  background-color: #F4F4F4;
}
::-webkit-scrollbar {
  width: 6px;
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

      #content-page {
        width: 100%;
        height: 92%;
        padding: 1vh 3vw;
        max-height: 92%;
        overflow-y: auto;

        h1 {
          font-size: 2.4rem;
          font-weight: 500;
          color: $ml-text-menu;
        }

        h2 {
          font-size: 2rem;
          font-weight: 500;
          color: $ml-text-menu;
        }
      }
    }
  }
}

</style>
