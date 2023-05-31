<template>
  <div class="container">
    <div class="title-form">
      <TitleText/>
      <FormLogin/>
      <SocialMedia/>

    </div>
    <div class="component">
      <span>&copy; 2023 Age Telecom. Todos os direitos reservados.</span>
    </div>
  </div>
</template>

<script>

import TitleText from "@/components/portal/web/authenticate/login/TitleText";
import FormLogin from "@/components/portal/web/authenticate/login/FormLogin";
import SocialMedia from "@/components/portal/web/authenticate/login/SocialMedia";

export default {
  name: "LoginPage",
  components: {TitleText, FormLogin, SocialMedia},
}
</script>

<style scoped lang="scss">

.content-page {
  padding: 0;

}
.container {
  height: 100vh;
  padding: 0 7%;
  @include flex(column, space-between, center, 0);

  .title-form {
    height: 90%;
    width: 100%;
    @include flex(column, flex-start, center, 5vh);
  }

  .component {
    padding: 10px 0;
    width: 100%;
    text-align: center;

    span {
      font-size: 1.2rem;
    }
  }

}


</style>