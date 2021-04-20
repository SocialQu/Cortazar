// npx ts-node pipeline/storer

import product from '../data/stories/Product-Management.json'
import ai from '../data/stories/Artificial-Intelligence.json'
import productivity from '../data/stories/Productivity.json'
import dataScience from '../data/stories/Data-Science.json'
import leadership from '../data/stories/Leadership.json'
import marketing from '../data/stories/Marketing.json'
import startups from '../data/stories/Startups.json'
import business from '../data/stories/Business.json'
import science from '../data/stories/Science.json'
import tech from '../data/stories/Technology.json'
import economy from '../data/stories/Economy.json'
import future from '../data/stories/Future.json'

import { iRawStory, iStory } from '../../cortazar/src/types/stories'
import { centerStories } from './analysis'
import { parseStories } from './parser'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
import { sleep } from './retriever'


require('dotenv').config()

const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`
const saveStories = async(rawStories: iRawStory[]) => {
    const stories = await centerStories(rawStories)

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    const Stories = client.db("Cortazar").collection("stories")
    await Stories.deleteMany({})

    for (const story of stories) {
        const query = { id: story.id }
        const update = { $set: story }
        const options = { upsert: true }
        await Stories.updateOne(query, update, options)

    }

    const data: iStory[] = await Stories.find().toArray()
    console.log('After Write', data.length)
    data.map(({ title, center }) => console.log(title, center))
    
    await fs.writeFile('../cortazar/src/data/stories.json', JSON.stringify(data))
    client.close()    
}

// start(startups.payload.references).then(console.log).catch(console.log)



const topics = [
    productivity,
    dataScience,
    leadership,
    marketing,
    startups,
    business,
    product,
    science,
    economy,
    future,
    tech,
    ai
].map(t => parseStories(t.payload.references))
.reduce((d,i)=> [...d, ...i], [])

saveStories(topics).then().catch(console.log)

/*
const saveAllStories = async() => {
    for (const s of topics) {
        await saveStories(s)
        await sleep(1)
    }
} 
*/
