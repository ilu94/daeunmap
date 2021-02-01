const express = require("express");
const app = require("../../app");
const userServices = require('../services/auth')
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.get('/',(req,res)=> {
    res.render('signup')
});

router.get('/signup', (req, res) => {
    console.log("회원가입");
    res.render('signup')
})

router.get('/signin', (req, res) => {
    console.log("로그인");
    res.render('login')
})

router.get('/home', checkAuth, (req, res) => {
    res.render('index');

})

router.get('/autocomplete/:query', (req, res, next) => {
    
})

router.get('/search/', async(req,res, next) => {
    

});

module.exports = router;