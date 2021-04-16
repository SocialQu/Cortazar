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

    }, [])

	return <>
		<NavBar />
		<div className="section" style={{padding:'1.5rem' }}>
			<Stories stories={[]}/>
		</div>
	</>
}
