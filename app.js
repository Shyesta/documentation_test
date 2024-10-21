import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import { createConnection } from 'mysql';
const app = express()
app.use(urlencoded({extended: true}))
app.set('view engine', 'ejs')
const PORT = 3000
dotenv.config({
    path: './db.env'
})
app.get('/', (req, res) => {
    console.log("Node page accessed")
    // res.render("index")
    const con = createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    con.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err.code, err.stack);
        }
        console.log('Connected to the database.');
    });    

    con.query(`SELECT * FROM node_db`, (err, result, fields) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send("<h1>" + JSON.stringify(result) + "</h1>")
        }
    })
});



app.listen(PORT)