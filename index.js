const express = require('express');
const exphbs = require('express-handlebars');
const bodyParse = require('body-parser')
const mysql = require('mysql2');
const { connection } = require('mongoose');

// const mongoose = require('mongoose');
// const url = 'mongodb://localhost/AlienDBex'

const app = express()
const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`listening on port ${port}`));

//parsing middleware
//parse application/x-www-force-urlcoded
app.use(bodyParse.urlencoded({extended: false}));

//parse application/json
app.use(bodyParse.json());
//static file
app.use(express.static('public'))

// templating engine
app.engine('hbs',exphbs({extname: '.hbs'}));
app.set('view engine','hbs');


//connection pool
const pool = mysql.createPool({
    connectionLimit:100,
    host           :'localhost',
    user           :'root',
    password       :'selayang05',
    database       :'user_management'

});

//connect to DB
pool.getConnection((err,connection) => {
    if(err) throw err; //not connected
    console.log('Connected as ID' + connection.threadId);
});

// routes
const routes = require('./server/routes/user');
app.use('/',routes);
// mongoose.connect(url,{useNewUrlParser:true})
// const con = mongoose.connection

// con.on('open',function(){
//     console.log('connected..')
// })s