// npx ts-node pipeline/retriever


import { topics } from '../data/topics.json'
import { promises as fs } from 'fs'
import axios from 'axios'


const root = 'https://medium.com/topic'
const lexem = '])}while(1);</x>'

topics.map(topic => console.log())
const saveStories = async(topic: string) => {
    const url = `${root}/${topic}?format=json`

    const { data, status } = await axios.get(url)
    const text = data.replace('])}while(1);</x>', '')

    await fs.writeFile(`./data/stories/${topic}.json`, text)
    console.log(status, url)
    return status
}


// saveStories(topics[0]).then(console.log).catch(console.log)


export const sleep = (secs: number) => new Promise(resolve => setTimeout(resolve, secs*1000))

const retrieveStories = async() => {
    for (const s of topics) {
        await saveStories(s)
        await sleep(10)
    }
} 

//retrieveStories().then().catch(console.log)
