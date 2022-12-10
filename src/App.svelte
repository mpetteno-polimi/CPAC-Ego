<script lang="ts">
    import {onMount} from "svelte";
    import {config} from "./config";
    import * as THREE from 'three'
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import WebcamCanvas from "./lib/classes/WebcamCanvas";
    import PointCloud from "./lib/classes/PointCloud";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {createBufferAttribute, flattenFacialLandMarkArray} from "./lib/utils/FaceMeshUtils";

    let canvas, renderer, controls;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(config.threeJS.camera.fieldOfView,
        window.innerWidth / window.innerHeight, config.threeJS.camera.nearPlane, config.threeJS.camera.farPlane)
    const webcamCanvas = new WebcamCanvas()
    const pointClouds = [...Array(config.faceMesh.detector.maxFaces)].map(() => new PointCloud());
    const faceMeshDetector = new FaceMeshDetector()

    async function bindFacesDataToPointCloud() {
        console.log(faceMeshDetector.detector)
        const estimatedFaces = await faceMeshDetector.detectFaces(webcamCanvas.canvas)
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints)
            const facePositions = createBufferAttribute(flatData)
            pointClouds[index].updateProperty(facePositions, 'position')
        })
    }

    function animate() {
        requestAnimationFrame(animate)
        if (webcamCanvas.receivingStream) bindFacesDataToPointCloud()
        webcamCanvas.updateFromWebCam()
        controls.update();
        renderer.render(scene, camera)
    }

    function resize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    onMount(async () => {
        renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas})
        renderer.setClearColor(config.threeJS.scene.backgroundColor)

        controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        pointClouds.forEach((pointCloud) => {
            scene.add(pointCloud.cloud)
        })

        await faceMeshDetector.loadDetector()

        camera.position.z = 3
        camera.position.y = 1
        camera.lookAt(0, 0, 0)
        resize();
        animate();
    });
</script>

<svelte:window on:resize={resize}/>
<canvas bind:this={canvas}></canvas>
