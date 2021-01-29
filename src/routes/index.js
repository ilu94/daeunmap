const express = require("express");
const router = express.Router();


router.get('/',(req,res)=> {
    res.render('login')
});

router.get('/', (req, res) => {
    res.redirect('signin');
});

router.post('/signin', (req, res) => {
    try {
        const {token, user} = await userServices.signIn(req.body);
        
    }catch (error) {
        res.status(500).json(error);
    }
});

router.get('/autocomplete/:query', (req, res, next) => {
    
})

router.get('/search/:query', async(req,res, next) => {
    

});

module.exports = router;