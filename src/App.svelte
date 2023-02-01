<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {Webcam} from "./lib/classes/Webcam";
    import Scene from "./lib/classes/Scene";
    import OSCClient from "./lib/classes/OSCClient";
    import Grammar from "./lib/classes/Grammar";

    let container, webcam, video, scene, oscClient, grammar;
    const faceMeshDetector = new FaceMeshDetector();

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detectFaces(webcam.video);
        estimatedFaces.forEach((estimatedFace, index) => scene.facePointClouds[index].updateFromFaceEstimation(estimatedFace));
    }

    function animate() {
        if (!scene.isPlaying) {
            bindFacesDataToPointCloud();
        } else if (!scene.isLooping) {
            scene.facePointClouds[0].cloud.geometry.morphAttributes.position =
                [scene.facePointClouds[0].morphTarget.getMorphBufferAttribute()];
            scene.facePointClouds[0].cloud.updateMorphTargets();
            generateNewArpeggio();
            scene.loopMorph();
        }
        scene.render();
        requestAnimationFrame(animate);
    }

    function testOSC() {
        generateNewArpeggio();
    }

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
        webcam = new Webcam(video);
        await webcam.setup();
        scene = new Scene({
            container: container,
            video: webcam.video
        });
        await faceMeshDetector.loadDetector();
        oscClient.sendMessage("/dronePlay", 1);
        await animate();
    });
</script>

<svelte:window on:resize={scene.resize()} on:keydown={scene.play()}/>
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
