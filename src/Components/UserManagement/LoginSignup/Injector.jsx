import LoginSignup from "./Controller.jsx"
import React from "react";
import ReactDOM from "react-dom";
// https://f-server.herokuapp.com/secret
fetch("http://localhost:3001/secret", {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json',
            }
        })
        .then(response=>{return response.json()})
        .then(json=>{
            if(json.credentials){
                ReactDOM.render(<LoginSignup appCredentials={ json.credentials}/>, document.getElementById("app"))
            }

        })
