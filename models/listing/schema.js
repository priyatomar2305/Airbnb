const mongoose = require('mongoose');
const schema =  new mongoose.Schema(
    
   { title : {
 type: String,
        require:true

    },
price: {
    type:Number
  }
    ,
        description:String
    , country: {
        type: String,
        },
      image: {
    filename: { type: String, default: "listingimage" },
    url: { type: String, default: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" }
  }

,
      
    location: String,
    reviews: [{
            type:mongoose.Schema.Types.ObjectId,
                ref: "Review"

        }],
    
    owner: {
                  type:mongoose.Schema.Types.ObjectId,
ref:'User'

    },
    geometry: {
  
      type: {
        type: String,
        enum: ['Point'],
        default:'Point'
        
         // Only support 'Point' type for simplicity
      },
      coordinates: {
        type: [Number], // Array of [longitude, latitude] for GeoJSON format
        required: true
      }
    }
    })

const listing=mongoose.model('listing',schema)

module.exports = listing;