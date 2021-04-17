import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Tensor2D } from '@tensorflow/tfjs'
import * as tf from '@tensorflow/tfjs'
import pcaModel from './pca.json'
import { IPCAModel, PCA } from 'ml-pca'


const findCenter = (vectors: number[][]) =>  vectors.reduce((d, i, _, l) => [d[0] + (i[0]/l.length), d[1] + (i[1]/l.length)], [0, 0])

const numerize = (embeddings: Tensor2D):number[][] => [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
    [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
)


export const analyzeTweets = async(tweets:string[]):Promise<number[]> => {
    const model = await use.load()

    const embeddings = await model.embed(tweets)
    const pca = PCA.load(pcaModel as IPCAModel)

    const numericalEmbeddings = numerize(embeddings)
    const reducedEmbeddings = numericalEmbeddings.map(e => pca.predict([e], {nComponents: 2}).getRow(0))

    const center = findCenter(reducedEmbeddings)
    return center
}
