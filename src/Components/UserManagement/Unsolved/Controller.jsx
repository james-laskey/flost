import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import './styles.css'
//insert into db and update the unsolved item when the user creates an account....cache the question
function Unsolved(props){
    let [topic, setTopic] = useState(null)
    let [question, setQuestion] = useState(null)
    let login = props.login
    function removeAlert(){
        try {
            document.getElementById('alert').classList.remove('activeAlert')
        } catch {
            console.log()
        }

    }
    function handleUnsolved(e){
    console.log('here')
        e.preventDefault()
        try {
            if (topic && question.length >= 15) {
                 function Alert(props){
                    return(
                        <div>
                            <p>you must signup/login to upload your question</p>
                            <button onClick={e=>{props.login({topic:topic,question:question})}}> get flost </button>
                            <a href='/'>stay flost</a>
                        </div>
                    )
                 }
                document.getElementById('alert').className = 'activeAlert'
                ReactDOM.render(<Alert login={login}/>, document.getElementById('alert'))
            } else {
                throw Error
            }
        } catch(err){
            function Alert(props){
                return(
                    <div>
                        <p>question must be at least 15 letters long <br/>you must also select a predefined topic</p>
                        <button onClick={props.removeAlert}> get flost </button>
                    </div>
                )
            }

            ReactDOM.render(<Alert removeAlert={removeAlert}/>, document.getElementById('alert'))
            document.getElementById('alert').className = 'activeAlert'
        }

        //post data to the db and toggle unsolved to go back to login/create account
    }
    return(
    <main>
        <section id='alert'></section>
        <strong>flost?<br/>get found</strong>
        <section>
            <form>
                <label>choose a topic for your question</label>
                <input list='topics' onInput={e=>{setTopic(e.target.value)}} id='topic'/>
                <datalist id='topics'>
                    <option value='Education'/>
                    <option value='Technology'/>
                    <option value='Social Justice'/>
                </datalist>
                <textarea onInput={e=>{setQuestion(e.target.value)}} placeholder='should i get the vaccine'></textarea>
                <div>
                    <button type='submit' onClick={e=>{handleUnsolved(e)}}> continue </button>
                </div>
            </form>
        </section>
    </main>
    )
}
export default Unsolved