/* eslint-disable jsx-a11y/anchor-is-valid */

import { useMediaQuery } from 'react-responsive'
import { iStoryCard } from '../types/stories'
import { storyMediaQuery } from './Grid'
import ReactStars from 'react-stars'
import amplitude from 'amplitude-js'

const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle = { backgroundColor: 'rgb(72, 72, 72)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }


const StoryTitle = (story: iStoryCard) => {
    const isMobile = useMediaQuery({ query: storyMediaQuery })

    return <header className='card-header' style={headerStyle}>
        {
            isMobile
            ?    <a 
                    target='_blank' 
                    rel='noreferrer'
                    href={story.link} 
                    style={{padding:0}} 
                    className='card-footer-item' 
                    onClick={(() => amplitude.getInstance().logEvent('READ_STORY', story))}
                >
                    <p className='card-header-title' style={{color:'lightskyblue', fontSize:'1.25rem'}}> { story.title } </p>
                </a>
            :   <p className='card-header-title' style={{color:'white', fontSize:'1.25rem'}}> { story.title } </p>
        }
    </header>
}

const StoryInfo = ({ twitter, author, readingTime, published }: iStoryCard) => {
    const isMobile = useMediaQuery({ query: storyMediaQuery })

    return <p>
        {
            twitter
            ?   <a href={`https://twitter.com/${twitter}`} target='_blank' rel='noreferrer'>
                    <strong style={{color:'lightskyblue', marginRight:8}}> { author } </strong>
                </a>
            :   <strong style={{color:'white', marginRight:8}}> { author } </strong>
        }

        { isMobile && <br/> }

        <small style={{color:'lightgrey', marginRight:16}}> 
            { Math.round(readingTime) } mins 
        </small>
        <small style={{color:'grey'}}> 
            <i>  {`${new Date(published).getDate()}/${new Date(published).getMonth()+1}/${new Date(published).getFullYear()}`} </i> 
        </small>
    </p>
}

const StoryFooter = ({story}: {story:iStoryCard}) => {
    const isMobile = useMediaQuery({ query: storyMediaQuery })

    return <footer className='card-footer' style={{color:'white'}}>
        <p className='card-footer-item'>
            <span> Match { story.match }%  </span>
        </p>

        <p className='card-footer-item' style={{padding:0, minWidth:160}}>
            <ReactStars count={5} size={32} edit={false} color2={'#ffd700'} value={story.score} />
        </p>

        {
            !isMobile && <a 
                target='_blank' 
                rel='noreferrer'
                href={story.link} 
                style={{padding:0}} 
                className='card-footer-item' 
                onClick={(() => amplitude.getInstance().logEvent('READ_STORY', story))}
            >
                <span style={{marginRight:16, color:'lightskyblue'}}> Read </span>
                <img src={'/send.png'} style={{height:28}} alt={'Send Icon'}/>
            </a>
        }
    </footer>
}

export const MobileStory = (story: iStoryCard) => <div className='card' style={cardStyle}>
    <StoryTitle {...story} />

    <div className="card-image">
        <figure className="image is-4by3">
            <img 
                src={`https://cdn-images-1.medium.com/fit/t/800/240/${story.image}`} 
                alt='Story cover' 
            />
        </figure>
    </div>

    <div className="card-content">
        <StoryInfo {...story}/>

        <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
            { story.intro.map((p, i) => <p key={i}>{p}</p> )} 
        </div>
    </div>

    <StoryFooter story={story}/>
</div>


export const Story = (story: iStoryCard) => <div className='card' style={cardStyle}>
    <StoryTitle {...story} />

    <article className='media' style={{marginBottom:0}}>
        <figure className='media-left' style={{width:'40%', height:256}}>
            <img 
                src={`https://cdn-images-1.medium.com/fit/t/800/240/${story.image}`} 
                style={{objectFit:'cover', height:256}}
                alt='Story cover' 
            />
        </figure>

        <div className='media-content' style={{paddingBottom:'0.5rem', paddingRight:'1rem'}}>
            <div className='content'>
                <p 
                    className='subtitle is-5 has-text-white' 
                    style={{fontSize:'1.15rem', marginTop:'0.5rem', marginBottom:'0rem'}}
                > { story.subtitle } </p>
                <StoryInfo {...story} />

                <div className='content' style={{color:'whitesmoke', marginTop:'1rem'}}> 
                    { story.intro.map((p, i) => <p key={i}>{p}</p> )} 
                </div>
            </div>
         </div>
    </article>

    <StoryFooter story={story}/>
</div>
