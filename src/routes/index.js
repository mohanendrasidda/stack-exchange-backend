const express= require('express')
const {updatedanswers}= require('../controllers/index')
const { authenticate} = require( '../middlewares/auth' );

const router= express.Router()

router.get('/',authenticate, updatedanswers)

module.exports=router