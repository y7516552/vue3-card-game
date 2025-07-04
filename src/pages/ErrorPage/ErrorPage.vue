<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()




</script>

<template>
  <div class="w-100 height-screen overflow-y position-relative">
    <div class="d-flex flex-column justify-center align-center ga-3 mb-1">
        <h1>404</h1>
        <p>找不到頁面....</p>
        <v-btn @click="router.push({name:'home'})" class="mr-1">
          回首頁
        </v-btn>
    </div>

    
  </div>
</template>