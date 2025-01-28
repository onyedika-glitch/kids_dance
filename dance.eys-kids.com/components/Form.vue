<template>
  <div>
    <div v-for="region in regions" :key="region.name" :class="region.class">
      <h2 class="region-title">
        {{ region.name }}
        <span class="count">{{ region.count }}</span>
      </h2>
      <div class="grid-container">
        <div v-for="(location, index) in region.locations" :key="index" class="location-item">
          <label>
            <input type="checkbox" v-model="selectedLocations" :value="location.name" />
            <span class="location-name">{{ location.name }}</span>
            <span class="location-details">{{ location.details }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLocations: [],
      regions: [
        { name: "東京", count: 11, class: "region-tokyo", locations: [{ name: "秋葉原", details: "秋葉原駅から徒歩2分" }, { name: "秋葉原", details: "秋葉原駅から徒歩2分" }] },
        { name: "関東(東京以外)", count: 4, class: "region-kanto", locations: [{ name: "秋葉原", details: "秋葉原駅から徒歩2分" }] },
        { name: "北陸・中部", count: 4, class: "region-chubu", locations: [{ name: "秋葉原", details: "秋葉原駅から徒歩2分" }] },
        { name: "関西", count: 4, class: "region-kansai", locations: [{ name: "秋葉原", details: "秋葉原駅から徒歩2分" }] },
        { name: "北海道", count: 4, class: "region-hokkaido", locations: [{ name: "秋葉原", details: "秋葉原駅から徒歩2分" }] },
      ],
    };
  },
};
</script>

<style scoped>
.region-title {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
}
.count {
  background: white;
  color: black;
  border-radius: 50%;
  padding: 5px 10px;
  margin-left: 10px;
}
.region-tokyo { background: #ff6b6b; }
.region-kanto { background: #ff8e72; }
.region-chubu { background: #17a2b8; }
.region-kansai { background: #f4a261; }
.region-hokkaido { background: #90be6d; }
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}
.location-item {
  background: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.location-name {
  font-weight: bold;
}
.location-details {
  font-size: 0.9rem;
  color: gray;
}
</style>
