<script setup>
import { ref ,onMounted, computed} from 'vue';
import DeckCard from '@/components/card/DeckCard.vue'
import GameDialog from '@/components/GameDialog.vue';
import { useDeckCard } from '@/composable/DeckCard.js'
import { useDisplay } from 'vuetify'

const { cardList, resetCard } = useDeckCard()

const horseList = ref([
  {
    name:'黑桃',
    suit:'spade',
    value:0,
    rank:'A',
    time:0
  },
  {
    name:'菱形',
    suit:'diamond',
    value:0,
    rank:'A',
    time:0
  },
  {
    name:'梅花',
    suit:'club',
    value:0,
    rank:'A',
    time:0
  },
  {
    name:'愛心',
    suit:'heart',
    value:0,
    rank:'A',
    time:0
  }
])

const round = ref(5)
const deckList = ref([])

const resetGame = () =>{
  deckList.value =   []
  resetCard()
  cardList.value = cardList.value.filter(e => e.rank !== 'A')
}

onMounted(()=>{
  resetGame()
})


const { name } = useDisplay()

const height = computed(() => {
    switch (name.value) {
    case 'xs': return 120
      case 'sm': return 160
      case 'md': return 180
      case 'lg': return 200
      case 'xl': return 200
      case 'xxl': return 200
    }

    return undefined
  })

  const width = computed(() => {
    switch (name.value) {
      case 'xs': return 180
      case 'sm': return 240
      case 'md': return 270
      case 'lg': return 300
      case 'xl': return 300
      case 'xxl': return 300
    }

    return undefined
  })


  const left =  computed(() => {
    return cardList.value.length
  })

</script>

<template>
  <div class="w-100 height-screen">
    <div class="d-flex flex-column justify-center align-center mb-5">
        <h2>賽馬</h2>
        <div class="">
          <div class="">
            剩餘牌數: {{left}} 張
          </div>
          <div class="">
          </div>
          <div class="">
              成績: 
          </div>
        </div>
    </div>
    <div class="d-flex flex-column ga-5 mb-5">
      <div v-for="horse in horseList" :key="horse.value" class="d-flex ga-5">
        <div v-for="item in round" :key="item" class="border-sm position-relative" :style="`width: ${width}px;height: ${height}px;`">
          <DeckCard v-if="horse.time == (item-1)" :suit="horse.suit" :rank="horse.rank" :value="horse.value" index="1" status="single" isOpen="true" class="horse"/>
        </div>
      </div>
    </div>
    <div class="">
      <div class="d-flex flex-wrap position-relative">
        <DeckCard v-for="(item, index) in cardList" :key="item" :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="collect"/>
      </div>
    </div>
    <GameDialog :openDialog="gameIsOver" :result="totalResult" @resetGame="resetGame"></GameDialog>
  </div>
</template>

<style>
.horse{
  scale:0.8;
  transform: rotate(90deg) translateX(50%) translateY(-150px);
}
</style>


