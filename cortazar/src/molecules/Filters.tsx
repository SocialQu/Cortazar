import { useState } from 'react'
import { Filter } from '../atoms/Filter'

const readingTimeFilters = ['Short (< 5 minutes)', 'Medium (5 - 10 minutes)', 'Long (> 10 minutes)']
const ratingFilters = ['3+ Stars', '4+ Stars']
const sortFilters = ['By Match', 'By Rating', 'By Publish Date']

export type Filters = 'Topics' | 'Tags' | 'Rating' | 'Reading Time' | 'Sort' 
interface iFilters { 
    topics: string[]
    tags: string[]
    filterStories(filter:Filters, item:string):void 
}


export const StoryFilters = ({topics, tags, filterStories}: iFilters) => <div className='columns'>
    <div className='column'>
        <Filter name={'Topics'} filters={topics} select={topic => filterStories('Topics', topic)} />
    </div>

    <div className='column'>
        <Filter name={'Tags'} filters={tags} select={tag => filterStories('Tags', tag)} />
    </div>

    <div className='column'>
        <Filter name={'Rating'} filters={ratingFilters} select={rating => filterStories('Rating', rating)} />
    </div>

    <div className='column'>
        <Filter name={'Reading Time'} filters={readingTimeFilters} select={time => filterStories('Reading Time', time)} />
    </div>

    <div className='column'>
        <Filter name={'Sort'} filters={sortFilters} select={sorting => filterStories('Sort', sorting)}/>
    </div>
</div>
