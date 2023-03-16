<template>
  <div class="card-alert"
      :class="system.alert.type">
    <div class="icon-box">
      <i class="fi fi-rr-shield-exclamation" v-if="system.alert.type === 'warning'"></i>
      <i class="fi fi-rr-cloud-check" v-if="system.alert.type === 'success'"></i>
      <i class="fi fi-rr-triangle-warning" v-if="system.alert.type === 'attenttion'"></i>
    </div>
    <p>
      {{ system.alert.msg }}
    </p>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "CardAlert",
  computed: {
    ...mapGetters([
        'system'
    ])
  },
  methods: {
    ...mapMutations([
        'SAVE_ALERT'
    ])
  },
  mounted() {
    setTimeout(() => {
      this.SAVE_ALERT({display: false})
    }, 4000)
  }
}
</script>

<style scoped lang="scss">

.card-alert {
  @include flex(row, flex-start, center, 2vw);
  padding: 2vh 2vw;
  position: absolute;
  bottom: 5vh;
  right: 1vw;
  border-radius: 5px;
  max-width: 60vw;
  max-height: 80vh;
  overflow-y: auto;
  animation: right-left forwards ease-in-out .6s;

  .icon-box {
    padding: 7px 10px 4px 10px;
    border-radius: 5px;


    i {
      font-size: 2rem;
    }
  }

  p {
    max-height: 80vh;
    font-size: 1.4rem;
    font-weight: 600;
  }
}

.warning {
  background-color: $alert-warning;

  .icon-box {
    background-color: $alert-warning-hover;
  }

  i {
    color: $alert-text-warning;
  }

  p {
    color: $alert-text-warning;

  }
}

.success {
  background-color: $alert-success;

  .icon-box {
    background-color: $alert-success-hover;
  }

  i {
    color: $alert-text-success;
  }

  p {
    color: $alert-text-success;

  }
}

.attenttion {
  background-color: $alert-attention;

  .icon-box {
    background-color: $alert-attention-hover;
  }

  i {
    color: $alert-text-attention;
  }

  p {
    color: $alert-text-attention;

  }
}

@keyframes right-left {
  0% {
    transform: translateX(20vw);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1
  }
}

</style>