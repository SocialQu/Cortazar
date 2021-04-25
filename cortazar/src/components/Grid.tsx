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
            { !isMobile ? <Story {...story}/> : <MobileStory {...story}/>} 
        </div>
    </div>
}


export const Stories = ({ stories, search }: { stories:iStoryCard[], search:string }) => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1216px)' })

    const [ storyCards, setStoryCards ] = useState<iStoryCard[]>([])
    const [ deactivate, setDeactivate ] = useState(false)


    useEffect(() => { setStoryCards(stories) }, [stories])

    const handleFilters = (filter:Filters, item:string) => {
        const filteredStories = filterStories(filter, item, stories)
        setStoryCards(filteredStories)
        hideFilters()
    }

    const hideFilters = () => {
        setDeactivate(true)
        setDeactivate(false)
    }

    return <div className='container' onClick={hideFilters}> 
        <h1 className='subtitle has-text-light'> 
            Showing search results for: 
            <i style={{color:'lightskyblue'}}> "{ search }" </i>
        </h1>

        { isDesktop && <StoryFilters topics={[]} tags={[]} deactivate={deactivate} filterStories={handleFilters}/> }
        { storyCards.filter((_, i) => i < 10).map((story, i) => <Row story={story} key={i}/>) }
    </div>
}
