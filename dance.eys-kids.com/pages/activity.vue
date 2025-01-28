<template>
  <div class="qa-container">
    <h1>よくあるご質問</h1>
    <div class="qa-item" v-for="(item, index) in qaList" :key="index">
      <div class="question">
        <strong>Q:</strong> {{ item.question }}
      </div>
      <div class="answer">
        <strong>A:</strong> {{ item.answer }}
      </div>
    </div>
    <FooterBanner />
    <router-link to="/ranking" class="view-more-btn">VIEW MORE →</router-link>
  </div>
  <Freetrial />
  <News />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Freetrial from "./freetrial.vue";
import News from "./news.vue";

// TypeScript interface for Q&A items
interface QAItem {
  question: string;
  answer: string;
}
  // Vue ref with TypeScript typing
const qaList = ref<QAItem[]>([
  {
    question: "楽器の経験がないのですが、レッスンについていけますか？",
    answer: "大丈夫です。大人になってから楽器を始められた方が大半です。",
  },
  {
    question: "入会はいつ頃まで途中入会できますか？",
    answer: "年度途中でもご入会いただけます。",
  },
  {
    question: "入会はいつ頃まで途中入会できますか？",
    answer: "年度途中でもご入会いただけます。",
  },
  {
    question: "入会前にレッスンの様子を知りたいのですが？",
    answer: "各コースで体験レッスンをしています。各コースで体験レッスンをしています。",
  },
  {
    question: "楽器の経験がないのですが、レッスンについていけますか？",
    answer: "大丈夫です。大人になってから楽器を始められた方が大半です。",
  },
  {
    question: " 年度途中からでもご入会いただけますか？",
    answer: "楽譜が読めない方にも一から丁寧にお教えいたします。レッスンのスピードも、ご希望に合わせて進めていきますので、インストラクターにご相談ください。楽譜が読めない方にも一から丁寧にお教えいたします。レッスンのスピードも、ご希望に合わせて進めていきますので、インストラクターにご相談ください。楽譜が読めない方にも一から丁寧にお教えいたします。レッスンのスピードも、ご希望に合わせて進めていきますので、インストラクターにご相談ください。"
  }
]); 
</script>

<style scoped>
.qa-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing:content-box;
   display:block; 
   float: none;
line-height: normal;
position: absolute
}

.qa-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.question {
  font-weight: bold;
}

.answer {
  margin-top: 5px;
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
