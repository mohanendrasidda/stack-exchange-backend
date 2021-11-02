const mongoose= require('mongoose')
const savedanswer= mongoose.model('savedanswer')
const updatedanswers= async (req,res,next)=>{
    try{

        const ouranswers= await savedanswer.find();
        res.json(ouranswers)


    }
    catch(error){

    }
}

module.exports= 
{
    updatedanswers
}