<template>
    <div>
    <Pricing />
    <Home />
    <Safety />
    <Instructors />
    </div>
    <router-link to="/pricing" class="view-more-btn">VIEW MORE →</router-link>
</template>
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
  </style>