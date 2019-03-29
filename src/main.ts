import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Welcome from "@/components/Welcome.vue";
import WrongPath from "@/components/WrongPath.vue";
import Reddit from "@/components/Reddit.vue";

Vue.use(VueRouter);

const rprops = {
  msg: "Welcome to Reddit news reader",
  itemsPerPage: 2
};

const routes = [
  { path: '/', component: Welcome },
  { path: '/reddit', component: Reddit, props: rprops },
  { path: '/reddit/after/:after/count/:count', component: Reddit, props: rprops },
  { path: '/reddit/before/:before/count/:count', component: Reddit, props: rprops },
  { path: '*', component: WrongPath }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.config.productionTip = false;

new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app');
