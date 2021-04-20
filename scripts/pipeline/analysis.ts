// npx ts-node pipeline/analysis


import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Tensor2D } from '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import { PCA } from 'ml-pca'

import { iRawStory, iStory } from '../../cortazar/src/types/stories'
import startups from '../data/stories/Startups.json'
import { parseStories } from './parser'
import { promises as fs } from 'fs'


const PCA_ROOT = `../cortazar/src/scripts/pca.json`

const findCenter = (vectors: number[][]) =>  vectors.reduce((d, i, _, l) => 
    [d[0] + (i[0]/l.length), d[1] + (i[1]/l.length)]
, [0, 0])

export const centerStory = ({ embeddings }: iEmbeddedStory): number[] => {
    const paragraphs = findCenter(embeddings.paragraphs)
    const tags = findCenter(embeddings.tags)
    const topics = findCenter(embeddings.topics)


    const arrayedStory = [
        ...[...Array(6)].map(() => embeddings.title),
        ...[...Array(4)].map(() => embeddings.subtitle),

        ...[...Array(5)].map(() => paragraphs),
        ...[...Array(3)].map(() => tags),
        ...[...Array(2)].map(() => topics)
    ]

    const center = findCenter(arrayedStory)
    return center
}



interface iEmbeddedStory extends iRawStory {
    embeddings: {
        title: number[],
        subtitle: number[],
        tags: number[][],
        topics: number[][],
        paragraphs: number[][]
    }
}


const vectorize = (embeddings: Tensor2D) => [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
    [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
)

const findSentences = ({ embeddings: e }: iEmbeddedStory):number[][] => [e.title, e.subtitle, ...e.tags, ...e.topics, ...e.paragraphs] 

const embedStory = async(story: iRawStory, model: use.UniversalSentenceEncoder): Promise<iEmbeddedStory> => {
    const title = await model.embed(story.title)
    const subtitle = await model.embed(story.subtitle)

    const tags = await model.embed(story.tags)
    const topics = await model.embed(story.topics)
    const paragraphs = await model.embed(story.intro)

    return {
        ...story,
        embeddings:{
            title: vectorize(title)[0],
            subtitle: vectorize(subtitle)[0],
            tags: vectorize(tags),
            topics: vectorize(topics),
            paragraphs: vectorize(paragraphs)
        }
    }
}


const reducedStory = (story: iEmbeddedStory, pca: PCA): iEmbeddedStory => ({
    ...story,
    embeddings:{
        title: pca.predict([story.embeddings.title], {nComponents: 2}).getRow(0),
        subtitle: pca.predict([story.embeddings.subtitle], {nComponents: 2}).getRow(0),
        tags: story.embeddings.tags.map((t => pca.predict([t], {nComponents: 2}).getRow(0))),
        topics: story.embeddings.topics.map((t => pca.predict([t], {nComponents: 2}).getRow(0))),
        paragraphs: story.embeddings.paragraphs.map((t => pca.predict([t], {nComponents: 2}).getRow(0)))
    }
})


export const centerStories = async(stories:iRawStory[]):Promise<iStory[]> => {
    const model = await use.load()

    let Stories:iEmbeddedStory[] = []
    let Sentences:number[][] = []
    
    for (const s of stories) {
        const story = await embedStory(s, model)
        const sentences = findSentences(story)

        Stories = [...Stories, story]
        Sentences = [...Sentences, ...sentences]
    }

    const pca = new PCA(Sentences);
    await fs.writeFile(PCA_ROOT, JSON.stringify(pca))

    const centeredStories = Stories.map(s => {
        const embeddedStory = reducedStory(s, pca)
        const center = centerStory(embeddedStory)
        
        const { embeddings, ...story} = embeddedStory
        const centeredStory = { ...story, center }
        return centeredStory
    })

    return centeredStories
}

const test = async() => {
    const parsedStories = parseStories(startups.payload.references)
    const stories = await centerStories(parsedStories)
    return stories    
}


// test().then(stories => stories.map(({ center, title }) => console.log(title, center))).catch(console.log)
