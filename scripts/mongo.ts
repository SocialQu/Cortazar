// npx ts-node mongo

import { MongoClient } from 'mongodb'
import docs from '../data/docs.json'

require('dotenv').config()

const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`


const start = async() => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    const Stories = client.db("Cortazar").collection("stories")
    const stories = await Stories.find().toArray()
    console.log('Before Write', stories)

    await Stories.insertMany(docs)

    const data = await Stories.find().toArray()
    console.log('After Write', data)

    client.close()    
}

start().then(console.log).catch(console.log)

