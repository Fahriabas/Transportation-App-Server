const { Vehicle, User, Type } = require('../models')


const authorizationUpdateStatus = async (req, res, next) => {
    try {
        const user = await User.findOne({where: {id: req.additionalData.userId}})


        if(!user){
            throw {name: 'Forbidden'}
        }


        if(user.dataValues.role !== 'Admin' ){
            throw {name: 'Forbidden'}
        } 

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = authorizationUpdateStatus