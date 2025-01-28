<template>
  <div class="events">
    <h1 class="title">EVENT & WORKSHOP</h1>
    <p class="subtitle">発表会・イベント・ワークショップが充実</p>
    <div class="event-list">
      <div class="event-item" v-for="event in events" :key="event.id">
        <h2>{{ event.name }}</h2>
        <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/event.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/const.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Plans.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Media.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/even.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
        <p>{{ event.description }}</p>
      </div>
     <div class="additional-info">みんなが大好きなバレード曲や、馴染みのある曲を使って、テーマパークでのダンサー経験がある講師がレッスンを担当します！</div></div>
     
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Comments.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Comment.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Video.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Celebration.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/Event-lists.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    </div>
    <FooterBanner />
    <div class="view-more">
    <button @click="viewMore">VIEW MORE</button>
  </div>
</template>

<script>
import FooterBanner from '/components/FooterBanner.vue';

export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/activity");
    },
  },
  name: "Events",
  components: {
    FooterBanner,
  },
  data() {
    return {
      events: [
        { id: 1, name: "Halloween Dance Party", description: "Join us for a spooky dance party!" },
        { id: 2, name: "Christmas Workshop", description: "Celebrate the season with dance!" }
      ]
    };
  }
};
</script>

<style scoped>
.events {
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

.event-list {
  margin-top: 20px;
}

.event-item {
  margin: 15px 0;
}
.additional-info {
    margin-top: 20px;
    font-size: 1em;
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
