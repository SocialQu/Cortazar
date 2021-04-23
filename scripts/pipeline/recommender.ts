// npx ts-node pipeline/recommender

import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../cortazar/src/scripts/pca.json'
import { iStory } from '../../cortazar/src/types/stories'
import { PCA, IPCAModel } from 'ml-pca'
import { vectorize } from './analysis'
import { MongoClient } from 'mongodb'


require('dotenv').config()
const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

const similarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}


const recommend = async(tweet: string) => {
    const model = await use.load()
    const embedding = await model.embed(tweet)

    const pca = PCA.load(PCA_Model as IPCAModel)
    const vector = vectorize(embedding)[0]
    const center = pca.predict([vector], {nComponents:2}).getRow(0)

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const Stories = client.db("Cortazar").collection("stories")

    const geoNear = { $geoNear: { near:center, distanceField:'distance', }}
    const limit = { $limit: 10 }
    const stories: iStory[] = await Stories.aggregate([geoNear, limit]).toArray()

    const recommendations = stories.sort(({embeddings:a}, {embeddings:b}) => 
        similarity(vector, a) > similarity(vector, b) ? 1 : -1
    )

    await client.close()
    return recommendations
}


recommend('Tesla Solar + Powerwall battery enables consumers to be their own utility')
.catch(console.log)
