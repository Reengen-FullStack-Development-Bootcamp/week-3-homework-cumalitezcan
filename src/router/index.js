import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component:()=>import("../views/Home.vue")
  },
  
  {
    path: `/symbol/:symbol/:moment`,
    name: "Search",
    component:()=>import("../views/Search.vue")
  },
  {
    path:'/admin',
    name:'Admin',
    component: ()=> import('../views/Admin.vue')
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
