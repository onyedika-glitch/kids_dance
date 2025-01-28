<template>
  <section class="pricing">
    <h2>料金プラン</h2>
    <div class="price-container">
      <div class="price-item" @click="navigateTo('entrance')">
        <h3>入学金</h3>
        <p>¥17,000</p>
      </div>
      <div class="price-item" @click="navigateTo('lesson')">
        <h3>レッスン料</h3>
        <p>¥10,500 / 月</p>
      </div>
      <div class="price-item" @click="navigateTo('transfer')">
        <h3>入学移行手数料</h3>
        <p>¥0</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    navigateTo(type) {
      // Logic to navigate based on the type
      if (type === 'entrance') {
        this.$router.push('/entrance-info');
      } else if (type === 'lesson') {
        this.$router.push('/lesson-info');
      } else if (type === 'transfer') {
        this.$router.push('/transfer-info');
      }
    },
  },
};
</script>
<style scoped>
.pricing {
  text-align: center;
  padding: 50px;
}
.price-container {
  display: flex;
  justify-content: space-around;
}
.price-item {
  margin: 20px;
  cursor: pointer; /* Indicate that it's clickable */
}
</style>