import { App as RealmApp, User, Credentials } from 'realm-web'
import { useState, useEffect } from 'react'
import amplitude from 'amplitude-js'

import { iStory, iStoryCard } from './types/stories'
import { analyzeTweets } from './scripts/analysis'
import { recommend } from './scripts/recommend'
// import debugStories from './data/stories.json'

import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Stories } from './components/Grid'
import { Landing } from './views/Landing'
import { Loading } from './views/Loading'

// import debugTweets from './data/tweets.json'
import 'bulma/css/bulma.css'
import './App.css'



const connectMongo = async() => {
    const REALM_APP_ID = 'tasktracker-kjrie'
    const app = new RealmApp({ id: REALM_APP_ID })
    const user: User = await app.logIn(Credentials.anonymous())
    return user
}


const sleep = (secs:number) => new Promise(resolve => setTimeout(resolve, secs))


// const DEBUG = JSON.parse(process.env.REACT_APP_DEBUG as string)
export const App = () => {
    const [ user, setUser ] = useState<User>()
    const [ loading, setLoading ] = useState(false)

    const [ search, setSearch ] = useState('')
    const [ center, setCenter ] = useState<number[]>()
	const [ stories, setStories ] = useState<iStoryCard[]>()


    useEffect(() => {
        // if(DEBUG) return

        connectMongo().then(user => setUser(user))

        amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_TOKEN as string)
        amplitude.getInstance().logEvent('VISIT_CORTAZAR')
    }, [])


    const demo = async(tweet:string):Promise<void> => {
        setSearch(tweet)
        setLoading(true)
        // if(!DEBUG) 

        amplitude.getInstance().logEvent('RECOMMEND_STORIES', { tweet })

        const { vector, center } = await analyzeTweets([tweet])
        setCenter(center)

        if(!user){
            await sleep(3)
            return demo(tweet)
        }

        // const stories:iStory[] = user ? await user.functions.recommend(center) : debugStories
        const stories:iStory[] = await user.functions.cortazarRecommend(center)

        const recommendations = recommend(stories, vector)
        setStories(recommendations)
        setLoading(false)
    }

    const initTwitter = async() => {
        const authURL = 'https://api.twitter.com/oauth/authenticate?oauth_token'
        setLoading(true)

        const user = await connectMongo()
        setUser(user)

        const oauthToken = await user.functions.requestAccess()	
        window.open(`${authURL}=${oauthToken}`, '_self')
    }

    const goHome = () => {
        setCenter(undefined)
        setStories(undefined)
    }

	return loading
        ?   <Loading />
		:   <>
                <NavBar signIn={initTwitter} goHome={goHome}/>
                <div className='section' style={{minHeight:'calc(100vh - 180px)', paddingBottom:0}}>
                    {
                        stories && center
                        ?   <Stories stories={stories} search={search}/>
                        :   <Landing demo={demo}/>
                    }
                </div>
                <Footer/>
            </>
}



/*    
    useEffect(() => {
        const offlineRecommendation = async () => {
			const center = await analyzeTweets(debugTweets)
            setCenter(center)

            const bestStories = recommend(center)
			setStories(bestStories as iStory[])
        }

        if (DEBUG) {
			// offlineRecommendation()
            return
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

				const center = await analyzeTweets(tweets)
                setCenter(center)

                const { stories } = await user.functions.recommendStories(center)
				setStories(stories)

				const mongo = user.mongoClient('myAtlasCluster')
				const db = mongo.db('Cortazar')
				const collection = db.collection('users')
				await collection.insertOne({ userId, stories })
	
			} catch (e) { console.log('Error Authenticating: ', e) }
        }

        const loadUser = async (userId: string) => {
            const user = await connectMongo()

            const mongo = user.mongoClient('myAtlasCluster')
            const db = mongo.db('Cortazar')
            const collection = db.collection('users')

			const { center, stories } = await collection.findOne({ userId })
            
            setCenter(center)
            setStories(stories)
        }


        const { search } = window.location
        const hasAuthorization = search && search.includes('oauth_token') && search.includes('oauth_verifier')
        const userId = window.localStorage.getItem('userId')


        if(userId) loadUser(userId)
        else if(hasAuthorization) initUser(search)

        amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_TOKEN as string)
        amplitude.getInstance().logEvent('VISIT_CORTAZAR')
    }, [])
*/

