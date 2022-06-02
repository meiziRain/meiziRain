import * as THREE from 'three'
import { getThreeColor } from '@/utils'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import princeGltf from './assets/glb/prince.glb?url'
// 需要转为glb,否则图片纹理没有被打包
export default class Star {
    group = new THREE.Group()
    loader = new GLTFLoader()

    torusGeometry = new THREE.TorusGeometry(40, .2, 30, 100)
    torusMaterial = new THREE.MeshBasicMaterial({color: getThreeColor()})
    torus = new THREE.Mesh(this.torusGeometry, this.torusMaterial)

    // 添加到组
    constructor() {
        this.loader.load(princeGltf,  (gltf) => {
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