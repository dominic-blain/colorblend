<script>
    import { generateBlendCSSVars } from '../utils/generateCSSVars'

    export let b = {r:255, g:255, b:255}
    export let f = {r:0, g:0, b:0}
    export let alpha = 1

    $: style = generateBlendCSSVars(b, f, alpha)
</script>

<section {style}>
    <div class="witness"></div>
    <div class="blended"></div>
    <div class="foreground"></div>
</section>

<style>
    section {
        grid-column: auto / span 1;
        grid-row: auto / span 1;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 1vw;
        border-radius: 5px;
        background-color: var(--background);
        box-shadow: 0px 2px 10px 0 rgba(0,0,0,0.05);
        position: relative;
    }

    .foreground,
    .blended{
        width: 100%;
        height: 50%;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .foreground {
        background-color: var(--foreground);
    }
    .blended {
        background-color: var(--blended);
    }
    /* .alpha { border-bottom: 1px solid rgb(@rb, @gb, @bb); }
    .opaque { border-top: 1px solid rgb(@rb, @gb, @bb); } */

    .witness {
        position: absolute;
        margin: 1vw;
        margin-left: 0;
        left: 50%;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: silver;
    }
    
</style>