const mongoose = require('mongoose');

let listing = require('../models/listing/schema.js')
let init = require('./init.js');


    async function geocode(address) {
        var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);
     

        try {
            const response = await fetch(url);
           
            const data = await response.json();

            // console.log(`Geocoding response: ${JSON.stringify(data)}`);  // Log the entire response

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

main().then(() => { console.log('workin monngoose') })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/listing')
}




let cordFun = async() => {
    

     await listing.deleteMany({});

     init.data=init.data.map((d) => (
       
        { 
            ...d, owner: '6647703714ec697768219956',
         
        }
     ));

     
    

for (let data of init.data) {
    address = data.location
    let alldata = await geocode(address);
     
    lat = alldata[0].lat
    lon=alldata[0].lon

    data.geometry={ type:'Point', coordinates:[lat,lon]}

    

}
    let pack = await listing.insertMany(init.data);
    console.log('inseretd')
    console.log(pack)

}
cordFun();

