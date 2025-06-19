<script setup>
import { ref } from 'vue';
// import { useDisplay } from 'vuetify'
import { useDeckCard } from '@/composable/DeckCard.js'
import DeckCard from '@/components/card/DeckCard.vue'

const surfingList = ref([]);

const { cardList, resetCard } = useDeckCard()

const dealCard = () => {
    surfingList.value = cardList.value.splice(0,4)
} 

const restGame = () => {
    // resetCard()
    surfingList.value = cardList.value.splice(0,4)
    console.log(s,cardList.value)
}

const { name } = useDisplay()

// const height = computed(() => {
//     // name is reactive and
//     // must use .value
//     switch (name.value) {
//       case 'xs': return 180
//       case 'sm': return 240
//       case 'md': return 270
//       case 'lg': return 300
//       case 'xl': return 300
//       case 'xxl': return 300
//     }

//     return undefined
//   })

//   const width = computed(() => {
//     // name is reactive and
//     // must use .value
//     switch (name.value) {
//       case 'xs': return 120
//       case 'sm': return 160
//       case 'md': return 180
//       case 'lg': return 200
//       case 'xl': return 200
//       case 'xxl': return 200
//     }

//     return undefined
//   })

</script>

<template>
  <div class="w-100 height-screen">
    <h2>衝浪</h2>
    <div class="">
        <!-- <v-btn @click="resetCard">洗牌</v-btn>
        <v-btn @click="dealCard">發牌</v-btn> -->
    </div>
    <div class="">
        surfingList: {{ surfingList }}
        <div class="d-flex justify-center align-center ga-16 mb-5">
            <!-- <div v-for="item,index in surfingList" :key="item" class="mr-5" >
              <DeckCard  :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="single" isOpen="ture"/>
            </div> -->
        </div>
    </div>
    <div class="">
        cardList:{{ cardList }}
    </div>
  </div>
</template>