<template>
    <a href="javascript:void(0)" @click="onClick" class="link link--helike"><span>Got it</span></a>
</template>
<script lang="ts" setup>
import v from '../assets/audio/v.wav'
import * as THREE from 'three'
import { getCamera, getBloomPass } from '../initThree'
function onClick() {
    console.log(123)
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener()
    getCamera().add(listener)
    // create an Audio source
    const sound = new THREE.Audio(listener)
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader()
    audioLoader.load(v, function (buffer) {
        sound.setBuffer(buffer)
        sound.setLoop(true)
        sound.setVolume(0.5)
        sound.play()
    })
    // create an AudioAnalyser, passing in the sound and desired fftSize
    const analyser = new THREE.AudioAnalyser(sound, 32)
    let index = 0
    function log() {
        let sum = analyser.data.reduce((pre, curr) => pre + curr)
        console.log(sum)
        if (sum > 0) {
            console.log(sum - index)
            if ( sum > index) getBloomPass().strength += sum / 1000
            if ( sum < index) getBloomPass().strength -= sum / 1000
            if (getBloomPass().strength < 3) getBloomPass().strength = 3
            index = sum
        } else {
            getBloomPass().strength = 3
        }
        analyser.getFrequencyData()
        requestAnimationFrame(log)
    }
    log()
}
</script>

<style lang="scss" scoped>
a {
    padding-left: 20px;
    color: white;
    text-decoration: none;
    outline: none;
}

a:hover {
    color: white;
    outline: none;
}

/* https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible */
a:focus {
    /* Provide a fallback style for browsers
	 that don't support :focus-visible */
    outline: none;
    background: lightgrey;
}

a:focus:not(:focus-visible) {
    /* Remove the focus indicator on mouse-focus for browsers
	 that do support :focus-visible */
    background: transparent;
}

a:focus-visible {
    /* Draw a very noticeable focus style for
	 keyboard-focus on browsers that do support
	 :focus-visible */
    outline: 2px solid red;
    background: transparent;
}

.link {
    cursor: pointer;
    font-size: 18px;
    position: relative;
    white-space: nowrap;
}

.link::before,
.link::after {
    position: absolute;
    width: 100%;
    height: 1px;
    background: currentColor;
    top: 100%;
    left: 0;
    pointer-events: none;
}

.link::before {
    content: '';
    /* show by default */
}

.link--helike {
    // font-family: aktiv-grotesk-extended, sans-serif;
    font-weight: bold;
}

.link--helike:hover span {
    animation: glitchText 0.4s linear;
}

.link--helike::before {
    height: 2px;
    opacity: 0;
}

.link--helike:hover::before {
    opacity: 1;
    animation: glitchLine 0.4s steps(2, start) forwards;
}

@keyframes glitchText {
    0% {
        opacity: 1;
        transform: translate3d(-10px, 0, 0) scale3d(-1, -1, 1);
        -webkit-clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
        clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
    }

    10% {
        -webkit-clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
        clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
    }

    20% {
        -webkit-clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
        clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
    }

    35% {
        -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
        clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
    }

    50% {
        -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
        clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
    }

    60% {
        -webkit-clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
        clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
    }

    70% {
        -webkit-clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
        clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
    }

    80% {
        -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
        clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
    }

    90% {
        transform: translate3d(-10px, 0, 0) scale3d(-1, -1, 1);
    }

    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
}

@keyframes glitchLine {
    0% {
        transform: scale3d(1, 1, 1);
    }

    10% {
        transform: translate3d(10px, 0, 0);
    }

    20% {
        transform: translate3d(0, 4px, 0);
    }

    30% {
        transform: scale3d(0.1, 1.4, 1) translate3d(0, -25px, 0);
        transform-origin: 100% 0%;
    }

    40% {
        transform: scale3d(1, 0.3, 1) translate3d(0, 25px, 0);
    }

    50% {
        transform: scale3d(0.5, 0.3, 1) translate3d(-100px, -80px, 0);
    }

    60% {
        transform: scale3d(1, 1.25, 1) translate3d(10px, -5px, 0);
    }

    70% {
        transform: scale3d(0.5, 0.5, 1) translate3d(0, 20px, 0);
    }

    80% {
        transform: translate3d(-30, 10px, 0) scale3d(1, 0.4, 1);
        transform-origin: 100% 0%;
    }

    90% {
        transform: scale3d(1, 0.5, 1) translate3d(0, -15px, 0);
        ;
        transform-origin: 0% 50%;
    }

    100% {
        opacity: 1;
    }
}
</style>