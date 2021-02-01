const express = require("express");
const app = require("../../app");
const userServices = require('../services/auth')
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

router.post('/signup', async(req, res) => {
    try{
        res.json(await userServices.signUp(req.body));
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const token = await userServices.signIn(req.body);
        if(checkAuth) {
            res.render('index', token);
        }
    }catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
