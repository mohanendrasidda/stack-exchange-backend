const express= require('express')
const {updatedanswers}= require('../controllers/index')

const router= express.Router()

router.get('/', updatedanswers)

module.exports=router