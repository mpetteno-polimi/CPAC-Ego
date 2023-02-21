<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher, onMount, onDestroy} from "svelte";
    import {config} from "../../config";
    import SplashScreen from "../classes/SplashScreen";

    let container, splashScreen;

    /* -- Event dispatcher -- */
    const dispatch = createEventDispatcher();

    onMount(() => {
        splashScreen = new SplashScreen({
            container: container
        });
    })

    onDestroy(() => {
        window.removeEventListener("resize", splashScreen.resize);
    });

    function dispatchInteractionEvent(event) {
        let gui = document.getElementById("splash-screen-gui");
        if (!gui || !gui.contains(event.target)) {
            dispatch("interaction");
            if (gui) gui.remove();
            window.removeEventListener("click", dispatchInteractionEvent);
        }
    }

</script>

<svelte:window on:resize={splashScreen.resize()} on:click={dispatchInteractionEvent} />
<splash-screen bind:this={container} out:fade={config.scenes.splashScreen.transition.out}></splash-screen>

<style>

    splash-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: black;
    }

</style>