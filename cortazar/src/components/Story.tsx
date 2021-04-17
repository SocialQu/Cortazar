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
                alt="Story image" 
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
                    { intro.map(p => <p>{p}</p> )} 
                </div>
            </div>

            <nav className="level is-mobile">
                <div className="level-left">
                    <a className="level-item">
                        <span className="icon is-small">
                            <i className="fas fa-reply"></i>
                        </span>
                    </a>

                    <a className="level-item">
                        <span className="icon is-small">
                            <i className="fas fa-retweet"></i>
                        </span>
                    </a>
    
                    <a className="level-item">
                        <span className="icon is-small">
                            <i className="fas fa-heart"></i>
                        </span>
                    </a>
                </div>
            </nav>
         </div>
    </article>    


    <footer className="card-footer" style={{color:'white'}}>
        <p className="card-footer-item">
            <span> Match { match }%  </span>
        </p>

        <p className="card-footer-item">
            <span> Rating { score }% </span>
        </p>

        <a href="" className="card-footer-item" style={{padding:0}}>
            <span style={{marginRight:16, color:'lightskyblue'}}> Read </span>
            <img src={'/send.png'} style={{height:28}}/>
        </a>
    </footer>
</div>
