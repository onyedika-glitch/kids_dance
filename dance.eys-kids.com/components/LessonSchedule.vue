<template>
  <section class="lesson-schedule">
    <h2>レッスンスケジュール</h2>
    <div class="calendar">
      <div class="calendar-header">
        <button @click="prevMonth">◀</button>
        <h3>{{ monthYear }}</h3>
        <button @click="nextMonth">▶</button>
      </div>
      <div class="days">
        <div v-for="day in days" :key="day" class="day">{{ day }}</div>
      </div>
      <div class="dates">
        <div v-for="date in monthDates" :key="date" class="date">
          {{ date }}
        </div>
      </div>
    </div>
    <div class="additional-info">
      <p class="bold-text">いつでもどこでも予約できる！</p>
      <p>補講はスマホでサクサク予約</p>
      <p>レッスン予約は会員サイト「SecondCommunity(SC)」より「日付」「インストラクター」「コース」どれからでも予約できて便利！</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
  computed: {
    monthYear() {
      return this.currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    },
    days() {
      return ['日', '月', '火', '水', '木', '金', '土'];
    },
    monthDates() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const dates = [];

      for (let i = 1; i <= lastDay.getDate(); i++) {
        dates.push(i);
      }
      return dates;
    },
  },
  methods: {
    prevMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    },
    nextMonth() {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    },
  },
};
</script>

<style scoped>
.lesson-schedule {
  text-align: center;
  padding: 50px;
}
.calendar {
  display: inline-block;
  margin-top: 20px;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.days {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.dates {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.day, .date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  margin: 2px;
}
</style>