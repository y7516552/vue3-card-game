<script setup>
import { ref,watchEffect } from 'vue'
import RuleDialog from '@/components/RuleDialog.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const gameName = ref('')

watchEffect(()=>{
  if(route.name) gameName.value = route.name
})



const openRuleDialog = ref(false)
const rules = {
  highCardWin:{
    title:'比大小',
    subtitle:'規則',
    text:[
      '請猜測右邊卡牌的數字是 "大於" 或 "小於" 左邊卡牌',
      '花色不影響大小',
      '數字相等時，算輸一場',
      '卡牌耗盡時，遊戲結束'
    ]
  },
  surfingCard:{
    title:'衝浪',
    subtitle:'規則',
    text:[
      '前四回合為比大小，數字相等時，算輸一場',
      '猜對時，進入下一回合',
      '猜錯時，下方卡牌取代上方卡牌，並退回第一回合',
      '第五回合為猜花色',
      '卡牌耗盡 或 第五回合猜對時，遊戲結束'
    ]
  },
  horseRace:{
    title:'賽馬(簡易)',
    subtitle:'規則',
    text:[
      '遊戲開始前，猜獲勝花色',
      '根據發牌時，卡牌的花色使對應的花色向前一格',
      '卡牌耗盡 或 花色抵達終點時，遊戲結束'
    ]
  }
} 

</script>


<template>
  <div class="w-100 height-screen">
    <div class="d-flex justify-end">
      <v-btn
        prepend-icon="mdi-information"
        @click="openRuleDialog=true"
      >
        <template v-slot:prepend>
          <v-icon color="info"></v-icon>
        </template>
  
        規則
      </v-btn>
    </div>
    <router-view></router-view>
    <RuleDialog :openDialog="openRuleDialog" :content="rules[gameName]" @closeDialog="openRuleDialog=false"></RuleDialog>
  </div>
</template>


