// npx ts-node recommend

import { MongoClient } from 'mongodb'

require('dotenv').config()

const uri = `mongodb+srv://${process.env.mongo_admin}/${process.env.cortazar_db}`

const start = async(near:number[]) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    await client.connect()
    console.log('Connected')

    const Stories = client.db("Cortazar").collection("stories")
    const stories = await Stories.find().toArray()

    const pipeline = { $geoNear: { near, distanceField:'distance' }}
    const docs = await Stories.aggregate([pipeline]).toArray()

    docs.map(({ center }) => console.log(center))
    client.close()    
}

start([0,0]).then(console.log).catch(console.log)
