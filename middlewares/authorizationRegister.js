const { User } = require('../models')

const authorizationRegister = async (req, res, next) => {

    try {
        const { idVehicles } = req.params;
        const user = await User.findOne({where: {id: req.additionalData.userId}})
        console.log(user, 'ini user');

        if(user.dataValues.role !== 'Admin'){
            throw {name: 'you have no acsess'}
        }

        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorizationRegister