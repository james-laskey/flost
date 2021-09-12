import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
function SearchBar(props){
//     const [] = useState()
    let [search,updateSearch] = React.useState("")
    React.useEffect(()=>{
        if(search){
            //render search results by querying and inserting below

        } else {
            function Hidden(props){
                return(
                    <div class='hidden'/>
                )
            }
            ReactDOM.render(<Hidden/>,document.getElementById('search-selector'))
        }
    },[search])
//     useEffect(()=>{
//
//     })

    return(
        <div id='searchbar'>
            <input type='text' onInput={e=>{updateSearch(e.target.value)}}/>
            <section id='search-selector'>
            </section>
        </div>
    )
}
export default SearchBar
