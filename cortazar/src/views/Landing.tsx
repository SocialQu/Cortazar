/* eslint-disable jsx-a11y/anchor-is-valid */


import React, { useState } from 'react'

const title = 'What do you want to read today?'
const Title = () => <div style={{ margin:'2rem' }}>
    <p className='title is-1 has-text-centered' style={{color:'white'}}> { title } </p>
    <p className='subtitle is-4 has-text-centered' style={{color:'darkorange' }}> 
        Discover personalized reading recommendations <br/>
        based on what you tweet, or crave.
    </p>
</div>


const SearchBox = ({ demo }: { demo(tweet:string):void }) => {
    const [tweet, setTweet] = useState<string>('')

    return <div style={{ margin:'5rem' }}>
        <div className="control" style={{ width:560, margin:'auto' }}>
            <textarea 
                value={tweet}
                className="textarea"
                onChange={({ target: { value }}) => setTweet(value)}
                placeholder="Paste a tweet, or write a sentence about something you want to read..." 
            />
        </div>

        <div className="control" style={{ textAlign:'center', marginTop:'2em' }}>
            <a className="button is-info" style={{width:560}} onClick={() => demo(tweet)}> Try it Free </a>
        </div>
    </div>
}


export const Landing = ({ demo }: { demo(tweet:string):void }) => <>
    <Title />
    <SearchBox demo={demo}/>
</>
