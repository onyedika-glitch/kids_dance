<template>
    <div class="community-section">
      <div class="community-badge">7</div>
      <h2 class="community-title">COMMUNITY</h2>
      <p class="community-subtitle">様々なイベントで、<br> 教室外の繋がりも！</p>
      <p class="community-description">
        お子様の教育は、学校、家庭、そして私たち民間スクールのみならず、<br>
        街全体として取り組むことが必要だとEYS-Kidsは考えます。
      </p>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/community.png"class="h-66 rounded-lg" />
  </div>
    <router-link to="/pricing" class="view-more-btn">VIEW MORE →</router-link>
    <FooterBanner />
    <Class />
    <Usersvoice />
    <Events />
  </template>
  <style scoped>
.community-section {
  text-align: center;
  padding: 40px 20px;
}

.community-badge {
  display: inline-block;
  background: linear-gradient(to right, #0094D9, #A16EFF);
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 50%;
}

.community-title {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(to right, #0094D9, #A16EFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 10px 0;
}

.community-subtitle {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.community-description {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-top: 10px;
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
</style>
  