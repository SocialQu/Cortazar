// npx ts-node pipeline/train

import { iStory } from '../../cortazar/src/types/stories'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
import { PCA } from 'ml-pca'

const PCA_ROOT = `../cortazar/src/data/pca.json`

require('dotenv').config()
const testEmbeddings = async() => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const Stories = client.db('Cortazar').collection('stories')
    const data: iStory[] = await Stories.find().toArray()
    client.close()

    const embeddings = data.map(({ embeddings }) => embeddings)
    const pca = new PCA(embeddings)
    await fs.writeFile(PCA_ROOT, JSON.stringify(pca))

    return
}

testEmbeddings().catch(console.log)
