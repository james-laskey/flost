import ReactDOM from "react-dom";
import React, {useState, useEffect} from 'react';
import FlostBar from '../../FlostBar/Controller.jsx';
export default function Home(props){
    let logout = props.logout
    let toggle = props.toggle
    let unsolvedData = props.unsolved
    if(unsolvedData){
    //insert into DB and
        console.log(unsolvedData)
    }
    return(
        <div id='home-wrapper'>
            <section>
                <h1>Check back later for updates!</h1>
                <section id='compose-button'>
                    <div id='starting-position-compose'>
                       <button onClick={e=>{toggle(1)}}> flost </button>
                    </div>
                    <div>
                        <p> + </p>
                    </div>
                </section>
            </section>
        </div>
    )
}
