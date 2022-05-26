<script setup lang="ts">
import v from './assets/audio/v.wav'
import initThree from './initThree'
initThree()
</script>

<template>
  <div>
    <!-- 浏览器为了提高用户体验，规定只有产生用户行为后才可播放音频 -->
    <audio :src="v" loop></audio>
  </div>
</template>

<style>
</style>
