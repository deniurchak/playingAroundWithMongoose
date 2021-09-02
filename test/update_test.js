const assert = require('assert');
const { Console } = require('console');
const User = require('../src/user')

describe('Updating records', () => {
   let joe;
   beforeEach(done=>{
       joe = new User({name: 'Joe', postCount: 0})
       joe.save().then(()=>done())
   })
   
   function assertName(operation, done) {
        operation
        .then(()=> User.find())
        .then((users)=> {
            assert(users.length === 1)
            assert(users[0].name === 'Alex')
            done()
        }
        )
   }

   it('instance set n save', (done)=>{
        joe.set({name:'Alex'})
        assertName(joe.save(), done)
   })

   it('model instance update', (done)=> {
        assertName(joe.update({name: 'Alex'}), done)
   })

   it('model class can update', (done)=> {
        assertName(User.updateOne({name:'Joe'}, {name: 'Alex'}), done)
   })

   it('model class can update one record', (done)=> {
        assertName(User.findOneAndUpdate({name:'Joe'}, {name: 'Alex'}), done)
   })

   it('model class can delete one record by id', (done)=> {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done)
   })

   it('increment user post count by 1', done=> {
       User.updateOne({name: 'Joe'}, {$inc: {postCount: 1}})
       .then(()=>User.findOne({name: 'Joe'}))
       .then((user)=>{
           assert(user.postCount === ++joe.postCount)
           done()
        })
   })
})
