<template>
  <div>
    <PricingComponent />
    <LessonSchedule />
    <Foot4 />
    <Freetrial />
    <News />
    <section class="pricing-system">
      <h2>料金システム</h2>
      <p>「固定制＋無料補講」をご用意。</p>
      <p>固定の教室・決まった日程・時間に受講します。</p>
      <div class="comments">
        <div class="comment">
          <p>レッスンの日が予防接種や検診日と重なってしまった</p>
        </div>
        <div class="comment">
          <p>発熱や体調不良でレッスン日に行けなくなってしまった</p>
        </div>
        <div class="comment">
          <p>固定制でも月謝が無駄になりません。振替レッスンが可能です！</p>
        </div>
      </div>
    </section>
    <router-link to="/home" class="view-more-btn">VIEW MORE →</router-link>
  </div>
</template>

<script>
import PricingComponent from '/components/PricingComponent.vue';
import LessonSchedule from '/components/LessonSchedule.vue';
import Foot4 from '/components/Foot4.vue';
import Freetrial from './freetrial.vue';

export default {
  components: {
    PricingComponent,
    LessonSchedule,
    Foot4,
  },
};
</script>

<style scoped>
/* Add any specific styles for the Pricing page here */
.pricing-system {
  padding: 50px;
  text-align: center;
}
.comments {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.comment {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
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
