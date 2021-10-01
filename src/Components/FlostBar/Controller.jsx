'use strict'
import React from 'react'
import ReactDOM from "react-dom";
import SearchBar from '../SearchBar/Controller.jsx'
import './styles.css'

function FlostBar(props){
    const [buttons,toggleButtons] = React.useState(props.buttons)
    let [user,setUser] = React.useState(props.user || {})
    let [userAviMenuToggle, toggleUserAviMenu] = React.useState(false)
    let [username,setUsername] = React.useState('')
    let [password,setPassword] = React.useState('')
    let [verify, toggleVerify]  = React.useState(false)
    React.useEffect(()=>{
        if(buttons){
            function Login(props){
                return (
                    <div id='login' class='selector-style'>
                        <input type='text' placeholder='Username' onInput={e=>{setUsername(e.target.value)}} />
                        <input type='password' onInput={e=>{setPassword(e.target.value)}}/>
                        <button onClick={e=>{toggleVerify(!verify)}}> login </button>
                        <a href='/signin-signup'> signup </a>
                    </div>
                )
            }
            ReactDOM.render(<Login/>, document.getElementById('selector'))
        }
        else {
        function UserAvi(props){
            return(
                <div id='user-avi' class='selector-style'>
                    <div id='avi-selector'>
                    </div>
                    <img src={props.user.avi} onClick={toggleUserAviMenu(!userAviMenuToggle)}/>
                </div>
            )
        }
        ReactDOM.render(<UserAvi user={user}/>, document.getElementById('selector'))
        }
    }, [buttons])
    React.useEffect(()=>{
        if(userAviMenuToggle){
            function UserAviMenu(props){
                return(
                    <section id='user-avi-menu'>
                        <div>
                            <a href='/profile'>profile</a>
                            <a>settings</a>
                            <a href='/'>logout</a>
                        </div>
                    </section>
                )
            }
            ReactDOM.render(<UserAviMenu/>,document.getElementById('avi-selector'))
        }
        else {
            function Hidden(props){
                return(
                    <div class='hidden'/>
                )
            }
            try{
                if(user.id){
                    ReactDOM.render(<Hidden/>,document.getElementById('avi-selector'))
                } else{
                    throw Error
                }
            } catch(err){
                console.log(err)
            }

        }
    },[userAviMenuToggle,user])
    React.useEffect(()=>{
        if(verify){
        alert('App is not live')
            //request server verification and send to login page upon failure
//             fetch('/login',{
//                 method: 'POST',
//
//             })
            try{
                if(username != "" || password!=""){

                } else {
                    throw Error
                }
                //request login credentials
            } catch(err){
                toggleVerify(false)
                window.location.href = '/signin-signup'
            }
        }
    },[verify])
    return(
    <nav id='flostbar-wrapper'>
      <div id='flostbar-container'>
        <strong>flost</strong>
        <SearchBar/>
        <section id='selector'>
        </section>
      </div>
    </nav>
    )
}
export default FlostBar