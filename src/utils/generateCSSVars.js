export const generateMainCSSVars = function (b, f) {
    let vars = []
    Object.keys(b).forEach(channel => {
        const cb = b[channel]
        const cf = f[channel]
        vars.push(`--${channel}b:${cb};`)
        vars.push(`--${channel}f:${cf};`)
        vars.push(`--${channel}w:${cb - (cb - cf) * 0.2};`)
    })
    // Background color code
    vars.push('--background:rgb(var(--rb), var(--gb), var(--bb));')
    // Witness color code
    vars.push('--witness:rgb(var(--rw), var(--gw), var(--bw));')
    return vars.join(' ')
}

export const generateBlendCSSVars = function (b, f, a) {
    let vars = []
    // Blended rgb values
    Object.keys(f).forEach(channel => {
        const cf = f[channel]
        const cb = b[channel]
        vars.push(`--${channel}t:${cf * a + (1 - a) * cb};`)
        
    })
    // Alpha value
    vars.push(`--a:${a};`)
    // Foreground color code
    vars.push('--foreground:rgba(var(--rf), var(--gf), var(--bf), var(--a));')
    // Blended color code
    vars.push('--blended:rgb(var(--rt), var(--gt), var(--bt));')
    
    return vars.join(' ')
}
