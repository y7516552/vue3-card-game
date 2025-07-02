<script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps(['openDialog','result'])
  const emit = defineEmits(['resetGame'])
  const dialog = ref(false)

  watch(props,()=>{
    if(props.openDialog) dialog.value = true    
},{ immediate: true })

const resetGame = ()=>{
  dialog.value = false
  emit('resetGame')
}
  
</script>

<template>
    <div class="text-center pa-4">
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <v-card
        >
          <template v-slot:title>
            {{ result.game }}
          </template>
          
          <template v-slot:subtitle>
            Game Over!!
          </template>

          <template v-slot:text>
            <h4>{{result.message?result.message:''}}</h4>
            {{result.winCounts?`贏了 : ${result.winCounts} 場`:''}}
            <br/>
            {{result.lostCounts?`輸了 : ${result.lostCounts} 場`:''}}
          </template>

          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="resetGame">
              重新開始
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
</template>
