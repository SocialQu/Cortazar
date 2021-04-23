import { useState, useEffect } from 'react'
import { Filter } from '../atoms/Filter'

const readingTimeFilters = ['Short (< 5 minutes)', 'Medium (5 - 10 minutes)', 'Long (> 10 minutes)']
const ratingFilters = ['3+ Stars', '4+ Stars']
const sortFilters = ['By Match', 'By Rating', 'By Publish Date']

type Filters = 'Topics' | 'Tags' | 'Rating' | 'Reading Time' | 'Sort' 
interface iFilters { topics:string[], tags:string[], deactivate:boolean }
export const Filters = ({topics, tags, deactivate}: iFilters) => {
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
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter 
                name={'Tags'}
                isActive={active==='Tags'}
                setActive={() => setFilterActive('Tags')}
                filters={tags}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Rating'}
                isActive={active==='Rating'}
                setActive={() => setFilterActive('Rating')}
                filters={ratingFilters}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Reading Time'}
                isActive={active==='Reading Time'}
                setActive={() => setFilterActive('Reading Time')}
                filters={readingTimeFilters}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Sort'}
                isActive={active==='Sort'}
                setActive={() => setFilterActive('Sort')}
                filters={sortFilters}
                select={() => {}}
            />
        </div>
    </div>
}
