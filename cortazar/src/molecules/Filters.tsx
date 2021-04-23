import { useState, useEffect } from 'react'
import { Filter } from '../atoms/Filter'

const readingTimeFilters = ['Short (< 5 minutes)', 'Medium (5 - 10 minutes)', 'Long (> 10 minutes)']
const ratingFilters = ['3+ Stars', '4+ Stars']
const sortFilters = ['By Match', 'By Rating', 'By Publish Date']

export type Filters = 'Topics' | 'Tags' | 'Rating' | 'Reading Time' | 'Sort' 
interface iFilters { 
    topics: string[]
    tags: string[]
    deactivate:boolean
    filterStories(filter:Filters, item:string):void 
}


export const Filters = ({topics, tags, deactivate, filterStories}: iFilters) => {
    const [active, setActive] = useState<Filters>()
    useEffect(() => { setActive(undefined) }, [deactivate])

    const setFilterActive = (filter:Filters) => setActive(active !== filter ? filter : undefined)
    return <div className='columns'>
        <div className='column'>
            <Filter
                name={'Topics'}
                isActive={active==='Topics'}
                setActive={() =>  setFilterActive('Topics')}
                filters={topics}
                select={topic => filterStories('Topics', topic)}
            />
        </div>

        <div className='column'>
            <Filter 
                name={'Tags'}
                isActive={active==='Tags'}
                setActive={() => setFilterActive('Tags')}
                filters={tags}
                select={tag => filterStories('Tags', tag)}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Rating'}
                isActive={active==='Rating'}
                setActive={() => setFilterActive('Rating')}
                filters={ratingFilters}
                select={rating => filterStories('Rating', rating)}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Reading Time'}
                isActive={active==='Reading Time'}
                setActive={() => setFilterActive('Reading Time')}
                filters={readingTimeFilters}
                select={time => filterStories('Reading Time', time)}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Sort'}
                isActive={active==='Sort'}
                setActive={() => setFilterActive('Sort')}
                filters={sortFilters}
                select={sorting => filterStories('Sort', sorting)}
            />
        </div>
    </div>
}
