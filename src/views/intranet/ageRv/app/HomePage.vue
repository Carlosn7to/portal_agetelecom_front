<template>
  <div id="content-app">
    <MenuApp
        :mode="mode"
        :system="'ageRv'"
    />
    <div id="layer-app">
      <HeaderApp
          @mode="modeView"
      />
      <div id="content-page"
           :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
        <div class="sections">
          <div class="section">
            <h1>AgeRv</h1>
            <br>
            <p style="font-size: 2rem">Junte estrelas! Ganhe o infinito com a <b style="color: #FA8A0CFF">AGE!</b></p>
          </div>
          <div class="divisor-block">
            <div class="divisor"></div>
          </div>
          <div class="section">
            <h2>Sobre</h2>
            <br>
            <p>Com o AgeRv, você passa a ser dono da sua comissão remunerável!</p>
            <p>Você vai ganhar pelas vendas e pelos seus indicadores, a soma destes dois vão refletir no
              quão longe você chegará…</p>
          </div>
          <div class="divisor-block">
            <div class="divisor"></div>
          </div>
          <div class="section">
            <h2>Produtos</h2>
            <br>
            <p>Cada produto que você vender valerá uma quantidade específica de estrelas…</p>
            <br>
            <table style="width: 20%;">
              <thead>
                <tr>
                  <th>Plano</th>
                  <th style="text-align: center">Estrela</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>120Mbps</td>
                  <td style="text-align: center">7</td>
                </tr>
                <tr>
                  <td>240Mbps</td>
                  <td style="text-align: center">9</td>
                </tr>
                <tr>
                  <td>360Mbps</td>
                  <td style="text-align: center">11</td>
                </tr>
              </tbody>
            </table>
            <button @click="modal = true">Ver Produtos</button>
          </div>
          <div class="divisor-block">
            <div class="divisor"></div>
          </div>
          <div class="section">
            <h2>Indicadores</h2>
            <br>
            <p>Seus indicadores de qualidade passam a potencializar seus ganhos…</p>
            <br>
            <table  style="width: 50%;">
              <thead>
              <tr>
                <th>Indicador</th>
                <th style="text-align: center">Status</th>
                <th style="text-align: center">Meta</th>
                <th style="text-align: center">Acelerador</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Permanência 7DD</td>
                <td style="text-align: center">Ativo</td>
                <td style="text-align: center">100%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Cobrança Recorrente</td>
                <td style="text-align: center">Em análise</td>
                <td style="text-align: center">60%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Cadastro correto</td>
                <td style="text-align: center">Em análise</td>
                <td style="text-align: center">90%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Assinatura de Contrato</td>
                <td style="text-align: center">Em análise</td>
                <td style="text-align: center">95%</td>
                <td style="text-align: center">10%</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="example">
              <h3>Permanência 7DD</h3>
              <p>A partir da instalação, 100% de seus clientes deverão
                ficar no mínimo 7 dias com o produto ativo para que
                você possa potencializar esse indicador, afinal aqui
                iremos medir a qualidade de sua venda…</p>
              <span>
                Cliente que foi bem atendido fica bem
                mais que 7 dias…
              </span>
            </div>
            <div class="example">
              <h3>Cobrança Recorrente</h3>
              <p>60% de todas as suas vendas deverão ter como
                modalidade de cobrança o débito em conta corrente
                ou cartão de crédito com recorrência.</p>
              <span>
                Fique tranquilo que estamos trazendo
                os principais Bancos para a Age…
              </span>
            </div>
            <div class="example">
              <h3>Cadastro correto</h3>
              <p>90% de todas as suas vendas, o cadastro precisa estar
                perfeito, nome, telefone, e-mail, CPF e tudo o mais
                que for solicitado em nosso formulário precisará estar
                plenamente preenchido…</p>
              <span>
                Queremos sempre ter todas as formas
                de contato com o cliente…
              </span>
            </div>
            <div class="example">
              <h3>Assinatura de contrato</h3>
              <p>Clientes que realizam um compra e sabem o que
                compraram, nunca se negam a assinar seu contrato,
                por isso esperamos que 95% dos seus contratos
                estejam assinados, formalizando o aceite do cliente…</p>
              <span>
              Essa é a forma da Age ter certeza de
              que este cliente está feliz.
            </span>
            </div>
          </div>
          <div class="divisor-block">
            <div class="divisor"></div>
          </div>
          <div class="section">
            <h2>Calculo</h2>
            <br>
            <p>Vamos aprender a calcular…</p>
            <br>
            <table style="width: 20%">
              <thead>
                <tr>
                  <th>Canal</th>
                  <th style="text-align: center">Meta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vendedor 01</td>
                  <td style="text-align: center">60</td>
                </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Percebeu que essa meta só mostra a
              quantidade de produtos?</p>
            <p>O valor da estrela, será definido a partir da sua faixa de meta.</p>
            <br>
            <table style="width: 30%">
              <thead>
                <tr>
                  <th style="text-align: center">% Mínima</th>
                  <th style="text-align: center">% Máxima</th>
                  <th style="text-align: center !important;">Canal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="text-align: center">70%</td>
                  <td style="text-align: center">99%</td>
                  <td style="text-align: center">R$0,90</td>
                </tr>
                <tr>
                  <td style="text-align: center">100%</td>
                  <td style="text-align: center">120%</td>
                  <td style="text-align: center">R$1,20</td>
                </tr>
                <tr>
                  <td style="text-align: center">121%</td>
                  <td style="text-align: center">140%</td>
                  <td style="text-align: center">R$2,00</td>
                </tr>
                <tr>
                  <td style="text-align: center">141%</td>
                  <td style="text-align: center"></td>
                  <td style="text-align: center">R$4,50</td>
                </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Supondo que você atingiu os valores abaixo, vamos simular qual será sua comissão variável.</p>
            <br>
            <table style="width: 35%">
              <thead>
              <tr>
                <th>Planos</th>
                <th style="text-align: center">Quantidade</th>
                <th style="text-align: center">Estrelas</th>
                <th style="text-align: center">Total</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>120Mbps</td>
                <td style="text-align: center">12</td>
                <td style="text-align: center">7</td>
                <td style="text-align: center">84</td>
              </tr>
              <tr>
                <td>240Mbps</td>
                <td style="text-align: center">25</td>
                <td style="text-align: center">9</td>
                <td style="text-align: center">225</td>
              </tr>
              <tr>
                <td>360Mbps</td>
                <td style="text-align: center">20</td>
                <td style="text-align: center">11</td>
                <td style="text-align: center">220</td>
              </tr>
              <tr>
                <td>480Mbps</td>
                <td style="text-align: center">40</td>
                <td style="text-align: center">15</td>
                <td style="text-align: center">600</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Resultado:</p>
            <br>
            <table style="width: 35%">
              <thead>
              <tr>
                <th></th>
                <th style="text-align: center">Valor</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Total de vendas</td>
                <td style="text-align: center">97</td>
              </tr>
              <tr>
                <td>Total de estrelas</td>
                <td style="text-align: center">1129</td>
              </tr>
              <tr>
                <td>Sua meta</td>
                <td style="text-align: center">50</td>
              </tr>
              <tr>
                <td>Meta atingida</td>
                <td style="text-align: center">194%</td>
              </tr>
              <tr>
                <td>Valor da estrela</td>
                <td style="text-align: center">R$4,50</td>
              </tr>
              <tr>
                <td>Valor da comissão</td>
                <td style="text-align: center">R$5.080,50</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Mas e se você percebeu que além de vender os melhores produtos, ele precisa ter qualidade?</p>
            <br>
            <p style="color: #FA8A0C">Momento de acelerar!!!</p>
            <br>
            <table style="width: 40%">
              <thead>
              <tr>
                <th>Indicador</th>
                <th style="text-align: center">% Atingida</th>
                <th style="text-align: center">Acelera</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Permanência 7DD</td>
                <td style="text-align: center">100%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Cobrança Recorrente</td>
                <td style="text-align: center">69%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Cadastro correto</td>
                <td style="text-align: center">100%</td>
                <td style="text-align: center">10%</td>
              </tr>
              <tr>
                <td>Assinatura de contrato</td>
                <td style="text-align: center">97%</td>
                <td style="text-align: center">10%</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Novo resultado:</p>
            <br>
            <table style="width: 35%">
              <thead>
              <tr>
                <th></th>
                <th style="text-align: center">Valor</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Valor da comissão base</td>
                <td style="text-align: center">R$5.080,50</td>
              </tr>
              <tr>
                <td>Acelerador</td>
                <td style="text-align: center">40%</td>
              </tr>
              <tr>
                <td>Valor da comissão final</td>
                <td style="text-align: center">R$7.112,70</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Mas e se você não quis pensar em qualidade?</p>
            <br>
            <table style="width: 40%">
              <thead>
              <tr>
                <th>Indicador</th>
                <th style="text-align: center">% Atingida</th>
                <th style="text-align: center">Acelera</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Permanência 7DD</td>
                <td style="text-align: center">90%</td>
                <td style="text-align: center">-10%</td>
              </tr>
              <tr>
                <td>Cobrança Recorrente</td>
                <td style="text-align: center">30%</td>
                <td style="text-align: center">-10%</td>
              </tr>
              <tr>
                <td>Cadastro correto</td>
                <td style="text-align: center">80%</td>
                <td style="text-align: center">-10%</td>
              </tr>
              <tr>
                <td>Assinatura de contrato</td>
                <td style="text-align: center">30%</td>
                <td style="text-align: center">-10%</td>
              </tr>
              </tbody>
            </table>
            <br>
            <div class="divisor-block" style="height: 1px; width: 100%; margin: 2vh 0">
              <div class="divisor"></div>
            </div>
            <p>Novo resultado:</p>
            <br>
            <table style="width: 35%">
              <thead>
              <tr>
                <th></th>
                <th style="text-align: center">Valor</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Valor da comissão base</td>
                <td style="text-align: center">R$5.080,50</td>
              </tr>
              <tr>
                <td>Deflator</td>
                <td style="text-align: center">-40%</td>
              </tr>
              <tr>
                <td>Valor da comissão final</td>
                <td style="text-align: center">R$3.048,30</td>
              </tr>
              </tbody>
            </table>
            <br>
            <p>Com a Age é assim
              Vendeu bem...
              Vendeu com qualidade...
              <b style="color: #FA8A0C">Você ganha sem limites...</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="modal"
       v-if="modal === true"
       :class="{'mode-l-p' : mode === 'light'  || mode === undefined,
                  'mode-d-p' : mode === 'dark'}">
    <div id="card-modal">
      <div id="close-button">
        <i class="fi fi-rr-cross-small" @click="this.modal = false"></i>
      </div>
      <div class="tables">
        <table>
          <thead>
          <tr>
            <th>Planos</th>
            <th>Tipo</th>
            <th style="text-align: center">Estrelas</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>120Mbps</td>
              <td>Comum</td>
              <td style="text-align: center">7</td>
            </tr>
            <tr>
              <td>240Mbps</td>
              <td>Comum</td>
              <td style="text-align: center">9</td>
            </tr>
            <tr>
              <td>360Mbps</td>
              <td>Comum</td>
              <td style="text-align: center">11</td>
            </tr>
            <tr>
              <td>480Mbps</td>
              <td>Comum</td>
              <td style="text-align: center">15</td>
            </tr>
            <tr>
              <td>480Mbps</td>
              <td>Nova LineUp</td>
              <td style="text-align: center">7</td>
            </tr>
            <tr>
              <td>740Mbps</td>
              <td>Nova LineUp</td>
              <td style="text-align: center">9</td>
            </tr>
            <tr>
              <td>1Gb</td>
              <td>Nova LineUp</td>
              <td style="text-align: center">15</td>
            </tr>
            <tr>
              <td>1Gb Max</td>
              <td>Nova LineUp</td>
              <td style="text-align: center">30</td>
            </tr>
            <tr>
              <td>600Mbps</td>
              <td>Empresarial</td>
              <td style="text-align: center">9</td>
            </tr>
            <tr>
              <td>600Mbps S/F</td>
              <td>Empresarial</td>
              <td style="text-align: center">7</td>
            </tr>
            <tr>
              <td>800Mbps</td>
              <td>Empresarial</td>
              <td style="text-align: center">17</td>
            </tr>
            <tr>
              <td>800Mbps S/F</td>
              <td>Empresarial</td>
              <td style="text-align: center">15</td>
            </tr>
            <tr>
              <td>1Gb</td>
              <td>Empresarial</td>
              <td style="text-align: center">35</td>
            </tr>
            <tr>
              <td>1Gb S/F</td>
              <td>Empresarial</td>
              <td style="text-align: center">33</td>
            </tr>
            <tr>
              <td>Linha ilimitado local</td>
              <td>SVA</td>
              <td style="text-align: center">2</td>
            </tr>
            <tr>
              <td>Linha ilimitado Brasil</td>
              <td>SVA</td>
              <td style="text-align: center">3</td>
            </tr>
            <tr>
              <td>IP FIXO</td>
              <td>SVA</td>
              <td style="text-align: center">3</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";

export default {
  name: "HomePage",
  components: {
    MenuApp,
    HeaderApp
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      month: null,
      modal: false
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getMonth: function () {
      const date = new Date()
      if(date.getMonth() < 10) {
        this.month = '0'+(date.getMonth() + 1)
      } else {
        this.month = (date.getMonth() + 1).toString()
      }
    }
  },
  mounted() {
    this.getMonth()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  .sections {
    padding: 5vh 1vw;
    margin: 1vh 0;
    background-color: #fff;
    @include flex(column, flex-start, initial, 4vh);
    @include sh;
    border-radius: 5px;

    h1 {
      line-height: 1vh;
      color: $age-or !important;
    }

    .divisor-block {
      width: 100%;
      height: 3px;

      .divisor {
        width: 100%;
        height: 100%;
        background-color: #cccccc30;
      }
    }

    .section {
      h2 {
        line-height: 1vh;
        color: $age-bl;
      }

      p {
        font-size: 1.8rem;
        color: $ml-text-light;
      }

      button {
        border: 1px solid $age-bl;
        background-color: $age-bl;
        padding: 5px 10px;
        color: #fff;
        font-weight: 600;
        border-radius: 3px;
        @include tr-p;
        margin: 2vh 0;

        &:hover {
          background-color: #fff;
          color: $age-bl;
        }
      }

      .example {
        margin: 2vh 0;
        h3 {
          font-size: 1.4rem;
          color: $age-bl;
          line-height: 3vh;
        }

        p {
          font-size: 1.4rem;
        }

        span {
          font-size: 1.2rem;
          font-style: italic;
          color: $age-or;
          line-height: 4vh;
        }
      }

      table {
        @include table;
        height: initial;
      }

    }


  }
}

#modal {
  #card-modal {
    width: 70vw;
    height: 60vh;
    .tables {
      @include flex(column, flex-start, center, 15px);
      flex-wrap: wrap;
      width: 100%;
      height: 80%;
      table {
        @include table;
        width: 98%;
        height: 90%;
        tbody {
          max-height: 90%;
          overflow-y: auto;

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



  #card-modal {
    background-color: $md-back-l !important;

    #close-button {
      color: #fff !important;
    }
    table {
      @include tr;
      thead {
        tr {
          background-color: #161819 !important;
          th {
            color: $md-text-light !important;
          }
        }
      }

      tbody {
        tr {
          td {
            color: $md-text-op !important;
          }

          &:nth-child(even) {
            background-color: #1a1a1a !important;
          }
          &:nth-child(odd) {
            background-color: transparent;
          }
        }
      }
    }
  }

  .sections {
    background-color: $md-back-l !important;

    .section {
      h2 {
        color: $md-text-h1 !important;
      }

      p {
        color: $md-text-light !important;
      }

      table {
        @include tr;
        border: 1px solid $age-or;
        thead {
          tr {
            background-color: #161819 !important;
            th {
              color: $md-text-light !important;
            }
          }
        }

        tbody {
          tr {
            td {
              color: $md-text-op !important;
            }

            &:nth-child(even) {
              background-color: #1a1a1a !important;
            }
            &:nth-child(odd) {
              background-color: transparent;
            }
          }
        }
      }

      button {
        background-color: $age-or !important;
        border: 1px solid $age-or !important;

        &:hover {
          border: 1px solid $age-or !important;
          color: $age-or !important;
          background-color: $md-back-l !important;
        }
      }

      .example {
        h3 {
          color: $age-or !important;
        }
      }
    }

    .divisor {
      background-color: rgba(70, 70, 70, 0.17) !important;
    }
  }
}

</style>