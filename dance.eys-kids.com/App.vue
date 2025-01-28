<template>
    <div>
      <Navbar />
      <Header />
      <router-view />
      <FooterBanner />
      
      
    </div>
  </template>
  
  <script>
  import Navbar from '/Navbar.vue';
  import FooterBanner from '/components/FooterBanner.vue';
  import Header from '/components/Header.vue';
  
  export default {
    components: { Navbar, FooterBanner, Header },
  };
  </script>
  
  