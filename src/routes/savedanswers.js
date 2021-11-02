const express= require('express')
const {finalsavedanswers,deleteanswerById}= require('../controllers/savedanswers')

const router= express.Router()

router.post('/savedanswers',finalsavedanswers)
router.delete('/:id',deleteanswerById)

module.exports= router