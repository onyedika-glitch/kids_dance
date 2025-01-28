<template>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/Comm.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>

  <div class="view-more">
    <button @click="viewMore">VIEW MORE</button>
  </div>
</template>

<script>
export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push('/more-info');
    },
  },
};
</script>

<style scoped>
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
</style>
