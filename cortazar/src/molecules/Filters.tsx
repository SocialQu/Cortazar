import { Filter } from '../atoms/Filter'
import { useState } from 'react'

const readingTimeFilters = ['Short (< 5 minutes)', 'Medium (5 - 10 minutes)', 'Long (> 10 minutes)']
const ratingFilters = ['3+ Stars', '4+ Stars']
const sortFilters = ['By Match', 'By Rating', 'By Publish Date']

type Filters = 'Topics' | 'Tags' | 'Rating' | 'Reading Time' | 'Sort' 
interface iFilters { topics:string[], tags:string[] }
export const Filters = ({topics, tags}: iFilters) => {
    const [active, setActive] = useState<Filters>()
    return <div className='columns'>
        <div className='column'>
            <Filter
                name={'Topics'}
                isActive={false}
                setActive={() => {}}
                filters={topics}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter 
                name={'Tags'}
                isActive={false}
                setActive={() => {}}
                filters={tags}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Rating'}
                isActive={false}
                setActive={() => {}}
                filters={ratingFilters}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Reading Time'}
                isActive={false}
                setActive={() => {}}
                filters={readingTimeFilters}
                select={() => {}}
            />
        </div>

        <div className='column'>
            <Filter
                name={'Sort'}
                isActive={false}
                setActive={() => {}}
                filters={sortFilters}
                select={() => {}}
            />
        </div>
    </div>
}
