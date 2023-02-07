<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {Webcam} from "./lib/classes/Webcam";
    import World from "./lib/classes/World";
    import OSCClient from "./lib/classes/OSCClient";
    import Grammar from "./lib/classes/Grammar";

    let container, video, world, oscClient, grammar;

    function generateNewArpeggio(){
        oscClient.sendMessage('/setBpm', 100);
        oscClient.sendMessage('/resetNotes');
        grammar.generateInstance();
        for(let i=0; i<grammar.generatedInstance.messages.length; i++){
            oscClient.sendMessage(grammar.generatedInstance.messages[i].address, ...grammar.generatedInstance.messages[i].args);
        }
        oscClient.sendMessage("/sequencerPlay", 1);
    }

    onMount(async () => {
        grammar = new Grammar();
        oscClient = new OSCClient();
        const webcam = new Webcam(video);
        await webcam.setup();
        const faceMeshDetector = new FaceMeshDetector(webcam);
        await faceMeshDetector.loadDetector();
        world = new World({
            container: container,
            video: webcam.video,
            faceMeshDetector: faceMeshDetector
        });
        oscClient.sendMessage("/dronePlay", 1);
        await world.start();
    });
</script>

<svelte:window on:resize={world.resize()} />
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
