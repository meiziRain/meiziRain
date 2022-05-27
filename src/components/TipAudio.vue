<template>
    <div class="tip">
        <div class="tip-content">This site will play ambient music<Line /></div>
        <!-- 浏览器为了提高用户体验，规定只有产生用户行为后才可播放音频 -->
        <!-- <audio autoplay :src="v"></audio> -->
    </div>
</template>

<script lang="ts" setup>
import v from '../assets/audio/v.wav'
import Line from './line.vue'
</script>

<style lang="scss" scoped>
.tip {
    position: absolute;
    width: 100vw;
    text-align: center;

    .tip-content {
        margin-top: 10vh;

        span {
            display: inline-block;
            padding-left: 20px;
            // cursor: pointer;
        }
    }
}
</style>