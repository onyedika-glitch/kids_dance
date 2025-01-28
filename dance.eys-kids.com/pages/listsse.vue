<template>
    <div>
    <Instructors />
    <Freetrial />
    <News />
    </div>
</template>
<script>
import Instructors from '/pages/Instructors.vue';
import Freetrial from '/pages/Freetrial.vue';
import News from '/pages/News.vue';

export default {
  name: "List",
  components: {
    Instructors,
    Freetrial,
    News,
  },
};
</script>