const express = require('express')
const router = express.Router();

let expressError=require('../utils/expresserror.js')
let listing= require('../models/listing/schema.js');
let wrapAsync = require('../utils/error.js')
let {isLoggedin,isOwner,validatelisting}=require('../middleware.js')
let listingController=require('../controllers/listing.js')

const multer = require('multer')

const {storage}=require('../cloudConfig.js');
const upload = multer({ storage})




router.route('/')

    .get(wrapAsync(listingController.allListing))
    .post(isLoggedin,upload.single('listing[image]'),validatelisting,
       
        
        
    wrapAsync(listingController.newListingAdded)
        
    
);

router.get('/create',isLoggedin,(listingController.createRenderForm));

router.route('/:id')

    .get(wrapAsync(listingController.renderDetailListing))
.delete(isLoggedin, isOwner,wrapAsync(listingController.deleteListing));

router.get('/:id/edit',isLoggedin,isOwner, wrapAsync(listingController.renderEditForm));


router.patch('/:id/update',isLoggedin,isOwner,upload.single('listing[image]'), validatelisting,wrapAsync(listingController.listingUpdated));






module.exports = router;