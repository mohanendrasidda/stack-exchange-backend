const express= require('express')
const {finalsavedanswers,deleteanswerById}= require('../controllers/savedanswers')
const { authenticate} = require( '../middlewares/auth' );

const router= express.Router()

router.post('/savedanswers',authenticate,finalsavedanswers)
router.delete('/:id',deleteanswerById)

module.exports= router