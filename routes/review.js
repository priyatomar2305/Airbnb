const express = require('express')
const router = express.Router({mergeParams:true});


let listing= require('../models/listing/schema.js');
let Review = require('../models/listing/reviews.js')
let wrapAsync = require('../utils/error.js')
let {listinSchema,reviewsSchema}=require('../schema.js')
let{validateReviews,isLoggedin,isAuthor,saveUrl}=require('../middleware.js')
let allReviews=require('../controllers/reviews.js')


router.post('/',isLoggedin,validateReviews,wrapAsync(allReviews.newReviewAdded ))

router.delete('/:reviewsid',isLoggedin,isAuthor, wrapAsync(allReviews.reviewsDeleted))
module.exports = router;