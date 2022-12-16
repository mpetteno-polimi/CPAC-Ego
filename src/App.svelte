<script lang="ts">
    import {onMount} from "svelte";
    import {createBufferAttribute, flattenFacialLandMarkArray} from "./lib/utils/Utils";
    import Webcam from "./lib/classes/Webcam";
    import Scene from "./lib/classes/Scene";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import FaceExpressionDetector from "./lib/classes/FaceExpressionDetector";
    import OSCClient from "./lib/classes/OSCClient";

    let container, webcam, video, scene, oscClient;
    const faceMeshDetector = new FaceMeshDetector();
    const faceExpressionDetector = new FaceExpressionDetector();

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detect(webcam.video);
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints, scene.currentSizes);
            const facePositions = createBufferAttribute(flatData);
            scene.facePointClouds[index].updatePosition(facePositions);
            scene.facePointClouds[index].cloud.geometry.morphAttributes.position =
                [scene.facePointClouds[index].morphTarget.getMorphBufferAttribute()];
            scene.facePointClouds[index].cloud.updateMorphTargets();
        })
    }

    async function recognizeExpression() {
        const estimatedExpressions = await faceExpressionDetector.detect(webcam.video);
        console.log(estimatedExpressions);
    }

    function animate() {
        if (!scene.isPlaying) {
            bindFacesDataToPointCloud();
            //recognizeExpression();
            //scene.play();
        } else if (!scene.isLooping) {
            scene.loopMorph();
        }
        scene.render();
        requestAnimationFrame(animate);
    }

    function testOSC() {
        oscClient.sendMessage();
    }

    onMount(async () => {
        oscClient = new OSCClient();
        webcam = new Webcam(video);
        await webcam.setup();
        scene = new Scene({
            container: container,
            video: webcam.video
        });
        await faceMeshDetector.loadDetector();
        await faceExpressionDetector.loadModels();
        await animate();
    });
</script>

<svelte:window on:resize={() => scene.resize()}/>
<button on:click={testOSC}>TEST OSC</button>
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

    button {
        width: 100px;
        height: 50px;
        z-index: 1000000;
    }
</style>
