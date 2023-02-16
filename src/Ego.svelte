<script lang="ts">
    import World from "./lib/components/World.svelte";
    import SplashScreen from "./lib/components/SplashScreen.svelte";
    import * as Tone from 'tone'


    let started = false;

    async function init() {
        await startAudioContext();
        started = true;
    }

    async function startAudioContext() {
        try {
            await Tone.start();
        } catch (error) {
            console.log("Unable to start Audio Context");
        }
        started = true;
    }

</script>

<main>
    {#if !started}
        <SplashScreen on:interaction={init} />
    {:else}
        <World/>
    {/if}
</main>

<style>

    :root {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
        'Helvetica Neue', sans-serif;
    }

    :global(body), :global(html) {
        margin: 0;
        overflow: hidden;
    }

</style>
