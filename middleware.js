let listing=require('./models/listing/schema')


let Review=require('./models/listing/reviews.js')
let { listinSchema, reviewsSchema } = require('./schema.js')
let expressError=require('./utils/expresserror.js')

module.exports.isLoggedin = (req, res, next) => {
    
if (!req.isAuthenticated()) {
    
req.session.redirectUrl=req.originalUrl;
    req.flash('error', "you must be loged in");
   return res.redirect('/login')
    }
    next();

}
module.exports.saveUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirect = req.session.redirectUrl;
   }
    next(); 
}

module.exports.isOwner = listid = async(req, res, next)=>{
    let { id } = req.params;
    listid=await listing.findById(id)
    if (!listid.owner.equals(res.locals.currentUser._id)) {
        
        req.flash('error', "you are not the owner!!")

        return res.redirect(`/listing/${id}`)

    }

    next();
}

module.exports.validatelisting = (req, res, next) => {
    
    
    let { error } = listinSchema.validate(req.body);
    
    if (error) {
    
        throw new expressError(404, error);
    } else {
        next();
    }
};

module.exports.validateReviews = (req, res, next) => {
    
    
    let { error } = reviewsSchema.validate(req.body);
    if (error) {
    
        throw new expressError(404,error);
    } else {
        next();
    }
};

module.exports.isAuthor = listid = async(req, res, next)=>{
    let { id,reviewsid } = req.params;
    listid = await Review.findById(reviewsid)
    console.log(reviewsid)
    if (!listid.author.equals(res.locals.currentUser._id)) {
        
        req.flash('error', "you are not the owner!!")

        return res.redirect(`/listing/${id}`)

    }

    next();
}
