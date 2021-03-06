const express = require('express');

const app = express();
async function init() {
  console.log('App init');
  const approuting = require('./modules');
  const appmodules = new approuting(app);
  appmodules.init();
}

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// //app.use(bodyParser1);

app.use(function(req, res, next) {
  //next();
  console.log("CreateRegistration MSSQL Called" + req.body); // + req.body["test"];

  // console.log(JSON.stringify(req.body));
  // var postData = JSON.parse(req.body);
  var postData = JSON.parse(JSON.stringify(req.body));
  console.log(postData.test);

  var key = req.header('x-api-key');
  console.log('Requret Started ' + key);
  if(key == null || key !== 'admin'){
    res.sendStatus(401);
  }
  else {
    next();
    //res.json({'requestBody': req.body}) 
  }
  
});

/*
app.post(function(req, res){
  console.log('Global Post method called.');
  console.dir(req.body);
  res.send("test");
}); 
*/

init();
module.exports = app;