const mongoose= require('mongoose')


const ownerSchema= new mongoose.Schema({
    display_name:{
        type: String
    },
    link: {
        type: String     
    },
    profile_image: {
        type: String
    },
    reputation: {
        type: Number
    },
    user_id: {
        type: Number
    },
    user_type: {
        type: String
    }
})

module.exports= ownerSchema