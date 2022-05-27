<template>
    <div class="dialog">
        <h2>Play&nbsp;&nbsp;&nbsp;ambient&nbsp;&nbsp;&nbsp;music?</h2>
        <div>
            <div class="option"><img src="../assets/imgs/icons8-play-24.png" alt="play audio"></div>
            <div class="option"><img src="../assets/imgs/icons8-no-audio-24.png" alt="no audio"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.dialog {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10vh);

    h2 {
        text-align: center;
        font-family: Monoton;
        text-transform: uppercase;
        font-size: 5vh;
        color: blue;
        text-shadow: var(--blue-shadow)
    }

    div {
        display: flex;
        justify-content: center;

        .option {
            background: transparent;
            padding: 2px 15px;
            color: white;
            margin: 6.8vh 20px 0;
            cursor: pointer;
        }
    }
}
</style>