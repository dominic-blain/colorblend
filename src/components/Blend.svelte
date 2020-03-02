<script>
    import { generateBlendCSSVars } from '../utils/generateCSSVars'

    export let b = {r:255, g:255, b:255}
    export let f = {r:0, g:0, b:0}
    export let alpha = 1

    // $: isLight = (b.r + b.g + b.b) / 3 > 127
    let isReverse = alpha <= 0.5

    $: vars = generateBlendCSSVars(b, f, alpha)
    
</script>

<section style={vars.style}>
    <div class="witness">
       <!-- <svg preserveAspectRatio="none" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40 0v20H20V0zM20 20v20H0V20zM80 0v20H60V0zM60 20v20H40V20zM100 20v20H80V20zM40 40v20H20V40zM20 60v20H0V60zM80 40v20H60V40zM120 0v20h-20V0zM120 40v20h-20V40zM60 60v20H40V60zM100 60v20H80V60z"/>
        </svg> -->
    </div>
    <div class="blended"></div>
    <div class="foreground"></div>
    <h2 class:isReverse>
        RGBA<br/>
        {f.r}, {f.g}, {f.b}, {alpha * 100}%<br/>
        <br/>
        RGB<br/>
        {vars.t.r}, {vars.t.g}, {vars.t.b}
    </h2>
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
        z-index: 1;
        background: conic-gradient(from 0deg, var(--witness), transparent);
    }

    .foreground,
    .blended {
        width: 100%;
        height: 50%;
        position: relative;
        z-index: 2;
    }
    .blended {
        background-color: var(--blended);
    }
    .foreground {
        background-color: var(--foreground);
    }

    h2 {
        color: var(--background);
        position: absolute;
        top: 0; 
        left: 0;
        margin: 0;
        z-index: 3;
        padding: 1vw;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.25em;
    }

    h2.isReverse {
        color: var(--original);
    }
    
</style>