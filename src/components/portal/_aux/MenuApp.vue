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
        <router-link to="/gerenciamento/usuarios"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.level === 'Admin' ||
                           permissions.level === 'Master'">
          <li>
            <div>
              <i class="fi fi-rr-settings-sliders"></i>
            </div>
            <span>Gerenciamento</span>
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
    <nav v-if="system === 'portal-mng'">
      <ul>
        <router-link to="/gerenciamento/usuarios" active-class="active-li" @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-users-alt"></i>
            </div>
            <span>Usuários</span>
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
    <AgeReportSubMenu
        v-if="system === 'report'"
        :permissions="permissions"/>
    <nav v-if="system === 'ageBoard'">
      <ul>
        <router-link to="/ageBoard/home" active-class="active-li" @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-chart-pie"></i>
            </div>
            <span>Dashboards</span>
          </li>
        </router-link>
        <router-link to="/ageboard/gerenciamento/dashboards"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.level === 'Admin' ||
                           permissions.level === 'Master'">
          <li>
            <div>
              <i class="fi fi-rr-settings-sliders"></i>
            </div>
            <span>Gerenciamento</span>
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
    <nav v-if="system === 'ageRv'">
      <ul>
        <router-link to="/ageRv/home"
                     active-class="active-li"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-home"></i>
            </div>
            <span>Home</span>
          </li>
        </router-link>
        <router-link to="/ageRv/comercial/vendas/dashboard"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.function === 'Vendedor'">
          <li>
            <div>
              <i class="fi fi-rr-chart-histogram"></i>
            </div>
            <span>Minhas vendas</span>
          </li>
        </router-link>
<!--        <router-link to="/ageRv/comercial/analitico"-->
<!--                     active-class="active-li"-->
<!--                     @click="loading = true"-->
<!--                     v-if="permissions.function === 'Gerente' ||-->
<!--                           permissions.function === 'Gerente geral' ||-->
<!--                           permissions.function === 'Diretoria'">-->
<!--          <li>-->
<!--            <div>-->
<!--              <i class="fi fi-rr-settings-sliders"></i>-->
<!--            </div>-->
<!--            <span>Analítico</span>-->
<!--          </li>-->
<!--        </router-link>-->
        <router-link to="/ageRv/comercial/comissao"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.function === 'Diretoria' || permissions.function === 'Financeiro' || permissions.function === 'Gerente geral'">
          <li>
            <div>
              <i class="fi fi-rr-usd-square"></i>
            </div>
            <span>Comissão</span>
          </li>
        </router-link>
        <router-link to="/ageRv/comercial/supervisor-comissao"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.function === 'Supervisor'">
          <li>
            <div>
              <i class="fi fi-rr-usd-square"></i>
            </div>
            <span>Comissão</span>
          </li>
        </router-link>
        <router-link to="/ageRv/comercial/gerenciamento"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'">
          <li>
            <div>
              <i class="fi fi-rr-settings-sliders"></i>
            </div>
            <span>Gerenciamento</span>
          </li>
        </router-link>
        <router-link to="/ageRv/comercial/simulador"
                     active-class="active-li"
                     @click="loading = true"
                     v-if="permissions.function === 'Gerente geral' || permissions.function === 'Diretoria'">
          <li>
            <div>
              <i class="fi fi-rr-head-side-thinking"></i>
            </div>
            <span>Simulador</span>
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
    <nav v-if="system === 'ageControl'">
      <ul>
        <router-link to="/ageControle/home" active-class="active-li"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-home"></i>
            </div>
            <span>Home</span>
          </li>
        </router-link>
        <router-link to="/ageControle/gerenciamento/dashboard"
                     active-class="active-li"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'"
                     @click="loading = true">

          <li>
            <div>
              <i class="fi fi-rr-settings-sliders"></i>
            </div>
            <span>Gerenciamento</span>
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
    <nav v-if="system === 'ageControl-mng'">
      <ul>
        <router-link to="/ageControle/gerenciamento/dashboard" active-class="active-li"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-chart-pie"></i>
            </div>
            <span>Dashboard</span>
          </li>
        </router-link>
        <router-link to="/ageControle/gerenciamento/colaboradores"
                     active-class="active-li"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'"
                     @click="loading = true">

          <li>
            <div>
              <i class="fi fi-rr-id-badge"></i>
            </div>
            <span>Condutores</span>
          </li>
        </router-link>
        <router-link to="/ageControle/gerenciamento/veiculos"
                     active-class="active-li"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'"
                     @click="loading = true">

          <li>
            <div>
              <i class="fi fi-rr-cars"></i>
            </div>
            <span>Veículos</span>
          </li>
        </router-link>
        <router-link to="/ageControle/gerenciamento/postos"
                     active-class="active-li"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'"
                     @click="loading = true">

          <li>
            <div>
              <i class="fi fi-rr-gas-pump-alt"></i>
            </div>
            <span>Postos</span>
          </li>
        </router-link>
        <router-link to="/ageControle/gerenciamento/relatorios"
                     active-class="active-li"
                     v-if="permissions.level === 'Admin' || permissions.level === 'Master'"
                     @click="loading = true">

          <li>
            <div>
              <i class="fi fi-rr-document"></i>
            </div>
            <span>Relatórios</span>
          </li>
        </router-link>
        <router-link to="/agecontrole/home"
                     active-class="active-li"
                     style="position: absolute;
                            bottom: 7vh"
                     @click="loading = true">
          <li>
            <div>
              <i class="fi fi-rr-arrow-left"></i>
            </div>
            <span>Voltar</span>
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
import {mapGetters} from "vuex";
import AgeReportSubMenu from "@/components/portal/_aux/subMenus/AgeReportSubMenu";

export default {
  name: "MenuApp",
  components: {AgeReportSubMenu},
  props: {
    mode: {
      type: String,
    },
    system: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      menu: Cookie.get('menu'),
      loading: false
    }
  },
  methods: {
    closeMenu: function () {
      switch (Cookie.get('menu')) {
        case 'decrease':
          Cookie.set('menu', 'increase', {expires: 7})
          this.menu = 'light'
          break
        case 'increase':
          Cookie.set('menu', 'decrease', {expires: 7})
          this.menu = 'decrease'
          break
        case undefined:
          Cookie.set('menu', 'decrease', {expires: 7})
          this.menu = 'decrease'
          break
      }
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  }

}
</script>

<style lang="scss">

#menu {
  width: 17%;
  min-width: 17%;
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

  nav, .nav {
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
            padding: 7px 8px 3px 8px;
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
        background-color: $ml-back-li;

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
  min-width: 5% !important;

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