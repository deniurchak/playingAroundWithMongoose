const assert = require("assert");
const { usernameRequiredErr, nameLongerThan2CharMsg } = require("../constants");
const User = require("../src/user");

function validateErrMessage(objToValidate, expectedMessage) {
    const validationResult = objToValidate.validateSync();
    const {message}= validationResult.errors.name
    assert(message === expectedMessage)
}
describe("Validating record", () => {
  it("requires a user name", () => {
    const user = new User({ name: undefined });
    validateErrMessage(user, usernameRequiredErr)
  });

  it("requires a user name longer than 2 chars", () => {
    const user = new User({ name: 'A'});
    validateErrMessage(user, nameLongerThan2CharMsg)
  });

  it("invalid records cannot be saved", () => {
    const user = new User({ name: 'A'});
    user.save().catch(validationResult=>{
        const {message}= validationResult.errors.name
        assert(message === nameLongerThan2CharMsg)
    })
  });
});