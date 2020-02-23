<script>
    import { generateBlendCSSVars } from '../utils/generateCSSVars'

    export let b = {r:255, g:255, b:255}
    export let f = {r:0, g:0, b:0}
    export let alpha = 1

    // $: light = (b.r + b.g + b.b) / 3 > 127

    $: style = generateBlendCSSVars(b, f, alpha)
</script>

<section {style}>
    <div class="witness">
       <svg preserveAspectRatio="none" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40 0v20H20V0zM20 20v20H0V20zM80 0v20H60V0zM60 20v20H40V20zM100 20v20H80V20zM40 40v20H20V40zM20 60v20H0V60zM80 40v20H60V40zM120 0v20h-20V0zM120 40v20h-20V40zM60 60v20H40V60zM100 60v20H80V60z"/>
        </svg>
    </div>
    <div class="blended" />
    <div class="foreground" />
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
        align-items: flex-start;
        justify-content: center;
    }
    .blended {
        background-color: var(--blended);
    }
    .foreground {
        background-color: var(--foreground);
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    
</style>