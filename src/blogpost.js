const mongoose = require('mongoose')
const {Schema, model} = mongoose

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

const BlogPost = model('blogPost', BlogPostSchema)

module.exports = BlogPost