import React, { useState } from 'react'


const title = 'Discover the greatest ideas online.'
const subtitle = `Get personalized reading recommendations based on what you tweet, or what interests you.`

const Title = () => <div style={{ margin:'2rem' }}>
    <p className='title is-1 has-text-centered' style={{color:'white'}}> { title } </p>
    <p className='subtitle is-4 has-text-centered' style={{color:'darkorange' }}> { subtitle } </p>
</div>


const SearchBox = ({ demo }: { demo(tweet:string):void }) => {
    const [tweet, setTweet] = useState<string>('')

    return <div className="field has-addons">
        <div className="control">
            <input 
                type="text" 
                value={tweet}
                className="input" 
                onChange={({ target: { value }}) => setTweet(value)}
                placeholder="Paste a tweet, or write a sentence about what you want to read!" 
            />
        </div>

        <div className="control">
            <a className="button is-info" onClick={() => demo(tweet)}> Try it Free </a>
        </div>
    </div>    
}


export const Landing = ({ demo }: { demo(tweet:string):void }) => <>
    <Title />
    <SearchBox demo={demo}/>
</>
