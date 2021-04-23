import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Tensor2D } from '@tensorflow/tfjs'
import { IPCAModel, PCA } from 'ml-pca'
import * as tf from '@tensorflow/tfjs'
import pcaModel from './pca.json'


const findCenter = (vectors: number[][]) => [...Array(vectors[0].length)]
.map((_, idx) => vectors.reduce((d,i)=> d + i[idx], 0)/vectors.length)


const vectorize = (embeddings: Tensor2D):number[][] => [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
    [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
)

export const analyzeTweets = async(tweets:string[]):Promise<number[]> => {
    const model = await use.load()

    const embeddings = await model.embed(tweets)
    const pca = PCA.load(pcaModel as IPCAModel)

    const numericalEmbeddings = vectorize(embeddings)
    const reducedEmbeddings = numericalEmbeddings.map(e => pca.predict([e], {nComponents: 2}).getRow(0))
    console.log('reducedEmbeddings', reducedEmbeddings)

    const center = findCenter(reducedEmbeddings)
    console.log('center', center)
    return center
}
