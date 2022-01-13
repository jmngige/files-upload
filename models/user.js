const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please add your name']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email provided is invalid')
            }
        }
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    cv: {
        type: String,
        default: 'no-pdf.pdf'
    }

})

module.exports = mongoose.model('User', userSchema)