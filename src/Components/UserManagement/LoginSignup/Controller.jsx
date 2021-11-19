import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import glyde from './gyde.svg'
import FacebookLogin from 'react-facebook-login'
import Unsolved from '../Unsolved/Controller.jsx'
import Home from '../Home/Controller.jsx'
import './styles.css'

export default function LoginSignup(props){
    let [user, setUser] = useState(null)
    let [unsolved, setUnsolved] = useState(props.unsolved)
    let [data, uploadUnsolvedData] = useState(false)
    let [unsolvedData, setUnsolvedData] = useState(null)
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
    let [service, setAuthenticationService] = useState(null) //0 == local; 1 == Facebook; 2 == Google; 3 == Login; 4 == Existing Facebook Login
    let [loggedIn,verifiedLogin] = useState(false)

    const fbResponse = (response) => {
      response = JSON.stringify(response, undefined, 2)
      setLoginCredentials(response)
      //check db for existing user otherwise continue with flow
      fetch('https://f-server.herokuapp.com/existingUser?id='+JSON.parse(response).id, {
        method: 'GET',
      })
      .then(response=>{return response.json()})
      .then(json=>{
        if(json.existing && json.user){
            setUser(json.user)
            verifiedLogin(true)
        } else {
            setAuthenticationService(1)
        }
      })
        toggleVerify(true)
    }
    function handleSubmit(e, service){
        e.stopPropagation()
        setAuthenticationService(service)
        toggleVerify(true)
    }
    function handleUnsolved(unsolvedData){
    // json object {topic,question} and user id and date
        setUnsolvedData(unsolvedData)
        setUnsolved(false)
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
    //upload unsolved data before signin
    useEffect(()=>{
        if(data){
            fetch('/uploadUnsolved',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json',
                }
            })
            .then(response=>{})

        }
    },[data, unsolvedData])
    //server side verification for user login data
    useEffect(()=>{
        if(verify){
        //request server verification
            if(service==1){
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
                .then(response=>{ return response.json()})
                .then(json=>{
                    if(json.error){
                        alert(json.error)
                    }
                    if(json.user){
                        setUser(json.user)
                        if(unsolvedData){
                            uploadUnsolved(true)
                        }
                        verifiedLogin(true)
                    }
                })
            }


           }
    },[verify, _loginCredentials, username, password, service, telephone,email,passwordCopy, unsolvedData])

    if(!loggedIn && !unsolved){
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
    }
    if(unsolved && !loggedIn){
        return <Unsolved login={handleUnsolved}/>
    } else {
        return <Home user={user} accessToken={user.accesstoken} logout={verifiedLogin}/>
    }
}

