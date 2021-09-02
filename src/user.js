const mongoose = require('mongoose')
const { usernameRequiredErr, nameLongerThan2CharMsg } = require('../constants')
const {Schema, model} = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name)=>name.length>2,
            message: nameLongerThan2CharMsg 
        },
        required: [true, usernameRequiredErr]
    },
    postCount: Number
})

const User = model('user', UserSchema) 

module.exports = User