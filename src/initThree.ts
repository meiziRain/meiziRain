import * as THREE from 'three'
import Star from './star'
import galaxy_field from './assets/imgs/galaxy_starfield.jpg'
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { gsap as GSAP } from "gsap"
import log from 'meizi-logger'
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import smileInTheDark from './assets/imgs/smile in the dark.png'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import writeGltf from './assets/glb/write.glb?url'
import v from './assets/audio/v.wav'

console.log('init')
let width = window.innerWidth
let height = window.innerHeight
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000)
const loader = new GLTFLoader()
let distance = 250
const materials: { [key: string]: any } = {}
const ENTIRE_SCENE = 0, BLOOM_SCENE = 1
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

const renderer = new THREE.WebGLRenderer({
    antialias: true // 抗锯齿
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)
camera.lookAt(0, 0, 0)
scene.add(camera)

const control = new TrackballControls(camera, renderer.domElement)
control.enabled = true
control.noPan = true
control.maxDistance = distance

// 环境颜色
scene.add(new THREE.AmbientLight(0xffffff))
// 背景贴图
scene.add(new THREE.Mesh(new THREE.SphereGeometry(480, 1080, 1080),
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(galaxy_field),
        side: THREE.BackSide
    })
))
const star = new Star()
scene.add(star.group)
star.torus.layers.enable(BLOOM_SCENE) // 不能使用group.layers

//////////////// Write
const write = new THREE.Object3D()
loader.load(writeGltf, function (gltf) {
    gltf.scene.position.x = 80
    gltf.scene.position.y = 30
    gltf.scene.scale.x = 30
    gltf.scene.scale.y = 30
    gltf.scene.scale.z = 30
    write.add(gltf.scene)
    scene.add(write)
}, undefined, function (error) {
    console.error(error)
})



//////////////// Vanilla
let textureLoader = new THREE.TextureLoader();
let vanillaMesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    [
        //下标0：右面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
        //下标1：左面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
        //下标2：上面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
        //下标3：下面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
        //下标4：前面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
        //下标5：后面材质
        new THREE.MeshBasicMaterial({
            map: textureLoader.load(smileInTheDark)
        }),
    ]
)
vanillaMesh.position.x = 80
vanillaMesh.position.y = 50
vanillaMesh.name = "vanilla"
const vanilla = new THREE.Object3D()
vanilla.add(vanillaMesh)
scene.add(vanilla)

const renderScene = new RenderPass(scene, camera)
const bloomComposer = new EffectComposer(renderer)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 4, 0, 0)
bloomComposer.renderToScreen = false
bloomComposer.addPass(renderScene)
bloomComposer.addPass(bloomPass)

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture }
        },
        // @ts-ignore
        vertexShader: document.getElementById('vertexshader').textContent,
        // @ts-ignore
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {}
    }), 'baseTexture'
);
finalPass.needsSwap = true
const finalComposer = new EffectComposer(renderer)
finalComposer.addPass(renderScene)
finalComposer.addPass(finalPass)

const animate = () => {
    // 旋转要注意初始设置的position坐标，会以此点为中心
    vanilla.rotation.z += 0.002
    write.rotation.y += 0.003
    render()
    requestAnimationFrame(animate)
}

const render = () => {
    control.update()

    scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    scene.traverse(restoreMaterial)
    finalComposer.render()
}

const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
}

window.addEventListener("resize", resize)
animate()

const currentStar = star.group
// 初始显示
GSAP.delayedCall(1, () => {
    GSAP.to(camera.position, {
        x: 0,
        y: 0,
        z: distance,
        duration: 1,
    })
    GSAP.to(currentStar.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
    })
    GSAP.to(currentStar.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
    })
})

function darkenNonBloomed(obj: any) {
    if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
        materials[obj.uuid] = obj.material
        obj.material = darkMaterial
    }
}

function restoreMaterial(obj: any) {
    if (materials[obj.uuid]) {
        obj.material = materials[obj.uuid]
        delete materials[obj.uuid]
    }
}

export function getCamera() {
    return camera
}


export function getBloomPass() {
    return bloomPass
}
