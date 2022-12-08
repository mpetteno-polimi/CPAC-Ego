<script>
  import { onMount } from 'svelte';
  import { config } from "./config.js";
  import * as FM from '@mediapipe/face_mesh';
  import { drawConnectors } from '@mediapipe/drawing_utils';
  import { Camera } from '@mediapipe/camera_utils';

  let video, canvas, canvasCtx, camera, faceMesh;

  function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 1});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_RIGHT_EYE, {color: '#FF3030'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_LEFT_EYE, {color: '#30FF30'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
        drawConnectors(canvasCtx, landmarks, FM.FACEMESH_LIPS, {color: '#E0E0E0'});
      }
    }
    canvasCtx.restore();
  }

  onMount(() => {
    canvasCtx = canvas.getContext('2d');

    camera = new Camera(video, {
      onFrame: async () => {
        await faceMesh.send({image: video});
      },
      width: 1280,
      height: 720
    });
    camera.start();

    faceMesh = new FM.FaceMesh({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` + `${FM.VERSION}/${file}`;
    }});
    faceMesh.setOptions(config.faceMesh);
    faceMesh.onResults(onResults);
  })

</script>

<main>
  <div class="container">
    <video class="input_video" bind:this={video}>
      <track kind="captions">
    </video>
    <div class="canvas-container">
      <canvas class="output_canvas" width="1280px" height="720px" bind:this={canvas}>
      </canvas>
    </div>
  </div>
</main>

<style lang="scss">

  :global(body) {
    bottom: 0;
    font-family: "Titillium Web", sans-serif;
    color: white;
    left: 0;
    margin: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform-origin: 0px 0px;
    overflow: hidden;
  }

  .container {
    position: absolute;
    background-color: #596e73;
    width: 100%;
    max-height: 100%;
  }

  .input_video {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &.selfie {
      transform: scale(-1, 1);
    }
  }

  .input_image {
    position: absolute;
  }

  .canvas-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .output_canvas {
    max-width: 100%;
    display: block;
    position: relative;
    left: 0;
    top: 0;
  }

</style>
