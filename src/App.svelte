<script lang="ts">
    import {onMount} from "svelte";
    import FaceMeshDetector from "./lib/classes/FaceMeshDetector";
    import {createBufferAttribute, flattenFacialLandMarkArray} from "./lib/utils/Utils";
    import {Webcam} from "./lib/classes/Webcam";
    import Scene from "./lib/classes/Scene";
    import OSCClient from "./lib/classes/OSCClient";
    import Grammar from "./lib/classes/Grammar";
    import MusicGenerator from "./lib/classes/MusicGenerator";
    import FacePointCloud from "./lib/classes/FacePointCloud";

    let container, webcam, video, scene, oscClient, grammar, musicGenerator, sequenceTimeout, playBass;
    const faceMeshDetector = new FaceMeshDetector();

    async function bindFacesDataToPointCloud() {
        const estimatedFaces = await faceMeshDetector.detectFaces(webcam.video);
        const facesKeypoints = estimatedFaces.map(estimatedFace => estimatedFace.keypoints);
        facesKeypoints.forEach((faceKeypoints, index) => {
            const flatData = flattenFacialLandMarkArray(faceKeypoints, scene.currentSizes); 
            const facePositions = createBufferAttribute(flatData);
            musicGenerator.processLandmarks(flatData);
            musicGenerator.setFaceDistance(estimatedFaces[0].box.width, estimatedFaces[0].box.height);
            scene.facePointClouds[index].updatePosition(facePositions);
        })
    }

    function animate() {
        if (!scene.isPlaying) {
            bindFacesDataToPointCloud();
        } else if (!scene.isLooping) {
            scene.facePointClouds[0].cloud.geometry.morphAttributes.position =
                [scene.facePointClouds[0].morphTarget.getMorphBufferAttribute()];
            scene.facePointClouds[0].cloud.updateMorphTargets();
            //generateNewArpeggio();
            scene.loopMorph();
        }
        scene.render();
        requestAnimationFrame(animate);
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
