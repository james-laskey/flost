import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import glyde from './gyde.svg'
import FacebookLogin from 'react-facebook-login'
import Home from '../Home/Controller.jsx'
import './styles.css'

export default function LoginSignup(props){
    let [user, setUser] = useState(null)
    let [firstTimeLogin, setFirstTime] = useState(null)
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [telephone, setTelephone] = useState('')
    let [password, setPassword] = useState('')
    let [passwordCopy, setPasswordCopy] = useState('')
    let [facebookUserInfo, getFacebookUserInfo] = useState(false)
    let [loginComponent, toggleLoginComponent] = useState(true)
    let [verify, toggleVerify] = useState(false)
    let [_appCredentials, setAppCredentials] = useState(props.appCredentials)
    let [_loginCredentials, setLoginCredentials] = useState(null)
    let [service, setAuthenticationService] = useState(null) //0 == local; 1 == Facebook; 2 == Google; 3 == Login
    let [loggedIn,verifiedLogin] = useState(false)

    const fbResponse = (response) => {
      setLoginCredentials(JSON.stringify(response, undefined, 2))
      setAuthenticationService(1)
      setFirstTime(true)
      setTimeout(toggleVerify, 3000, true)
    }
    function handleSubmit(e, service){
        e.stopPropagation()
        setAuthenticationService(service)
        toggleVerify(true)
    }
    //Controls the Login UI Component
    useEffect(()=>{
        if(!loginComponent){
            const SignUp = (
                <div id='signup'>
                    <section>
                        <header>
                            <strong>create account</strong>
                        </header>
                        <form>
                            <div>
                                <input type='text' onInput={e=>{setFirstName(e.target.value)}} required />
                                <input type='text' onInput={e=>{setLastName(e.target.value)}} required/>
                            </div>
                            <div>
                                <input type='phone' onInput={e=>{setTelephone(e.target.value)}} required/>
                                <input type='email' onInput={e=>{setEmail(e.target.value)}} required/>
                            </div>
                            <input type='password' onInput={e=>{setPassword(e.target.value)}} required/>
                            <input type='password' onInput={e=>{setPasswordCopy(e.target.value)}} required/>
                            <button type='submit' onClick={e=>{handleSubmit(e,0)}}> create account </button>
                        </form>
                        <button onClick={toggleLoginComponent(login)}>login</button>
                    </section>
                </div>
            )
        } else {
            const Login = (
                <div id='signup'>
                    <section>
                        <header>
                            <strong>welcome back</strong>
                        </header>
                        <form>
                            <input type='email' onInput={e=>{setEmail(e.target.value)}} required/>
                            <input type='password' onInput={e=>{setPassword(e.target.value)}} required/>
                            <button type='submit' onClick={e=>{handleSubmit(e,3)}}> login </button>
                        </form>
                        <button type='submit' onClick={e=>{handleSubmit(e,2)}}>create account</button>
                    </section>
                </div>
            )
        }
    },[loginComponent])
    //server side verification for user login data
    useEffect(()=>{
        if(verify){
        //request server verification
                let body = {
                    credentials:_loginCredentials||{username:username,password:password,passwordCopy:passwordCopy,email:email,telephone:telephone, avi:"https://trashymedia.s3.us-east-2.amazonaws.com/assets/defaultAVI.png"},
                    service: service
                }
                fetch('https://f-server.herokuapp.com/createAccount', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(body)
                })
                .then(response=>{
                    if(response.status==200){
                        setUser(json.user)
                        if(service!==3){
                            setFirstTime(true)
                        }
                        verifiedLogin(true)
                    } else {
                        return response.json()
                    }
                })
                .then(json=>{
                    alert(json.error)
                })
           }
    },[verify, _loginCredentials, username, password, service, telephone,email,passwordCopy])

    if(!loggedIn){
        return(
            <section id='login-signup'>
                <aside id='signup-graphic'>
                    <img src={glyde}/>
                    <strong>learn. solve. explore</strong>
                    <p>get flost.</p>
                </aside>
                <section id='login-signup-selector'>
                    <form>
                        <label for='username'>Username</label>
                        <input name='username' type='text' onInput={e=>{setUsername(e.target.value)}}/>
                        <label for='password'>Password</label>
                        <input name='password' type='password' onInput={e=>{setPassword(e.target.value)}}/>
                        <button type='submit' onClick={e=>{handleSubmit(e)}}>login</button>
                    </form>
                    <FacebookLogin
                        appId={_appCredentials.id}
                        version="10.0"
                        autoLoad={false}
                        fields="email"
                        scope="public_profile,email,user_posts,user_friends,user_birthday,user_gender"
                        callback={fbResponse} />
                </section>
                <div id='root'>
                </div>
            </section>
            )
    } else {
        if(firstTimeLogin){
            try {
                fetch('https://f-server.herokuapp.com/saveUserDetails',{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                })
                return <Home user={user} logout={verifiedLogin}/>
            } catch(err){
                verifiedLogin(false)
                alert(err.message)
            }
        } else {
            try {
                if(user && verifiedLogin){
                    return <Home user={user} logout={verifiedLogin}/>
                }
            } catch(er){
                verifiedLogin(false)
            }
        }
    }
}
