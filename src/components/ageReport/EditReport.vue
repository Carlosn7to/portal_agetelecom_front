<template>
  <div class="edit-report">
    <h1>Relatório - {{ name }}</h1>

    <div class="content-edit">
      <form action="">
        <div class="inputs-text">
          <label for="name">Nome: </label>
          <input type="text" name="name" id="name" :value="name">
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "EditReport",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">

.edit-report {
  padding: 1vh 1vw;

  .content-edit {
    form {
      padding: 4vh 0;
      .inputs-text {
        @include flex(column, flex-start, initial, 10px);

        input[type=text] {
          @include inp-form-text;
          width: 30%;
          background-color: #fff;
        }
      }
    }
  }
}

</style>