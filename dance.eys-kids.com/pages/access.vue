<template>
  <div class="access">
    <h1>ACCESS</h1>
    <p>駅チカで通いやすい、全国31スタジオ展開中！</p>
    <p>お子様のベストなレッスンのために、こだわり抜いたスタジオをご用意しています。</p>
    
    <div class="pickup-section">
      <h2>PICK UP</h2>
      <button>銀座スタジオ</button>
    </div>

    <div class="info-container">
      <div class="top-logo">
        <span>新規 OPEN</span>
      </div>
      <div class="info-content">
        <p>dummy ×実際のスタジオ写真を入れてください</p>
      </div>
    </div>

    <div class="additional-info">
      <div class="info-box">
        <p>dummy ※実際のスタジオ写真を入れてください</p>
      </div>
    </div>

    <div class="flex-navigation">
      <h2>All studio</h2>
      <div class="studio-buttons">
        <button class="studio-button">北海道・東北 (1)</button>
        <button class="studio-button">東京 (11)</button>
        <button class="studio-button">関東(東京以外) (4)</button>
        <button class="studio-button">北陸・中部 (3)</button>
        <button class="studio-button">関西 (5)</button>
      </div>
      <div class="flex-navigation">
  <h2>All studio</h2>
  <div class="studio-buttons">
    <button class="studio-button">北海道 (1)</button>
    <button class="studio-button">東京都 (11)</button>
    <button class="studio-button">神奈川県 (2)</button>
    <button class="studio-button">埼玉県 (1)</button>
    <button class="studio-button">千葉県 (1)</button>
    <button class="studio-button">新潟県 (1)</button>
    <button class="studio-button">愛知県 (1)</button>
    <button class="studio-button">大阪府 (4)</button>
    <button class="studio-button">京都府 (1)</button>
  </div>
  <button class="studio-button">北海道・東北の教室</button>
</div>
<div class="studio-info">
  <h3>WeArt 銀座</h3>
  <p>東京都中央区銀座1丁目8-19ギャラリー銀座 6F</p>
  <p>東京メトロ銀座一丁目駅 9番出口より徒歩1分</p>
</div>
<div class="studio-infos">
  <h3>東京の教室</h3>
</div>
<div class="studio-info">
  <h3>WeArt 銀座</h3>
  <p>東京都中央区銀座1丁目8-19ギャラリー銀座 6F</p>
  <p>東京メトロ銀座一丁目駅 9番出口より徒歩1分</p>
</div>
<div class="studio-infos">
  <h3>関東(東京以外)の教室</h3>
</div>
<div class="studio-info">
  <h3>WeArt 銀座</h3>
  <p>東京都中央区銀座1丁目8-19ギャラリー銀座 6F</p>
  <p>東京メトロ銀座一丁目駅 9番出口より徒歩1分</p>
</div>
<div class="studio-infos">
  <h3>北陸・中部の教室</h3>
</div>
<div class="studio-info">
  <h3>WeArt 銀座</h3>
  <p>東京都中央区銀座1丁目8-19ギャラリー銀座 6F</p>
  <p>東京メトロ銀座一丁目駅 9番出口より徒歩1分</p>
</div>
<div class="studio-infos">
  <h3>東京の教室</h3>
</div>
<div class="studio-info">
  <h3>WeArt 銀座</h3>
  <p>東京都中央区銀座1丁目8-19ギャラリー銀座 6F</p>
  <p>東京メトロ銀座一丁目駅 9番出口より徒歩1分</p>
</div>
    </div>
    <div class="view-more">
    <button @click="viewMore">VIEW MORE</button>
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    viewMore() {
      // Logic to navigate to more information
      this.$router.push("/safety");
    },
  },
  name: 'AccessComplete',
};
</script>

<style scoped>
.access {
  padding: 20px;
  text-align: center;
  background-color: #f0f0f0; /* Light background for visibility */
}
h1 {
  color: #007bff; /* Blue color for the title */
}
.pickup-section {
  margin-top: 20px;
  background-color: #e0e0e0; /* Light gray background for the pickup section */
  padding: 10px;
  border-radius: 5px;
}
.info-container {
  background-color: white; /* White background for the info container */
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
.top-logo {
  background-color: #007bff; /* Blue background for the logo section */
  color: white; /* White text color */
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
}
.info-content {
  margin-top: 10px;
}
.additional-info {
  margin-top: 20px;
}
.info-box {
  background-color: #333; /* Dark background for the additional info */
  color: white; /* White text color */
  padding: 10px;
  border-radius: 5px;
}
.flex-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.studio-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.studio-button {
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 5px;
  cursor: pointer;
}
.studio-info {
  background-color: #e0e0e0; /* Light gray background */
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: left; /* Align text to the left */
}
.studio-infos {
  background-color: #ffcccc; /* Light red background */
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: center; /* Center align text */
}
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
