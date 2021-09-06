const User = require('../src/user')
const assert = require('assert');
const BlogPost = require('../src/blogpost');

describe('Associations', ()=>{
    let joe, blogPost, comment;

    beforeEach(done=>{
        joe = new User({name:'Joe'})
        blogPost = new BlogPost({content:'JS is great'})
        comment = new Comment({content:'Congrats on a great post!'})

        joe.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = joe
    })
})