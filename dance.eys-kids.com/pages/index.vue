<template>
  <div>
    <HeroSection />
    <ReasonSection />
    <StemSection />
    <LessonSection />
    <Foot1 />
    <AboutSection />
    <ReasonsList />
      <!-- Manually Add the "VIEW MORE" Button -->
      <div class="view-more">
      <button @click="viewMore">VIEW MORE</button>
    </div>
  </div>
</template>

<script>
import HeroSection from '/components/HeroSection.vue';
import ReasonSection from '/components/ReasonSection.vue';
import StemSection from '/components/StemSection.vue';
import LessonSection from '/components/LessonSection.vue';
import Foot from '/components/Foot1.vue';
import AboutSection from '/components/AboutSection.vue';
import ReasonsList from '/components/ReasonsList.vue';

export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/vision");
    },
  },
  components: {
    HeroSection,
    ReasonSection,
    StemSection,
    LessonSection,
    Foot,
    AboutSection,
    ReasonsList,
  }
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
