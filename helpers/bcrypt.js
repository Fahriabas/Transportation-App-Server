const bcrypt = require('bcryptjs');

function hashPassword(plainPassword){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash
}

function checkPassword(plainPassword , hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword); 
}

module.exports = { hashPassword , checkPassword}