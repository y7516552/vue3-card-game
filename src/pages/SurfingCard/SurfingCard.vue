<script setup>
import { ref ,onMounted ,computed } from 'vue';
import DeckCard from '@/components/card/DeckCard.vue'
import { useDeckCard } from '@/composable/DeckCard.js'
import { useDisplay } from 'vuetify'

const surfingList = ref([]);
const guessList = ref([]);



const { cardList, resetCard } = useDeckCard()

const dealCard = () => {
  surfingList.value = cardList.value.splice(0,5)
  guessList.value.push(cardList.value.shift())
} 

const restGame = () => {
    // resetCard()
    surfingList.value = cardList.value.splice(0,5)
    console.log(cardList.value)
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

  const lostCounts = ref(0)
  const gameIsOver =ref(false)

  const guess = ref('')

  const guessSuit = ref('')

  const guessingIndex = ref(0)

  const compareResult = ref('')

  const resultList = ref(['','','','',''])

  const guessing = (answer) => {
    guess.value = answer
  }

  const compareCards = (index) => {
    if(guess.value == 'higher' && guessList.value[index].value > surfingList.value[index].value) {
      resultList.value[index] = 'win'
      guessingIndex.value++
      // surfingList.value.splice(0,1,guessList.value[index]);
      guess.value =''
      guessList.value.push(cardList.value.shift())
    }
    if(guess.value == 'higher' && guessList.value[index].value <= surfingList.value[index].value) {
      resultList.value[index] = 'lose'
      lostCounts.value++
    }
    if(guess.value == 'lower' && guessList.value[index].value < surfingList.value[index].value) {
      resultList.value[index] = 'win'
      guessingIndex.value++
      guess.value =''
      guessList.value.push(cardList.value.shift())
    }
    if(guess.value == 'lower' && guessList.value[index].value >= surfingList.value[index].value) {
      resultList.value[index] = 'lose'
      lostCounts.value++
    }
    if(cardList.value.length == 0 ) gameIsOver.value = true
  }

  const guessCardsSuit = (index) => {
    if(guessSuit.value == guessList.value[index].suit){
      console.log('win')
    }
  }

const resetCompare = () => {
  
  console.log('surfingList',surfingList.value)

  console.log('guessList',guessList.value)

  for(let i = 0 ; i < guessingIndex.value+1 ; i++) {
    console.log(i,guessList.value,guessingIndex)
    surfingList.value.splice(i,1,guessList.value[i]);
  }

  console.log('surfingList',surfingList.value)

  console.log('guessList',guessList.value)

  guess.value =''
  guessingIndex.value = 0
  compareResult.value = ''
  resultList.value = ['','','','','']
  guessList.value = []
  guessList.value.push(cardList.value.shift())
}

onMounted(()=>{
  dealCard()
})
</script>

<template>
  <div class="w-100 height-screen">
    <h2>衝浪</h2>
    <div class="">
        <v-btn @click="resetCard">洗牌</v-btn>
        <v-btn @click="dealCard">發牌</v-btn>
    </div>
    <div class="">
      <!-- surfingList: {{ surfingList }} -->
      <div class="">
        <div class="">
            成績: 
            <div class="">輸: {{ lostCounts }} 場</div>
          </div>
          <div v-if="guess" class="">
            你的選擇:{{ guess == 'higher'?"大":"小" }}
          </div>
          <div class="">
            結果: {{  compareResult  }}
          </div>  
      </div>
      <!-- <div class="">
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
      </div> -->
      <div class="d-flex justify-center align-start ga-16 mb-5">
        <div v-for="item,index in surfingList" :key="item" :class="[guessingIndex == index?'onFocus':'']">
          <div  :style="[`width: ${width}px;height: ${height}px;`]" >
            <DeckCard  :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="single" :isOpen="index == 4? false : true"/>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-start ga-16 mb-5">
        <div v-for="index in 5" :key="index" class="">
          <div class="mb-5" :style="[`width: ${width}px;height: ${height}px;`]">
            <DeckCard v-if="guessList[index-1]"   :suit="guessList[index-1].suit" :rank="guessList[index-1].rank" :value="guessList[index-1].value" :index="index-1" status="single" :isOpen="resultList[index-1]"/>
          </div>
          <div v-if="guess=='' && guessingIndex == index-1" class=" d-flex justify-center ga-3">
            <v-btn @click="guessing('higher')" class="mr-1">
              大
            </v-btn>
            <v-btn @click="guessing('lower')" class="mr-1">
              小
            </v-btn>
          </div>
          <div v-if="guess && guessingIndex == index-1" class=" d-flex justify-center ga-3">
            <v-btn v-if="!resultList[index-1]" @click="compareCards(index-1)" class="mr-1">
              結果
            </v-btn>
            <v-btn v-if="resultList[index-1]=='lose'&&!gameIsOver" @click="resetCompare" class="mr-1">
              再來一場
            </v-btn>
            <v-btn v-if="gameIsOver" @click="resetGame" class="mr-1">
              重新開始
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="">

    </div>
    <div class="">
      <div class="d-flex flex-wrap position-relative">
        <DeckCard v-for="(item, index) in cardList" :key="item" :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="collect"/>
      </div>
    </div>
  </div>
</template>

<style>
.onFocus{
  border-radius: 10px;
  outline: 6px #fa0 dashed;
}
</style>