// npx ts-node recommender

import * as use from '@tensorflow-models/universal-sentence-encoder'
import PCA_Model from '../../cortazar/src/scripts/pca.json'
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

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()




}

