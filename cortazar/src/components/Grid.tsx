import { Story, iStory } from './Story'

const Row = ({ stories }: { stories: iStory[] }) => <div className="columns">
    { stories.map((story) => <div className="column"> <Story {...story} /> </div>) }
</div>

export const Stories = ({ stories }: { stories: iStory[] }) => <div className="container"> 
    {
        stories.reduce((d, i, idx) => 
            idx % 3 === 0 
                ?   [...d, [i]] 
                :   d.map((e, j, l) => 
                        j === (l.length - 1) 
                            ? e 
                            : [...e, i]
                    ), [] as iStory[][]
        ).map(stories => <Row stories={stories}/>)
    }
</div>

