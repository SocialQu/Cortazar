// npx ts-node pipeline/reader

import { iReferences } from './parser'
import { promises as fs } from 'fs'

interface iStoryFile {
    payload: {
        references: iReferences
    }
}

const path = 'data/stories'
let files:iStoryFile[] = []
const getStories = async(path:string, files:iStoryFile[]) => {
    const names = await fs.readdir(path)

    for (const name of names) {
        try{
            const file = await fs.readFile(`${path}/${name}`)
            const stories:iStoryFile = JSON.parse(file.toString())
            files = [...files, stories]
        } catch(e){ 
            files = await getStories(`${path}/${name}`, files)
        }
    }

    return files
}

getStories(path, files)
.then(files => console.log(files.length))
.catch(console.log)
