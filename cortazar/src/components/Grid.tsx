import React, { useEffect, useState } from 'react'
import { Story, iStoryCard } from './Story'
import { iStory } from '../types/stories'


const Row = ({ stories }: { stories: iStoryCard[] }) => <div className="columns">
    { stories.map((story) => <div className="column"> <Story {...story} /> </div>) }
</div>


const centerDelta = ({center: a}: iStory, {center: b}: iStory) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])

interface iMaxScore {claps:number, topics:number, recommends:number, social:number, responses:number}
const getScore = (story:iStory, {claps, topics, recommends, social, responses}: iMaxScore) => (story.claps/claps
    + story.topics.length/topics
    + story.recommends/recommends
    + story.socialRecommends/social
    + story.responses/responses
)*20

export const Stories = ({ stories }: { stories: iStory[] }) => {
    const [ storyCards, setStoryCards ] = useState<iStoryCard[]>([])

    useEffect(() => {
        if(!stories.length) return

        const lastStory = stories[stories.length - 1]

        const maxClaps = stories.reduce((d, {claps: i}) => d > i ? d : i, 0)
        const maxTopics = stories.reduce((d, {topics: i}) => d > i.length ? d : i.length, 0)
        const maxRecommends = stories.reduce((d, {recommends: i}) => d > i ? d : i, 0)
        const maxSocial = stories.reduce((d, {socialRecommends: i}) => d > i ? d : i, 0)
        const maxResponses = stories.reduce((d, {responses: i}) => d > i ? d : i, 0)

        const minMatch = centerDelta(stories[0], lastStory)

        const mappedStories: iStoryCard[] = stories.map(s => ({
            title: s.title,
            subtitle: s.subtitle,
            image: s.imageURL,
            intro: s.paragraphs.filter(p => p!== s.title && p !== s.subtitle),
            match: Math.round(100 + (centerDelta(stories[0], s) - minMatch)*30),
            score: getScore(s, {claps:maxClaps, topics:maxTopics, recommends:maxRecommends, social:maxSocial, responses:maxResponses})
        })).sort(({match: a}, {match: b}) => a < b ? 1 : -1)

        setStoryCards(mappedStories)

    }, [stories])

    return <div className="container"> 
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
            .map(stories => <Row stories={stories}/>)
        }
    </div>
}
