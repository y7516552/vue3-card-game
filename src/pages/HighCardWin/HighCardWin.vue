<script setup>
import { ref ,onMounted, computed  } from 'vue';
import { useDisplay } from 'vuetify'
import DeckCard from '@/components/card/DeckCard.vue'

const suits = ["spade", "diamond", "club", "heart"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let [index,value] of ranks.entries()) {
      deck.push({ suit, rank:value , value:index });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

const cardList = ref([]);
const deckList =ref([])


const resetCard = () => {
  const deck = createDeck();
  cardList.value = shuffleDeck(deck)
}

const status = ref("collect")



const winCounts = ref(0)

const lostCounts = ref(0)

const guess = ref('')

const zoom1 = ref({})

const zoom2 = ref({})

const compareResult = ref('')

const gameIsOver = ref(false)


const compareCards = () => {
  if(guess.value == 'higher' && zoom2.value.value > zoom1.value.value) {
    compareResult.value = 'win'
    winCounts.value++
  }
  if(guess.value == 'higher' && zoom2.value.value <= zoom1.value.value) {
    compareResult.value = 'lose'
    lostCounts.value++
  }
  if(guess.value == 'lower' && zoom2.value.value < zoom1.value.value) {
    compareResult.value = 'win'
    winCounts.value++
  }
  if(guess.value == 'lower' && zoom2.value.value >= zoom1.value.value) {
    compareResult.value = 'lose'
    lostCounts.value++
  }
  if(cardList.value.length == 0 ) gameIsOver.value = true
}

const guessing = (answer) => {
  guess.value = answer
}

const resetCompare = () => {
  deckList.value.push(zoom1.value,zoom2.value)
  guess.value =''
  compareResult.value = ''
  zoom1.value = cardList.value.shift()
  zoom2.value = cardList.value.shift()
}

const resetGame = () => {
  winCounts.value = 0
  lostCounts.value = 0
  gameIsOver.value = false
  resetCard()
  resetCompare()
}

const { name } = useDisplay()

const height = computed(() => {
    // name is reactive and
    // must use .value
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

  const width = computed(() => {
    // name is reactive and
    // must use .value
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


onMounted(() => {
  resetGame()
});
</script>


<template>
  <div class="w-100 height-screen">
   
    <div class="d-flex flex-wrap position-relative">
      <DeckCard v-for="(item, index) in cardList" :key="item" :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" :status="status"/>
    </div>
    <div class="h-screen">
      <div class="d-flex flex-column justify-center align-center mb-5">
          <h2>比大小</h2>
          <div class="">
            成績: 
            <div class="">贏: {{ winCounts  }} 場</div>
            <div class="">輸: {{ lostCounts }} 場</div>
          </div>
          <div v-if="guess" class="">
            你的選擇:{{ guess == 'higher'?"大":"小" }}
          </div>
          <div class="">
            結果: {{  compareResult  }}
          </div>
      </div>
      <div class="d-flex justify-center align-center ga-4 mb-5">
        <div class="border-md rounded-lg" :style="[`width: ${width}px;height: ${height}px;`]">
          <DeckCard v-if="zoom1" :suit="zoom1.suit" :rank="zoom1.rank" :value="zoom1.value" index="0" status="single" isOpen="ture"/>
        </div>
        <div class="border-md rounded-lg" :style="[`width: ${width}px;height: ${height}px;`]">
          <DeckCard v-if="zoom2" :suit="zoom2.suit" :rank="zoom2.rank" :value="zoom2.value" index="0" status="collect" :isOpen="compareResult"/>
        </div>
      </div>
      <div v-if="guess==''" class=" d-flex justify-center ga-3">
        <v-btn @click="guessing('higher')" class="mr-1">
          大
        </v-btn>
        <v-btn @click="guessing('lower')" class="mr-1">
          小
        </v-btn>
      </div>
      <div v-if="guess" class=" d-flex justify-center ga-3">
        <v-btn v-if="!compareResult" @click="compareCards" class="mr-1">
          結果
        </v-btn>
        <v-btn v-if="compareResult&&!gameIsOver" @click="resetCompare" class="mr-1">
          再來一場
        </v-btn>
        <v-btn v-if="gameIsOver" @click="resetGame" class="mr-1">
          重新開始
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style>

.flip-cards-enter-active {
  transition: all 0.5s ease-out;
  transform: rotateY(0deg);
}

.flip-cards-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
  transform: rotateY(-180deg);
}

.flip-cards-enter-from{
  transform: rotateY(180deg);
}
.flip-cards-leave-to {
  transform: rotateY(0deg);
}

</style>


