const { Vehicle, User, Type } = require('../models')


const authorizationDeleteType = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.additionalData.userId}})
        console.log(user, '<<<<ini isi dari user');



        if(!user){
            throw {name: 'Forbidden'}

        }
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = authorizationDeleteType