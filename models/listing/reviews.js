const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
    

    {
        comments: String,
        
        ratings:{
            type: Number,
            min:1,max:5

    },
time: {
    
    type: Date,
    default:Date.now()
        }
,
        author: {
            
                  type:mongoose.Schema.Types.ObjectId,
ref:'User'

        }
}


)
module.exports = mongoose.model('Review',reviewSchema);