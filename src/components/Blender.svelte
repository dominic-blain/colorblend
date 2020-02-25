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
        if (foreground) f = { r:Math.round(foreground[0]), g:Math.round(foreground[1]), b:Math.round(foreground[2]) }
        if (background) b = { r:Math.round(background[0]), g:Math.round(background[1]), b:Math.round(background[2]) }
    }

    $: style = generateMainCSSVars(b,f)
    $: title = generateTitle('COLORBLEND', b, f)
</script>

<section {style}>
    <h1>{@html title}</h1>
    <div class="background picker" style="background-color: rgb({b.r}, {b.g}, {b.b});">
        <div class="picker-name">
            Background
        </div>
    </div>
    <div class="foreground picker" style="background-color: rgb({f.r}, {f.g}, {f.b});">
        <div class="picker-name">
            Foreground
        </div>
    </div>
    <!-- Swatches -->
    <main>
        {#each a as alpha}
            <div class="swatch">
                <Blend {b} {f} {alpha} />
            </div>
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
        min-height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 40vw 40vw 1fr;
        background-color: var(--background);
    }
    h1 {
        font-size: 2.5vw;
        margin: 0;
        grid-column-end: span 2;
    }
    main {
        grid-column-end: span 2;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
    .picker {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .picker-name {
        font-size: 2.5vw;
        font-weight: bold;
        text-transform: uppercase;
    }
    .picker.background .picker-name {
        color: var(--original);
    }
    .picker.foreground .picker-name {
        color: var(--background);
    }
    .swatch {
        grid-column-end: span 1;
    }
    @media (min-width: 700px) {
        h1 {
            grid-column-end: span 1;
        }
        section {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 13.33vw 1fr;
        }
        main {
            grid-column-end: span 3;
        }
    }
	
</style>