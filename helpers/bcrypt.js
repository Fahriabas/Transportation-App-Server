const bcrypt = require('bcryptjs');


const hashPassword = (password) => {
    salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

const checkPassword = (password, passwordDb) => {
    return bcrypt.compareSync(password, passwordDb);
}


module.exports = { hashPassword, checkPassword }