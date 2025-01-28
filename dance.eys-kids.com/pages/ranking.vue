<template>
  <div>
    <h1 class="text-4xl font-bold">Ranking</h1>
    <p class="text-lg">EYSを選んだ決め手は？選んだ理由ランキング</p>
    <ul>
      <li v-for="(item, index) in rankings" :key="index">
        <div class="flex justify-around">
      <div class="ranking-item">
        <div class="pentagon">1位</div>
        <p>ミュージックスタイリスト (99人)</p>
      </div>
      </div>
      <div class="ranking-item">
        <div class="pentagon">2位</div>
        <p>上達保証 (62人)</p>
      </div>
      <div class="ranking-item">
        <div class="pentagon">3位</div>
        <p>補講が無料(40)</p>
      </div>
      <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Rank.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="ranking-item">
        <div class="pentagon">4位</div>
        <p>22時まで営業 (27人)</p>
      </div>
      <div class="ranking-item">
        <div class="pentagon">5位</div>
        <p>無料体験レッスン (22人)</p>
      </div>
      <div class="ranking-item">
        <div class="pentagon">6位</div>
        <p>オーダーメイドレッスン (18人)</p>
      </div>
      <div class="ranking-item">
        <div class="pentagon">7位</div>
        <p>他の生徒さんの印象 (9人)</p>
      </div>
        <h2>{{ item.title }}</h2>
        <p>{{ item.reason }}</p>
      </li>
    </ul>
    <FooterBanner />
    <div class="view-more">
    <button @click="viewMore">VIEW MORE</button>
  </div>
  </div>
</template>

<script>
import FooterBanner from '/components/FooterBanner.vue';

export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/freetrial");
    },
  },
  name: "Ranking",
  components: {
    FooterBanner,
  },
  data() {
    return {
      rankings: [
        { title: 'Ranking 1', reason: 'Reason for ranking 1' },
        { title: 'Ranking 2', reason: 'Reason for ranking 2' },
        { title: 'Ranking 3', reason: 'Reason for ranking 3' },
      ],
    };
  },
};
</script>

<style scoped>
/* Add any specific styles here */
.ranking-item {
  text-align: center;
}

.pentagon {
  width: 100px;
  height: 100px;
  background-color: yellow; /* Change color as needed */
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
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
