import { iStory, iStoryCard } from "../types/stories"

interface iMaxScore { maxClaps:number, maxTopics:number, maxRecommends:number, maxSocial:number, maxResponses:number}

const similarity = (center:number[], embedding: number[]) => {
    if (center.length !== embedding.length) return Infinity
    const delta = center.reduce((d, i, idx) => d + Math.abs(i - embedding[idx]), 0)
    return delta
}

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


interface iMapStars { score:number, [score:string]:number}
const getStars = (stories:iStoryCard[]):iStoryCard[] => {
    const scores = stories.map(({ score }) => score).sort((a, b) => a > b ? -1 : 1)

    const mapStars = (score:number, {fiveStars, fourHalf, fourStars, threeHalf, threeStars }:{[score:string]:number}) => {
        if(score > fiveStars) return 5
        if(score > fourHalf) return 4.5
        if(score > fourStars) return 4
        if(score > threeHalf) return 3.5
        if(score > threeStars) return 3
        return 2.5
    }

    const fiveStars = scores[10]
    const fourHalf = scores[30]
    const fourStars = scores[50]
    const threeHalf = scores[70]
    const threeStars = scores[90]

    return stories.map(({ score, ...story }) => ({
        ...story,
        score: mapStars(score, { fiveStars, fourHalf, fourStars, threeHalf, threeStars })
    }))
}


const recommendationScale = (score:number, minMatch:number, maxMatch:number) => {
    const num =  (score - minMatch + Math.log(minMatch))
    const denominator = (maxMatch - minMatch + Math.log(minMatch)) 
    const scale = 100 - (num/denominator)*60
    return Math.round(scale)
}

export const recommend = (stories: iStory[], vector:number[]):iStoryCard[] => {
    const similarities = stories.map(s => ({...s, match:similarity(vector, s.embeddings) }))

    const minMatch = similarities.reduce((d, {match}) => d < match ? d : match, Infinity)
    const maxMatch = similarities.reduce((d, {match}) => d > match ? d : match, 0)
    const recommendations = similarities.map(s => ({...s, match: recommendationScale(s.match, minMatch, maxMatch)}))

    const maxScore = computeMaxScore(stories)
    const scores = recommendations.map(r => ({...r, score:getScore(r, maxScore)}))
    const stars = getStars(scores)

    const sorted = stars.sort(({match:a}, {match:b}) => a > b ? -1 : 1)
    return sorted
}
