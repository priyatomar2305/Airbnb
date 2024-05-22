let listing = require('../models/listing/schema')


    async function geocode(address) {
        var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);
     

        try {
            const response = await fetch(url);
           
            const data = await response.json();


            if (data.length > 0) {
                
                return data;
            } else {
                console.log('Address not found');
                return null;
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

module.exports.allListing = (async (req, res) => {
   

    let lists = await listing.find()
    res.render('listings/listing.ejs', { lists })

})
module.exports.createRenderForm=(req, res) => {
    



    res.render('listings/create.ejs');

}
module.exports.renderDetailListing=(async (req, res) => {
    
    let { id } = req.params;
    let list = await listing.findById(id).populate({path:'reviews',populate:{path:'author'}}).populate('owner')
    if (!list) {
        
        req.flash('error'," lisiting doesn't exist")
res.redirect('/listing')

    }

    res.render('listings/detail.ejs', { list })
})

module.exports.renderEditForm=(async (req, res) => {
    
    let { id } = req.params;
    let data = await listing.findById(id);

    let originalURl = data.image.url;

originalURl=originalURl.replace("/upload","/upload/h_350")

    if (!data) {
        
        req.flash('error'," lisiting doesn't exist")
res.redirect('/listing')
    }
    res.render('listings/edit.ejs', { data,originalURl });

})

module.exports.newListingAdded = (async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newlist = new listing(req.body.listing);
    


    let alldata = await geocode(req.body.listing.location);
    let coordinates = [alldata[0].lat, alldata[0].lon]
    
    newlist.geometry = {type:'Point',coordinates }
     newlist.owner = req.user._id;
 newlist.image = {url,filename}
        let ress = await newlist.save();
    req.flash('success', 'new listing added succesfully!!');
    res.redirect('/listing')

})
module.exports.listingUpdated=async (req, res) => {
    let { id } = req.params;

 

    let alldata = await listing.findByIdAndUpdate(id, req.body.listing );

    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        alldata.image = { url, filename }
        let all = await alldata.save();
    }

   let address= req.body.listing.location
    let cords= await geocode(address);
    let coordinates = [cords[0].lat, cords[0].lon]
    
    alldata.geometry = {type:'Point',coordinates }

            let all = await alldata.save();

    req.flash('delete', "listing updated successfully")

    res.redirect(`/listing/${id}`)
}

module.exports.deleteListing=(async (req, res) => {

    let { id } = req.params;
    let del = await listing.findByIdAndDelete(id);
    req.flash('delete',"listing deleted successfully")
    res.redirect('/listing')
})

