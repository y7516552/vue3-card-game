<script setup>
import { ref ,onMounted ,computed} from 'vue';
import DeckCard from '@/components/card/DeckCard.vue'
import GameDialog from '@/components/GameDialog.vue';
import { useDeckCard } from '@/composable/DeckCard.js'
import { useDisplay } from 'vuetify'

const surfingList = ref([]);
const guessList = ref([]);

const suitList = [
  {
    name:'黑桃',
    value:'spade'
  },
  {
    name:'菱形',
    value:'diamond'
  },
  {
    name:'梅花',
    value:'club'
  },
  {
    name:'愛心',
    value:'heart'
  }
]

const { cardList, resetCard } = useDeckCard()

const dealCard = () => {
  surfingList.value = cardList.value.splice(0,5)
  guessList.value.push(cardList.value.shift())
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


  const guessingIndex = ref(0)

  const RoundFive = ref(false)

  const compareResult = ref('')

  const resultList = ref(['','','','',''])

  const totalResult = computed(() => {
    let message = ''
    message ='衝浪成功!!'
    if(cardList.value.length == 0) message ='卡牌用盡...'

    return {
      game:'衝浪',
      message: message,
      lostCounts:lostCounts.value
    }
  }) 
  const left =  computed(() => {
    return cardList.value.length
  })

  const guessing = (answer) => {
    guess.value = answer
  }

  const compareCards = (index) => {
    if(guess.value == 'higher' && guessList.value[index].value > surfingList.value[index].value) {
      resultList.value[index] = 'win'
      guessingIndex.value++
      guess.value =''
      if(guessingIndex.value !== 4) guessList.value.push(cardList.value.shift())
    }
    if(guess.value == 'higher' && guessList.value[index].value <= surfingList.value[index].value) {
      resultList.value[index] = 'lose'
      lostCounts.value++
    }
    if(guess.value == 'lower' && guessList.value[index].value < surfingList.value[index].value) {
      resultList.value[index] = 'win'
      guessingIndex.value++
      guess.value =''
      if(guessingIndex.value !== 4) guessList.value.push(cardList.value.shift())
    }
    if(guess.value == 'lower' && guessList.value[index].value >= surfingList.value[index].value) {
      resultList.value[index] = 'lose'
      lostCounts.value++
    }
    if(cardList.value.length == 0 ) {
      gameIsOver.value = true
    }
  }


  const compareCardsSuit = (index) => {
    RoundFive.value = true
    if(guess.value == surfingList.value[index].suit){
      gameIsOver.value = true
    }else{
      resultList.value[index] = 'lose'
      lostCounts.value++
    }
  }

const resetCompare = () => {


  if(RoundFive.value){
    surfingList.value.splice(4,1,cardList.value.shift());
    guessingIndex.value = 3
    RoundFive.value = false
  }
  


  for(let i = 0 ; i < guessingIndex.value+1 ; i++) {
    surfingList.value.splice(i,1,guessList.value[i]);
  }


  guess.value =''
  guessingIndex.value = 0
  compareResult.value = ''
  resultList.value = ['','','','','']
  guessList.value = []
  guessList.value.push(cardList.value.shift())
}

const resetGame = () => {
    resetCard()
    gameIsOver.value = false
    RoundFive.value = false
    guess.value =''
    guessingIndex.value = 0
    compareResult.value = ''
    lostCounts.value = 0
    resultList.value = ['','','','','']
    guessList.value = []
    dealCard()
}

onMounted(()=>{
  dealCard()
})

</script>

<template>
  <div class="w-100 height-screen">
    <div class="">
      <div class="d-flex flex-column justify-center align-center mb-5">
        <h2>衝浪</h2>
        <div class="">
          <div class="">
            剩餘牌數: {{left}} 張
          </div>
          <div class="">
            回合: {{guessingIndex+1}} 
          </div>
          <div class="">
              成績: 
              <div class="">輸: {{ lostCounts }} 場</div>
            </div>
            
        </div>
      </div>
      

      <div class="d-flex justify-center align-start ga-16 mb-5">
        <div v-for="item,index in surfingList" :key="item" :class="[guessingIndex == index?'onFocus':'']">
          <div  :style="[`width: ${width}px;height: ${height}px;`]" >
            <DeckCard v-if="index !== 4"  :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="single" isOpen="true"/>
            <DeckCard v-else  :suit="item.suit" :rank="item.rank" :value="item.value" :index="index" status="single" :isOpen="RoundFive"/>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-start ga-16 mb-5">
        <div v-for="index in 5" :key="index" class="">
          <div class="mb-5" :style="[`width: ${width}px;height: ${height}px;`]">
            <DeckCard v-if="guessList[index-1]"   :suit="guessList[index-1].suit" :rank="guessList[index-1].rank" :value="guessList[index-1].value" :index="index-1" status="single" :isOpen="resultList[index-1]"/>
            <div v-if="guessingIndex == index-1 && guess" class="d-flex justify-center align-center h-100" :class="[guess=='heart'||guess=='diamond'?'text-red-accent-4':'']">
              <v-icon size="128" :icon="`mdi-cards-${guess}`" />
            </div>
          </div>
          <div v-if="guess=='' && guessingIndex == index-1&&index!==5" class=" d-flex justify-center ga-3">
            <v-btn @click="guessing('higher')" class="mr-1">
              大
            </v-btn>
            <v-btn @click="guessing('lower')" class="mr-1">
              小
            </v-btn>
          </div>
          <div v-if="guess=='' && guessingIndex == index-1&&index==5" class=" d-flex flex-column ga-3">
            <v-btn v-for="(item,index) in suitList" :key="index" :prepend-icon="`mdi-cards-${item.value}`" @click="guessing(item.value)" class="mr-1" :class="[item.value=='heart'||item.value=='diamond'?'text-red-accent-4':'']">
              {{ item.name }}
            </v-btn>
          </div>
          <div v-if="guess && guessingIndex == index-1" class=" d-flex justify-center ga-3">
            <v-btn v-if="!resultList[index-1]&&index!==5" @click="compareCards(index-1)" class="mr-1">
              結果
            </v-btn>
            <v-btn v-if="!resultList[index-1]&&index==5" @click="compareCardsSuit(index-1)" class="mr-1">
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
    <GameDialog :openDialog="gameIsOver" :result="totalResult" @resetGame="resetGame"></GameDialog>
  </div>
</template>

<style>
.onFocus{
  border-radius: 10px;
  outline: 6px #fa0 dashed;
}
</style>