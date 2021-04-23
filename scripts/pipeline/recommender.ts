// npx ts-node pipeline/recommender

import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../cortazar/src/scripts/pca.json'
import { iStory } from '../../cortazar/src/types/stories'
import { PCA, IPCAModel } from 'ml-pca'
import { vectorize } from './analysis'
import { MongoClient } from 'mongodb'


require('dotenv').config()
const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

const recommend = async(tweet: string) => {
    const model = await use.load()
    const embedding = await model.embed(tweet)

    const pca = PCA.load(PCA_Model as IPCAModel)
    const vector = vectorize(embedding)
    const center = pca.predict(vector, {nComponents:2}).getRow(0)
    console.log('center', center)

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const Stories = client.db("Cortazar").collection("stories")

    const geoNear = { $geoNear: { near:center, distanceField:'distance', }}
    const limit = { $limit: 100 }
    const stories: iStory[] = await Stories.aggregate([geoNear, limit]).toArray()

    console.log('stories', stories.length)
    console.log(stories[0].title, stories[0].subtitle)

    await client.close()
}


recommend('Tesla Solar + Powerwall battery enables consumers to be their own utility')
.catch(console.log)
