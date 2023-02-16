<script>
    import {fade} from 'svelte/transition';
    import {createEventDispatcher} from "svelte";
    import {config} from "../../config";

    /* -- Event dispatcher -- */
    const dispatch = createEventDispatcher();

    function dispatchInteractionEvent() {
        dispatch("interaction");
    }
</script>

<svelte:window on:click={dispatchInteractionEvent} on:keydown={dispatchInteractionEvent} />
<splash-screen out:fade={config.splashScreen.transition.out}>
    <h1>{config.splashScreen.title}</h1>
    <h2>{config.splashScreen.subtitle}</h2>
</splash-screen>

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

    h1 {
        color: whitesmoke;
        margin: 10px 0;
        font-size: 50px;
    }

    h2 {
        color: whitesmoke;
        margin: 10px 0;
        font-size: 25px;
    }

</style>