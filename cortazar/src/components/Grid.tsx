import React, { useEffect, useState } from 'react'
import { Story, iStoryCard } from './Story'
import { iStory } from '../types/stories'


const Row = ({ stories }: { stories: iStoryCard[] }) => <div className="columns">
    { stories.map((story, i) => <div className="column" key={i}> <Story {...story}/> </div>) }
</div>


const centerDelta = ((a:number[], {center:b}:iStory) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]))

interface iMaxScore {claps:number, topics:number, recommends:number, social:number, responses:number}
const getScore = (story:iStory, {claps, topics, recommends, social, responses}: iMaxScore) => Math.round((
    (story.claps/claps || 0)
    + (story.topics.length/topics || 0)
    + (story.recommends/recommends || 0)
    + (story.socialRecommends/social || 0)
    + (story.responses/responses || 0)
)*20)

export const Stories = ({ stories, center }: { stories:iStory[], center:number[] }) => {
    const [ storyCards, setStoryCards ] = useState<iStoryCard[]>([])

    useEffect(() => {
        if(!stories.length) return

        const claps = stories.reduce((d, {claps: i}) => d > i ? d : i, 0)
        const topics = stories.reduce((d, {topics: i}) => d > i.length ? d : i.length, 0)
        const recommends = stories.reduce((d, {recommends: i}) => d > i ? d : i, 0)
        const social = stories.reduce((d, {socialRecommends: i}) => d > i ? d : i, 0)
        const responses = stories.reduce((d, {responses: i}) => d > i ? d : i, 0)

        const ratedStories:iStoryCard[] = stories.map(s => ({
            title: s.title,
            subtitle: s.subtitle,
            image: s.imageURL,
            intro: s.paragraphs.filter(p => p!== s.title && p !== s.subtitle),
            match: centerDelta(center, s),
            score: getScore(s, {claps, topics, recommends, social, responses})
        }))


        const maxMatch = ratedStories.reduce((d, { match })=> d > match ? d : match, 0)
        const mappedStories: iStoryCard[] = ratedStories.map(s => ({
            ...s,
            match: 100 - Math.round((s.match/maxMatch)*30),
            score: s.score/100*30 + 70 
        })).sort(({match: a}, {match: b}) => a > b ? -1 : 1)

        setStoryCards(mappedStories)

    }, [stories, center])

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
            .map((stories, i) => <Row stories={stories} key={i}/>)
        }
    </div>
}
