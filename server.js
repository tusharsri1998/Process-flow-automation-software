const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
// const session = require('express-session');
const user = require('./server/routes/user');
const project = require('./server/routes/project');
// const store = require('connect-mongo')(session);

// var userSchema = require('./server/models/userdata');
// var projectSchema = require('./server/models/project');

const port = 3000;

const app = express();
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(session({
//   secret:"process_flow",
//   resave:false,
//   saveUninitialized:true,
//   store: new store({mongooseConnection: mongoose.connection})
// }));
app.use('/user',user);
app.use('/project',project);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, 'dist/erp/index.html'));
});

app.listen(port,function(){
  console.log('server running on localhost:' + port);
});
