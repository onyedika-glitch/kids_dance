<template>
  <button @click="toggleNavBar" class="bg-blue-500 text-white p-2 mb-4">
      Toggle Navigation
    </button>
    <div v-if="showNavBar" class="bg-blue-500 text-white p-4">
      <ul class="flex flex-col space-y-2">
    <div class="text-lg font-bold">EYS-Kids</div>
      <li><router-link to="/" class="hover:text-gray-300">Index</router-link></li>
      <li><router-link to="/vision" class="hover:text-gray-300">Vision</router-link></li>
      <li><router-link to="/curriculum" class="hover:text-gray-300">Curriculum</router-link></li>
      <li><router-link to="/pricing" class="hover:text-gray-300">Pricing</router-link></li>
      <li><router-link to="/home" class="hover:text-gray-300">Home</router-link></li>
      <li><router-link to="/instructors" class="hover:text-gray-300">Instructors</router-link></li>
      <li><router-link to="/access" class="hover:text-gray-300">Access</router-link></li>
      <li><router-link to="/safety" class="hover:text-gray-300">Safety</router-link></li>
      <li><router-link to="/usersvoice" class="hover:text-gray-300">UsersVoice</router-link></li>
      <li><router-link to="/events" class="hover:text-gray-300">Events</router-link></li>
      <li><router-link to="/activity" class="hover:text-gray-300">Activity</router-link></li>
      <li><router-link to="/ranking" class="hover:text-gray-300">Ranking</router-link></li>
      <li><router-link to="/freetrial" class="hover:text-gray-300">Freetrial</router-link></li>
      <li><router-link to="/news" class="hover:text-gray-300">News</router-link></li>
      <li><router-link to="/listss" class="hover:text-gray-300">Listss</router-link></li>
      <li><router-link to="/explor" class="hover:text-gray-300">Explor</router-link></li>
      <li><router-link to="/exploration" class="hover:text-gray-300">Exploration</router-link></li>
      <li><router-link to="/community" class="hover:text-gray-300">Community</router-link></li>
      <li><router-link to="/explo" class="hover:text-gray-300">Expo</router-link></li>
      <li><router-link to="/lists" class="hover:text-gray-300">Lists</router-link></li>
      <li><router-link to="/listsse" class="hover:text-gray-300">Listsse</router-link></li>
      <li><router-link to="/list" class="hover:text-gray-300">List</router-link></li>
      </ul>
      </div>

</template>
<script>
export default {
  data() {
    return {
      showNavBar: false // Set this to true to show the navigation bar
    };
  },
  methods: {
    toggleNavBar() {
      this.showNavBar = !this.showNavBar;
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
