import stories from '../data/stories.json'

export const recommend = (center: number[]) => stories.sort(({center: a}, {center: b}) => 
    (a[0] - center[0] + a[1] - center[1]) > (b[0] - center[0] + b[1] - center[1]) ? 1 : -1
)
