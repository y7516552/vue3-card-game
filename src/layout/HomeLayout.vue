

<template>
  <div>
    <v-layout class="rounded rounded-md border">
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Navigation drawer" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center"  width="100vw">
      <v-container class="w-100 h-100">
        <slot></slot>
      </v-container>
    </v-main>
  </v-layout>
  </div>
</template>

