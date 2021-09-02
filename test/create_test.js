const User = require('../src/user')
const assert = require('assert')

describe('Creating records', ()=>{
    it('saves a user', (done) =>{
        const joe = new User({
            name: 'Joe'
        })

        joe.save()
            .then(()=>{
                assert(!joe.isNew)
                done()
            })
            .catch((err)=>{
                console.log(err)
                done(err)
            })
    })
})