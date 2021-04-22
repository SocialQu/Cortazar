// npx ts-node pipeline/parser


import { iRawStory } from '../../cortazar/src/types/stories'


type Collections = {[collection:string]: iCollection}
type Posts = {[post:string]: iPost}
type Users = {[user:string]: iUser}

export interface iReferences {
    Collection: Collections
    Post: Posts
    User: Users
}


interface iCollection { 
    slug: string
    domain?: string 
}

interface iTag { name: string, postCount: number }
interface iLinks { entries: { url: string }[] }
interface iTopic { createdAt: number, name: string }
interface iBodyModel {paragraphs: { text: string }[]}
interface iPost {
    id: string
    creatorId: string
    homeCollectionId: string

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
    uniqueSlug: string
}

interface iUser {
    name: string
    username: string
    twitterScreenName?: string
    subdomainCreatedAt?: number
}



const parseIntro = (post: iPost) => {
    const paragraphs = [...post.previewContent.bodyModel.paragraphs, ...post.previewContent2.bodyModel.paragraphs]
    const intro = [...new Set(paragraphs.map(({ text }) => text))].filter(p => p && !p.includes('Photo by'))
    return intro.filter(p => ![post.title.toLowerCase(), post.virtuals.subtitle.toLowerCase()].includes(p.toLowerCase()))
        .filter(p => p.split(' ').length > 6).filter((p, i, l) => p.slice(-1) !== '…' || i === (l.length - 1))
}


const getLink = (post: iPost, references: iReferences) => {
    const collection = references.Collection[post.homeCollectionId]
    if(collection){
        const root = collection.domain || `https://medium.com/${collection.slug}`
        return `${root}/${post.uniqueSlug}`
    }

    const { subdomainCreatedAt, username } = references.User[post.creatorId]
    if(subdomainCreatedAt){
        const root = `https://${username}.medium.com`
        return `${root}/${post.uniqueSlug}`
    }

    return `https://medium.com/${post.uniqueSlug}`
} 

const parseStory = (post: iPost, references: iReferences):iRawStory => ({
    id: post.id,
    title: post.title,
    subtitle: post.virtuals.subtitle,
    intro: parseIntro(post),
    image: post.virtuals.previewImage.imageId,
    link: getLink(post, references),

    tags: post.virtuals.tags.map(({ name }) => name),
    topics:post.virtuals.topics.map(({ name }) => name),

    stats: {
        recommends: post.virtuals.recommends,
        socialRecommends: post.virtuals.socialRecommendsCount,
        responses: post.virtuals.responsesCreatedCount,
        claps: post.virtuals.totalClapCount
    },

    readingTime: post.virtuals.readingTime,
    curated: post.curationEligibleAt,
    published: post.firstPublishedAt,

    author: references.User[post.creatorId].name,
    twitter: references.User[post.creatorId].twitterScreenName || ''
})


export const parseStories = (references: iReferences):iRawStory[] => {
    const posts = Object.values(references.Post)
    const parsedStories = posts.map(p => parseStory(p, references))
    return parsedStories  
}
