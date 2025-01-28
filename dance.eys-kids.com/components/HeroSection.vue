<template>
    <!-- Fullscreen Background Image -->
    <img src="/static/Panel.png" alt="EYS-Kids" class="h-66 rounded-lg" />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>

    <!-- Centered Content -->
    <div class="relative z-10 text-center text-white px-6">
      <div class="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-2 rounded-lg inline-block">
        4 KARTE
      </div>
      <h1 class="text-6xl font-bold mt-4">充実カルテで モチベーションアップ！</h1>
      <p class="text-lg mt-4">レッスン後は毎回、講師からカルテが届きます</p>
    </div>
</template>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #32d3ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
