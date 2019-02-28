const express= require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.locals.prompt = "who is buried in grant's tomb?"
    res.render('card', { hint: "think about whose tomb it is." });

});

module.exports = router;