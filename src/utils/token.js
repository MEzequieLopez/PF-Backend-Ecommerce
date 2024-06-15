const jwt = require('jsonwebtoken')
const {SECRET} = process.env


module.exports = (user) => {
    const userForToken = {
        username: user.email,
        id: user.id,
    }
    const token = jwt.sign(userForToken, SECRET)
    console.log(token);
    return token
}
