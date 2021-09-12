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
        <header id='landing-page-header'>
            <img id='header-img' src={headerimg}/>
            <div id='gyde-container'>
                <img src={gyde}/>
                <div>
                    <strong>solve. <br/>explore.</strong>
                </div>

            </div>
            <p id="float-text-right">get flost.</p>
        </header>
        <section id='landing-page-info'>
            <section>
                <strong>redirecting the flow of information</strong>
            </section>
            <section>
                <div>
                    <strong>flost</strong>
                     <ul>
                         <li><p>there is a root and path to every problem</p></li>
                         <li><p>have a problem or want to share something you know?</p></li>
                        <li><p>create or view customizable flow charts</p></li>
                     </ul>
                </div>
                <div>
                    <strong>flash</strong>
                     <ul>
                         <li><p>lets aggregate as many terms and explanations we can</p></li>
                         <li><p>We all have random bits of knowledge, why mot share?</p></li>
                        <li><p>create or view a customizable flash card set</p></li>
                     </ul>
                </div>
                <div>
                    <strong>final</strong>
                     <ul>
                         <li><p>we are in control of our statistics and learning</p></li>
                         <li><p>test yourself, others, or collect statistical data from users</p></li>
                        <li><p>create or view customizable finals(tests) and surveys</p></li>
                     </ul>
                </div>
            </section>
        </section>
    </div>
    )
}
export default LandingPage