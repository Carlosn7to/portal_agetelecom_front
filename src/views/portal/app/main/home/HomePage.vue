<script>
import {defineComponent} from 'vue'
import {mapGetters, mapMutations} from "vuex";
import moment from "moment/moment";
import {AXIOS} from "../../../../../../services/api.ts";
import Cookie from "js-cookie";

export default defineComponent({
  name: "HomePage",
  components: {  },

  data () {
    return {
      screen: 'loading',
      modules: {},
      animationDelay: .3,
      loading: false,

    }
  },
  computed: {
    ...mapGetters(
        [
          'user'
        ]
    )
  },
  methods: {
    ...mapMutations([
      'SAVE_SYSTEM'
    ]),
    tradePage: function (route) {

      this.SAVE_SYSTEM({loading: true})
      this.$router.replace(route)


    },
    getDate: function () {
      const date = moment().locale('pt-br')
      const dayFormatted = date.format('dddd, LL')
      return dayFormatted
    },

    getMessage: function () {
      const hour = new Date().getHours()
      let msg = ''

      if (hour < 12) {
        msg = 'Bom dia'
      } else if (hour < 18) {
        msg = 'Boa tarde'
      } else {
        msg = 'Boa noite'
      }

      return msg
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
    }
  },
  mounted() {
    this.SAVE_SYSTEM({loading: false})
    this.getModules()
  }
})
</script>

<template>

  <div class="home-container">
    <div class="welcome-header">
      <h2>{{ getDate() }}</h2>
      <h1>{{ getMessage() }}, {{ user.firstName }}</h1>
    </div>


    <div class="modules-container">
      <div class="title">
        <h1>Módulos disponíveis</h1>
      </div>
      <div class="modules">
        <div class="module-container" v-for="(module, index) in modules" :key="index">
          <div class="title">
            <i :class="module.icone"></i>
            <span>
              - {{ module.modulo }}
            </span>
            <br>
            <span>{{ module.descricao }}</span>
          </div>
          <div class="sections"
               :style="{animationDelay: (index * animationDelay) + 's'}">

            <template v-for="(section, indexSection) in module.sections"  :key="indexSection">
              <div class="section" :style="{animationDelay: (.3 * indexSection) + 's'}"  @click="tradePage(section.url)">
                <div class="section-icon" :style="{backgroundColor: section.cor_fundo + '50'}">
                  <i :class="section.icone"></i>
                </div>
                <div class="section-name">
                  <div class="title">
                    <h3>{{ section.secao }}</h3>
                  </div>
                  <div class="desc">
                    <span>{{ section.descricao }}</span>
                  </div>
                </div>
              </div>
            </template>
            <div class="action-next" v-if="module.sections.length > 4">
              <i class="fi fi-rr-angle-right"></i>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">

.home-container {
  @include flex(column, flex-start, center, 1vh);

  .welcome-header {
    text-align: center;
    animation: up-card forwards ease-in-out .4s ;
    opacity: 0;
  }

  .modules-container {
    width: 100%;
    padding: 2vh 15vw;
    @include flex(column, flex-start, initial, 3vh);

    .title {

      h1 {
        font-size: 1.2rem;
        font-weight: 500;
      }

    }

    .modules {
      @include flex(row, flex-start, center, 2vw);
      flex-wrap: wrap;
      width: 100%;

      .module-container {
        width: 100%;
        @include flex(column, flex-start, initial, 2vh);


        .title {
          animation: left-card forwards ease-in-out .2s ;
          opacity: 0;
          span:nth-child(2) {
            font-size: 1.8rem;
            font-weight: 500;
            color: $title-black;
          }

          i {
            font-size: 2rem;
          }

          span {
            font-size: 1.2rem;
            color: $subtitle-black;
          }


        }

        .sections {
          width: 100%;
          @include flex(row, flex-start, center, 2vw);

          .section {
            width: calc((100% / 4) - 2.4vw);
            height: 25vh;
            background-color: #fff;
            border-radius:  5px;
            overflow: hidden;
            @include flex(column, space-between, center, 0);
            animation: left-card forwards ease-in-out .4s ;
            opacity: 0;
            transition: width ease-in-out .2s;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
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

          .action-next {
            i {
              font-size: 2rem;
            }
            animation: up-card forwards ease-in-out 1s ;

          }
        }


      }

    }





    @keyframes up-card {
      from {
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);

      }
    }

    @keyframes left-card {
      from {
        transform: translateX(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);

      }
    }
  }
}

</style>