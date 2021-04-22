// npx ts-node pipeline/analysis


import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { PCA, IPCAModel } from 'ml-pca'

import { iRawStory, iStory } from '../../cortazar/src/types/stories'
import { vectorize } from '../../cortazar/src/scripts/analysis'
import PCA_Model from '../../cortazar/src/scripts/pca.json'


interface iEmbeddedStory extends iRawStory {
    embeddings: {
        title: number[],
        subtitle: number[],
        tags: number[][],
        topics: number[][],
        paragraphs: number[][]
    }
}


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


const embedStory = async(story: iRawStory, model: UniversalSentenceEncoder): Promise<iEmbeddedStory> => {
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

interface iCenterStories { stories:iRawStory[], model:UniversalSentenceEncoder }
export const centerStories = async({stories, model}: iCenterStories):Promise<iStory[]> => {
    const pca = await PCA.load(PCA_Model as IPCAModel);

    let Stories:iEmbeddedStory[] = []    
    for (const s of stories) {
        const story = await embedStory(s, model)
        Stories = [...Stories, story]
    }

    const centeredStories = Stories.map(s => {
        const embeddedStory = reducedStory(s, pca)
        const center = centerStory(embeddedStory)
        
        const { embeddings, ...story} = embeddedStory
        const centeredStory = { ...story, center }
        return centeredStory
    })

    return centeredStories
}
