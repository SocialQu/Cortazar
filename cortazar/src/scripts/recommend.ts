import stories from '../data/stories.json'

export const recommend = (center: number[]) => stories.sort(({center: a}, {center: b}) => {
    const deltaA = Math.abs(a[0] - center[0]) + Math.abs(a[1] - center[1])
    const deltaB = Math.abs(b[0] - center[0]) + Math.abs(b[1] - center[1])

    return deltaA > deltaB ? 1 : -1
}).filter((s, i) => i < 10)
