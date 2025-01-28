<template>
  <div class="user-voice">
    <h1 class="title">USER'S VOICE</h1>
    <p class="subtitle">お子様を通わせている親御様に本音を伺いました！</p>
    <div class="speech-bubble">
      <p>代官山教室のダンスレッスンはどうですか？</p>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/View.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/User.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
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
      this.$router.push("/events");
    },
  },
  name: "UserVoice",
  components: {
    FooterBanner,
  }
};
</script>

<style scoped>
.user-voice {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 2.5em;
  color: #007bff; /* Example color */
}

.subtitle {
  font-size: 1.2em;
  margin: 10px 0;
}

.speech-bubble {
  display: inline-block;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  padding: 10px;
  border-radius: 10px;
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
