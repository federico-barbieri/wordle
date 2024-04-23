<script setup lang="ts">
import {VICTORY_MESSAGE} from "@/settings"
import {DEFEAT_MESSAGE} from "@/settings"
import { ref } from "vue";
import { computed } from "vue";
import englishWords from "@/englishWordsWith5Letters.json"

defineProps({ wordOfTheDay: {
  type: String,
  validator: (wordGiven: string) => englishWords.includes(wordGiven)
  }
})

const guessInProgress = ref("")
const guessSubmitted = ref("")

const formattedGuessInProgress = computed({
  get(){
    return guessInProgress.value
  },
  set(rawValue: String){
    guessInProgress.value = rawValue.slice(0, 5)

  }
})

</script>

<template>
  <input 
  type="text" 
  maxlength="5"
  v-model="guessInProgress" 
  @keydown.enter="guessSubmitted = guessInProgress">
  <p v-if="guessSubmitted.length > 0" v-text="guessSubmitted === wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE" />


</template>
