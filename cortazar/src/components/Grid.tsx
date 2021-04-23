import { iStory, iStoryCard } from '../types/stories'
import { Filters } from '../molecules/Filters'
import { useEffect, useState } from 'react'
import { Story } from './Story'


const Row = ({ stories }: { stories: iStoryCard[] }) => <div className='columns'>
    { stories.map((story, i) => <div className='column' key={i}> <Story {...story}/> </div>) }
</div>

const cleanIntro = (paragraphs: string[]) => paragraphs
const centerDelta = ((a:number[], {center:b}:iStory) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]))

interface iMaxScore { maxClaps:number, maxTopics:number, maxRecommends:number, maxSocial:number, maxResponses:number}
const getScore = ({ stats, topics }:iStory, maxScore: iMaxScore) => Math.round((
    (stats.claps/maxScore.maxClaps || 0)
    + (topics.length/maxScore.maxTopics || 0)
    + (stats.recommends/maxScore.maxRecommends || 0)
    + (stats.socialRecommends/maxScore.maxSocial || 0)
    + (stats.responses/maxScore.maxResponses || 0)
)*20)


const computeMaxScore = (stories:iStory[]) => {
    const stats = stories.map(({ stats }) => stats)

    const maxClaps = stats.reduce((d, {claps: i}) => d > i ? d : i, 0)
    const maxTopics = stories.reduce((d, {topics: i}) => d > i.length ? d : i.length, 0)
    const maxRecommends = stats.reduce((d, {recommends: i}) => d > i ? d : i, 0)
    const maxSocial = stats.reduce((d, {socialRecommends: i}) => d > i ? d : i, 0)
    const maxResponses = stats.reduce((d, {responses: i}) => d > i ? d : i, 0)
    const maxScore = { maxClaps, maxTopics, maxRecommends, maxSocial, maxResponses }

    return maxScore    
}

export const Stories = ({ stories, center, search }: { stories:iStory[], center:number[], search:string }) => {
    const [ storyCards, setStoryCards ] = useState<iStoryCard[]>([])
    const [ deactivate, setDeactivate ] = useState(false)

    useEffect(() => {
        if(!stories.length) return
        if(center.length !== 2) return

        const maxScore = computeMaxScore(stories)
        const ratedStories:iStoryCard[] = stories.map(story => ({
            ...story,
            match: centerDelta(center, story),
            score: getScore(story, maxScore)
        }))


        const maxMatch = ratedStories.reduce((d, { match })=> d > match ? d : match, 0)
        const mappedStories: iStoryCard[] = ratedStories.map(s => ({
            ...s,
            intro: cleanIntro(s.intro),
            match: 100 - Math.round((s.match/maxMatch)*30),
            score: s.score/100*30 + 70 
        })).sort(({match: a}, {match: b}) => a > b ? -1 : 1)

        setStoryCards(mappedStories)

    }, [stories, center])

    const clickedGrid = () => {
        setDeactivate(true)
        setDeactivate(false)
    }

    return <div className='container' onClick={clickedGrid}> 
        <h1 className='subtitle has-text-light'> 
            Showing search results for: 
            <i style={{color:'lightskyblue'}}> "{ search }" </i>
        </h1>
        <Filters topics={[]} tags={[]} deactivate={deactivate}/>

        {
            storyCards.reduce((d, i, idx) => 
                 idx % 1 === 0
                    ?   [...d, [i]] 
                    :   d.map((e, j, l) => 
                            j === (l.length - 1)
                                ?   [...e, i]
                                :   e
                        )
            , [] as iStoryCard[][])
            .map((stories, i) => <Row stories={stories} key={i}/>)
        }
    </div>
}
