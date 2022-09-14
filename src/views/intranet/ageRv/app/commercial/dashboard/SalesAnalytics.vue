<template>
  <div class="loading-bar" v-if="loading === true">
  </div>
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

        <!-- Visão do Diretor/Gerente geral -->
        <template v-if="stage === 'channels'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <div id="month">
              <span :class="{ 'selectMonth' : month === '07' && mode === 'light',
                              'selectMonthDark' : month === '07' && mode === 'dark' }" @click="getAnalytic('07'), month = '07'">Julho</span>
              <span :class="{ 'selectMonth' : month === '08' && mode === 'light',
                              'selectMonthDark' : month === '08' && mode === 'dark' }" @click="getAnalytic('08'), month = '08'">Agosto</span>
              <span :class="{ 'selectMonth' : month === '09' && mode === 'light',
                              'selectMonthDark' : month === '09' && mode === 'dark' }" @click="getAnalytic('09'), month = '09'">Setembro</span>
            </div>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Canal</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <template v-for="(item, key) in ChannelsFiltered" :key="key">
              <div class="items-body">
                <div class="item" style="justify-content: flex-start">
                  <span>{{ item.channel }}</span>
                </div>
                <div class="item">
                  <span>{{ item.salesTotal.count }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                    {{ item.salesCancelled.count }}
                  </span>
                  <span v-else>{{ item.salesCancelled.count }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                  <span v-else>{{ item.starsTotal }}</span>
                </div>
                <div class="item">
                  <span style="background-color: #24A527; color: #fff"
                        v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                  <span v-else>R${{ item.commission }}</span>
                </div>
                <div class="item">
                  <i class="fi fi-rr-users" @click="tradeStage(item.supervisors, 'supervisors')"></i>
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-if="stage === 'supervisors'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <button @click="stage = 'channels', search = ''">Voltar</button>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in SupervisorsFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.supervisor }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info" @click="extractView('supervisor', item.salesTotal.extract)"></i>
                <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'sellers')"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="stage === 'sellers'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <button @click="stage = 'supervisors', search = ''">Voltar</button>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Vendedor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in SellersFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.seller }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item">
                <i class="fi fi-rr-info" @click="extractView('seller', item.salesTotal.extract)"></i>
              </div>
            </div>
          </div>
        </template>

        <!-- Visão do Supervisor -->
        <template v-if="stage === 'supervisor'">
          <div id="filters">
            <div id="month">
              <span :class="{ 'selectMonth' : month === '07' }" @click="getAnalytic('07'), month = '07'">Julho</span>
              <span :class="{ 'selectMonth' : month === '08' }" @click="getAnalytic('08'), month = '08'">Agosto</span>
              <span :class="{ 'selectMonth' : month === '09' }" @click="getAnalytic('09'), month = '09'">Setembro</span>
            </div>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body">
              <div class="item" style="justify-content: flex-start">
                <span>{{ dataStage.supervisor }}</span>
              </div>
              <div class="item">
                <span>{{ dataStage.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ dataStage.meta }}</span>
              </div>
              <div class="item">
                <span>{{ dataStage.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="dataStage.salesCancelled.count > 0">
                  {{ dataStage.salesCancelled.count }}
                </span>
                <span v-else>{{ dataStage.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="dataStage.commission !== '0,00'">{{ dataStage.starsTotal }}</span>
                <span v-else>{{ dataStage.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="dataStage.commission !== '0,00'">R${{ dataStage.valueStar }}
                </span>
                <span v-else>{{ dataStage.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="dataStage.deflator === 10 && dataStage.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ dataStage.deflator }}%
                </span>
                <span v-else-if="dataStage.deflator === -10 && dataStage.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ dataStage.deflator }}%
                </span>
                <span v-else>{{ dataStage.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="dataStage.commission !== '0,00'">R${{ dataStage.commission }}</span>
                <span v-else>R${{ dataStage.commission }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info" @click="extractView('supervisor', item.salesTotal.extract)"></i>
                <i class="fi fi-rr-users" @click="tradeStage(dataStage.sellers, 'sellers-sup')"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="stage === 'sellers-sup'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <button @click="stage = 'supervisor', search = ''">Voltar</button>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Vendedor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in SellersFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.seller }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item">
                <i class="fi fi-rr-info" @click="extractView('seller', item.salesTotal.extract)"></i>
              </div>
            </div>
          </div>
        </template>

        <!-- Visão do Gerente -->
        <template v-if="stage === 'management'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <div id="month">
              <span :class="{ 'selectMonth' : month === '07' }" @click="getAnalytic('07'), month = '07'">Julho</span>
              <span :class="{ 'selectMonth' : month === '08' }" @click="getAnalytic('08'), month = '08'">Agosto</span>
              <span :class="{ 'selectMonth' : month === '09' }" @click="getAnalytic('09'), month = '09'">Setembro</span>
            </div>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Supervisor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in SupervisorsFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.supervisor }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item" style="gap: 5px">
                <i class="fi fi-rr-info" @click="extractView('supervisor', item.salesTotal.extract)"></i>
                <i class="fi fi-rr-users" @click="tradeStage(item.sellers, 'sellers-mng')"></i>
              </div>
            </div>
          </div>
        </template>
        <template v-if="stage === 'sellers-mng'">
          <div id="filters">
            <input type="text"
                   name="search"
                   id="search"
                   autocomplete="off"
                   placeholder="Pesquisar"
                   v-model="search">
            <button @click="stage = 'management', search = ''">Voltar</button>
          </div>
          <div class="items-header">
            <div class="item" style="justify-content: flex-start">
              <span>Vendedor</span>
            </div>
            <div class="item">
              <span>Vendas</span>
            </div>
            <div class="item">
              <span>Meta</span>
            </div>
            <div class="item">
              <span>Meta atingida</span>
            </div>
            <div class="item">
              <span>Canceladas</span>
            </div>
            <div class="item">
              <span>Estrelas</span>
            </div>
            <div class="item">
              <span>Valor da estrela</span>
            </div>
            <div class="item">
              <span>Acelerador/ <br> Deflator</span>
            </div>
            <div class="item">
              <span>Comissão</span>
            </div>
            <div class="item">
              <span>Ações</span>
            </div>
          </div>
          <div class="container-body">
            <div class="items-body" v-for="(item, key) in SellersFiltered" :key="key">
              <div class="item" style="justify-content: flex-start">
                <span>{{ item.seller }}</span>
              </div>
              <div class="item">
                <span>{{ item.salesTotal.count }}</span>
              </div>
              <div class="item">
                <span>{{ item.meta }}</span>
              </div>
              <div class="item">
                <span>{{ item.metaPercent }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #F44336; color: #fff" v-if="item.salesCancelled.count > 0">
                  {{ item.salesCancelled.count }}
                </span>
                <span v-else>{{ item.salesCancelled.count }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FEA11D; color: #fff" v-if="item.commission !== '0,00'">{{ item.starsTotal }}</span>
                <span v-else>{{ item.starsTotal }}</span>
              </div>
              <div class="item">
                <span style="background-color: #FECA1D; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.valueStar }}
                </span>
                <span v-else>{{ item.valueStar }}</span>
              </div>
              <div class="item">
                <span v-if="item.deflator === 10 && item.commission !== '0,00'"
                      style="background-color: #24A527; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else-if="item.deflator === -10 && item.commission !== '0,00'"
                      style="background-color: #911515; color: #fff;">
                  {{ item.deflator }}%
                </span>
                <span v-else>{{ item.deflator }}%</span>
              </div>
              <div class="item">
                <span style="background-color: #24A527; color: #fff"
                      v-if="item.commission !== '0,00'">R${{ item.commission }}</span>
                <span v-else>R${{ item.commission }}</span>
              </div>
              <div class="item">
                <i class="fi fi-rr-info" @click="extractView('seller', item.salesTotal.extract)"></i>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <div id="modal" v-if="extract.status === true && extract.stage === 'supervisor'">
    <div id="card-modal">
      <ExtractView
        :items="extract.data"
        :mode="mode"
        @close-page="closePage()"
      />
    </div>
  </div>
  <div id="modal" v-if="extract.status === true && extract.stage === 'seller'">
    <div id="card-modal">
      <ExtractView
          :items="extract.data"
          :mode="mode"
          @close-page="closePage()"
      />
    </div>
  </div>
</template>

<script>

import MenuApp from "@/components/portal/_aux/MenuApp";
import HeaderApp from "@/components/portal/_aux/HeaderApp";
import Cookie from "js-cookie";
import {AXIOS} from "../../../../../../../services/api.ts";
import ExtractView from "@/components/ageRv/dashboards/ExtractView";
import {mapGetters} from "vuex";

export default {
  name: "SalesAnalytics",
  components: {
    MenuApp,
    HeaderApp,
    ExtractView
  },
  data () {
    return {
      mode: Cookie.get('mode'),
      loading: true,
      data: {},
      dataStage: {
        channels: {},
        supervisors: {},
        sellers: {}
      },
      stage: '',
      extract: {
        status: false,
        stage: null,
        data: {}
      },
      search: '',
      month: null,
      rule: 'actual',
    }
  },
  methods: {
    modeView: function (mode) {
      this.mode = mode
    },
    getAnalytic: function (month) {

      this.loading = true
      this.data = {}
      this.stage = ''
      this.search = ''

      AXIOS({
        method: 'GET',
        url: 'agerv/analytics',
        headers: {
          'Authorization': 'Bearer '+Cookie.get('token')
        },
        params: {
          month: month
        }
      }).then((res) => {

        if(this.permissions.function === 'Gerente geral' || this.permissions.function === 'Diretoria' ||
            this.permissions.permission === 'Master') {
            this.data = res.data
            this.stage = 'channels'
            this.loading = false
        }

        if(this.permissions.function === 'Supervisor') {
          this.dataStage = res.data
          this.stage = 'supervisor'
          this.loading = false
        }

        if(this.permissions.function === 'Gerente') {
          this.dataStage = res.data
          this.stage = 'management'
          this.loading = false
        }


      }).catch((error) => {
        console.log(error)
      })
    },
    tradeStage: function (data, type) {
      if(type === 'channels') {
        this.dataStage.channels = data
      }

      if(type === 'supervisors' || type === 'supervisor' || type === 'supervisors-mng') {
        this.dataStage.supervisors = data
      }

      if(type === 'sellers' || type === 'sellers-sup' || type === 'sellers-mng') {
        this.dataStage.sellers = data
      }

      this.stage = type
    },
    extractView: function (stage, sales) {
      this.extract.status = true
      this.extract.stage = stage
      this.extract.data.sales = sales
    },
    getMonth: function () {
      const date = new Date()
      if (date.getMonth() < 10) {
        this.month = '0' + (date.getMonth() + 1)
      } else {
        this.month = (date.getMonth() + 1).toString()
      }

      this.getAnalytic(this.month)
    },
    closePage: function () {
      this.extract.status = false
      this.extract.stage = null
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    ChannelsFiltered: function () {
      let values = []
      values = this.data.channels.filter((value) => {
        return (
            value.channel.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
    SupervisorsFiltered: function () {
      let values = []

      values = this.dataStage.supervisors.filter((value) => {
        return (
            value.supervisor.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })

      return values
    },
    SellersFiltered: function () {
      let values = []
      values = this.dataStage.sellers.filter((value) => {
        return (
            value.seller.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        )
      })
      return values
    },
  },
  mounted() {
    this.getMonth()
  }
}
</script>

<style scoped lang="scss">

#content-page {
  @include flex(column, flex-start, initial, 0vh);

  #filters {
    width: 100%;
    height: 10%;
    @include flex(row, flex-start, center, 15px);

    button {
      padding: 7px 30px;
      border-radius: 3px;
      font-weight: 600;
      @include tr-p;
    }

    input[type=text] {
      width: 25%;
      padding: 10px 8px;
      border-radius: 5px;
      outline: none;
      border: none;
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

      &:focus {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;      }
    }

    #month {
      @include flex(row, flex-start, center, 5px);
      span {
        font-size: 1.4rem;
        border-radius: 5px;
        padding: 5px 10px;
        @include tr-p;

      }
    }

    .selectMonth {
      color: #fff !important;
      background-color: $age-bl !important;
      border: 1px solid $age-bl !important;

      &:hover {
        opacity: .9;
      }
    }
  }

  .items-header {
    @include table-card-headers;
  }

  .container-body {
    @include table-card-body;
  }
}

.mode-l-p {
  background-color: $ml-back-l;
  @include tr;

  button {
    background-color: $age-bl;
    color: #fff;
    border: 1px solid $age-bl;

    &:hover {
      border: 1px solid $age-bl;
      background-color: #fff;
      color: $age-bl;
    }
  }

  #month {
    @include flex(row, flex-start, center, 5px);
    span {
      font-size: 1.4rem;
      border-radius: 5px;
      background-color: #fff;
      color: $age-bl;
      border: 1px solid $age-bl;
      padding: 5px 10px;
      @include tr-p;

      &:hover {
        background-color: $age-bl;
        color: #fff;
      }
    }
  }
}

.mode-d-p {
  background-color: #161819;
  @include tr;

  button {
    background-color: $age-or;
    color: #fff;
    border: 1px solid $age-or;

    &:hover {
      border: 1px solid $age-or;
      background-color: $md-back-l;
      color: $age-or;
    }
  }


  input[type=text] {
    background-color: $md-back-l !important;
    border: 1px solid $age-or !important;
    color: #fff;
  }

  /*   PLACEHOLDER   */
  ::-webkit-input-placeholder {
    color: $ml-text-light !important;
    font-weight: 600;
    font-size: 1.4rem;
  }


  .items-body {
    background-color: $md-back-l !important;
    border-color: $md-back-l !important;

    &:hover {
      border-color: $age-or !important;
    }

    .item {
      span {
        color: #fff !important;
      }
    }
  }

  #month {
    span {
      background-color: $md-back-l;
      border: 1px solid $age-or;
      color: $age-or;
    }
  }

  .selectMonthDark {
    background-color: $age-or !important;
    color: #fff !important;
  }
}

.loading-bar {
  @include bar;
}

#modal {
  #card-modal {
    width: 95vw;
    height: 95vh;
    background-color: $back-main;
  }
}
</style>