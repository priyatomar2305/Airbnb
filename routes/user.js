const express = require('express')
const router = express.Router(); 
let wrapAsync = require('../utils/error.js')
let {saveUrl}=require('../middleware.js')

let User=require('../models/listing/user.js');
const passport = require('passport');
let users = require('../controllers/users.js')

router.route('/signup')

.get( (users.renderSignupForm))

    .post((users.signupUser))


router.route('/login')

.get( (users.renderLoginForm))


.post(saveUrl, passport.authenticate('local',
    {
        failureRedirect: '/login',
        failureFlash: true
    }),(users.loginUser) )

router.get('/logout',(users.logout) )


module.exports = router;