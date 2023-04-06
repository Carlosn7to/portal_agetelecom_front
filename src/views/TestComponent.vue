<template>
  <div>
    aa
  </div>
</template>

<script>


export default {
  name: "TestComponent",
  components: {},
  data() {
    return {
      classButton: 'start',
      page: ''
    }
  },
  methods: {
    lostButton: function () {
      switch (this.classButton) {
        case 'start':
          this.classButton = 'middle'
          break
        case 'middle':
          this.classButton = 'end'
              break
        case 'end':
          this.classButton = 'end2'
              break
        case 'end2':
          this.classButton = 'start'
              break
      }

    }

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

.container {
  width: 100vw;
  height: 100vh;
  @include flex(column, center, center, 4vh);

  .buttons {
    @include flex(row, flex-start, center, 2vw);

    .middle {
      position: absolute;
      top: 50%;
      right: 10%;
    }

    .end {
      position: absolute;
      top: 20%;
      left: 10%;
    }

    .end2 {
      position: absolute;
      top: 90%;
      right: 10%;
    }

    button {
      all: unset;

      @include btn-dashboard(true);
    }
  }



}

</style>