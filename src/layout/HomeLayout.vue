
<script setup>
  import { ref,watchEffect } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  
  const drawer = ref(true)
  const rail = ref(true)
  const gameName = ref('')

  watchEffect(()=>{
    gameName.value =route.meta.title
  })
</script>

<template>
  <div>
    <v-layout class="rounded rounded-md border">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list>
          <v-list-item
            prepend-icon="mdi-cards"
            title="撲克小遊戲"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-chevron-left"
                variant="text"
                @click.stop="rail = !rail"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
             href="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cards-outline"
            title="比大小"
            href="/game/highCardWin"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-shark-fin"
            title="衝浪"
            href="/game/surfingCard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-horse"
            title="賽馬"
            href="/game/horseRace"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-app-bar :title="gameName">
      
    </v-app-bar>

    <v-main class="d-flex align-center justify-center"  width="100vw">
      <v-container class="w-100 h-100">
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
  </div>
</template>

