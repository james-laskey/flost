const express = require("express")
var React = require('react')
var ReactDOM = require('react-dom');
var bodyParser = require('body-parser')
let  app = express();
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static('src/pages/js'));
const PORT = process.env.PORT || 3000
var server = app.listen(PORT || 3000, function() {
  console.log("listening on port number %d", server.address().port);
});
const {Pool, Client} = require('pg');
const connectionString = 'postgres://rfvdckuhaouwiz:a67095f6ac8da085063a3e898dd093053f4db462bdf37ae6a8e806189f162eec@ec2-3-231-241-17.compute-1.amazonaws.com:5432/d2hgqvfe8kngm6'
const client = new Client({
  connectionString: connectionString,
   ssl: {require:true, rejectUnauthorized: false },
})
function checkDB(){
  return new Promise( async function(reject, resolve){
    try {
      await client.connect()
      resolve()
      throw Error
    } catch(ex){
      console.log(ex)
      reject()
    }
  })
}

app.get('/', (req, res) => res.sendFile(__dirname+"/src/pages/landing-page.html"));