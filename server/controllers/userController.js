const { urlencoded } = require('body-parser');
const mysql = require('mysql2');

//connection pool
const pool = mysql.createPool({
    connectionLimit:100,
    host           :'localhost',
    user           :'root',
    password       :'selayang05',
    database       :'user_management'

});

//view users
exports.view= (req,res) => {
    //connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 
        // user connection
        connection.query('Select * from users_db',(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                let removeuser = req.query.removed;
                res.render('home',{rows,removeuser});
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });
};

// finds users
exports.find= (req,res) =>{
    let searchterm = req.body.search; //name from main.hbs
    //connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 
        // user connection
        connection.query('Select * from users_db where first_name LIKE ?',['%'+searchterm+'%'],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });

};

// add users
exports.form= (req,res) =>{
    res.render('add-user');
    };
//create users
exports.create= (req,res) =>{
    const{first_name,last_name,email,phone,comments} = req.body
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 
        // user connection
        connection.query('insert into users_db set first_name = ?, last_name = ?, email = ?, phone=?, comments=?',[first_name,last_name,email,phone,comments],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                res.render('add-user',{alert: 'User Added Successfully.'});
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });

};

// edit view users
exports.edit= (req,res) =>{
    const{first_name,last_name,email,phone,comments} = req.body
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 

        // user connection
        connection.query('select * from users_db where id = ?',[req.params.id],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                res.render('edit-user',{rows});
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });
};

// update users
exports.update= (req,res) =>{
    const{first_name,last_name,email,phone,comments} = req.body
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 

        // user connection
        connection.query('update users_db set first_name = ?, last_name = ?, email = ?, phone=?, comments=? where id=?',[first_name,last_name,email,phone,comments, req.params.id],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                pool.getConnection((err,connection) => {
                    if(err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId); 
            
                    // user connection
                    connection.query('select * from users_db where id = ?',[req.params.id],(err,rows)=>{
                        // when done, release it
                        connection.release();
                        if(!err){
                            res.render('edit-user',{rows,alert: 'Successfully Updated'});
                        }else{
                            console.log(err);
                        }
                        console.log('the data from user table: \n',rows)
                    });
                });
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });

};

// delete users
exports.delete= (req,res) =>{
    const{first_name,last_name,email,phone,comments} = req.body
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 

        // user connection
        connection.query('delete from users_db where id = ?',[req.params.id],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                let removeuser = encodeURIComponent('User Successfully Remove')
                res.redirect('/?removed='+removeuser);
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });
};

//view users
exports.userdetail= (req,res) => {
    //connect to DB
    pool.getConnection((err,connection) => {
        if(err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId); 
        // user connection
        connection.query('Select * from users_db where id = ?',[req.params.id],(err,rows)=>{
            // when done, release it
            connection.release();
            if(!err){
                res.render('view-user',{rows});
            }else{
                console.log(err);
            }
            console.log('the data from user table: \n',rows)
        });
    });
};