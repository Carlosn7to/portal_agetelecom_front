<template>
  <div class="container-logo-text">
    <img :src="require('@/assets/portal/logo/age_color_full.png')" alt="logo" class="logo">
    <div class="text">
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </div>

  </div>
</template>

<script>
export default {
  name: "TitleText",
  data () {
    return {
      title: 'Bem-vindo(a) ;)',
      subtitle: 'Acesso exclusivo para colaboradores Age Telecom.'
    }
  }
}
</script>

<style scoped lang="scss">


.container-logo-text {
  @include flex(column, center, center, 2vh);
  padding-top: 12%;


  .logo {
    width: 50%;
    img {
      width: 15%;
      height: auto;
    }

  }

  .text {
    @include flex(column, center, center, .5vh);
    text-align: center;


    .title {
      font-size: 3.4rem;
    }

    .subtitle {
      font-size: 2rem;
    }
  }

  .subtitle {

  }


}

</style>