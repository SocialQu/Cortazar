import { filterStories } from '../scripts/filters'
import { Filters } from '../molecules/Filters'
import { iStoryCard } from '../types/stories'
import { useEffect, useState } from 'react'
import { Story } from './Story'


const Row = ({ story }: { story: iStoryCard }) => <div className='columns'>
    <div className='column'> 
        <Story {...story}/> 
    </div>
</div>


export const Stories = ({ stories, search }: { stories:iStoryCard[], search:string }) => {
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

        <Filters topics={[]} tags={[]} deactivate={deactivate} filterStories={handleFilters}/>
        { storyCards.filter((_, i) => i < 10).map((story, i) => <Row story={story} key={i}/>) }
    </div>
}
