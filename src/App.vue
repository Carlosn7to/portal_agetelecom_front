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

/*   PLACEHOLDER   */
::-webkit-input-placeholder {
  color: #33333360;
  font-weight: 600;
  font-size: 1.4rem;
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
      }
    }
  }
}

</style>
