const generateTitle = function (title, b, f) {
    let chars = title.split('')
    let total = title.match(/\S/g).length - 1
    let count = 0
    let html = ''

    const getRGB = function (count, from, to, log) {
        let rgb = { r: 0, g: 0, b: 0 }
        Object.keys(from).forEach(channel => {
            const cFrom = from[channel]
            const cTo = to[channel]
            rgb[channel] = Math.round(cFrom - (cFrom - cTo) / total * count)
        })
        return rgb
    }
    
    chars.forEach(char => {
        const rgb = {
            f: getRGB(count, f, b),
            b: getRGB(count, b, f, true)
        }
        const isLetter = /\S/.test(char)
        const color = `rgb(${rgb.f.r}, ${rgb.f.g}, ${rgb.f.b})`
        const bgColor = `rgb(${rgb.b.r}, ${rgb.b.g}, ${rgb.b.b})`
        count = isLetter ? count+1  : count
        html += `<span class="letter" style="color:${color}; background-color:${bgColor};">${char}</span>`
    });
    return html
}

export default generateTitle