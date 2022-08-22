<template>
  <div id="menu"
       :class="{'mode-l' : mode === 'light' || mode === undefined,
                'mode-d' : mode === 'dark',
                'decrease-menu' : menu === 'decrease'}">
    <div id="logo-name">
      <img :src="require('@/assets/img/logo/age_orange.png')" alt="age">
      <div @click="closeMenu()">
        <i class="fi fi-rr-angle-small-left"></i>
        <i class="fi fi-rr-menu-burger"></i>
      </div>
    </div>
    <nav v-if="system === 'portal'">
      <ul>
        <router-link to="/sistemas" active-class="active-li" @click="loading = true">
         <li>
            <div>
              <i class="fi fi-rr-apps-add"></i>
            </div>
            <span>Sistemas</span>
          </li>
        </router-link>
        <router-link to="/gerenciamento" active-class="active-li" @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-settings-sliders"></i>
            </div>
            <span>Gerenciamento</span>
          </li>
        </router-link>
        <router-link to="/minha-conta" active-class="active-li" @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-user"></i>
            </div>
            <span>Minha conta</span>
          </li>
        </router-link>
        <router-link to="/"
                     active-class="active-li"
                     style="position: absolute;
                            bottom: 1vh"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-sign-out-alt"></i>
            </div>
            <span>Logout</span>
          </li>
        </router-link>
      </ul>
    </nav>
    <nav v-if="system === 'report'">
      <ul>
        <router-link to="/ageReport/home" active-class="active-li" @click="loading = true">
         <li>
            <div>
              <i class="fi fi-rr-document"></i>
            </div>
            <span>Relatórios</span>
          </li>
        </router-link>
        <router-link to="/sistemas"
                     active-class="active-li"
                     style="position: absolute;
                            bottom: 7vh"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-arrow-left"></i>
            </div>
            <span>Voltar ao portal</span>
          </li>
        </router-link>
        <router-link to="/"
                     active-class="active-li"
                     style="position: absolute;
                            bottom: 1vh">
          <li>
            <div>
              <i class="fi fi-rr-sign-out-alt"></i>
            </div>
            <span>Logout</span>
          </li>
        </router-link>
      </ul>
    </nav>
  </div>
  <div class="loading-bar" v-if="loading === true">

  </div>
</template>

<script>

import Cookie from "js-cookie";

export default {
  name: "MenuApp",
  props: {
    mode: {
      type: String,
      required: true
    },
    system: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menu: Cookie.get('menu'),
      loading: false,
    }
  },
  methods: {
    closeMenu: function () {
      switch (Cookie.get('menu')) {
        case 'decrease':
          Cookie.set('menu', 'increase', { expires: 7 })
          this.menu = 'light'
          break
        case 'increase':
          Cookie.set('menu', 'decrease', { expires: 7 })
          this.menu = 'decrease'
          break
        case undefined:
          Cookie.set('menu', 'decrease', { expires: 7 })
          this.menu = 'decrease'
          break
      }
    }
  }

}
</script>

<style scoped lang="scss">

#menu {
  width: 17%;
  height: 100%;

  #logo-name {
    @include flex(row, space-between, center, 0);
    padding: 3vh 1vw;
    img {
      width: 10vw;
      height: auto;
    }
    div {
      @include tr-p;
      @include flex(row, center, center, 1px);

      i:nth-child(1) {
        font-size: 1.6rem;

      }

      i {
        font-size: 2.4rem;
        font-weight: 600;
        letter-spacing: .5px;
      }

      &:hover {
        opacity: .8;
      }
    }
  }

  nav {
    ul {
      padding: 0 1vw;
      height: 30%;
      @include flex(column, flex-start, initial, 5px);
      a {
        padding: .5vh 1.5vw;
        @include flex(row, flex-start, center, 0);
        border-radius: 8px;
        li {
          @include flex(row, flex-start, center, 5px);

          div {
            padding: 5px 8px;
            border-radius: 5px;
            i {
              font-size: 2rem;
              @include tr-p;
            }
          }

          span {
            font-weight: 600;
            font-size: 1.4rem;
            @include tr-p;
            white-space: nowrap;
          }
        }
      }

      .active-li {

        li {
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
}

.mode-l {
  background-color: #fff;
  border-right: 2px solid #cccccc90;
  @include tr;

  #logo-name {
    i {
      color: $ml-text-menu;
    }
  }

  nav {
    ul {
      a {
        li {
          color: $ml-text-menu;

          &:hover {
            div {
              i {
                color: $age-or;
              }
            }
            span {
              color: $age-bl;
            }
          }
        }
      }

      .active-li {
        background-color: $ml-back-li ;
        li {
          div {
            background-color: #EFF0F2;
              i {
                color: $age-or;
              }
          }
          span {
            color: $age-bl;
          }
        }
      }
    }
  }
}

.mode-d {
  background-color: $age-bl-l;
  border-right: 2px solid rgba(70, 70, 70, 0.17);
  @include tr;

  #logo-name {
    i {
      color: $md-text-menu;
    }
  }

  nav {
    ul {
      a {
        li {
          color: $md-text-menu;

          &:hover {
            div {
              i {
                color: $age-or;
              }
            }
            span {
              color: $age-or;
            }
          }
        }
      }

      .active-li {
        background-color: $age-or;
        li {
          div {
            i {
              color: $md-text-menu;
            }
          }
          span {
            color: $md-text-menu;
          }

          &:hover {
            div {
              i {
                color: $md-text-menu;
              }
            }
            span {
              color: $md-text-menu;
            }
          }
        }
      }
    }
  }
}

.decrease-menu {
  width: 5% !important;

  #logo-name {
    padding-top: 5vh !important;
    justify-content: center !important;
    img {
      display: none;
    }
    i:nth-child(1) {
      display: none;
    }
  }

  nav {
    margin-top: 1.5vh;
    ul {
      a {
        padding: .1vh 0 !important;
        li {
          span {
            display: none;
          }
        }
      }
    }
  }
}

.loading-bar {
  @include bar;
}
</style>