const mongoose = require('mongoose')
const {Schema, model} = mongoose

const CommentSchema = new Schema({
    content: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

const Comment = model('comment', CommentSchema)

module.exports = Comment