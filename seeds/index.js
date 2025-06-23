const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


const db=mongoose.connection;

db.on('error',console.error.bind(console,"connection error:("));
db.once('open',()=>{
    console.log('database connected');
});
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB=async ()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;

        const camp =new Campground({
            //YOUR USER ID
            author:'6640872ee23fd0ce10994e70',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)} `,
            // image:`https://source.unsplash.com/collection/483251/`,
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea cupiditate, magni, harum beatae fugiat nobis dolorum porro doloreblanditiis nemo suscipit ',
            price,
            geometry:{
                type:'Point',
                coordiates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxh3isd1v/image/upload/v1718473356/YelpCamp/qkpad19vje7ec1ubt63y.jpg',
                  filename: 'YelpCamp/qkpad19vje7ec1ubt63y',
                }
              ]
        })
    await camp.save();

    }
}

seedDB().then(()=>{
    mongoose.connection.close();
});







