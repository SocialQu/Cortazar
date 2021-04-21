/* eslint-disable jsx-a11y/anchor-is-valid */

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

export interface iStoryCard {title:string, subtitle?:string, image?:string, intro:string[], match:number, score:number}
export const Story = ({ title, subtitle, image, intro, match, score }: iStoryCard) => <div className="card" style={cardStyle}>
    <header className="card-header" style={headerStyle}>
        <p className="card-header-title" style={{color:'white', fontSize:'1.25rem'}}> { title } </p>
    </header>

    <article className="media" style={{marginBottom:0}}>
        <figure className="media-left" style={{width:'40%', height:256}}>
            <img 
                src={`https://cdn-images-1.medium.com/fit/t/800/240/${image}`} 
                style={{objectFit:'cover', height:256}}
                alt="Story cover" 
            />
        </figure>

        <div className="media-content">
            <div className="content">
                <p 
                    className="subtitle is-5 has-text-white" 
                    style={{fontSize:'1.15rem', marginTop:'0.5rem', marginBottom:'0rem'}}
                > { subtitle } </p>

                <p>
                    <a><strong style={{color:'lightskyblue', marginRight:8}}>John Smith </strong></a>
                    <small style={{color:'lightgrey', marginRight:16}}> 4 min read </small>
                    <small style={{color:'grey'}}> <i> 27/03/21 </i> </small>
                </p>

                <div className="content" style={{color:'whitesmoke', marginTop:'1rem'}}> 
                    { intro.map((p, i) => <p key={i}>{p}</p> )} 
                </div>
            </div>
         </div>
    </article>    


    <footer className="card-footer" style={{color:'white'}}>
        <p className="card-footer-item">
            <span> Match { match }%  </span>
        </p>

        <p className="card-footer-item" style={{padding:0}}>
            <ReactStars count={5} value={getStars(score)} size={32} color2={'#ffd700'} edit={false}/>
        </p>

        <a href="" className="card-footer-item" style={{padding:0}}>
            <span style={{marginRight:16, color:'lightskyblue'}}> Read </span>
            <img src={'/send.png'} style={{height:28}} alt={'Send Icon'}/>
        </a>
    </footer>
</div>
