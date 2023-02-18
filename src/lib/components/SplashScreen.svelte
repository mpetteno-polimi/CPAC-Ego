<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher, onMount} from "svelte";
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

    function dispatchInteractionEvent() {
        dispatch("interaction");
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