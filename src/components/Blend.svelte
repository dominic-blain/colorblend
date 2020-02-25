<script>
    import { generateBlendCSSVars } from '../utils/generateCSSVars'
    import { fly } from 'svelte/transition'
    import { backOut} from 'svelte/easing'

    export let b = {r:255, g:255, b:255}
    export let f = {r:0, g:0, b:0}
    export let alpha = 1

    let isHover = false

    // $: light = (b.r + b.g + b.b) / 3 > 127

    $: vars = generateBlendCSSVars(b, f, alpha)
    
</script>

<section style={vars.style} on:mouseenter={() => isHover = true} on:mouseleave={() => isHover = false}>
    <div class="witness">
       <svg preserveAspectRatio="none" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40 0v20H20V0zM20 20v20H0V20zM80 0v20H60V0zM60 20v20H40V20zM100 20v20H80V20zM40 40v20H20V40zM20 60v20H0V60zM80 40v20H60V40zM120 0v20h-20V0zM120 40v20h-20V40zM60 60v20H40V60zM100 60v20H80V60z"/>
        </svg>
    </div>
    <div class="blended">
        {#if isHover}
            <div class="code" transition:fly={{y: 20, duration: 200, easing: backOut}}>({vars.t.r}, {vars.t.g}, {vars.t.b}, 1)</div>
        {/if}
    </div>
    <div class="foreground">
        {#if isHover}
            <div class="code" transition:fly={{y: -20, duration: 200, easing: backOut}}>({f.r}, {f.g}, {f.b}, {alpha})</div>
        {/if}
    </div>
    <h2>{alpha * 100}%</h2>
</section>

<style>
    section {
        grid-column: auto / span 1;
        grid-row: auto / span 1;
        width: 100%;
        height: 100%;
        position: relative;
        box-sizing: border-box;
    }

    .witness {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        bottom: 0;
        color: var(--witness);
        z-index: 1;
    }

    svg {
        width: 100%;
        height: 100%;
    }
    .foreground,
    .blended {
        width: 100%;
        height: 50%;
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .blended {
        background-color: var(--blended);
    }
    .foreground {
        background-color: var(--foreground);
    }

    .code {
        background-color: var(--witness);
        color: var(--original);
        font-family: 'Fira Code', 'Courier New', Courier, monospace;
        font-weight: 500;
        font-size: 0.8vw;
        padding: 0.4em 0.6em;
        border-radius: 3px;
    }

    h2 {
        background-color: var(--background);
        color: var(--original);
        position: absolute;
        top:50%; 
        left:50%;
        transform: translate(-50%, -50%);
        margin: 0;
        z-index: 3;
        font-size: 1.2vw;
        padding: 0.125em 0.4em;
        border-radius: 3px;
    }
    
</style>