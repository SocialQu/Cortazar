export interface iRawStory {
    id: string

    title: string
    subtitle: string
    intro: string[]
    image: string
    link: string

    tags:string[]
    topics:string[]

    stats: {
        claps: number
        recommends: number
        socialRecommends: number
        responses: number
    }

    author: string
    twitter: string

    readingTime: number
    published: number
    curated: number
}

export interface iStory extends iRawStory { center:number[], embeddings:number[] }
export interface iStoryCard extends iStory { match:number, score:number }
