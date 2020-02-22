<script>
    import { generateMainCSSVars } from '../utils/generateCSSVars'
    import generateTitle from '../utils/generateTitle'
	import Blend from '../components/Blend.svelte'

	let b = {r:255, g:255, b:255}
	let f = {r:0, g:0, b:0}
	let a = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]

    $: style = generateMainCSSVars(b,f)
    $: title = generateTitle('COLORBLEND', b, f)
	
</script>

<section>
    <aside>
        <h1>{@html title}</h1>
        <h2>Background: rgb({f.r}, {f.g}, {f.b})</h2>
        <h2>Foreground: rgb({b.r}, {b.g}, {b.b})</h2>
    </aside>
    <main {style}>
        {#each a as alpha}
            <Blend {b} {f} {alpha} />
        {/each}
    </main>
</section>
	


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
    
    h2 {
        font-size: 1vw;
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