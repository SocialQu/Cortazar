// npx ts-node pipeline/test

import { iStory } from '../../cortazar/src/types/stories'
import { MongoClient } from 'mongodb'

require('dotenv').config()
const testEmbeddings = async() => {
    const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()

    const Stories = client.db('Cortazar').collection('stories')
    const data: iStory[] = await Stories.find().toArray()
    client.close()

    console.log('After Write', data.length)
    console.log(data.filter(f => !f.embeddings).length)
    return
}

testEmbeddings().catch(console.log)
