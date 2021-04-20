// npx ts-node pipeline/storer

import { iStory } from '../../cortazar/src/types/stories'
import startups from '../data/stories/Startups.json'

import { centerStories } from './analysis'
import { parseStories } from './parser'
import { MongoClient } from 'mongodb'


require('dotenv').config()

const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`
const start = async() => {
    const parsedStories = parseStories(startups.payload.references)
    const stories = await centerStories(parsedStories)


    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    const Stories = client.db("Cortazar").collection("stories")

    for (const story of stories) {
        const query = { id: story.id }
        const update = { $set: story }
        const options = { upsert: true }
        await Stories.updateOne(query, update, options)

    }

    const data: iStory[] = await Stories.find().toArray()
    console.log('After Write', data.length)
    data.map(({ center }) => console.log(center))

    client.close()    
}

start().then(console.log).catch(console.log)

