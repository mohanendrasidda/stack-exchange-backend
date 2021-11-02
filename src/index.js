require( './data/init' );
const express= require('express')
const app= express()
const cors= require('cors')
const answersrouter= require('./routes/savedanswers')
const updatedanswer= require('./routes/index')
const deleteanswerid= require('./routes/savedanswers')
const PORT= process.env.PORT || 3000 
const authrouter= require('./routes/auth.js')


console.log(process.env.NODE.ENV)

app.use( cors() );

app.use( express.json() );

app.use( express.urlencoded( { extended: false } ) );

app.use('/auth',authrouter)

app.use(answersrouter);

app.use(updatedanswer)

app.use(deleteanswerid)





app.listen(PORT, error=> {
    if (error){
        console.error(error)
        return;
    }
    console.log(`checked server is on port ${PORT}`)
})

