/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react'


const TwitterButton = ({signIn}:{signIn():void}) => <a style={{ height: 28}} onClick={signIn}> 
    <img alt="Twitter Login Button" src={'./login-button.png'} />
</a>


const GumRoad = ({ isActive=false }: { isActive? : boolean }) => <a 
    className={`navbar-item ${isActive ? 'navbar-item-active': ''}`}
    href="https://gum.co/socialQ" 
    rel="noopener noreferrer"
    target="_blank"
> <strong> PRICING </strong> </a>

export const NavBar = ({ signIn }:{signIn():void}) => {
    const [ isActive, setActive ] = useState(false)

    return <nav className="navbar is-black" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src="SocialQ.png" style={{ height:36, maxHeight: 'none' }} alt={'SocialQ logo'}/>
                    <p className="navbar-item" style={{ fontSize: '2em', color:'white' }} > SocialQ </p>
                </a>

                <a 
                    role="button" 
                    className={`navbar-burger ${isActive ? 'is-active': ''}`}
                    aria-label="menu" 
                    aria-expanded="false" 
                    data-target="navbarBasicExample"
                    onClick={()=> setActive(!isActive)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className={`navbar-menu ${isActive ? 'is-active navbar-menu-active': ''}`} style={{ maxWidth:1200, marginRight:'auto' }}>
                <div className={`navbar-end ${isActive ? 'navbar-end-active': ''}`} style={{fontSize: '1.2em'}}>
                    <GumRoad isActive={isActive}/> 
                </div>

                <div className={`navbar-item ${isActive ? 'navbar-item-active': ''}`}>
                    <TwitterButton signIn={signIn}/> 
                </div>
            </div>
        </div>
    </nav>
}
