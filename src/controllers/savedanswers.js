const mongoose = require( 'mongoose' );
const savedanswer = mongoose.model( 'savedanswer' );

const finalsavedanswers= async(req,res,next)=>{
    // const {id}= req.params;
    const answers= req.body
    try{
        const updatedanswers= await savedanswer.create(answers)
        
        // const updata= await savedanswer.findByIdAndUpdate(id)

        res.json(updatedanswers)
    }
    catch(error){

    }
}

const deleteanswerById= async(req,res,next)=>{
    const{id}= req.params;
    try{
        const removed= await savedanswer.findByIdAndRemove(id)
        if(!removed){
            const error= new Error('answer not found')
            error.status= 400;
            return next(error)
        }
    }catch(error){
        error.status= 500;
        next(error);
    }
}

module.exports= {
    finalsavedanswers,
    deleteanswerById
}