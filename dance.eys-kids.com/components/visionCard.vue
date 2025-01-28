<template>
    <div class="vision-card" :class="color">
      <h2 class="vision-title">{{ title }}</h2>
      <p class="vision-text"><slot></slot></p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      color: String
    }
  };
  </script>
  
  <style scoped>
  .vision-card {
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .vision-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .green {
    border: 2px solid #00ff00;
  }
  .red {
    border: 2px solid #ff0000;
  }
  .blue {
    border: 2px solid #0099ff;
  }
  </style>
  