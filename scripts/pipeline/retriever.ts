// npx ts-node pipeline/retriever


import { topics } from '../data/topics.json'
import { promises as fs } from 'fs'
import axios from 'axios'


const root = 'https://medium.com/topic'
const lexem = '])}while(1);</x>'

topics.map(topic => console.log())
const saveStories = async(topic: string) => {
    const url = `${root}/${topic}?format=json`
    console.log('url', url)

    const { data, status } = await axios.get(url)
    const text = data.replace('])}while(1);</x>', '')

    await fs.writeFile(`./data/stories/${topic}.json`, text)
    return status
}


saveStories(topics[0]).then(console.log).catch(console.log)
