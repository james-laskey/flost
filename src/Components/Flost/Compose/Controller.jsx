import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Path from './Path.jsx'
import FlostBar from '../../FlostBar/Controller.jsx'
import './styles.css'
export default function Compose(props){
//     const [] = usetate()
    let [flostData, updateFlostData] = useState({title:'', thinkTank:'',paths:{}, 0:{},1:{},2:{}})
    function updateStep(path, step, data){
        console.log(path,step, data)
        let newFlostData =  flostData
        newFlostData[path][step] = data
        updateFlostData(newFlostData)
    }
    function updatePath(path,title){
        let newFlostData = flostData
        newFlostData['paths'][path] = title
        updateFlostData(newFlostData)
    }
    function updateTitle(title){
        let newFlostData =  flostData
        newFlostData['title'] = title
        updateFlostData(newFlostData)
    }
    useEffect(()=>{
        console.log(flostData)
    },[flostData])
    return(
        <section id='flost-wrapper'>
            <section id='path-info'>
                <input type='text' id='title' onInput={e=>{updateTitle(e.target.value)}}/>
                <div id='think-tank'>
                    <input type='text' id='think'/>
                    <div id='think-tank-results'>
                    </div>
                </div>
            </section>
            <section id='paths'>
                <input type='text' onInput={e=>{updatePath(0,e.target.value)}}/>
                <input type='text' onInput={e=>{updatePath(1,e.target.value)}}/>
                <input type='text' onInput={e=>{updatePath(2,e.target.value)}}/>
            </section>
            <section id='steps-wrapper'>
                <Path count={0} data={flostData} update={updateStep}/>
                <Path count={1} data={flostData} update={updateStep}/>
                <Path count={2} data={flostData} update={updateStep}/>
            </section>
            <div id='preview-button'>
                <button onClick={e=>{renderPreview(true)}}>
                    <p> preview </p>
                </button>
            </div>
        </section>
    )
}
