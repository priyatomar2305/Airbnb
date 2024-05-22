
let joi = require('joi');

module.exports.listinSchema = joi.object(
    
    {
        listing: joi.object({
        
            title: joi.string().required(),
            description: joi.string().required(),
            country: joi.string().required(),
            location: joi.string().required(),
            price: joi.number().required(),
            image: joi.string()
            
        
        }
        ) .required()

    }
)


module.exports.reviewsSchema = joi.object(
    
    {
        reviews: joi.object({
        
            ratings: joi.string().required().min(1).max(5),
                    comments:joi.string().required(),
        
    }).required()
}
)