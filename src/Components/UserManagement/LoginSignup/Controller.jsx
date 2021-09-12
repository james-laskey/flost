import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom";
import glyde from './gyde.svg'
function LoginSignup(props){
    const [] = useState()
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [telephone, setTelephone] = useState('')
    let [password, setPassword] = useState('')
    let [passwordCopy, setPasswordCopy] = useState('')
    let [login, toggleLogin] = useState(true)
    let [verify, toggleVerify] = useState(false)

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
    useEffect(()=>{
        if(toggleVerify){
        //request server verification
        }
    },[toggleVerify])

    return(
        <section id='login-signup'>
            <aside id='singup-graphic'>
                <img src={glyde}/>
                <strong>learn. solve. explore</strong>
                <p>get flost.</p>
            </aside>
            <section id='login-signup-selector'>
            </section>
        </section>
    )
}
export default LoginSignup
