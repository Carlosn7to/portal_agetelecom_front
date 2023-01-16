<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageControl-mng'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <h1>Dashboard</h1>
        <p>Aqui você encontrará todos os dados e informações.</p>
        <div id="dashboards">
          <div class="dashboard">
            <i class="fi fi-rr-id-badge"></i>
            <div class="info">
              <h6>20</h6>
              <span>Condutores totais</span>
            </div>
          </div>
          <div class="dashboard">
            <i class="fi fi-rr-cars"></i>
            <div class="info">
              <h6>18</h6>
              <span>Veículos totais</span>
            </div>
          </div>
          <div class="dashboard">
            <i class="fi fi-rr-document-signed"></i>
            <div class="info">
              <h6>153</h6>
              <span>Relatos totais</span>
            </div>
          </div>
          <div class="dashboard">
            <i class="fi fi-rr-gas-pump-alt"></i>
            <div class="info">
              <h6>65</h6>
              <span>Abastecimentos totais</span>
            </div>
          </div>
        </div>
        <div id="content">
          <div id="section-1">
            <div id="row-1">
              <div class="info-km">
                <h6>Quilômetros rodados</h6>

                <div class="info-km-num">
                  <p>+ 1022   <b class="up"><i class="fi fi-rr-arrow-small-up"></i>4,2%</b></p>
                  <span>Por semana</span>
                </div>
              </div>
              <div class="info-km conductor">
                <div class="title-conductor">
                  <h6>Top 5 - Quilometragem</h6>
                  <span>Ver todos</span>
                  <span>Por semana</span>
                </div>

                <div id="divisor">
                  <div>

                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Condutor</th>
                      <th>Quilômetros</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Carlos</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>Vini</td>
                      <td>150</td>
                    </tr>
                    <tr>
                      <td>Rubinho</td>
                      <td>120</td>
                    </tr>
                    <tr>
                      <td>Rhuan</td>
                      <td>70</td>
                    </tr>
                    <tr>
                      <td>Alessandro</td>
                      <td>50</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <div id="row-2">


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";

export default {
  name: "DashboardPage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
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

      #dashboards {
        width: 100%;
        height: 18%;
        padding: 2vh 0;
        @include flex(row, space-between, center, 0);

        .dashboard {
          width: calc((100% / 4) - 20px);
          height: 100%;
          background-color: #fff;
          border-radius: 10px;
          @include tr-p;
          @include flex(row, flex-start, center, 2vw);
          padding: 0 2vw;
          border: 2px solid #cccccc40;

          &:hover {
            border-color: $age-or;
          }

          i {
            font-size: 3rem;
            color: $age-or;
          }

          .info {
            @include flex(column, flex-start, initial, 0.5vh);

            h6 {
              font-size: 2.2rem;
              color: $age-bl;
            }

            span {
              font-size: 1.2rem;
              color: $ml-text-menu;
              font-weight: 500;
            }
          }
        }
      }

      #content {
        width: 100%;
        padding: 2vh 0;

        #section-1 {
          width: 100%;
          height: 60vh;
          @include flex(row, space-between, initial, 0);

          #row-1 {
            width: calc((100% / 4) - 20px);
            height: 100%;
            @include flex(column, flex-start, initial, 2vh);

            .info-km {
              width: 100%;
              background-color: #fff;
              @include tr-p;
              border-radius: 10px;
              @include flex(column, flex-start, initial, 1vh);
              padding: 1vh 2vw 3vh 2vw;
              border: 2px solid #cccccc40;
              height: 25%;

              &:hover {
                border-color: $age-or;
              }

              h6 {
                font-size: 1.4rem;
                color: $ml-text-menu;
              }

              .info-km-num {
                @include flex(column, center, center, 0);

                p {
                  font-size: 2.4rem;
                  color: $age-bl;
                  font-weight: 500;
                  padding: 0;
                }

                .up {
                  color: red;
                }

                .down {
                  color: green;
                }

                span {
                  font-size: 1rem;
                  color: $ml-text-menu;
                  font-weight: 500;
                }
              }
            }

            .conductor {
              width: 100%;
              background-color: #fff;
              @include tr-p;
              border: 2px solid #cccccc40;
              cursor: default;
              height: 75%;
              .title-conductor {
                @include flex(row, space-between, initial, 0);
                flex-wrap: wrap;

                span:nth-child(2) {
                  @include tr-p;

                  &:hover {
                    color: $ml-text-h1;
                  }
                }

                span {
                  font-size: 1rem;
                  color: $ml-text-menu;
                  font-weight: 500;
                }

              }





              #divisor {
                @include flex(row, center, center, 0);
                width: 100%;
                div {
                  width: 100%;
                  height: 1px;
                  background-color: #cccccc80;
                }
              }

              &:hover {
                border-color: #cccccc40;
              }

              table {
                border-collapse: collapse;
                thead {
                  tr {
                    th {
                      padding: 0 5px;
                      text-align: left;
                      color: $age-bl;
                      font-size: 1.4rem;
                    }

                    th:nth-child(2) {
                      text-align: center;
                    }
                  }
                }
                tbody {
                  tr {

                    &:hover {
                      cursor: pointer;
                      background-color: #cccccc60;
                    }

                    td {
                      padding: 0 5px;
                      height: 5vh;
                      font-size: 1.2rem;
                      font-weight: 500;
                      color: $ml-text-menu;
                    }

                    td:nth-child(2) {
                      text-align: center;
                    }

                  }
                  tr:nth-child(even) {
                    background-color: #cccccc40;

                    &:hover {
                      cursor: pointer;
                      background-color: #cccccc60;
                    }
                  }
                }
              }
            }
          }

          #row-2 {
            width: 74.2%;
            height: 100%;
            background-color: #fff;
            border-radius: 10px;
            border: 2px solid #cccccc40;
          }
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
