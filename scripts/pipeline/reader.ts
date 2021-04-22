// npx ts-node pipeline/reader

import { iReferences } from './parser'
import { promises as fs } from 'fs'

export interface iStoryFile {
    payload: {
        references: iReferences
    }
}

export const readStories = async(path:string, files:iStoryFile[]):Promise<iStoryFile[]> => {
    const names = await fs.readdir(path)

    for (const name of names) {
        try{
            const file = await fs.readFile(`${path}/${name}`)
            const stories:iStoryFile = JSON.parse(file.toString())
            files = [...files, stories]
        } catch(e){ 
            files = await readStories(`${path}/${name}`, files)
        }
    }

    return files
}
