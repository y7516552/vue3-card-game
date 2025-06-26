import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import HighCardWin from '@/pages/HighCardWin/HighCardWin.vue'
import SurfingCard from '@/pages/SurfingCard/SurfingCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/game',
      name: 'game',
      component: GameView,
      children:[
        {
          path: '/game/highCardWin',
          name: 'highCardWin',
          component: HighCardWin,
          meta:{
            title:'比大小',
          }
        },
        {
          path: '/game/surfingCard',
          name: 'surfingCard',
          component: SurfingCard,
          meta:{
            title:'衝浪',
          }
        },
      ]
    }
  ],
})

export default router
