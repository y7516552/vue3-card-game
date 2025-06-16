
<script setup>
  import { ref } from 'vue'

  const drawer = ref(true)
  const rail = ref(true)
  
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
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
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
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account"
            title="比大小"
            value="account"
            href="/game/highCardWin"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Users"
            value="users"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-app-bar title="Application bar">
      
    </v-app-bar>

    <v-main class="d-flex align-center justify-center"  width="100vw">
      <v-container class="w-100 h-100">
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
  </div>
</template>

