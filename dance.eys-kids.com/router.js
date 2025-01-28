import { createRouter, createWebHistory } from 'vue-router';

// Import all pages
import home from '/pages/home.vue';
import index from '/pages/index.vue';
import pricing from '/pages/pricing.vue';     
import curriculum from '/pages/curriculum.vue';
import vision from '/pages/vision.vue';
import instructors from '/pages/instructors.vue';
import events from '/pages/events.vue';
import activity from '/pages/activity.vue';
import ranking from '/pages/ranking.vue';
import safety from '/pages/safety.vue';
import user from '/pages/user.vue';
import news from '/pages/news.vue';
import access from '/pages/access.vue';
import freetrial from '/pages/freetrial.vue';
import usersvoice from './pages/usersvoice.vue';


const routes = [
  { path: '/', component: index },
  { path: '/pages/home.vue', component: home },
  { path: '/pages/vision.vue', component: vision },
  { path: '/pages/curriculum.vue', component: curriculum },
  { path: '/pages/pricing.vue', component: pricing },
  { path: '/pages/instructors.vue', component: instructors },
  { path: '/pages/events.vue', component: events },
  { path: '/pages/ranking.vue', component: ranking },
  { path: '/pages/activity.vue', component: activity },
  { path: '/pages/safety.vue', component: safety },
  { path: '/pages/usersvoice.vue', component: usersvoice },
  { path: '/pages/news.vue', component: news },
  { path: '/pages/access.vue', component: access },
  {path:  '/pages/freetrial.vue', component: freetrial},
  
{ path: '/', component: index }, // Keep this as the main entry point
{ path: '/home', component: home }, // Change this to a different path
{ path: '/vision', component: vision },
{ path: '/curriculum', component: curriculum },
{ path: '/pricing', component: pricing },
  { path: '/instructors', component: instructors },
  { path: '/ranking', component: ranking },
  { path: '/events', component: events },
  { path: '/ranking', component: ranking },
  { path: '/activity', component: activity },
  { path: '/safety', component: safety },
  { path: '/usersvoice', component: usersvoice },
  { path: '/news', component: news },
  { path: '/access', component: access },
  {path:  '/freetrial', component: freetrial},
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
