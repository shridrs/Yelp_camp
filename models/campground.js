const mongoose =require('mongoose');
const Review = require('./review');
const { coordinates } = require('@maptiler/client');
const Schema=mongoose.Schema;

// https://res.cloudinary.com/demo/image/upload/c_thumb,g_face,h_200,w_200/r_max/f_auto/woman-blackdress-stairs.png
const ImageSchema=new Schema({
    url:String,
    filename:String
});
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})


const CampgroundSchema=new Schema({
    title:String,
    images:[ImageSchema],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    reviews:[{  
        type:Schema.Types.ObjectId,
        ref:'Review'
    }]

});

CampgroundSchema.post('findOneAndDelete',async function(doc){
    if(doc){
        await Review.deleteMany({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports=mongoose.model('Campground',CampgroundSchema);
