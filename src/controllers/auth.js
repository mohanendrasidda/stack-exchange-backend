const mongoose= require('mongoose');


const User= mongoose.model('User')

const register= async(req, res, next)=> {
    const user= req.body;  
    try{
        if(!user){
            const error= new Error('User details not sent in request body')
            next(error)
            return
        }
        const updatedUser= await User.create(user)
        res.status(201).json(updatedUser)
    }catch(error){
        if(error.name === 'ValidationError'){
            error.status= 400
        }
        else{
            error.status= 500
        }

        return next(error)
}
}

module.exports={
    register
}