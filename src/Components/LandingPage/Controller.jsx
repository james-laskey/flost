import React from "react";
import ReactDOM from "react-dom";
import FlostBar from '../FlostBar/Controller.jsx'
import gyde from './gyde.svg'
import flostsvg from '../images/flost.svg'
import flash from '../images/flash.svg'
import final from '../images/final.svg'
import './styles.css'

function LandingPage(props){
    return(
    <div>
        <FlostBar buttons={true}/>
        <header id='landing-page-header'>
            <a id='unsolved' href='/signin-signup?unsolved=true'>
            <div id='gyde-container'>
                <img src={gyde}/>
                <div>
                    <strong> flost? </strong>
                </div>
            </div>
            <p id="float-text-right">get your #unsolved question featured on our homepage! <br/> ...start the flow of a discussion.</p>
            </a>
        </header>
        <section id='landing-page-info'>

        </section>
    </div>
    )
}
export default LandingPage