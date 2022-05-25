import * as THREE from 'three'

export function getThreeColor() : THREE.Color {
    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)
    return color
}