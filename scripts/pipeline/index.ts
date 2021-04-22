// npx ts-node pipeline

import { promises as fs } from 'fs'


const dir = `data/stories/${new Date().toString().slice(0,15)}`

const pipeline = async() => {
    try { await fs.access(dir) } 
    catch(e) { await fs.mkdir(dir) }

    await fs.writeFile(`${dir}/test.json`, JSON.stringify({}))
    console.log('Success')
}


pipeline().catch(console.log)
