import { useState } from 'react'
import { Filter } from '../atoms/Filter'

const readingTimeFilters = ['Short (< 5 mins)', 'Medium (5 - 10 mins)', 'Long (> 10 mins)']
const ratingFilters = ['3+ Stars', '4+ Stars']
const sortFilters = ['By Match', 'By Rating', 'By Publish Date']

export type Filters = 'Topics' | 'Tags' | 'Rating' | 'Reading Time' | 'Sort' 
interface iFilters { 
    topics: string[]
    tags: string[]
    filterStories(filter:Filters, item:string):void 
}


export const StoryFilters = ({topics, tags, filterStories}: iFilters) => {
    const [filterNames, setNames] = useState({
        Topics: 'Topics',
        Tags: 'Tags',
        Rating: 'Rating',
        'Reading Time': 'Reading Time',
        Sort: 'Sort'
    })

    const handleFilters = (filter:Filters, item:string) => {
        filterStories(filter, item)
        setNames({...filterNames, [filter]: item})
    }

    return <div className='columns'>
        <div className='column'>
            <Filter name={filterNames.Topics} filters={topics} select={topic => handleFilters('Topics', topic)} />
        </div>

        <div className='column'>
            <Filter name={filterNames.Tags} filters={tags} select={tag => handleFilters('Tags', tag)} />
        </div>

        <div className='column'>
            <Filter name={'Rating'} filters={ratingFilters} select={rating => handleFilters('Rating', rating)} />
        </div>

        <div className='column'>
            <Filter 
                name={filterNames['Reading Time']} 
                filters={readingTimeFilters} 
                select={time => handleFilters('Reading Time', time)} 
            />
        </div>

        <div className='column'>
            <Filter name={filterNames['Sort']} filters={sortFilters} select={sorting => handleFilters('Sort', sorting)}/>
        </div>
    </div>
}
