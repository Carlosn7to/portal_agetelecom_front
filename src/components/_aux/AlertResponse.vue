<template>
  <div class="alert" :class="{'alert-on' : alert === true, 'alert-off' : alert === false,
                              'success' : response.class === 'success',
                               'failed' : response.class === 'failed'} ">
    <div class="icon">
      <i class="fi fi-ss-cloud-check" v-if="response.class === 'success'"></i>
      <i class="fi fi-sr-bug" v-if="response.class === 'failed'"></i>
    </div>
    <p v-if="typeof response.msg !== 'object'">
      {{ response.msg }}
    </p>
    <div class="list-errors" v-else >
      <p v-for="(msg, index) in response.msg" :key="index">
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertResponse",
  props: {
    response: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      alert: true
    }
  },
  computed: {

  },
  methods: {
    destroyAlert: function () {
      setTimeout(() => {
        this.alert = false
      }, 3000)

      setTimeout(() => {
        this.$emit('close');
      }, 5000)
    }
  },
  mounted() {
    this.destroyAlert()
  }
}
</script>

<style scoped lang="scss">

.alert {
  position: absolute;
  bottom: 2vh;
  right: 1vw;
  background-color: #ddd;
  border-radius: 5px;
  @include sh;
  border: 2px solid #cccccc30;
  padding: 2vh 1vw;
  max-width: 40vw;
  @include flex(row, flex-start, center, 2vw);

  .icon {
    background-color: #cccccc90;
    padding: 6px 10px 4px 10px;
    border-radius: 3px;

    i {
      font-size: 1.8rem;
      color: #fff;
    }
  }

  p {
    font-size: 1.4rem ;
    color: #fff;

  }

  .list-errors {
    @include flex(column, flex-start, initial, 0);
  }
}

.success {
  background-color: $green;
}

.failed {
  background-color: $red;
}


.alert-on {
  animation: in forwards ease-in-out .4s;
}

.alert-off {
  animation: out forwards ease-in-out .4s;
}

@keyframes in {
  from {
    transform: translateX(400px);
    opacity: .2;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(600px);
    opacity: 0;
  }
}

</style>