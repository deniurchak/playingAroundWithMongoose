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
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
})

UserSchema.virtual('postCount').get(function() {
    return this.posts.length
})

UserSchema.pre('remove', function(next) {
    const BlogPost = model('blogPost');
    BlogPost.remove({ _id: {$in: this.blogPosts}})
    .then(()=>next())
})

const User = model('user', UserSchema) 

module.exports = User