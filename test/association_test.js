const User = require('../src/user')
const assert = require('assert');
const BlogPost = require('../src/blogpost');

const Comment = require('../src/comment');
describe('Associations', ()=>{
    let joe, blogPost, comment;

    beforeEach(done=>{
        joe = new User({name:'Joe'})
        blogPost = new BlogPost({content:'JS is great'})
        comment = new Comment({content:'Congrats on a great post!'})

        joe.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = joe 

        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ])
        .then(()=> done())
    })

    it('saves a relation between a user and a blogpost', done=>{
        User.findOne({name: 'Joe'})
        .populate('blogPosts') 
        .then(user=>{
            assert(user.blogPosts[0].title === joe.blogPosts[0].title)
            done()
        })
    })

    it('saves a full relation graph', done=>{
        User.findOne({name: 'Joe'})
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            } 
        }) 
        .then(user=>{
            assert(user.name === joe.name)
            assert(user.blogPosts[0].title === joe.blogPosts[0].title)
            assert(user.blogPosts[0].comments[0].content === comment.content)
            assert(user.blogPosts[0].comments[0].user.name === comment.user.name)
            done()
        })
    })
})