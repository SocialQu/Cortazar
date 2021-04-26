/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

const Title = () => {
    const largeScreen = useMediaQuery({ query: '(min-width: 900px)' })

    return <div style={{ marginBottom:'2em', marginTop:'2em' }}>
        <p className='title is-1 has-text-centered' style={{color:'white'}}> 
            What do you want to read{largeScreen ? ' today' : ''}?
        </p>
        {
            largeScreen && 
            <p 
                className='subtitle is-4 has-text-centered' 
                style={{color:'darkorange', marginBottom:'3em' }}
            > 
                Discover personalized reading recommendations <br/>
                based on what you tweet, or crave.
            </p>
        }
    </div>
}

const SearchBox = ({ demo }: { demo(tweet:string):void }) => {
    const [tweet, setTweet] = useState<string>('')

    return <div style={{ maxWidth:'100%' }}>
        <div className='control' style={{ margin:'auto' }}>
            <textarea 
                value={tweet}
                className='textarea'
                style={{maxWidth:560, minWidth:'auto', margin:'auto'}}
                onChange={({ target: { value }}) => setTweet(value)}
                onKeyPress={({ key }) => key === 'Enter' ? demo(tweet) : null}
                placeholder='Paste a tweet, or write a sentence to find the best stories...' 
            />
        </div>

        <div className='control' style={{ textAlign:'center', marginTop:'1em' }}>
            <a 
                className='button is-info' 
                onClick={() => demo(tweet)} 
                style={{width:'100%', maxWidth:560}
            }> Try it Free </a>
        </div>
    </div>
}


export const Landing = ({ demo }: { demo(tweet:string):void }) => <>
    <Title />
    <SearchBox demo={demo}/>
</>
