const mongoose = require('mongoose')
const { usernameRequiredErr, nameLongerThan2CharMsg } = require('../constants')
const PostSchema = require('./post_schema')
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
    posts: [PostSchema],
    likes: Number
})

UserSchema.virtual('postCount').get(function() {
    return this.posts.length
})

const User = model('user', UserSchema) 

module.exports = User