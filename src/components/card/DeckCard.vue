<script setup>
import { ref, watch, computed } from 'vue';
import { useDisplay } from 'vuetify'


const open = ref(false);
const props = defineProps(['suit','rank','value','index','status','isOpen'])

watch(props,()=>{
    if(props.status == 'collect') open.value = false
    if(props.status == 'single') open.value = true
    if(props.isOpen) open.value = true
    if(!props.isOpen) open.value = false
},{ immediate: true })


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

  const fontSize = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return "text-subtitle-1"
      case 'sm': return "text-h6"
      case 'md': return "text-h5"
      case 'lg': return "text-h4"
      case 'xl': return "text-h4"
      case 'xxl': return "text-h4"
    }

    return undefined
  })

  const iconSize = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return 24
      case 'sm': return 24
      case 'md': return 36
      case 'lg': return 48
      case 'xl': return 48
      case 'xxl': return 48
    }

    return undefined
  })

  const iconSizeAJQK = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return 64
      case 'sm': return 96
      case 'md': return 112
      case 'lg': return 128
      case 'xl': return 128
      case 'xxl': return 128
    }

    return undefined
  })

  const sideIconSize = computed(() => {
    // name is reactive and
    // must use .value
    switch (name.value) {
      case 'xs': return 12
      case 'sm': return 16
      case 'md': return 20
      case 'lg': return 24
      case 'xl': return 24
      case 'xxl': return 24
    }

    return undefined
  })


</script>

<template>
  <div class="card-container" :class="[status=='collect'?'position-absolute':'position-relative']" :style="[status=='collect'?`z-index:-${index} ; transform: translate(${((index/4)*3)}px,${((index/4)*3)}px);`:'']">
    <transition name="flip-cards">
        <v-card
            v-if="open"
            variant="outlined"
            class="mx-auto bg-white position-absolute"
            hover
            :width="width"
            :height="height"
          >
          <div :class="[suit=='heart'||suit=='diamond'?'text-red-accent-4':'']" class="d-flex w-100 h-100 px-2">
    
              <div class="d-flex flex-column">
                <p v-if="rank=='10'" class="text-center ten" >{{ rank }}</p>
                <p v-else :class="fontSize" class="text-center font-weight-bold"  >{{ rank }}</p>
                <v-icon :icon="`mdi-cards-${suit}`" :size="sideIconSize"/>
              </div>
              <div class="flex-grow-1 flex-shrink-0">
                <div v-if="rank=='A'" class="d-flex justify-center align-center h-100">
                    <v-icon  :size="iconSizeAJQK" :icon="`mdi-cards-${suit}`" />
                </div>
                <div v-if="rank=='2'" class="d-flex flex-column justify-space-between align-center h-100 py-4">
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                </div>
        
                <div v-if="rank=='3'" class="d-flex flex-column justify-space-between align-center h-100 py-4">
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                </div>
                <div v-if="rank=='4'" class="d-flex flex-row justify-space-between py-4 h-100">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                </div>
    
                <div v-if="rank=='5'" class="d-flex flex-row justify-space-between py-4 h-100 position-relative">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" class="position-absolute position-center"/>
                </div>
    
                <div v-if="rank=='6'" class="d-flex flex-row justify-space-between py-4 h-100">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                </div>
    
                <div v-if="rank=='7'" class="d-flex flex-row justify-space-between py-4 h-100 position-relative">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" class="position-absolute three-fourths "/>
                </div>
    
                <div v-if="rank=='8'" class="d-flex flex-row justify-space-between py-4 h-100">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                </div>
    
                <div v-if="rank=='9'" class="d-flex flex-row justify-space-between py-4 h-100 position-relative">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" class="position-absolute position-center"/>
                </div>
    
                <div v-if="rank=='10'" class="d-flex flex-row justify-space-between py-4 h-100 position-relative">
                    <div v-for="item in 2" :key="item" class="d-flex flex-column justify-space-between align-center h-100">
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                        <v-icon class="reverse" :size="iconSize" :icon="`mdi-cards-${suit}`" />
                    </div>
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" class="position-absolute one-fourth"/>
                    <v-icon :size="iconSize" :icon="`mdi-cards-${suit}`" class="position-absolute three-fourths"/>
                </div>
    
                <div v-if="rank=='J'" class="d-flex justify-center align-center h-100">
                    <v-icon  :size="iconSizeAJQK" icon="mdi-chess-pawn" />
                </div>
    
                <div v-if="rank=='Q'" class="d-flex justify-center align-center h-100">
                    <v-icon  :size="iconSizeAJQK" icon="mdi-chess-queen" />
                </div>
    
                <div v-if="rank=='K'" class="d-flex justify-center align-center h-100">
                    <v-icon  :size="iconSizeAJQK" icon="mdi-chess-king" />
                </div>
        
              </div>
              <div class="d-flex flex-column flex-column-reverse">
                <p v-if="rank=='10'" class="reverse text-center ten" >{{ rank }}</p>
                <p v-else :class="fontSize" class="reverse text-center font-weight-bold text-h4"  >{{ rank }}</p>
                <v-icon class="reverse" :icon="`mdi-cards-${suit}`" :size="sideIconSize"/>
              </div>
    
          </div>
        </v-card>
    </transition>
    <transition name="flip-cards">
        <v-card
            v-if="!open"
            variant="outlined"
            class="mx-auto top-0 position-absolute"
            hover
            color="outlined"
            :width="width"
            :height="height"
          >
          <div class="back">
            <div class="stripe"></div>
          </div>
        </v-card>
    </transition>
  </div>
</template>

<style>
.card-container{
    transform: perspective(1000px);
}
.reverse{
    transform: rotate(180deg);
}
.position-center{
    top:50%;
    right:50%;
    transform:translate(50%,-50%);
}
.one-fourth{
    top:25%;
    right:50%;
    transform:translate(50%,-50%);
}
.three-fourths{
    top:75%;
    right:50%;
    transform:translate(50%,-75%) rotate(180deg);
}
.ten{
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.333;
    line-height: -1.2px;
}
.back{
    backface-visibility: hidden;
    height: 100%;
    background-color: rgb(233, 69, 69);
    outline: 2px dashed white;
    outline-offset: -0.8em;
    border: 6px #fff solid;
}
.stripe{
    position: relative;
    width: 6px;
    height:300%;
    background-color: #fff;
    transform: translate(25px,-65px) rotate(30deg);
    box-shadow:
        -225px 0 0 0 #fff ,
        -200px 0 0 0 #fff ,
        -175px 0 0 0 #fff ,
        -150px 0 0 0 #fff ,
        -125px 0 0 0 #fff ,
        -100px 0 0 0 #fff ,
        -75px 0 0 0 #fff ,
        -50px 0 0 0 #fff ,
        -25px 0 0 0 #fff ,
        25px 0 0 0 #fff ,
        50px 0 0 0 #fff ,
        75px 0 0 0 #fff ,
        100px 0 0 0 #fff ;
}
.stripe::after{
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    color:#fff;
    background-color: #fff;
    transform: translate(150px,-100px) rotate(-60deg);
    box-shadow:
        -225px 0 0 0 #fff ,
        -200px 0 0 0 #fff ,
        -175px 0 0 0 #fff ,
        -150px 0 0 0 #fff ,
        -125px 0 0 0 #fff ,
        -100px 0 0 0 #fff ,
        -75px 0 0 0 #fff ,
        -50px 0 0 0 #fff ,
        -25px 0 0 0 #fff ,
        25px 0 0 0 #fff ,
        50px 0 0 0 #fff ,
        75px 0 0 0 #fff ,
        100px 0 0 0 #fff ,
        125px 0 0 0 #fff ,
        150px 0 0 0 #fff ;
}
</style>


