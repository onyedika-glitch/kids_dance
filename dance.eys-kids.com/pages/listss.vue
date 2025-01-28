<template>
 <div class="bg-grapageient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
      <img src="/static/list.png" alt="EYS-Kids" class="h-66 rounded-lg" />
    </div>
    
<div><Access />
<Safety />
<Freetrial />
<News />
</div>
</template>

<script>
import Access from '/pages/Access.vue';
import Safety from '/pages/Safety.vue';        
import Freetrial from '/pages/Freetrial.vue';
import News from '/pages/News.vue';

export default {
  name: "Listss",
  components: {
    Access,
    Safety,
    Freetrial,
    News,
  },
};
</script>