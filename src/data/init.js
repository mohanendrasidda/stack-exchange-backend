const mongoose= require('mongoose')

require('../models/savedanswers')
require('../models/user.js')

mongoose.connect('mongodb://localhost:27017/workshopsDB')

mongoose.connection.on('connected',()=>{
    console.log('connected');
})

mongoose.connection.on('error',error =>{
    console.log(error.message)
})

mongoose.connection.on('disconnect', error=> {
    console.log(error.message)
})