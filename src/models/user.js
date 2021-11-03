const mongoose= require('mongoose')
const bcrypt= require('bcrypt')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true        
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        required: true,
        enum: ['admin', 'general']
    }
})

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Reference: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

// To validate email using the above emailRegex format
userSchema.path('email').validate(
    email=>emailRegex.test(email),
    'Invalid email id format'
)

// To validate password using the above passwordRegex format
userSchema.path('password').validate(
    password=>passwordRegex.test(password),
    'Invalid password format- You need to have atleast 1 lowercase, 1 uppercase, 1 numeric, 1 special character'
)

//The below process is done before inserting the data into data base to convert the passsword to hash

const SALT_FACTOR= 10;
userSchema.pre('save',function( done ){
    const user= this;
    
    if(!user.isModified('password')){
        return done();
    }

    // hashing the password pre saved hook function
    bcrypt.genSalt(SALT_FACTOR, (err, salt)=>{
        if(err){
            return done(err)
        }

        bcrypt.hash(user.password,salt,(err, hashedPassword)=>{
            if(err){
                return done(err)
            }

            user.password=hashedPassword;
            done();
        })
    })
})

userSchema.methods.checkPassword= function( password, done){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        done(err, isMatch)
    })
}



mongoose.model('User', userSchema)


