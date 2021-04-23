import * as use from '@tensorflow-models/universal-sentence-encoder'
import { Tensor2D } from '@tensorflow/tfjs'
import { slice } from '@tensorflow/tfjs'
import { IPCAModel, PCA } from 'ml-pca'
import pcaModel from './pca.json'



const vectorize = (embeddings: Tensor2D):number[][] => [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
    [...d, Array.from(slice(embeddings, [idx, 0], [1]).dataSync())], []
)


export const analyzeTweets = async(tweets:string[]) => {
    const model = await use.load()
    const embeddings = await model.embed(tweets)

    const pca = PCA.load(pcaModel as IPCAModel)
    const vector = vectorize(embeddings)[0]
    const center = await pca.predict([vector], {nComponents:2}).getRow(0)

    return { center, vector }
}
