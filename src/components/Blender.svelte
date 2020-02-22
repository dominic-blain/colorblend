<script>
    import { generateMainCSSVars } from '../utils/generateCSSVars'
    import createPicker from '../utils/createPicker'
    import generateTitle from '../utils/generateTitle'
    import Blend from '../components/Blend.svelte'
    import { onMount } from 'svelte'

    let pickrReady = false
    let mounted = false

    let b = {r:255, g:255, b:255}
	let f = {r:0, g:0, b:0}
	let a = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]

    let foregroundPicker = null
    let backgroundPicker = null

    onMount(() => {
        mounted = true
        if (pickrReady) createBlenderPickers()
    })

    function onPickrReady() {
        pickrReady = true
        if (mounted) createBlenderPickers()
    }

    function createBlenderPickers () {
        foregroundPicker = createPicker('.picker.foreground')
        backgroundPicker = createPicker('.picker.background')
        foregroundPicker.on('change', (color) => updateRGB(color.toRGBA(), false))
        backgroundPicker.on('change', (color) => updateRGB(false, color.toRGBA()))
    }

    function updateRGB(foreground, background) {
        if (foreground) f = { r:foreground[0], g:foreground[1], b:foreground[2] }
        if (background) b = { r:background[0], g:background[1], b:background[2] }
    }

    $: style = generateMainCSSVars(b,f)
    $: title = generateTitle('COLORBLEND', b, f)
</script>

<section>
    <aside>
        <h1>{@html title}</h1>
        <div class="pickers">
            <div class="background picker" style="background-color: rgb({b.r}, {b.g}, {b.b});"></div>
            <div class="foreground picker" style="background-color: rgb({f.r}, {f.g}, {f.b});"></div>
        </div>
    </aside>
    <main {style}>
        {#each a as alpha}
            <Blend {b} {f} {alpha} />
        {/each}
    </main>
</section>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/themes/nano.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/@simonwep/pickr/dist/pickr.min.js" on:load={onPickrReady}></script>
</svelte:head>

<style>
    section {
        width: 100%;
        display: flex;
        min-height: 100vh;
    }
    aside {
        height: 100vh;
        position: sticky;
        top: 0;
        box-sizing: border-box;
        text-align: center;
        background-color: white;
        width: 25vw;
        box-shadow: 2px 0px 10px 0 rgba(0,0,0,0.05);
    }
    h1 {
        font-size: 2.5vw;
        margin: 0;
    }

    .pickers {
        width: 100%;
        display: flex;
    }
    
    .picker {
        width: 50%;
        padding-bottom: 50%;
    }

	main {
		display: grid;
        flex-grow: 1;
        padding: 5vw;
		box-sizing: border-box;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(2, 10vw);
		grid-gap: 2vw;
		background-color: #fafafa;
	}
</style>