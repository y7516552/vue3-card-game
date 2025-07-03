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

const guess = ref('')
const round = ref(5)
const deckList = ref([])
const gameIsOver = ref(false)
const winner = ref({})

const totalResult = computed(() => {
    let message = ''
    let result = '猜錯了...，'
    if(guess.value == winner.value.suit)  result = '猜對了...，'
    message =`${result} ${winner.value.name} 獲勝!!`

    return {
      game:'賽馬',
      message: message,
    }
  }) 

const resetGame = () =>{
  winner.value = {}
  guess.value = ''
  gameIsOver.value = false
  deckList.value =   []
  resetCard()
  cardList.value = cardList.value.filter(e => e.rank !== 'A')
  horseList.value.forEach(item => item.time = 0)
}

onMounted(()=>{
  resetGame()
})


const { name } = useDisplay()

const height = computed(() => {
    switch (name.value) {
    case 'xs': return 120
      case 'sm': return 160
      case 'md': return 160
      case 'lg': return 160
      case 'xl': return 160
      case 'xxl': return 160
    }

    return undefined
  })

  const width = computed(() => {
    switch (name.value) {
      case 'xs': return 180
      case 'sm': return 240
      case 'md': return 240
      case 'lg': return 240
      case 'xl': return 240
      case 'xxl': return 240
    }

    return undefined
  })


  const left =  computed(() => {
    return cardList.value.length
  })

  const dealingcard = () => {
    if(cardList.value.length ==0) gameIsOver.value = true
    let card = cardList.value.shift()
    deckList.value.push(card)
    horseList.value.filter(e=>{
      if(e.suit==card.suit) e.time++
      if(e.time == round.value ) {
        winner.value = e
        gameIsOver.value = true
      }
    })
  }

  const guessing = (suit) => {
    guess.value = suit
  }

</script>

<template>
  <div class="w-100 height-screen ">
    <div class="d-flex flex-column ga-3 justify-center align-center mb-5">
        <h2>賽馬(簡易)</h2>
        <div class="">
          <div class="">
            剩餘牌數: {{left}} 張
          </div>
        </div>
        <div v-if="guess" class="d-flex mb-1">
          <v-btn @click="resetGame" class="mr-1">
            重新開始
          </v-btn>
          <v-btn @click="dealingcard" class="mr-1">
            發牌
          </v-btn>
        </div>
        <div v-if="guess=='' " class=" d-flex ga-3 mb-1">
          <v-btn v-for="(item,index) in horseList" :key="index" :prepend-icon="`mdi-cards-${item.suit}`" @click="guessing(item.suit)" class="mr-1" :class="[item.suit=='heart'||item.suit=='diamond'?'text-red-accent-4':'']">
            {{ item.name }}
          </v-btn>
          </div>
        <div class="position-relative" style="width: 50vw;height: 35vh">
          <div class="d-flex flex-wrap position-relative" style="scale:0.7;">
            <DeckCard v-for="(item, index) in cardList" :key="item" :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="collect"/>
          </div>
          <div class="d-flex flex-wrap position-absolute" style="scale:0.7; right: 25%;">
            <template v-if="deckList.length!==0">
              <DeckCard v-for="(item, index) in deckList" :key="item" :suit="item.suit" :rank="item.rank" :value="item.value" :index="index*-1" is-open="true" status="collect"/>
            </template>
            <div v-else class="border-sm position-absolute" :style="`width: ${height}px;height: ${width}px; `"> </div>
          </div>
        </div>
    </div>
    <div class="d-flex flex-column mb-5">
      <div v-for="horse in horseList" :key="horse.value" class="d-flex" :class="[guess&&guess == horse.suit?'bg-yellow-lighten-3':'']">
        <div v-for="item in round" :key="item" class="border-sm position-relative" :style="`width: ${width}px;height: ${height}px; scale:0.7;`">
          <DeckCard v-if="horse.time == (item-1)" :suit="horse.suit" :rank="horse.rank" :value="horse.value" index="1" status="single" isOpen="true" class="horse" />
        </div>
      </div>
    </div>
    
    <GameDialog :openDialog="gameIsOver" :result="totalResult" @resetGame="resetGame"></GameDialog>
  </div>
</template>

<style>
.horse{
  transform: rotate(90deg) translateX(40%) translateY(-150px);
}
.onFocus{
  background-color: yellow-lighten-3;
}
</style>


