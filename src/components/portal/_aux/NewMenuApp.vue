<template>
  <div class="container-menu"
       :class="{ 'increase' : menu.stage === 'increase',
                  'decrease' : menu.stage === 'decrease',
                   'dark-mode' : system.mode === 'dark'}"
       >
    <div class="menu-app">
      <div class="header-menu">
        <div id="logo">
          <img :src="require('@/assets/img/logo/logo_orange.png')" alt="age">
          <span>Age</span>
        </div>
        <div id="icon-increase" @click="SAVE_MENU({stage: 'decrease'})">
          <i class="fi fi-br-angle-left"></i>
        </div>
        <div id="icon-decrease" @click="SAVE_MENU({stage: 'increase'})">
          <i class="fi fi-br-angle-right"></i>
        </div>
      </div>
      <div class="items-nav">
        <SubMenuAgeControl
            v-if="menu.system === 'agecontrol'"
        />

        <SubMenuAgeRv
            v-if="menu.system === 'agerv'"
        />
        <SubMenuPortal
            v-if="menu.system === 'portal'"
        />

        <SubMenuAgeReport
            v-if="menu.system === 'agereport'"
        />

        <SubMenuAgeBoard
            v-if="menu.system === 'ageboard'"
        />

        <nav>
          <ul>
            <li>
              <div class="container-items">
                <router-link to="/sistemas" @click="SAVE_SYSTEM({loading: true})">
                  <div class="item-menu">
                    <div class="title-icon">
                      <i class="fi fi-rr-arrow-alt-square-left"></i>
                      <span>Voltar</span>
                    </div>
                  </div>
                </router-link>
                <div class="border-nav">
                </div>
              </div>
            </li>
            <li>
              <div class="container-items">
                <router-link to="/" @click="[SAVE_MENU({system: 'portal', selected: 'home'}),
                            SAVE_SYSTEM({login: false})]">
                  <div class="item-menu">
                    <div class="title-icon">
                      <i class="fi fi-rr-exit"></i>
                      <span>Sair</span>
                    </div>
                  </div>
                </router-link>
                <div class="border-nav">
                </div>
              </div>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  </div>
</template>

<script>

import SubMenuAgeControl from "@/components/portal/_aux/subMenus/ageControl/SubMenuAgeControl";
import SubMenuAgeRv from "@/components/portal/_aux/subMenus/ageRv/SubMenuAgeRv";
import {mapGetters, mapMutations} from "vuex";
import SubMenuPortal from "@/components/portal/_aux/subMenus/SubMenuPortal";
import SubMenuAgeReport from "@/components/portal/_aux/subMenus/ageReport/SubMenuAgeReport";
import SubMenuAgeBoard from "@/components/portal/_aux/subMenus/ageBoard/SubMenuAgeBoard";

export default {
  name: "NewMenuApp",
  components: {
    SubMenuAgeRv,
    SubMenuAgeControl,
    SubMenuPortal,
    SubMenuAgeReport,
    SubMenuAgeBoard},

  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations([
      'SAVE_MENU',
        'SAVE_SYSTEM'
    ])
  },
  computed: {
    ...mapGetters([
      'menu',
        'system'
    ])
  }
}
</script>

<style lang="scss">

.container-menu {
  height: 100%;
  @include flex(row, flex-start, initial, 0);
  @include sh-pattern;
  z-index: 3;

  .menu-app {
    height: 100%;
    background-color: #fff;
    transition: width 3s ease-in-out;

    .header-menu {
      @include flex(row, space-between, center, 0);
      padding: 4vh 1vw 2vh 1vw;
      position: relative;

      #logo {
        @include flex(row, flex-start, center, 1vw);

        img {
          width: 3vw;
          height: auto;
        }

        span {
          color: $title-strong;
          font-size: 2.4rem;
          font-weight: 600;
        }
      }

      #icon-increase {
        display: block;
        background-color: $primary;
        border-radius: 50%;
        border: 5px solid $back-main;
        padding: 7px 7px 5px 7px;
        position: absolute;
        right: -1.5vw;
        @include tr-p;
        i {
          color: #ffffff;
          font-size: 1rem;

        }

        &:hover {
          opacity: .8;
        }


      }

      #icon-decrease {
        @extend #icon-increase;
        display: none;
      }
    }


    .items-nav {
      @include flex(column, space-between, initial, 0);
      height: 85%;
      nav {
        ul {
          @include flex(column, flex-start, initial, 5px);

          li {

            .container-items {
              width: 100%;
              @include flex(row, space-between, center, 0);
              height: 6vh;
              padding-left: .5vw;
              width: 100%;

              .item-menu {
                @include flex(row, space-between, center, 0);
                width: 90%;
                height: 100%;
                padding: 0 1vw;
                border-radius: 4px;
                @include tr-p;
                color: $text-strong;

                &:hover {
                  background-color: $selected;
                  color: $primary;

                  .title-icon {
                    span {
                      font-weight: 500;
                    }
                  }
                }

                .title-icon {
                  @include flex(row, flex-start, initial, 1vw);
                  @include tr;

                  span {
                    font-size: 1.4rem;
                    font-weight: 400;
                  }

                  i {
                    font-size: 1.6rem;
                  }
                }
              }

              a {
                width: 100%;
                height: 100%;
                color: $text-strong;

                .item-menu {
                  width: 92%;
                }
              }

              .border-nav {
                width: 4px;
                height: 100%;
                border-radius: 5px 0px 0px 5px;
              }

            }

            ul {
              overflow: hidden;
              height: 0px;

              li {

                .container-items {

                  a {
                    padding-left: 1vw;
                    width: 100%;
                    @include flex(row, flex-start, center, 0);

                    .title-icon {
                      @include flex(row, flex-start, center, 1vw);

                      .icon-submenu {
                        @include flex(row, center, center, 0);
                        width: 15px;

                        div {
                          width: 6px;
                          height: 6px;
                          background-color: $text-light;
                          border-radius: 50%;
                        }
                      }

                      span {
                        font-size: 1.4rem;
                        font-weight: 400;
                        text-decoration: none;
                        color: $text-strong;
                      }
                    }

                    &:hover {
                      .title-icon {
                        .icon-submenu {
                          div {
                            background-color: $primary;
                          }
                        }

                        span {
                          font-weight: 500;
                          color: $primary-hover;
                        }
                      }
                    }

                  }

                }

              }
            }

            .selected {
              height: 100%;

            }

          }

          .active-route {

            .container-items {

              .item-menu {
                background-color: $selected;
                color: $primary;

                .title-icon {
                  span {
                    font-weight: 500;
                  }
                }

                &:hover {
                  background-color: $selected-hover;
                  color: $primary-hover;
                }
              }

              .border-nav {
                background-color: $primary;
              }

            }


          }

          .active-route-submenu {
            .item-submenu {
              .title-icon {
                .icon-submenu {
                  div {
                    background-color: $primary !important;
                    width: 10px;
                    height: 10px;
                    border: 2px solid $text-light;
                    animation: explode ease-in-out alternate infinite 1s;
                  }

                  @keyframes explode {
                    0% {
                      transform: scale(.5);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                }
                span {
                  color: $primary !important;
                  font-weight: 500;
                }
              }
            }
          }


        }
      }
    }
  }

}

.increase {
  width: 22%;
  transition: width .4s ease-in-out;

  .menu-app {
    width: 100%;
    transition: width .2s ease-in-out;

  }

}

.decrease {
  width: 6%;
  transition: width .4s ease-in-out;

  .menu-app {
    width: 100%;

    .header-menu {
      position: relative;

      #logo {
        span {
          display: none;
        }

        img {
          width: 3vw;

        }
      }


      #icon-increase {
        display: none;
      }

      #icon-decrease {
        display: block;
        background-color: $primary;
        border-radius: 50%;
        border: 5px solid $back-main;
        padding: 7px 7px 5px 7px;
        position: absolute;
        right: -1.5vw;
        @include tr-p;
        i {
          color: #ffffff;
          font-size: 1rem;

        }

        &:hover {
          opacity: .8;
        }
      }
    }

    .items-nav {

      nav {

        ul {

          li {

            .container-items {
              padding-left: 0;

              .item-menu {
                justify-content: center;
                width: 70%;
                margin: 0 auto;

                .title-icon {

                  span {
                    display: none;
                  }

                  i {
                    display: block;
                    font-size: 1.6rem;
                    padding-top: 2px;
                  }

                }

                i {
                  display: none;
                }

              }

              a {
                width: 70%;
                margin: 0 auto;
                .item-menu {
                  width: 100%;
                }
              }

            }

            ul {

              display: none;

            }

          }

        }

      }

    }

  }


}

.dark-mode {

  .menu-app {
    background-color: $dark-mode-card !important;

    .header-menu {
      #icon-increase {
        border-color: $dark-mode-background;
      }

      #icon-decrease {
        border-color: $dark-mode-background;
      }

      #logo {
        span {
          color: $dark-mode-text-primary;
        }
      }
    }

    .items-nav {
      nav {
        ul {

          .item-menu {
            .title-icon {
              color: $dark-mode-text-primary;

            }

            &:hover {
              background-color: $primary !important;
              color: $dark-mode-text-primary !important;
            }
          }

          ul {
            li {
              .container-items {
                a {

                  .title-icon {
                    .icon-submenu {
                      div {
                        background-color: $dark-mode-text-primary !important;
                      }
                    }

                    span {
                      color: $dark-mode-text-primary !important;
                    }
                  }
                }
              }
            }
          }

          .active-route {

            .container-items {

              .item-menu {
                background-color: $primary;
                color: $dark-mode-text-primary;

                .title-icon {
                  span {
                    font-weight: 500;
                  }
                }

                &:hover {
                  background-color: $selected-hover;
                  color: $primary-hover;
                }
              }

              .border-nav {
                background-color: $primary;
              }

            }


          }
          .active-route-submenu {
            .item-submenu {
              .title-icon {
                .icon-submenu {
                  div {
                    background-color: $primary !important;
                    width: 10px;
                    height: 10px;
                    border: 2px solid #fff;
                    animation: explode ease-in-out alternate infinite 1s;
                  }

                  @keyframes explode {
                    0% {
                      transform: scale(.5);
                    }
                    100% {
                      transform: scale(1);
                    }
                  }
                }
                span {
                  color: #ffffff !important;
                  font-weight: 500;
                }
              }
            }
          }

        }
      }
    }
  }

}

@media (min-width: 300px) {
  .container-menu {
    display: none;
  }
}

@media (min-width: 1000px) {
  .container-menu {
    display: block;
  }
}

</style>