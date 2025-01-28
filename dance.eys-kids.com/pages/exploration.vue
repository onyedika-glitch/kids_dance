<template>
    <div>
    <Explore />
    <div class="text-section">
    <p class="subheading">こだわり抜いたデザイン</p>
    <h2 class="main-heading">情操教育にふさわしい<br>洗練された空間の代官山教室</h2>
    <p class="description">
      ヨーロッパの街並みのようなエントランスロビーや、北欧製の照明・インテリア。<br>
      安らぎの観葉植物、ほのかに香るアロマなど細部にまでこだわった温もりある空間が
      お子様だけでなく付き添いのご両親もおもてなしします。
    </p>
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/interior.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="text-section">
    <h2 class="main-heading">業界最先端の<br>最新設備と最新機材</h2>
    <p class="description">
      代官山スタジオはインテリアだけでなく、お子様の安全を第一に考えた設計となっています。<br>
      清潔感のあるスタジオで存分にレッスンをお楽しみください。
    </p>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/ved.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="floor-map-section">
    <h2 class="title">フロアマップ</h2>
    <p class="description">
      フロアマップ中の各ルームをクリックすると<br>
      内部の様子をご覧いただけます。
    </p>
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/loge.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/jed.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/curricle.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <FooterBanner />
  <News />
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/dist.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <FooterBanner />
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/calender.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <Vision />
  <Curriculum />
    </div>
</template>
<script>
import FooterBanner from '/components/FooterBanner.vue';
import News from '/pages/News.vue';
import Curriculum from '/pages/Curriculum.vue';
import Vision from '/pages/vision.vue';

export default {
  name: "Exploration",
  components: {
    FooterBanner,
    News,
    Curriculum,
    Vision,
  },
};

</script>
<style scoped>
.text-section {
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.subheading {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
}

.main-heading {
  font-size: 28px;
  font-weight: bold;
  line-height: 1.6;
  color: #333;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
  margin-top: 15px;
}
.floor-map-section {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #0094D9; /* Blue color */
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-top: 10px;
}
</style>
