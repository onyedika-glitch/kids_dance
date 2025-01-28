<template>
  <div class="safety-container">
    <h1 class="title">SAFETY</h1>
    <p class="subtitle">心も身体も大切に、安心・安全に徹底配慮！</p>
    
    <div class="flex-container">
      <div class="hexagon">
        <h2>初心者Kidsの気持ちを守る</h2>
        <p>初めてのお子様に配慮したクラスに放り込むことはありません。</p>
      </div>
      <div class="hexagon">
        <h2>挫折させないクラス構成</h2>
        <p>楽しみながら学ぶ、それがEYS-KidsのVisionです。</p>
      </div>
      <div class="hexagon">
        <h2>お子様を怪我から守る</h2>
        <p>大切なお子様の身体をお預かりする観点から、</p>
      </div>
      <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/Firstaid.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>

    </div>

    <router-link to="/usersvoice" class="view-more-btn">VIEW MORE →</router-link>
    <Foot1 />
  </div>
</template>

<script>
import Foot1 from '/components/Foot1.vue';

export default {
  components: {
    Foot1,
  },
};
</script>

<style scoped>
.safety-container {
  text-align: center;
  padding: 40px;
  color: black;
  background: #f9f9f9;
}

.title {
  font-size: 3rem;
  color: #007bff;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.flex-container {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.hexagon {
  position: relative;
  width: 200px;
  height: 100px;
  background: #007bff;
  margin: 20px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.view-more-btn {
  margin-top: 30px;
  display: inline-block;
  padding: 12px 24px;
  color: white;
  background: #007bff;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2rem;
}
</style>
