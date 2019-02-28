const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'pug');

// middleware:
app.use((req, res, next) => {
    // req.message = 'This message made it!';
    console.log('hello');
    // const err = new Error('Oh no Errr!');
    // err.status = 500;
    next();
    
    });
app.use((req,res,next)=>{
    // console.log(req.message);
    console.log('world');
    
    next();
    
});


app.get('/', (req, res) => {
    const name = req.cookies.username;
    if(name){
    res.render('index', {name});
    }else{
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.locals.prompt = "who is buried in grant's tomb?"
    res.render('card', { hint: "think about whose tomb it is." });

});

app.get('/hello', (req, res) => {
    const name =req.cookies.username;
    if(name){
        res.redirect('/');
    }else{
    res.render('hello');
    }
});
app.post('/hello', (req, res) => {
    // console.dir(req.body);
    res.cookie('username',req.body.username);
    res.redirect('/');
    
    // res.render('hello');
});

app.post('/goodbye', (req,res)=>{
    res.clearCookie('username');
    res.redirect('/hello');
});

// 404 handler:
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


// error handler middleware:
app.use((err,req,res,next)=>{
    res.locals.error = err;
    res.status(err.status);
    res.render('error',err);

});

app.listen(3000);
console.log('app running on localhost:3000');
