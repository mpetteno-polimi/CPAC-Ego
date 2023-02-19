<script lang="ts">
    import {onMount} from "svelte";
    import {fade} from 'svelte/transition';
    import {config} from "../../config.js";
    import FaceMeshDetector from "../classes/FaceMeshDetector";
    import FaceExpressionDetector from "../classes/FaceExpressionDetector";
    import Webcam from "../classes/Webcam";
    import World from "../classes/World";
    import MusicGenerator from "../classes/MusicGenerator";

    let container, video, world;

    onMount(async () => {
        const webcam = new Webcam(video);
        await webcam.setup();
        const musicGenerator = new MusicGenerator();
        const faceMeshDetector = new FaceMeshDetector(webcam);
        await faceMeshDetector.loadDetector();
        const faceExpressionDetector = new FaceExpressionDetector(webcam);
        await faceExpressionDetector.loadModels();
        faceMeshDetector.detectFaces(); // call to avoid lag later see: https://github.com/google/mediapipe/issues/3123
        world = new World({
            container: container,
            faceMeshDetector: faceMeshDetector,
            faceExpressionDetector: faceExpressionDetector,
            musicGenerator: musicGenerator
        });
        world.start();
    });
</script>

<svelte:window on:resize={world.resize()} />
<world bind:this={container} in:fade={config.scenes.world.transition.in}>
    <video bind:this={video} id="video" autoplay>
        <track kind="captions">
    </video>
</world>

<style>

    world {
        min-height: 100vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    video {
        display: none;
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }

</style>
