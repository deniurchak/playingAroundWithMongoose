const assert = require('assert')
const User = require('../src/user')

describe('Delete a user', ()=> {
    let joe;

    beforeEach((done)=>{
        joe = new User({name: 'Joe'})
        joe.save().then(()=>done())
    })

    it('model instance remove',(done)=>{
        joe.remove()
        .then(()=>{
            return User.findOne({name: 'Joe'})})
        .then((user)=>{
            assert(user===null)
            done()
        })
        .catch(e=>
            done(e)
        )
    })

    it('class method findAndRemove',(done)=>{
        User.remove({name:'Joe'})
        .then(()=>{
            return User.findOne({name: 'Joe'})})
        .then((user)=>{
            assert(user===null)
            done()
        })
        .catch(e=>
            done(e)
        )
    })

    it('class method findOneAndRemove',(done)=>{
        User.findOneAndRemove({name:'Joe'})
        .then(()=>{
            return User.findOne({name: 'Joe'})})
        .then((user)=>{
            assert(user===null)
            done()
        })
        .catch(e=>
            done(e)
        )
    })

    it('class method findByIdAndRemove',(done)=>{
        User.findByIdAndRemove(joe._id)
        .then(()=>{
            return User.findOne({name: 'Joe'})})
        .then((user)=>{
            assert(user===null)
            done()
        })
        .catch(e=>
            done(e)
        )
    })
})