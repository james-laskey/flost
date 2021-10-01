import LoginSignup from "./Controller.jsx"
import React from "react";
import ReactDOM from "react-dom";
// http://localhost:3001/secret
const params = new URLSearchParams(window.location.search)
const unsolved =( params.get("unsolved") === 'true')
console.log(unsolved)
fetch("https://f-server.herokuapp.com/secret", {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
            }
        })
        .then(response=>{return response.json()})
        .then(json=>{
            if(json.credentials){
                ReactDOM.render(<LoginSignup unsolved={unsolved} appCredentials={ json.credentials}/>, document.getElementById("app"))
            }

        })
