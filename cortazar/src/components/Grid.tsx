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

    const clickedGrid = () => {
        setDeactivate(true)
        setDeactivate(false)
    }

    return <div className='container' onClick={clickedGrid}> 
        <h1 className='subtitle has-text-light'> 
            Showing search results for: 
            <i style={{color:'lightskyblue'}}> "{ search }" </i>
        </h1>

        <Filters topics={[]} tags={[]} deactivate={deactivate} filterStories={() => {}}/>
        { storyCards.map((story, i) => <Row story={story} key={i}/>) }
    </div>
}
