const express= require('express');
const router = express.Router();
const { data }=require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req,res)=>{
    const range = cards.length;
    const cardId = Math.floor(Math.random()*range);
    res.redirect(`/cards/${cardId}?side=question`);
    
    // res.redirect(randLink)
});

router.get('/:id', (req, res) => {
    const{ side } =req.query;
    const { id } =req.params;
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = {text, id};
   
    
    if(side==='question'){
        templateData.hint = hint;
        templateData.otherside = 'answer';
        templateData.sideToShow = 'Answer';
    }else if (side==='answer'){
        templateData.otherside='question';
        templateData.sideToShow = 'Question';
    }
    

    res.render('card',templateData);
    
    
});

module.exports = router;