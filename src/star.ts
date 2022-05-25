import * as THREE from 'three'
import saturn from './assets/imgs/saturn.jpg'
import { getThreeColor } from '@/utils'
export default class Star {
    group = new THREE.Group()
    // 球体分段, 段数越高球体越光滑
    segments = 200
    // 球体(半径, 经纬分段)
    geom = new THREE.SphereGeometry(20, this.segments, this.segments)
    // 漫反射贴图
    mapTexture = new THREE.TextureLoader().load(saturn)
    // 材质
    material = new THREE.MeshStandardMaterial({
        map: this.mapTexture, // 漫反射贴图
        bumpMap: this.mapTexture, // 凹凸贴图，没有明显的凹凸
        bumpScale: 0.5, // 凹凸程度
        metalness: 0.6, // 金属质感
        roughness: 2, // 粗糙程度
    })

    // 球体对象
    mesh = new THREE.Mesh(this.geom, this.material)

    torusGeometry = new THREE.TorusGeometry( 40, .2, 30, 100 )
    torusMaterial = new THREE.MeshBasicMaterial( { color: getThreeColor() } )
    torus = new THREE.Mesh( this.torusGeometry, this.torusMaterial )

    // 添加到组
    constructor() {
        this.torus.rotation.x = 2.1;
        this.torus.rotation.y = 0.5;
        this.group.add(this.mesh)
        this.group.add(this.torus)
    }
}