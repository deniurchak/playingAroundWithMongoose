const { doesNotMatch } = require("assert");
const assert = require("assert");
const User = require("../src/user");

describe("subdocuments", () => {
  it("can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "Post Title" }] });
    joe.save().then(() =>
      User.findOne({ name: "Joe" }).then((user) => {
        assert(user.posts[0].title === joe.posts[0].title);
        done();
      })
    );
  });

  it("can add subdocuments to an existing record", (done) => {
    const joe = new User({ name: "Joe", posts: [] });
    joe.save().then(() =>
      User.findOne({ name: "Joe" })
      .then((user) => {
          user.posts.push({title: 'New post'})
          return user.save()
      })
      .then(()=> 
      User.findOne({ name: "Joe" }))
      .then(user=> {
          assert(user.posts[0].title === 'New post')
          done()
      })
    );
  });

  it("can remove subdocuments from an existing record", (done) => {
    const joe = new User({ name: "Joe", posts: [{
        title: 'New Title'
    }] });
    joe.save().then(() =>
      User.findOne({ name: "Joe" })
      .then((user) => {
          user.posts[0].remove()
          return user.save()
      })
      .then(()=> 
      User.findOne({ name: "Joe" }))
      .then(user=> {
          assert(!user.posts.length)
          done()
      })
    );
  });
});
