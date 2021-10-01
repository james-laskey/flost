import ReactDOM from "react-dom";
import React, {useState, useEffect} from 'react';
import FlostBar from '../../FlostBar/Controller.jsx';
export default function Home(props){
    let logout = props.logout
    let unsolvedData = props.unsolved
    if(unsolvedData){
    //insert into DB and
        console.log(unsolvedData)
    }
    return(
        <div id='home-wrapper'>
            <FlostBar user={props.user} accessToken={props.user.accesstoken}/>
            <section>
                <h1>Check back later for updates!</h1>
            </section>
        </div>
    )
}
