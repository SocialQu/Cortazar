const cardStyle = {
    backgroundColor: 'rgb(48, 48, 48)',
    borderRadius: 12,
    maxWidth: 460,
    margin: 'auto',
    marginBottom: '1.5em',
    border: '1px solid white'
}

const headerStyle = {
    backgroundColor: 'rgb(72, 72, 72)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
}

export interface iStory {title:string, subtitle?:string, image?:string, intro?:string, match:number, score:number}
export const Story = ({ title, subtitle, image, intro, match, score }: iStory) => <div className="card" style={cardStyle}>
    <div className="card-image">
        <figure className="image is-4by3">
            <img src={image} alt="Story image" />
        </figure>
    </div>


    <header className="card-header" style={headerStyle}>
        <p className="card-header-title" style={{color:'white'}}> { title } </p>
    </header>

    <div className="card-content" style={{padding: '0.5rem 1rem'}}>
        <p className="title is-4"> { title } </p>
        <p className="subtitle is-6"> { subtitle } </p>
        <div className="content"> { intro } </div>
    </div>

    <footer className="card-footer">
        <p className="card-footer-item">
            <span> Match { match }%  </span>
        </p>

        <p className="card-footer-item">
            <span> Rating { score }% </span>
        </p>
    </footer>
</div>
