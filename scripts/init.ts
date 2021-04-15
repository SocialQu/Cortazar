// npx ts-node init

import data from '../data/stories.json'

const Image_Root = 'https://cdn-images-1.medium.com/fit/t/800/240/'


interface iTag { name: string, postCount: number }
interface iLinks { entries: { url: string }[] }
interface iTopic { createdAt: number, name: string }
interface iBodyModel {paragraphs: { text: string }[]}


interface iPost {
    title: string
    firstPublishedAt: number
    virtuals: {
        previewImage: { imageId: string }
        wordCount: number
        readingTime: number
        subtitle: string
        recommends: number
        tags: iTag[]
        socialRecommendsCount: number
        responsesCreatedCount: number
        links: iLinks
        totalClapCount: number
        sectionCount: number
        topics: iTopic[]
    }
    previewContent: { bodyModel: iBodyModel }
    curationEligibleAt: number
    previewContent2: { bodyModel: iBodyModel }
}


export interface iStory {
    title: string
    subtitle: string
    published: number
    imageURL: string

    words: number
    readingTime: number
    claps: number

    tags: string[]
    topics: string[]

    links: string[]
    paragraphs: string[]

    recommends?: number
    socialRecommends?: number
    responses?: number
    sections?: number
    curated?: number
}



// const collections = Object.keys(data.payload.references.Collection)
const posts = Object.values(data.payload.references.Post)
// const users = Object.keys(data.payload.references.User)

const parseParagraphs = ({ paragraphs }: iBodyModel) => [...new Set(paragraphs.map(({ text }) => text))].filter(p => p)

const parseStory = ({ virtuals, ...post }: iPost): iStory => ({
    title: post.title,
    subtitle: virtuals.subtitle,
    published: post.firstPublishedAt,
    imageURL: virtuals.previewImage.imageId,

    words: virtuals.wordCount,
    readingTime: virtuals.readingTime,
    claps: virtuals.totalClapCount,

    tags: virtuals.tags.map(({ name }) => name),
    topics: virtuals.topics.map(({ name }) => name),

    links: virtuals.links.entries.map(({ url }) => url),
    paragraphs: parseParagraphs({paragraphs: [...post.previewContent.bodyModel.paragraphs, ...post.previewContent2.bodyModel.paragraphs]}),

    recommends: virtuals.recommends,
    socialRecommends: virtuals.socialRecommendsCount,
    responses: virtuals.responsesCreatedCount,
    sections: virtuals.sectionCount,
    curated: post.curationEligibleAt
})


export const stories = posts.map(p => parseStory(p))
console.log('stories', stories)
