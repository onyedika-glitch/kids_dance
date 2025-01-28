<template>
  <div class="instructors">
    <div class="hero-content">
      <h1>パフォーマーではなく、教育者としてのダンサーを揃えています。</h1>
      <p>成長著しいKidsのスキル＆個性を最大限引き出すインストラクターをご紹介。</p>
      <button>お子様にピッタリのインストラクターが見つかります！</button>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/inst.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="instructor-list">
      <InstructorCard v-for="instructor in instructors" :key="instructor.id" :instructor="instructor" />
    </div>
    <div class="additional-info">
      <h2>お子さまの成長に責任を持つインストラクターはみんな子供が大好き</h2>
      <p>優れたダンサーであること、講師として優れているかどうかは別のものですが、EYS-Kidsに在籍しているスタッフは、講師としてもダンサーとしても、自信をもって勧められる高いレベルです。</p>
    </div>
    <div class="booking-info">
      <div class="card red">
        <h3>講師の満足度をチェック！</h3>
        <p>EYSでは会員様から寄せられた講師の満足度を公開しています。</p>
      </div>
      <div class="card orange">
        <h3>ENJOY保証で安心！</h3>
        <p>満足できなかったレッスンは、別の講師で無料でレッスンをやり直します。</p>
      </div>
    </div>
    <div class="lesson-booking">
      <img src="/static/lesson-booking.png" alt="Lesson Booking" />
      <h3>レッスンを予約しよう</h3>
      <p>希望の条件を選んで、レッスンを予約しましょう。</p>
    </div>
    <div class="comment">
      <p>先生たちも最初は初心者。だからこそ、EYS-Kidsのレッスンも、気持ちを大事に親身に教えられます。</p>
    </div>
    <div class="kite-comment">
      <div class="kite">
        <p>インストラクターの先生は、みんな子供が大好き！</p>
      </div>
    </div>
    <div class="final-comment">
      <p>優れたダンサーであること、講師として優れているかどうかは別の問題ですが、EYS-Kidsに在籍しているスタッフは、講師としてもダンサーとしても、自信をもって進められる高いレベルの方ばかりです。</p>
    </div>
    <div class="view-more">
    <button @click="viewMore">VIEW MORE</button>
  </div>
  </div>
</template>

<script>
import InstructorCard from '/components/card/InstructorCard.vue';

export default {
    methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/access");
    },
  },
  components: {
    InstructorCard,
  },
  data() {
    return {
      instructors: [
        { id: 1, name: 'Instructor 1', description: 'Description for Instructor 1' },
        { id: 2, name: 'Instructor 2', description: 'Description for Instructor 2' },
        // Add more instructors as needed
      ],
    };
  },
};
</script>

<style scoped>
.instructors {
  padding: 20px;
  background-color: #007bff; /* Full blue background */
  color: white; /* Text color for visibility */
}
.hero-content {
  text-align: center;
  padding: 50px 0;
}
.instructor-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.additional-info {
  background-color: white; /* Full white background */
  color: black; /* Text color for visibility */
  padding: 20px;
  margin-top: 20px;
  text-align: center;
}
.booking-info {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.card {
  padding: 20px;
  border-radius: 8px;
  color: white;
}
.card.red {
  background-color: #ff4d4d; /* Red background */
}
.card.orange {
  background-color: #ffcc00; /* Orange background */
}
.lesson-booking {
  text-align: center;
  margin-top: 20px;
}
.lesson-booking img {
  max-width: 100%;
  height: auto;
}
.comment {
  text-align: center;
  margin-top: 20px;
  color: red; /* Comment text color */
}
.kite-comment {
  text-align: center;
  margin-top: 20px;
}
.kite {
  display: inline-block;
  background-color: #007bff; /* Kite background color */
  color: white; /* Kite text color */
  padding: 10px;
  border-radius: 8px;
  transform: rotate(-5deg); /* Slight rotation for kite effect */
}
.final-comment {
  text-align: center;
  margin-top: 20px;
}
.view-more {
  text-align: center;
  margin: 20px;
}
button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.view-more {
  margin-top: 20px;
  text-align: center;
}

.view-more button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-more button:hover {
  background-color: #0056b3;
}
</style>
