<template>
  <div class="content-extract">
    <div class="menu">
        <nav>
          <p>Menu de ações</p>
          <ul>
            <li :class="{ 'selected' : page === 'main' }"
                @click="page = 'main'">
              <i class="fi fi-rr-search"></i>
              <span>Visão geral</span>
            </li>
            <li :class="{ 'selected' : page === 'sales' }"
                @click="page = 'sales'">
              <i class="fi fi-rr-search-alt"></i>
              <span>Vendas</span>
            </li>
            <li :class="{ 'selected' : page === 'mng' }"
                @click="page = 'mng'">
              <i class="fi fi-rr-settings-sliders"></i>
              <span>Gerenciamento</span>
            </li>
            <li @click="closePage()">
              <i class="fi fi-rr-enter"></i>
              <span>Voltar</span>
            </li>
          </ul>
        </nav>
    </div>
    <div class="content">
      {{ $store.state.user.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ExtractView",
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      page: 'main',

    }
  },
  methods: {
    closePage: function () {
      this.$emit('close-page')
    }
  }
}
</script>

<style scoped lang="scss">

.content-extract {
  width: 100%;
  height: 100%;
  @include flex(row, flex-start, initial, 10px);

  .menu {
    width: 15%;
    border-right: 2px solid #cccccc60;
    height: 100%;
    background-color: #fff;
    nav{
      margin-top: 5vh;

      p {
        margin-bottom: 1vh;
        font-size: 1rem;
        color: $ml-text-menu;
        padding-left: 2vw;
        font-weight: 500;
      }

      ul {

        li {
          @include flex(row, flex-start, center, 5px);
          height: 7vh;
          border-bottom: 1px solid #cccccc60;
          padding-left: 2vw;
          @include tr-p;


          span {
            font-size: 1.4rem;
            @include tr;
            padding-bottom: 2px;
          }

          i {
            font-size: 1.6rem;
            @include tr;

          }

          &:hover > span {
            color: $age-bl;
          }

          &:hover > i {
            color: $age-or;
          }
        }

        .selected {
          span {
            color: $age-bl;
          }

          i {
            color: $age-or;
          }
        }
      }
    }
  }
}

</style>