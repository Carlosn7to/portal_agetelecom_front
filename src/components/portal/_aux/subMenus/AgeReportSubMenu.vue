<template>
  <nav>
    <ul>
      <router-link to="/ageReport/home" active-class="active-li">
        <li>
          <div>
            <i class="fi fi-rr-document"></i>
          </div>
          <span>Relatórios</span>
        </li>
      </router-link>
      <router-link to="/ageReport/gerenciamento"
                   active-class="active-li"
                   v-if="permissions.level === 'Admin' || permissions.level === 'Master'">
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
</template>

<script>
export default {
  name: "AgeReportSubMenu",
  props: {
    permissions: {
      required: true
    }
  }
}
</script>

<style scoped>

</style>