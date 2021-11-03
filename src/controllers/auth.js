const mongoose = require('mongoose');
const User = mongoose.model('User')
const jwt= require('jsonwebtoken')


const register = async (req, res, next) => {
    const user = req.body;
    try {
        if (!user) {
            const error = new Error('User details not sent in request body')
            next(error)
            return
        }
        const updatedUser = await User.create(user)
        const dataTosend = {
            email: updatedUser.email,
            role: updatedUser.role,
            name: updatedUser.name
        }
        res.status(201).json(dataTosend)
    } catch (error) {
        if (error.name === 'ValidationError') {
            error.status = 400
        }
        else {
            error.status = 500
        }

        return next(error)
    }
}

const login = (req, res, next) => {
    const u = req.body;

    if (!u) {
        const error = new Error('login details not sent in request body')
        next(error)
        return;
    }

    if (!u.email || !u.password) {
        const error = new Error('login details not sent reqest body')
        next(error)
        return;
    }

    User.findOne({ email: u.email })
        .then(user => {
            if (!user) {
                const error = new Error('No matching credentials')
                error.status = 404;
                return next(error)
            }

            user.checkPassword(u.password, (err, isMatch) => {
                if (err) {
                    const error = new Error('No matching credentials')
                    error.status = 404
                    return next(error)
                }

                if (!isMatch) {
                    const error = new Error('No matching credentials')
                    error.status = 404;
                    return next(error)
                }
                
                //generate the token
                const claims={
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
                jwt.sign(claims, 'abcd' /*process.env.JWT_SECRET*/, {expiresIn: 24*60*60}, (err, token)=>{
                    if(err){
                        err.status= 500;
                        return next(err)
                    }
                    res.json({
                        email: user.email,
                        token: token
                    })
                })
            });
        }).catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400
            }
            else {
                err.status = 500
            }

            return next(err);
        })

}



module.exports = {
    register,
    login
}