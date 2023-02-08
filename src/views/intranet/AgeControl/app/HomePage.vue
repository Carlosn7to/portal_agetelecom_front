<template>
  <div id="content-app">
    <NewMenuApp
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <h1>Painel operacional</h1>
        <p>Aqui você poderá operar em todos os paineis disponíveis no sistema.</p>

        <div id="content-pages">
          <div id="items-page">
            <ReportPanel v-if="menuActive === 'reports'" />
            <ConductorPanel v-if="menuActive === 'conductors'" />
            <DashboardPanel v-if="menuActive === 'dashboards'"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import NewMenuApp from "@/components/portal/_aux/NewMenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import ReportPanel from "@/components/ageControl/operatingPanel/reports/ReportPanel";
import ConductorPanel from "@/components/ageControl/operatingPanel/conductors/ConductorPanel";
import DashboardPanel from "@/components/ageControl/operatingPanel/dashboards/DashboardPanel";

export default {
  name: "HomePage",
  emits: ['closeModal'],
  components: {
    NewMenuApp,
    HeaderApp,
    ReportPanel,
    ConductorPanel,
    DashboardPanel
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      menuActive: 'reports'
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

#content-app {
  p {
    font-size: 1.2rem;
    color: $ml-text-menu;
    padding: 1vh 0;
  }
  #layer-app {
    #content-page {
      #content-pages {
        width: 100%;
        height: 80vh;
        @include flex(column, flex-start, initial, 2vh);

        #menu-pages {
          width: 100%;
          height: 7vh;
          border-bottom: 3px solid #cccccc40;
          @include flex(row, flex-start, center, 0);


          .item-menu {
            width: 15%;
            height: 100%;
            position: relative;
            top: 3px;
            @include flex(row, center, center, 0);
            font-size: 1.4rem;
            font-weight: 500;
            color: rgb(183, 183, 183);
            cursor: pointer;
            border-bottom: 3px solid #cccccc05;
            transition: color ease-in-out .2s;

            &:hover {
              color: $ml-text-menu;
              border-bottom: 3px solid #cccccc90;
            }
          }

          .activeMenu {
            border-bottom: 3px solid $age-or;
            color: $age-bl;

            &:hover {
              @extend .activeMenu;
            }

          }
        }

        #items-page {
          width: 100%;
          height: 85%;
        }
      }
    }
  }
}


.mode-l-p {
  background-color: $ml-back-l;
  @include tr;
}

.mode-d-p {
  background-color: #161819;
  @include tr;
}

</style>