<template>
  <div class="content-social-media">
    <div class="divisor">
      <div></div>
    </div>
    <div class="social-media">
      <span>Siga-nos nas nossas redes sociais.</span>
      <div class="items">
        <a href="#" target="_blank">
          <img :src="require('@/assets/portal/interface/instagram.png')" alt="instagram">
        </a>
        <a href="#" target="_blank">
          <img :src="require('@/assets/portal/interface/facebook.png')" alt="facebook">
        </a>
        <a href="#" target="_blank">
          <img :src="require('@/assets/portal/interface/youtube.png')" alt="youtube">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialMedia"
}
</script>

<style scoped lang="scss">


.content-social-media {
  width: 100%;
  @include flex(column, center, center, 3vh);

  .divisor {
    width: 100%;
    height: 2px;
    @include flex(row, center, center, 0vh);

    div {
      width: 80%;
      height: 100%;
      background-color: $border-hover;
      @include flex(row, center, center, 0);

    }
  }

  .social-media {
    width: 80%;
    @include flex(column, flex-start, center, 2vh);

    span {
      text-align: center;
      font-size: 1.6rem;
      font-weight: 500;
      color: #333;
    }

    .items {

      @include flex(row, space-evenly, center, 30px);

      a {
        img {
          display: block;
          margin: 0 auto;
          width: 50px;
          max-width: 80px;
          height: auto;
        }
      }
    }
  }
}

</style>