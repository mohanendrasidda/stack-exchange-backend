const mongoose= require('mongoose')
const ownerSchema= require('./ownerschema')
const savedanswerSchema= new mongoose.Schema({
    
    answer_id: {
        type: [Number,String],
        required: true,
        unique: true
    },
    body: {
        type: String,
        required: true
    },
    content_liscense: {
        type: [Number,String]
    },
    creation_date: {
        type: Date
    },
    is_accepted: {
        type: Boolean
    },
    last_activity_date: {
        type: Date
    },
    owner: {
        type: ownerSchema,
        _id: false
    },
    question_id: {
        type: [Number,String]
    },
    score: {
        type: Number
    }

});

mongoose.model('savedanswer', savedanswerSchema)