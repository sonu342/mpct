const express = require("express");

const app = express();
const port = 3000;
const web = require('./routes/web');
const connectDb = require('./db/connectDb');
const session = require('express-session');
app.set('trust proxy', 1);


const flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// view engine
app.set('view engine', 'EJS');
// connected to monodb
connectDb();
//cookies 
const cookieParser = require('cookie-parser');
app.use(cookieParser())
// for file upload
app.use(fileUpload({useTempFiles: true}));

 // insert CSS and img
 app.use(express.static('public'));




app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  maxAge: 1000 * 60 * 15,
  saveUninitialized: true,

}));



app.use(flash());
// DATA GET
// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: false }));


  //route load
  app.use('/', web)








// route hosthost:3000 ('/') /Cannot GET /about

app.get('/', (_req, res) => {
res.send('Hello World!')
  })
  
app.get('/about', (req, res) => {
res.send('About page')
  })
  app.get('/team1', (req, res) => {
res.send('team page')
  })
  app.get('/login', (req, res) => {
 res.send('login page')
 })
// server create
app.listen(port, () => {
console.log(`server start port  localhost:${port}`);
 })
 