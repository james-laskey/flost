import ReactDOM from "react-dom";
import React, {useState, useEffect} from 'react';
import FlostBar from '../../FlostBar/Controller.jsx';
export default function Home(props){
    let logout = props.logout
    return(
        <div>
            <FlostBar user={props.user} accessToken={props.user.accesstoken}/>
        </div>
    )
}
