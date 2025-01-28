<template>
    <section class="vision-container">
      <h1 class="title">1 VISION</h1>
      <p class="subtitle">EYS-Kidsは、ストリートダンスをパフォーマー育成ではなく、"ダンスを通じた教育"と考えています。</p>
  
      <div class="vision-content">
        <VisionCard title="マナーを身につける" color="green">
          レッスンを通じて、コミュニケーションや協調性が向上します。
        </VisionCard>
        <VisionCard title="自主性を育んじる" color="red">
          発表会の作品や、ユニフォーム作成を自分たちで考え、実践する機会が多くあります。
        </VisionCard>
        <VisionCard title="チームワークと目標達成力を育む" color="blue">
          発表会の作品作りやイベント参加を通して、チームの大切さを学びます。
        </VisionCard>
      </div>
  
      <!-- "View More" Navigation Button -->
      <router-link to="/curriculum" class="view-more-btn">VIEW MORE →</router-link>
      <img src="/static/foot2.png" alt="EYS-Kids Growth" class="reason-img" />
    </section>
  </template>
  
  <script>
  import VisionCard from '@/components/VisionCard.vue';
  
  export default {
    components: { VisionCard }
  };
  </script>
  
  <style scoped>
  .vision-container {
    text-align: center;
    padding: 40px;
    color: white;
    background: black;
  }
  
  .title {
    font-size: 3rem;
    color: #6a5acd;
  }
  
  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .vision-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
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
  