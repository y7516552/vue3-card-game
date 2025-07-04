import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import HighCardWin from '@/pages/HighCardWin/HighCardWin.vue'
import SurfingCard from '@/pages/SurfingCard/SurfingCard.vue'
import HorseRace from '@/pages/HorseRace/HorseRace.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vue3-card-game',
      name: 'home',
      component: HomeView,
      meta:{
        title:'首頁'
      }
    },
    {
      path: 'vue3-card-game/game',
      name: 'game',
      component: GameView,
      children:[
        {
          path: 'vue3-card-game/game/highCardWin',
          name: 'highCardWin',
          component: HighCardWin,
          meta:{
            title:'比大小',
          }
        },
        {
          path: 'vue3-card-game/game/surfingCard',
          name: 'surfingCard',
          component: SurfingCard,
          meta:{
            title:'衝浪',
          }
        },
        {
          path: 'vue3-card-game/game/horseRace',//HorseRace
          name: 'horseRace',
          component: HorseRace,
          meta:{
            title:'賽馬',
          }
        },
      ]
    }
  ],
})

export default router
