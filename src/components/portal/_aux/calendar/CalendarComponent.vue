<template>
  <div class="calendar-container">
    <div id="calendar">
      <table>
        <caption>
          <div class="items">
            <button @click="prevMonth"><i class="fi fi-sr-angle-left"></i></button>
            <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
            <button @click="nextMonth"><i class="fi fi-sr-angle-right"></i></button>
          </div>
        </caption>
        <thead>
        <!-- Cabeçalho com os nomes dos dias da semana -->
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
        </thead>
        <tbody>
        <!-- Corpo da tabela com as semanas e dias do calendário -->
        <tr v-for="(week, index) in weeks" :key="index">
          <td v-for="day in week" :key="day.date"
              @click="selectDay(day); getData(day)">
            <template v-if="day.date === daySelected">
              <div class="day">
                {{ day.date }}
              </div>
            </template>
            <template v-else>
              <div>
                {{ day.date }}
              </div>
            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  props: ['pendingConsult'],
  emits: ['getDateFilter'],
  data() {
    return {
      // Array com os nomes dos meses
      monthNames: [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ],
      // Array com os nomes dos dias da semana
      daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      // Variáveis para armazenar o ano e mês atual
      currentYear: null,
      currentMonth: null,
      // Array com as semanas do calendário
      weeks: [],
      daySelected: ''
    };
  },
  mounted() {
    // Obtém a data atual
    const date = new Date();
    // Define o ano e mês atual com base na data atual
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
    // Gera o calendário inicial
    this.displayCalendar();
  },
  methods: {
    // Função para gerar o calendário
    displayCalendar() {
      // Obtém o número de dias no mês atual
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      // Obtém o dia da semana do primeiro e último dia do mês atual
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const lastDay = new Date(this.currentYear, this.currentMonth, daysInMonth).getDay();

      // Array para armazenar as semanas do calendário
      const weeks = [];
      let week = [];

      // Adiciona dias em branco no início do calendário
      for (let i = 0; i < firstDay; i++) {
        week.push({});
      }

      // Adiciona os dias do mês atual
      for (let day = 1; day <= daysInMonth; day++) {
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
        week.push({ date: day });
      }

      // Adiciona dias em branco no final do calendário
      for (let i = lastDay + 1; i <= 6; i++) {
        week.push({});
      }

      weeks.push(week);
      // Atualiza o array de semanas do calendário
      this.weeks = weeks;

      // Salva o dia atual
      this.selectDay({ date: new Date().getDate() })
    },
    // Verifica se o dia é o dia atual
    isCurrentDay(day) {
      const currentDate = new Date();
      return (
          day.date === currentDate.getDate() &&
          this.currentMonth === currentDate.getMonth() &&
          this.currentYear === currentDate.getFullYear()
      );
    },
    // Verifica se o dia pertence ao mês atual
    isCurrentMonth() {
      const currentDate = new Date();
      return (
          this.currentMonth === currentDate.getMonth() &&
          this.currentYear === currentDate.getFullYear()
      );
    },
    // Navega para o mês anterior
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth--;
      }
      // Atualiza o calendário
      this.displayCalendar();
    },
    // Navega para o próximo mês
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth++;
      }
      // Atualiza o calendário
      this.displayCalendar();
    },
    // Função chamada ao clicar em um dia do calendário
    selectDay(day) {


      if(! this.pendingConsult) {
        this.daySelected = day.date
      }

    },
    getData(day) {

      let year = this.currentYear
      let month = this.currentMonth + 1 < 10 ? `0${this.currentMonth + 1}` : this.currentMonth + 1
      let dayFormatted = day.date < 10 ? `0${day.date}` : day.date

      if(! this.pendingConsult) {
        this.$emit('getDateFilter',  `${year}-${month}-${dayFormatted}`)
      } else {
        alert("aguarde a consulta!")
      }
    }
  }
}
</script>

<style scoped lang="scss">

.calendar-container {
  height: 100%;
  padding: 1vh 1vw;
  background-color: #fff;
  border-radius: 10px;

  #calendar {
    width: 100%;
    height: 100%;
    @include flex(column, center, center, 0);

    table {
      width: 100%;
      height: 80%;
      border-collapse: collapse;

      caption {
        width: 100%;

        .items {
          @include flex(row, space-evenly, center, 0);
          padding: 2vh 1vw;

          span {
            font-size: 1.4rem;
            color: $h1-black;
            font-weight: 500;
          }

          button {
            outline: none;
            background-color: transparent;
            border: none;

            i {
              font-size: 1.2rem;
              color: $primary;
              cursor: pointer;

              &:hover {
                color: $primary-hover;
              }
            }
          }
        }
      }

      thead {
        tr {

          th {
            font-size: 1.2rem;
            color: $h1-light;
            font-weight: 500;
            padding: 1vh 0;
            border-bottom: 2px solid $border;
          }
        }
      }

      tbody {
        tr {

          td {
            font-size: 1.2rem;
            color: $h1-black;
            font-weight: 500;
            text-align: center;
            cursor: pointer;

            &:hover {
              color: $primary-hover;
              transform: scale(1.2);
            }


          }

          .day {
            color: $primary-hover;
            font-weight: 600;
            transform: scale(1.2);
          }
        }
      }
    }
  }
}

.mode-dark {

  .calendar-container {

    background-color: $dark-mode-card;

    #calendar {

      table {
        caption {
          .items {
            span {
              color: $h1-white;
            }
          }
        }
        thead {
          tr {
            th {
              color: $dark-mode-text-primary;
            }
          }
        }

        tbody {
          tr {
            td {
              color: $dark-mode-text-secondary;

              &:hover {
                color: $h1-white;
              }
            }
          }
        }

      }

    }

  }
}

</style>