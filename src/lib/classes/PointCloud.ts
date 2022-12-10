import * as THREE from 'three'

export default class PointCloud {
    bufferGeometry: THREE.BufferGeometry
    material: THREE.PointsMaterial
    cloud: THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>

    constructor() {
        this.bufferGeometry = new THREE.BufferGeometry()
        this.material = new THREE.PointsMaterial({
            color: 0x888888,
            size: 0.0151,
            sizeAttenuation: true,
        })
        this.cloud = new THREE.Points(this.bufferGeometry, this.material)
    }

    updateProperty(attribute: THREE.BufferAttribute, name: string) {
        this.bufferGeometry.setAttribute(name, attribute)
        this.bufferGeometry.attributes[name].needsUpdate = true
    }
}