import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import './styles.css'
//insert into db and update the unsolved item when the user creates an account....cache the question
function Unsolved(props){
    let [topic, setTopic] = useState(null)
    let [question, setQuestion] = useState(null)
    let login = props.login

    function handleSubmit(e){
        e.stopPropagation()
        //post data to the db and toggle unsolved to go back to login/create account
        login(false)
    }
    return(
    <main>
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
                    <button type='submit' onClick={e=>{handleSubmit(e)}}> continue </button>
                </div>
            </form>
        </section>
    </main>
    )
}
export default Unsolved