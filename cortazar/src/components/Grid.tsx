import { Filters, StoryFilters } from '../molecules/Filters'
import { filterStories } from '../scripts/filters'
import { useMediaQuery } from 'react-responsive'
import { iStoryCard } from '../types/stories'
import { Story, MobileStory } from './Story'

import { useEffect, useState } from 'react'

export const storyMediaQuery = '(max-width: 768px)'
const Row = ({ story }: { story: iStoryCard }) => {
    const isMobile = useMediaQuery({ query: storyMediaQuery })

    return <div className='columns'>
        <div className='column'> 
            { !isMobile ? <Story story={story}/> : <MobileStory story={story}/>} 
        </div>
    </div>
}


const enlistFilters = (filters:string[]) => {
    const countFilters = filters.reduce((d, i) => d[i] ? {...d, [i]:d[i] + 1} : {...d, [i]:1}, {} as {[filter:string]:number})
    const mapFilters = Object.entries(countFilters).map(([filter, value]) => ({filter, value}))
    const sortedFilters = mapFilters.sort(({value: a}, {value:b})=> a > b ? -1 : 1)
    const topFive = sortedFilters.filter((_, i) => i < 5)
    return topFive.map(({ filter }) => filter)
}

export const Stories = ({ stories, search }: { stories:iStoryCard[], search:string }) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1216px)' })
    const [ storyCards, setStoryCards ] = useState<iStoryCard[]>([])

    useEffect(() => { setStoryCards(stories) }, [stories])
    const handleFilters = (filter:Filters, item:string) => {
        const filteredStories = filterStories(filter, item, stories)
        setStoryCards(filteredStories)
    }

    return <div className='container'> 
        {   
            isDesktop && 
            <h1 className='subtitle has-text-light'> 
                Showing search results for: 
                <i style={{color:'lightskyblue'}}> "{ search }" </i>
            </h1>
        }

        { 
            isDesktop && 
            <StoryFilters 
                topics={ enlistFilters(stories.reduce((d, { topics }) => [...d, ...topics], [] as string[])) }
                tags={ enlistFilters(stories.reduce((d, { tags }) => [...d, ...tags], [] as string[])) } 
                filterStories={handleFilters}
            /> 
        }

        { storyCards.filter((_, i) => i < 10).map((story, i) => <Row story={story} key={i}/>) }
    </div>
}
