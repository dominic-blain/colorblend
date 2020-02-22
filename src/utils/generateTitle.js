const generateTitle = function (title) {
    let chars = title.split('')
    let total = title.match(/\S/g).length + 1
    let count = 0
    let html = ''
    chars.forEach(char => {
        const isLetter = /\S/.test(char)
        count = isLetter ? count+1  : count
        html += `<span style="opacity:${1 - 1 / total * count};">${char}</span>`
    });
    return html
}

export default generateTitle