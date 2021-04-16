import { App as RealmApp, User, Credentials } from "realm-web"
import React, { useState, useEffect } from 'react'
import { NavBar } from './components/NavBar'
import { Stories } from './components/Grid'

import debugTweets from './data/tweets.json'
import amplitude from 'amplitude-js'

import 'bulma/css/bulma.css'
import './App.css'

const DEBUG = true


const analyzeTweets = (tweets:string[]) => {}
const recommendStories = (tweets:string[]) => {}

export const App = () => {
	const [ stories, setStories ] = useState()
    const [ oauthToken, setOauthToken ] = useState('')

    useEffect(() => {
        if (DEBUG) {
			analyzeTweets(debugTweets)
			recommendStories(debugTweets)

			return
        }

        const connectMongo = async() => {
            const REALM_APP_ID = "tasktracker-kjrie"
            const app = new RealmApp({ id: REALM_APP_ID })
            const user: User = await app.logIn(Credentials.anonymous())
            return user
        }


        const initTwitter = async() => {
            const user = await connectMongo()
            const oauthToken = await user.functions.requestAccess()	
            setOauthToken(oauthToken)
        }

        const initUser = async (search: string) => {
            try {
                const user = await connectMongo()

				const tokens = search.replace('?oauth_token=', '').replace('oauth_verifier=', '').split('&')	
                const [ oauth_token, oauth_verifier ] = tokens

				const initMetricsBody = { oauth_token, oauth_verifier, userId: user.id }
                const { tweets, userId, userName } = await user.functions.getTweets(initMetricsBody)

                // console.log('Data: ', tweets, userId, userName)
                window.localStorage.setItem('userId', userId)
                window.localStorage.setItem('userName', userName)

				analyzeTweets(tweets)

                const { stories } = await user.functions.recommendStories()
				setStories(stories)

				const mongo = user.mongoClient('myAtlasCluster')
				const db = mongo.db("Cortazar")
				const collection = db.collection("users")
				await collection.insertOne({ userId, stories })
	
			} catch (e) { console.log('Error Authenticating: ', e) }
        }

        const loadUser = async (userId: string) => {
            const user = await connectMongo()

            const mongo = user.mongoClient('myAtlasCluster')
            const db = mongo.db("Cortazar")
            const collection = db.collection("users")

			const stories = await collection.findOne({ userId })
			setStories(stories)
        }


        const { search } = window.location
        const hasAuthorization = search && search.includes('oauth_token') && search.includes('oauth_verifier')
        const userId = window.localStorage.getItem('userId')


        if(userId) loadUser(userId)
        else if(hasAuthorization) initUser(search)
        else initTwitter()

    }, [])

	return <>
		<NavBar />
		<div className="section" style={{padding:'1.5rem' }}>
			<Stories stories={[]}/>
		</div>
	</>
}
