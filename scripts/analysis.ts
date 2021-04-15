// npx ts-node analysis


import * as use from '@tensorflow-models/universal-sentence-encoder'
import * as tf from '@tensorflow/tfjs-node'
import { Tensor2D } from '@tensorflow/tfjs-node';
import { PCA } from 'ml-pca'

import { stories, iStory } from './init'


const sentences = [
    'I like my phone.',
    'Your cellphone looks great.',
    'How old are you?',
    'What is your age?',
    'An apple a day, keeps the doctors away.',
    'Eating strawberries is healthy.'
];

const demo = () => use.load().then(async model => {
    const embeddings = await model.embed(sentences)
    embeddings.print(true); // verbose

    const dataset = [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
        [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
    )
    
    const pca = new PCA(dataset);
    console.log('dataset:', pca.predict(dataset, {nComponents:2}));
})



interface iEmbeddedStory extends iStory {
    embeddings: {
        title: number[],
        subtitle: number[],
        tags: number[][],
        topics: number[][],
        paragraphs: number[][]
    }
}

const analyzeStories = async() => {
    const model = await use.load()
    const numerize = (embeddings: Tensor2D) => [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
        [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
    )


    const embedStory = async(story: iStory): Promise<iEmbeddedStory> => {
        const title = await model.embed(story.title)
        const subtitle = await model.embed(story.subtitle)

        const tags = await model.embed(story.tags)
        const topics = await model.embed(story.topics)
        const paragraphs = await model.embed(story.paragraphs)

        return {
            ...story,
            embeddings:{
                title: numerize(title)[0],
                subtitle: numerize(subtitle)[0],
                tags: numerize(tags),
                topics: numerize(topics),
                paragraphs: numerize(paragraphs)
            }
        }
    }

    const story = await embedStory(stories[0])
    console.log('Story', story)
}

analyzeStories().then(console.log)
