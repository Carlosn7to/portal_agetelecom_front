<script>
import {defineComponent} from 'vue'
import WelcomeComponent from "@/components/portal/app/main/homePage/WelcomeComponent.vue";
import {AXIOS} from "../../../../../../services/api.ts";
import Cookie from "js-cookie";
import {mapMutations} from "vuex";

export default defineComponent({
  name: "HomePagee",
  components: {WelcomeComponent},
  data () {
    return {
      countTime: 0,
      modules: {}
    }
  },
  methods: {
    ...mapMutations([
       'SAVE_SYSTEM'
    ]),
    iterationTime() {
      const limit = 4; // Defina aqui o limite desejado
      let counter = 0;

      const interation = () => {
        this.countTime++;

        counter++;
        if (counter === limit) {
          clearInterval(interval);
        }
      };

      const interval = setInterval(interation, 500);
    },
    getModules: function () {
      AXIOS({
        method: 'GET',
        url: 'portal/aux/modules/access',
        headers: {
          'Authorization': 'Bearer'+Cookie.get('token')
        }
      }).then((res) => {
        this.modules = res.data
      })
    },
    tradePage: function (route) {
      this.SAVE_SYSTEM({loading: true})
      this.$router.replace(route)
    }
  },
  created() {
    this.getModules()
    this.iterationTime();
    this.SAVE_SYSTEM({loading: false, routeNow: '/sistemas'})
  }
})
</script>

<template>
  <template v-if="countTime < 4">
    <div class="welcome-container" :class="{'up-hide' : countTime === 3}">
      <WelcomeComponent/>
    </div>
  </template>
  <template v-if="countTime === 4">
    <div class="modules-container">
      <h1>Módulos disponíveis</h1>

      <div class="cards">
        <div class="card" v-for="(module, index) in modules" :key="index"
             @click="tradePage(module.rota); SAVE_SYSTEM({routeNow: module.rota, routeLast: '/sistemas'})">
          <div class="title">
            <i :class="module.icone"></i>
            <span>
          {{ module.modulo }}
        </span>
          </div>
          <div class="description">
            <p>
              {{  module.descricao  }}
            </p>
          </div>
          <router-link :to="module.rota" @click="SAVE_SYSTEM({loading: true})">
            Acessar
          </router-link>
        </div>
      </div>
    </div>
  </template>

</template>

<style scoped lang="scss">


#container-header {
  display: none;
}

#content-page {
  padding: 0 !important;
}

.welcome-container {
  width: 95vw;
  height: 80vh;
  @include flex(column, center, center, 0);
  animation: up-modal ease-out forwards .4s;
  overflow: hidden;

}

.modules-container {
  @include flex(column, center, center, 3vh);
  height: 100%;
  animation: up-modal ease-in-out forwards .4s;
  padding: 0 10vw;


  .modules {
    width: 100%;
    @include flex(row, center, center, 1vw);

    .module-container {
      width: calc((100% / 4) - 2.4vw);
      height: 25vh;
      border-radius:  5px;
      overflow: hidden;
      @include flex(column, space-between, center, 0);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
      transition: width ease-in-out .2s;
      .section-icon {
        height: 70%;
        width: 100%;
        @include flex(column, center, center, 0);

        i {
          font-size: 2.6rem;
        }
      }

      .section-name {
        width: 100%;
        @include flex(column, center, initial, .5vh);
        padding: 1.5vh 1.5vw;

        .title {
          h3 {
            font-size: 1.4rem;
            font-weight: 500;
            color: $title-black;
          }
        }

        .desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            font-size: 1rem;
            color: $subtitle-black;

          }
        }
      }


      &:hover {
        cursor: pointer;
        width: calc((100% / 4) - 1vw);
      }

    }



  }
}

.cards {
  @include flex(row, space-evenly, center, 1.5vw);
  flex-wrap: wrap;
  margin: 4vh 0;
  width: 100%;
  align-items: stretch;


  .card {
    width: calc((100% / 4) - 2vw);
    @include card();
    @include flex(column, space-between, center, 3vh);
    border-top: 6px solid $border;

    &:hover {
      border-top-color: $primary;
    }

    padding: 3vh 2vw;
    .title {
      @include flex(column, flex-start, center, 1vh);

      i {
        font-size: 4.6rem;
        color: $h1-light;
      }

      span {
        font-size: 2rem;
        font-weight: 600;
        color: $h1-black;
      }
    }

    .description {
      p {
        font-size: 1rem;
        font-weight: 500;
        color: $h1-light;
        text-align: center;
      }
    }

    a {
      @include btn-dashboard(true);
      padding: 1vh 3vw;
      font-size: 1.2rem;
    }


  }
}

.up-hide {
  animation: up-hide ease-in-out forwards .2s;
}

@keyframes up-hide {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-40px);
    opacity: 0;
  }
}

@keyframes up-modal {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>