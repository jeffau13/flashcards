const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/static', express.static('public'));
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

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards',cardRoutes);
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
