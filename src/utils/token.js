const jwt = require('jsonwebtoken')
const { SECRET } = process.env


module.exports = (user) => {
    const userForToken = {
        name: user.name,
        lastename: user.lastename,
        id: user.id,
        email:user.email
    }
    const token = jwt.sign(userForToken, SECRET)
    return token
}
