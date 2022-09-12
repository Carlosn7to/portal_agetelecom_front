<template>
  <div class="menu-mobile" v-if="page === 'portal'">
    <router-link to="/home" active-class="active">
      <div>
        <i class="fi fi-rr-home"></i>
      </div>
    </router-link>
    <router-link to="/sistemas" active-class="active">
      <div>
        <i class="fi fi-rr-apps-add"></i>
      </div>
    </router-link>
    <router-link to="/gerenciamento" active-class="active">
      <div>
        <i class="fi fi-rr-settings-sliders"></i>
      </div>
    </router-link>
    <router-link to="/" active-class="active">
      <div>
        <i class="fi fi-rr-exit"></i>
      </div>
    </router-link>
  </div>
  <div class="menu-mobile" v-if="page === 'agerv'">
    <router-link to="/agerv/home" active-class="active">
      <div>
        <i class="fi fi-rr-home"></i>
      </div>
    </router-link>
    <router-link to="/ageRv/comercial/vendas/dashboard"
                 active-class="active"
                 v-if="permissions.function !== 'Supervisor' ||
                       permissions.function !== 'Gerente' ||
                       permissions.function !== 'Gerente geral' ||
                       permissions.function !== 'Diretoria'">
      <div>
        <i class="fi fi-rr-chart-histogram"></i>
      </div>
    </router-link>
    <router-link to="/ageRv/comercial/analitico" active-class="active">
      <div>
        <i class="fi fi-rr-settings-sliders"></i>
      </div>
    </router-link>
    <router-link to="/sistemas" active-class="active">
      <div>
        <i class="fi fi-rr-arrow-left"></i>
      </div>
    </router-link>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MenuMobile",
  props: {
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  }
}
</script>

<style scoped lang="scss">

  .menu-mobile {
    @include flex(row, center, center, 15%);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 25px 4px;

    i {
      font-size: 2.2rem;
      color: #a9a5a5;
    }
  }

  .active {
    div {
      background-color: #cccccc30;
      padding: 9px 10px 5px 10px;
      border-radius: 5px;

      i {
        color: $age-or;
      }
    }
  }

</style>