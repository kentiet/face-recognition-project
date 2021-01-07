import React from 'react'
import Tilt from 'react-tilt'
import logo from './Logo.png'
import './Logo.css'

const Logo = () => {
    return (
        <div className="ma4 ma0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa2"><img style={{alignContent: 'center'}} src={logo} alt='logo' /></div>
            </Tilt>
        </div>
    );
}

export default Logo;