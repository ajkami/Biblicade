const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    // password is either '', 'password'. or '471sqlbackend'
    passwowrd: '471sqlbackend',
    database: 'gamessystem',
});

// This is where we will request or get things from the database on the frontend
// is also how we insert or get from the database
app.post('/create', (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    
    db.query('INSERT INTO registertest (firstname,lastname,email,password,phone) VALUES (?,?,?,?,?)', [fname, lname, email, password, phone], 
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("Values Inserted successfully")
        }
    });
    
})

app.listen(3001, ()=> {
    console.log("Server is working on port 3001");
});

