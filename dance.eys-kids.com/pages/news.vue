<template>
  <div class="news-container">
    <h1 class="news-title">NEWS</h1>
    <p class="news-subtitle">新着ニュース</p>
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/News.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/New.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <FooterBanner />
</template>

<script>
import FooterBanner from '/components/FooterBanner.vue';
export default {
  name: "News",
  components: {
    FooterBanner,
  },
};
</script>


<style scoped>
.news-container {
  text-align: center;
  padding: 20px;
}

.news-title {
  font-size: 2.5em;
  color: #ff5722; /* Example color */
}

.news-subtitle {
  font-size: 1.5em;
  color: #757575; /* Example color */
}
</style>
