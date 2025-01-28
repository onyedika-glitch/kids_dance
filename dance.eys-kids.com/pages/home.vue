<template>
  <div class="bg-white">
    <HeroSection />
    <KarteInfo />
    <FeaturesGrid />
    <FooterBanner />
    <div class="view-more">
      <button @click="viewMore">VIEW MORE</button>
    </div>
  </div>
</template>

<script>
import HeroSection from '/components/HeroSection.vue';
import KarteInfo from '/components/KarteInfo.vue';
import FeaturesGrid from '/components/FeaturesGrid.vue';
import FooterBanner from '/components/FooterBanner.vue';

export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/instructors");
    },
  },
  components: {
    HeroSection,
    KarteInfo,
    FeaturesGrid,
    FooterBanner,
  },
};
</script>
<style scoped>
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
