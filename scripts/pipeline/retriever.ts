// npx ts-node pipeline/retriever

import axios from 'axios'


const root = 'https://medium.com/topic'
const lexem = '])}while(1);</x>'

export const sleep = (secs: number) => new Promise(resolve => setTimeout(resolve, secs*1000))
export const writeStories = async(topic: string) => {
    const url = `${root}/${topic}?format=json`

    const { data, status } = await axios.get(url)
    const text = data.replace(lexem, '')
    const response = JSON.parse(text)

    console.log(status, url)
    return response
}
