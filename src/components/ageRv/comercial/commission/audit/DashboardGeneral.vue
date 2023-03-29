<template>
  <div class="section-dashboard">
    <h2>Dashboard geral</h2>
    <div class="cards-dashboard">
      <div class="card">
        <div class="title">
          <div>
            <i class="fi fi-rr-usd-square"></i>
          </div>
          <h3>
            Comissão total
          </h3>
        </div>
        <div class="values">
            <span>
            R$ {{ data.commissionTotal }}
          </span>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <div>
            <i class="fi fi-rr-document-signed"></i>
          </div>
          <h3>
            Vendas válidas
          </h3>
        </div>
        <div class="values">
            <span>
            {{ data.salesTotal }}
            </span>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <div>
            <i class="fi fi-rr-rocket-lunch"></i>
          </div>
          <h3>
            Comissionados
          </h3>
        </div>
        <div class="values">
            <span>
            {{ data.commissionedsTotal }}
            </span>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <div>
            <i class="fi fi-rr-delete-user"></i>
          </div>
          <h3>
            Não comissionados
          </h3>
        </div>
        <div class="values">
            <span>
            {{ data.noCommissionedsTotal }}
            </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "DashboardGeneral",
  props: ['data']
}
</script>

<style scoped lang="scss">

.section-dashboard {
  grid-area: D;
  height: 100%;

  .cards-dashboard {
    @include flex(row, space-between, center, 1vw);

    .card {
      @include card();
      @include flex(column, space-between, initial, 0);
      width: calc((100% / 4) - 1vw);
      height: 15vh;

      .title {
        @include flex(row, flex-start, center, 1vw);

        div {
          padding: 5px 7px 2px 7px;
          border-radius: 5px;
          i {
            font-size: 1.4rem;
            color: #fff;
          }
        }

        h3 {
          font-weight: 600;
          font-size: 1.4rem;
        }


      }

      .values {
        padding: 5px 15px 5px 0;

        span {
          font-size: 1.6rem;
          color: $h1-black;
          font-weight: 600;
          width: 80%;
          padding: 5px 15px 5px 0;
          border-bottom: 2px solid #fff;

        }
      }
    }


    .card:nth-child(1) {
      background-color: #F0F9F6;

      .title {
        div {
          background-color: #3CB47F;
        }
      }

      span {
        border-bottom-color: #3CB47F;
      }
    }
    .card:nth-child(2) {
      background-color: #ECF3F9;

      .title {
        div {
          background-color: #0762B0;
        }
      }

      span {
        border-bottom-color: #0762B0;
      }
    }
    .card:nth-child(3) {
      background-color: #F2F1FF;

      .title {
        div {
          background-color: #A6A4EE;
        }
      }

      span {
        border-bottom-color: #A6A4EE;
      }
    }
    .card:nth-child(4) {
      background-color: #FDF3F1;

      .title {
        div {
          background-color: #E26741;
        }
      }

      span {
        border-bottom-color: #E26741;
      }
    }

  }
}


</style>