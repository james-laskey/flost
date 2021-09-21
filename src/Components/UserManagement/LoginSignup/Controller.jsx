import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import glyde from './gyde.svg'
import FacebookLogin from 'react-facebook-login'

function LoginSignup(props){

    function getAppCredentials(level){
    if(level==0){
        fetch("localhost:3001/aid", {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
            }
        })
        .then(response=>{return response.json()})
        .then(json=>{
            if(json.id){
                return {id:json.id}
            }

        })
    } else {
          fetch("localhost:3001/said", {
              method: 'GET',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json',
              }
          })
          .then(response=>{return response.json()})
          .then(json=>{
              if(json.id && json.secret){
                  return {id:json.id,secret:json.secret}
              }

          })
        }
    }

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [telephone, setTelephone] = useState('')
    let [password, setPassword] = useState('')
    let [passwordCopy, setPasswordCopy] = useState('')
    let [login, toggleLogin] = useState(true)
    let [verify, toggleVerify] = useState(false)
    let [_appCredentials, setAppCredentials] = useState(getAppCredentials(0))
    let [facebookLoginCredentials, setFacebookLoginCredentials] = useState(false)

    const fbResponse = (response) => {
      console.log(response)
      const credentials
      setFacebookLoginCredentials(JSON.stringify(response, undefined, 2))
      setFacebookAppSecret(_getFacebookAppSecret()
      toggleVerify(true)
    }
    //Controls the Login UI Component
    useEffect(()=>{
        if(!login){
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
                            <button type='submit' onClick={login}> create account </button>
                        </form>
                        <button onClick={toggleLogin(!login)}>login</button>
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
                            <button type='submit' onClick={login}> login </button>
                        </form>
                        <button onClick={toggleLogin(!login)}>create account</button>
                    </section>
                </div>
            )
        }
    },[login])
    //server side verification for user login data
    useEffect(()=>{
        if(toggleVerify){
        //request server verification
            if(facebookLoginCredentials){
                //request long term token for facebook login
                fetch("https://graph.facebook.com/v10.0/oauth/access_token?"+"grant_type=fb_exchange_token&client_id="
                +_appCredentials.id+"&client_secret="+_appCredentials.secret+"&fb_exchange_token="+facebookLoginCredentials.accessToken, {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json, text/plain',
                      'Content-Type': 'application/json',
                    }
                })
                .then(response=>{return response.json()})
                .then(json=>{


                })
            }
        }
    },[toggleVerify, facebookLoginCredentials])

    return(
        <section id='login-signup'>
            <aside id='singup-graphic'>
                <img src={glyde}/>
                <strong>learn. solve. explore</strong>
                <p>get flost.</p>
            </aside>
            <section id='login-signup-selector'>
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
export default LoginSignup
