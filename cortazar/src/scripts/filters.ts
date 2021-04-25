import { Filters } from "../molecules/Filters"
import { iStoryCard } from "../types/stories"


const topicFilters = (item:string, stories:iStoryCard[]) => stories.filter(({ topics }) => topics.includes(item))
const tagFilters = (item:string, stories:iStoryCard[]) => stories.filter(({ tags }) => tags.includes(item))

const readingTimeFilters = (item:string, stories:iStoryCard[]) => {
    if (item === 'Short (< 5 minutes)') return stories.filter(({ readingTime }) => readingTime < 5)
    if (item === 'Medium (5 - 10 minutes)') return stories.filter(({ readingTime }) => readingTime > 5 && readingTime < 10)
    if (item === 'Long (> 10 minutes)') return stories.filter(({ readingTime }) => readingTime > 10)
    return stories
}


const ratingFilters = (item:string, stories:iStoryCard[]) => {
    if (item === '3+ Stars') return stories.filter(({ score }) => score > 3)
    if (item === '4+ Stars') return stories.filter(({ score }) => score > 4)
    return stories 
}


const sortStories = (item:string, stories:iStoryCard[]) => {
    const newStories = [...stories]
    if(item === 'By Rating') return newStories.sort(({score:a}, {score:b})=> a > b ? -1 : 1)
    if(item === 'By Publish Date') return newStories.sort(({published:a}, {published:b})=> a > b ? -1 : 1)
    return newStories.sort(({match:a}, {match:b})=> a > b ? -1 : 1)
}

export const filterStories = (filter:Filters, item:string, stories:iStoryCard[]) => {
    if(filter === 'Topics') return topicFilters(item, stories)
    if(filter === 'Tags') return tagFilters(item, stories)
    if(filter === 'Reading Time') return readingTimeFilters(item, stories)
    if(filter === 'Rating') return ratingFilters(item, stories)
    if(filter === 'Sort') return sortStories(item, stories)
    return stories
}
