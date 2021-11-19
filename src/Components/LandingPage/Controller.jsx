import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import FlostBar from '../FlostBar/Controller.jsx'
import Home from  '../UserManagement/Home/Controller.jsx'
import gyde from './gyde.svg'
import flostsvg from '../images/flost.svg'
import flash from '../images/flash.svg'
import final from '../images/final.svg'
import Flost from '../Flost/Compose/Controller.jsx'
import './styles.css'

export default function LandingPage(props){
    let [login, setLogin] = useState(false)
    let [user, setUser] = useState(null)
    let [render, setRender] = useState(null)
    function loginToApp(user){
        setUser(user)
        setTimeout(setLogin,1000,true)
    }
    useEffect(()=>{
        if(user){
            ReactDOM.render(<Home user={user} toggle={setRender}/>, document.getElementById('page-selector'))
        }
        if(render){
            try {
                if(render==1){
                   ReactDOM.render(<Flost user={user} toggle={setRender}/>, document.getElementById('page-selector'))
                }
            } catch(err){
                //turn back to original

            }
        }
    },[user,render])
        return(
           <main>
               <FlostBar login={loginToApp} buttons={true}/>
               <section id='page-selector'>
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
               </section>
           </main>
           )
}