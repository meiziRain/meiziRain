import * as THREE from 'three'
import { getThreeColor } from '@/utils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import prince from './assets/gltfs/prince/scene.gltf?url'
// 无法build到assets,只能放在public下 https://forum.babylonjs.com/t/vue-bjs-loading-glb/29896/8

export default class Star {
    group = new THREE.Group()
    loader = new GLTFLoader()

    torusGeometry = new THREE.TorusGeometry(40, .2, 30, 100)
    torusMaterial = new THREE.MeshBasicMaterial({color: getThreeColor()})
    torus = new THREE.Mesh(this.torusGeometry, this.torusMaterial)

    // 添加到组
    constructor() {
        // https://sketchfab.com/3d-models/voxel-planet-of-the-little-prince-magicavoxel-8a7cf90ac42c4ef693342404826c06ae
        // 无法build到assets,只能放在public下 https://forum.babylonjs.com/t/vue-bjs-loading-glb/29896/8
        this.loader.load('/gltfs/prince/scene.gltf',  (gltf) => {
            gltf.scene.scale.x = 0.3
            gltf.scene.scale.y = 0.3
            gltf.scene.scale.z = 0.3
            gltf.scene.position.y = -20
            this.group.add(gltf.scene)
            this.torus.rotation.x = 2.1
            this.torus.rotation.y = 0.5
            this.group.add(this.torus)
        }, undefined,  (error) => {
            console.error(error);
        })
    }
}