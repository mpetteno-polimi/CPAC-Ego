<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {Webcam} from "./lib/classes/Webcam";
    import World from "./lib/classes/World";
    import OSCClient from "./lib/classes/OSCClient";
    import Grammar from "./lib/classes/Grammar";
    import MusicGenerator from "./lib/classes/MusicGenerator";

    let container, video, world, oscClient, grammar;

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detectFaces(webcam.video);
        estimatedFaces.forEach((estimatedFace, index) => scene.facePointClouds[index].updateFromFaceEstimation(estimatedFace));
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints, scene.currentSizes);
            const facePositions = createBufferAttribute(flatData);
            musicGenerator.processLandmarks(flatData);
            musicGenerator.setFaceDistance(estimatedFaces[0].box.width, estimatedFaces[0].box.height);
            scene.facePointClouds[index].updatePosition(facePositions);
        })
    }

    function testOSC() {
        setTimeout(function(){musicGenerator.setSentiment(Math.floor(Math.random()*7))}, 10000);
        musicGenerator.generateNewSequence();
        musicGenerator.alterSequence(true);
        startPlayingSequence();
        playBass = true;
    }

    function startPlayingSequence(){
        let note = musicGenerator.forwardSequence();
        sequenceTimeout = setTimeout(startPlayingSequence, note['duration']);
        oscClient.sendMessage('/note', note['note']);
        // most stupid bass ever
        if(playBass && Math.random()<0.1){
            if(Math.random()<0.2){
                oscClient.sendMessage('/bass', 0);
            }else{
                oscClient.sendMessage('/bass', note['note']-24);
            }
        }
    }

    function stopPlayingSequence(){
        clearTimeout(sequenceTimeout);
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
        musicGenerator = new MusicGenerator(oscClient);
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
