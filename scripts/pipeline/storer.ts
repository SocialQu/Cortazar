// npx ts-node pipeline/storer

import { iStory } from '../../cortazar/src/types/stories'
import { MongoClient } from 'mongodb'

export const saveStories = async(stories:iStory[], client:MongoClient) => {
    const Stories = client.db('Cortazar').collection('stories')

    for (const story of stories) {
        const query = { id: story.id }
        const update = { $set: story }
        const options = { upsert: true }
        await Stories.updateOne(query, update, options)

    }

    const data: iStory[] = await Stories.find().toArray()
    console.log('After Write', data.length)
    return
}
