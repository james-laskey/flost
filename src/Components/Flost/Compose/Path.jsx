import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
export default function Step(props){
    let updateSection = props.update
    let data = props.data
    let path = props.count
    let [steps, setSteps] = useState(2)
    let updateSteps = props.update
    let [add, addLeaf] = useState(false)
    function removeStep(dom){
        console.log(dom)
    }
    function getSteps(){
        let stepsToRender = []
        for (var node = 0; node<steps;node++){
            console.log(node)
            var removalID = 'step-'+path+'-'+node
            let toRender = (
                <div class='step' id={removalID}>
                    <button value={node} onClick={e=>{removeStep(e.target.value)}}>x</button>
                    <textarea onInput={e=>{updateSection(path-1,node,e.target.value)}}>{}</textarea>
                </div>
            )
            stepsToRender.push(toRender)
        }
        return (
            <section class='step'>
                {stepsToRender}
            </section>
        )
    }

    return(
        <section id='step-wrapper'>
            {getSteps(steps)}
            <section class='add-steps'>
                <button onClick={e=>{setSteps(steps+2)}}>+</button>
            </section>
        </section>
    )
}
