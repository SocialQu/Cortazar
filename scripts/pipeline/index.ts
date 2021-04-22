// npx ts-node pipeline

import * as use from '@tensorflow-models/universal-sentence-encoder'

import { iStoryFile, readStories } from './reader'
import { centerStories } from './analysis'
import { getStories } from './retriever'
import { parseStories } from './parser'
import { saveStories } from './storer'

import Topics from '../data/topics.json'
import { MongoClient } from 'mongodb'
import { promises as fs } from 'fs'
require('dotenv').config()


const dir = `data/stories/${new Date().toString().slice(0,15)}`
const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

interface iFetch { start:number, end:number }
interface iPipeline { fetch?:iFetch, train?:boolean }
const pipeline = async({fetch, train}:iPipeline) => {
    const model = await use.load()

    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    if(train){
        const path = 'data/stories'
        let files:iStoryFile[] = []
        const storyFiles = await readStories(path, files)

        for (const { payload } of storyFiles) {
            const parsedStories = parseStories(payload.references)
            const stories = await centerStories({stories:parsedStories, model})
            await saveStories(stories, client)
        }        
    }

    else if(fetch){
        try { await fs.access(dir) }
        catch(e) { await fs.mkdir(dir) }
    
        const topics = Topics.slice(fetch.start, fetch.end)
        console.log('Topics', topics)

        for (const topic of topics) {
            const rawStories:iStoryFile = await getStories(topic)
            await fs.writeFile(`${dir}/${topic}.json`, JSON.stringify(rawStories))
    
            const parsedStories = parseStories(rawStories.payload.references)
            const stories = await centerStories({stories:parsedStories, model})
            await saveStories(stories, client)
        }
    }

    client.close()
    console.log('Success')
}


const fetch:iFetch = { start:9, end: 10 }
pipeline({ train:true, fetch }).catch(console.log)
