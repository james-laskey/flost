const express = require("express")
var React = require('react')
var ReactDOM = require('react-dom');
var bodyParser = require('body-parser')
const cors = require("cors")
let  app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('src/pages/js'));

let whitelist = ["https://f-server.herokuapp.com", 'http://localhost:3001', "https://graph.facebook.com"]
app.use(cors({
    origin: whitelist,
    optionsSuccessStatus: 200,
}))
const PORT = process.env.PORT || 3000
var server = app.listen(PORT || 3000, function() {
  console.log("listening on port number %d", server.address().port);
});
app.get('/', (req, res) => res.sendFile(__dirname+"/src/pages/landing-page.html"));
app.get('/signin-signup', (req,res)=>res.sendFile(__dirname+"/src/pages/signin-signup.html"));
//ASSETS
app.get('/gyde',(req,res)=>res.sendFile(__dirname+"/src/pages/js/assets/80ac5f1fd3bf79c6596ab5cf09b575bd-gyde.svg"))