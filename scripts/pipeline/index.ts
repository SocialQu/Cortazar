// npx ts-node pipeline

import { writeStories } from './retriever'
import Topics from '../data/topics.json'
import { promises as fs } from 'fs'

const dir = `data/stories/${new Date().toString().slice(0,15)}`

const pipeline = async(start:number, end:number) => {
    try { await fs.access(dir) }
    catch(e) { await fs.mkdir(dir) }

    const topics = Topics.slice(start, end)
    console.log('Topics', topics)

    for (const t of topics) {
        const rawStories = await writeStories(t)
        await fs.writeFile(`${dir}/test.json`, rawStories)
    }


    console.log('Success')
}


pipeline(0, 1).catch(console.log)
