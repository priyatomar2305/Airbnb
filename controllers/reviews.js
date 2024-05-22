

let listing= require('../models/listing/schema.js');
let Review = require('../models/listing/reviews.js')


module.exports.newReviewAdded=async(req, res) => {

   let listingg = await listing.findById(req.params.id)
    let data = req.body.reviews;
    let rev = new Review(data)
        rev.author = req.user;

    let tt = listingg.reviews.push(rev); 
    let newrev = await rev.save();
    
    await listingg.save()
        req.flash('success',"new review added successfully")

    res.redirect(`/listing/${req.params.id}`)
}


module.exports.reviewsDeleted=async(req, res) => {
    
    let { id, reviewsid } = req.params;
  
    await listing.findByIdAndUpdate(id, {$pull:{reviews:reviewsid}});

    await Review.findByIdAndDelete(reviewsid);
   
        req.flash('delete',"reviews deleted successfully")

    res.redirect(`/listing/${id}`);


}