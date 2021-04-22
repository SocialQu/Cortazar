// npx ts-node pipeline

import * as use from '@tensorflow-models/universal-sentence-encoder'

import { writeStories } from './retriever'
import { centerStories } from './analysis'
import { parseStories } from './parser'
import { saveStories } from './storer'

import Topics from '../data/topics.json'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
require('dotenv').config()


const dir = `data/stories/${new Date().toString().slice(0,15)}`
const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

const pipeline = async(start:number, end:number) => {
    try { await fs.access(dir) }
    catch(e) { await fs.mkdir(dir) }

    const topics = Topics.slice(start, end)
    console.log('Topics', topics)

    const model = await use.load()

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    for (const topic of topics) {
        const rawStories = await writeStories(topic)
        await fs.writeFile(`${dir}/${topic}.json`, JSON.stringify(rawStories))

        const parsedStories = parseStories(rawStories.payload.references)
        const stories = await centerStories({stories:parsedStories, model})
        await saveStories(stories, client)
    }

    client.close()
    console.log('Success')
}


pipeline(19, 20).catch(console.log)
