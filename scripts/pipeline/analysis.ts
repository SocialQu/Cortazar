// npx ts-node pipeline/analysis


import { UniversalSentenceEncoder } from '@tensorflow-models/universal-sentence-encoder'
import { PCA, IPCAModel } from 'ml-pca'

import { vectorize, findCenter } from '../../cortazar/src/scripts/analysis'
import { iRawStory, iStory } from '../../cortazar/src/types/stories'
import PCA_Model from '../../cortazar/src/scripts/pca.json'


interface iEmbeddedStory extends iRawStory {
    vectors: {
        title: number[]
        subtitle: number[]
        tags: number[]
        topics: number[]
        intro: number[]
    }
}


export const centerStory = ({ vectors }: iEmbeddedStory): number[] => {
    const arrayedStory = [
        ...[...Array(6)].map(() => vectors.title),
        ...[...Array(4)].map(() => vectors.subtitle),

        ...[...Array(5)].map(() => vectors.intro),
        ...[...Array(3)].map(() => vectors.tags),
        ...[...Array(2)].map(() => vectors.topics)
    ]

    const center = findCenter(arrayedStory)
    return center
}


const embedStory = async(story: iRawStory, model: UniversalSentenceEncoder): Promise<iEmbeddedStory> => {
    const title = await model.embed(story.title)
    const subtitle = await model.embed(story.subtitle)

    const tags = await model.embed(story.tags.reduce((d, i) => `${d}, ${i}`, ''))
    const topics = await model.embed(story.topics.reduce((d, i) => `${d}, ${i}`, ''))
    const paragraphs = await model.embed(story.intro.reduce((d, i) => `${d} \n ${i}`, ''))

    return {
        ...story,
        vectors:{
            title: vectorize(title)[0],
            subtitle: vectorize(subtitle)[0],
            tags: vectorize(tags)[0],
            topics: vectorize(topics)[0],
            intro: vectorize(paragraphs)[0]
        }
    }
}


interface iCenterStories { stories:iRawStory[], model:UniversalSentenceEncoder }
export const centerStories = async({stories, model}: iCenterStories):Promise<iStory[]> => {
    const pca = PCA.load(PCA_Model as IPCAModel);

    let Stories:iStory[] = []    
    for (const s of stories) {
        const vectorizedStory = await embedStory(s, model)
        const embeddings = centerStory(vectorizedStory)
        const center = pca.predict([embeddings], {nComponents:2}).getRow(0)

        Stories = [...Stories, { ...s, embeddings, center }]
    }

    return Stories
}
