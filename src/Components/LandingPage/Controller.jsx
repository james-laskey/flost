import React from "react";
import ReactDOM from "react-dom";
import FlostBar from '../FlostBar/Controller.jsx'
import gyde from './gyde.svg'
import headerimg from './header.svg'
import './styles.css'

function LandingPage(props){
    return(
    <div>
        <FlostBar buttons={true}/>
        <header>
            <img id='header-img' src={headerimg}/>
            <img id='gyde' src={gyde}/>
            <strong>solve. <br/>explore.</strong>
            <p id="float-text-right">get flost.</p>
        </header>
        <section>

        </section>
    </div>
    )
}
export default LandingPage