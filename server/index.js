const express = require ('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const CookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const connection = require('./db');


const app = express();


app.use(boddParser.json());
app.use(boddParser.urlencoded({extended: true}));
app.use(expressSession({ secret: 'mySecretKey', resave:false, saveUninitialized: false }));

app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.post('/register',(req, res) => {
    const TUPCID = req.body.TUPCID;
    const USERNAME = req.body.USERNAME;
    const PASSWORD = req.body.PASSWORD;

    const query1 = "INSERT INTO login_register (`TUPCID`, `USERNAME`, `PASSWORD`) VALUES (?, ?, ?)";

    const query = "SELECT * FROM login_register WHERE TUPCID = ? OR USERNAME = ?";


    connection.query(query, [TUPCID, USERNAME, PASSWORD], (err, result) => {
        if (err) {throw err;}
        if (result.length > 0) {
            res.send({ message: "Username or TUPCID already exists" });

          }
          

        if (result.length === 0){
            const hashedPASSWORD = bcrypt.hashSync(PASSWORD, 10);
            connection.query(query1, [TUPCID,USERNAME, hashedPASSWORD], (err, result) => {
                if (err) {throw err;}
                res.send({message: 'User Created'});
        })
    }  
    });
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send('NO USER EXISTING');
        }
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    throw err;
                }
                res.send('USER LOGIN');
                console.log(user);
            });
        }
    })(req, res, next);
});




app.listen(3001, () => {
    console.log('server started on port 3001')
});

app.get('/userpage', (req, res) => {
    res.send({ USERNAME: req.user.USERNAME });
  });
  