import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import {userStore} from "../stores/userStore"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta:
      {
        auth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },,
    {
      path: "/videroom/:id",
      name: "videoroom",
      component: ()=> import('../views/VideoRoomView.vue'),
      meta:{
        auth: true,
      }
    },
  ],
});

router.beforeEach((to, from, next)=>{
  const user = userStore();
  
  if(to.meta?.auth){
    if(user.user){
     
      next()
    }else{
      return next({name: 'login'})
    }
  }else {
    if(user.user){
      next({name: 'home'});
    }else{
      next();
    }
  } 
})

export default router;
