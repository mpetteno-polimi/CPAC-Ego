<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {Webcam} from "./lib/classes/Webcam";
    import World from "./lib/classes/World";
    import MusicGenerator from "./lib/classes/MusicGenerator";

    let container, video, world;

    onMount(async () => {
        const webcam = new Webcam(video);
        await webcam.setup();
        const musicGenerator = new MusicGenerator();
        const faceMeshDetector = new FaceMeshDetector(webcam);
        await faceMeshDetector.loadDetector();
        world = new World({
            container: container,
            video: webcam.video,
            faceMeshDetector: faceMeshDetector,
            musicGenerator: musicGenerator
        });
        world.start();
    });
</script>

<svelte:window on:resize={world.resize()}/>
<main bind:this={container}>
    <video bind:this={video} id="video" autoplay>
        <track kind="captions">
    </video>
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
