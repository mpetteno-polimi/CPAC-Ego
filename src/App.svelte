<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {createBufferAttribute, flattenFacialLandMarkArray} from "./lib/utils/FaceMeshUtils";
    import {Webcam} from "./lib/classes/Webcam";
    import Scene from "./lib/classes/Scene";

    let container, webcam, video, scene;
    const faceMeshDetector = new FaceMeshDetector()

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detectFaces(webcam.video);
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints, scene.currentSizes);
            const facePositions = createBufferAttribute(flatData);
            scene.pointClouds[index].updateProperty(facePositions, 'position');
        })
    }

    function animate() {
        bindFacesDataToPointCloud();
        scene.render();
        requestAnimationFrame(animate);
    }

    onMount(async () => {
        webcam = new Webcam(video);
        await webcam.setup();
        scene = new Scene({
            container: container,
            video: webcam.video
        });
        await faceMeshDetector.loadDetector();
        await animate();
    });
</script>

<svelte:window on:resize={scene.resize()}/>
<main bind:this={container}>
    <video bind:this={video} id="video" autoplay></video>
</main>

<style>
    main {
        position: fixed;
        width: 100%;
        height: 100%;
    }

    video {
        display: none;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
</style>
