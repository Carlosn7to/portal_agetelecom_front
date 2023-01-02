<template>
  <div id="container-1">
    <div id="container-2">
      <div id="container-3">
        <div id="column-1">
          <h1>Texto</h1>
          <div id="container-item-1">
            <div id="item-1"></div>
            <div id="item-2"></div>
            <div id="item-3"></div>
          </div>
        </div>
        <div id="column-2">
          <h1>Texto 2</h1>
          <div id="container-item-2">
            <div id="item-1"></div>
            <div id="item-2"></div>
            <div id="item-3"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "TestComponent"
}
</script>

<style scoped lang="scss">

#container-1 {
  width: 100vw;
  height: 100vh;
  background-color: red;
  @include flex(row, center, center, 0);


  #container-2 {
    width: 90vw;
    height: 90vh;
    background-color: white;
    @include flex(row, center, center, 0);

    #container-3 {
      width: 80vw;
      height: 80vh;
      background-color: greenyellow;
      @include flex(row, center, center, 5vw);
      padding: 0 5vw;


      #column-1 {
        width: 40vw;
        height: 60vh;
        background-color: blue;


      }

      #column-2 {
        width: 40vw;
        height: 60vh;
        background-color: blue;
      }


    }
  }
}

</style>