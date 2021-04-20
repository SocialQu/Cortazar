/* eslint-disable jsx-a11y/anchor-is-valid */

import { iStoryCard } from '../types/stories'
import ReactStars from 'react-stars'


const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle = {
    backgroundColor: 'rgb(72, 72, 72)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
}

const getStars = (score:number):number => {
    if(score > 95) return 5
    if(score > 90) return 4.5
    if(score > 85) return 4
    if(score > 80) return 3.5
    if(score > 75) return 3
    return 2.5
}

export const Story = (story: iStoryCard) => <div className="card" style={cardStyle}>
    <header className="card-header" style={headerStyle}>
        <p className="card-header-title" style={{color:'white', fontSize:'1.25rem'}}> { story.title } </p>
    </header>

    <article className="media" style={{marginBottom:0}}>
        <figure className="media-left" style={{width:'40%', height:256}}>
            <img 
                src={`https://cdn-images-1.medium.com/fit/t/800/240/${story.image}`} 
                style={{objectFit:'cover', height:256}}
                alt="Story cover" 
            />
        </figure>

        <div className="media-content" style={{paddingBottom:'0.5rem'}}>
            <div className="content">
                <p 
                    className="subtitle is-5 has-text-white" 
                    style={{fontSize:'1.15rem', marginTop:'0.5rem', marginBottom:'0rem'}}
                > { story.subtitle } </p>

                <p>
                    {
                        story.twitter
                        ?   <a href={`https://twitter.com/${story.twitter}`} target="_blank" rel="noreferrer">
                                <strong style={{color:'lightskyblue', marginRight:8}}> { story.author } </strong>
                            </a>
                        :   <strong style={{color:'white', marginRight:8}}> { story.author } </strong>
                    }
                    
                    <small style={{color:'lightgrey', marginRight:16}}> 
                        { Math.round(story.readingTime) } mins 
                    </small>
                    <small style={{color:'grey'}}> 
                        <i>  {`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`} </i> 
                    </small>
                </p>

                <div className="content" style={{color:'whitesmoke', marginTop:'1rem'}}> 
                    { story.intro.map((p, i) => <p key={i}>{p}</p> )} 
                </div>
            </div>
         </div>
    </article>    


    <footer className="card-footer" style={{color:'white'}}>
        <p className="card-footer-item">
            <span> Match { story.match }%  </span>
        </p>

        <p className="card-footer-item" style={{padding:0}}>
            <ReactStars 
                count={5} 
                size={32} 
                edit={false}
                color2={'#ffd700'} 
                value={getStars(story.score)} 
            />
        </p>

        <a href={story.link} className="card-footer-item" style={{padding:0}} target="_blank" rel="noreferrer">
            <span style={{marginRight:16, color:'lightskyblue'}}> Read </span>
            <img src={'/send.png'} style={{height:28}} alt={'Send Icon'}/>
        </a>
    </footer>
</div>
