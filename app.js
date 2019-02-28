const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.locals.prompt = "who is buried in grant's tomb?"
    res.render('card', { hint: "think about whose tomb it is." });

});

app.get('/hello', (req, res) => {
    res.render('hello', {name: req.cookies.username});
});
app.post('/hello', (req, res) => {
    // console.dir(req.body);
    res.cookie('username',req.body.username);
    res.render('hello', {name:req.body.username});

    // res.render('hello');
});


app.listen(3000);
console.log('app running on localhost:3000');
