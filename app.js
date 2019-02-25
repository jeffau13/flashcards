const express = require('express');
const app = express();



app.set('view engine', 'pug');

app.get('/', (req,res) =>{
    res.render('index');
});

app.get('/cards', (req,res)=>{
    res.locals.prompt = "who is buried in grant's tomb?"
    res.render('card',{hint: "think about whose tomb it is."});
});
app.listen(3000);