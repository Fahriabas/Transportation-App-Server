const jwt = require('jsonwebtoken')
const JWT_SECRET = 'rahasiabro'

const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'})
}

const verivyToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}

module.exports = { generateToken , verivyToken }