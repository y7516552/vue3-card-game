<script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps(['openDialog','content'])
  const emit = defineEmits(['closeDialog'])
  const dialog = ref(false)

  watch(props,()=>{
    if(props.openDialog) dialog.value = true    
},{ immediate: true })

const closeDialog = ()=>{
  emit('closeDialog')
  dialog.value = false
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
            {{ content.title }}
          </template>
          
          <template v-slot:subtitle>
            {{ content.subtitle }}
          </template>

          <template v-slot:text>
            <ul class="ps-4 mb-6">
              <li v-for="item in content.text" :key="item">
                {{item}}
              </li>
            </ul>
          </template>

          <template v-slot:actions>
            <v-spacer></v-spacer>
  
            <v-btn @click="closeDialog">
              關閉
            </v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
</template>
