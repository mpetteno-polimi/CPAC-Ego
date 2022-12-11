<script lang="ts">
    import {onMount} from "svelte";
    import {config} from "./config";
    import * as THREE from 'three'
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
    import PointCloud from "./lib/classes/PointCloud";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {createBufferAttribute, flattenFacialLandMarkArray} from "./lib/utils/FaceMeshUtils";
    import {Webcam} from "./lib/classes/Webcam";

    let canvas, renderer, controls, webcam, video;

    let currentSizes: Sizes = {
        innerWidth: 0,
        innerHeight: 0,
        videoWidth: 0,
        videoHeight: 0
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(config.threeJS.camera.fieldOfView,
        window.innerWidth / window.innerHeight, config.threeJS.camera.nearPlane, config.threeJS.camera.farPlane)
    const pointClouds = [...Array(config.faceMesh.detector.maxFaces)].map(() => new PointCloud());
    const faceMeshDetector = new FaceMeshDetector()

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detectFaces(webcam.video)
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints, currentSizes)
            const facePositions = createBufferAttribute(flatData)
            pointClouds[index].updateProperty(facePositions, 'position')
            //pointClouds[index].bufferGeometry.scale(5, 5, 5)
        })
    }

    function animate() {
        bindFacesDataToPointCloud()
        controls.update()
        render()
        requestAnimationFrame(animate)
    }

    function render() {
        renderer.render(scene, camera)
    }

    function resize() {
        let newWidth = window.innerWidth
        let newHeight = window.innerHeight
        renderer.setSize(newWidth, newHeight)
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix()
        currentSizes.videoWidth= webcam.video.videoWidth
        currentSizes.videoHeight= webcam.video.videoHeight
        currentSizes.innerWidth = newWidth
        currentSizes.innerHeight = newHeight
    }

    onMount(async () => {

        webcam = new Webcam(video);
        await webcam.setup();

        renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvas, alpha: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setClearColor(config.threeJS.scene.backgroundColor)

        controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );

        pointClouds.forEach((pointCloud) => {
            scene.add(pointCloud.cloud)
        })

        await faceMeshDetector.loadDetector()

        camera.position.set(0.5, 0.2, 1.5)
        camera.rotateY(3)

        resize();

        await animate();
    });
</script>

<svelte:window on:resize={resize}/>
<video bind:this={video} id="video" autoplay></video>
<canvas bind:this={canvas}></canvas>

<style>
    canvas {
        display: block;
        position: absolute;
        top:0;
        left:0;
    }

    video {
        display: none;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
</style>
