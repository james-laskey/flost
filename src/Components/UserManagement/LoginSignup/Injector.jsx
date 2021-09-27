import LoginSignup from "./Controller.jsx"
import React from "react";
import ReactDOM from "react-dom";
 async fetch("https://f-server.herokuapp.com/secret", {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
            }
        })
        .then(response=>{return response.json()})
        .then(json=>{
            if(json.credentials){
                ReactDOM.render(<LoginSignup appCredentials={ await json.credentials}/>, document.getElementById("app"))
            }

        })
