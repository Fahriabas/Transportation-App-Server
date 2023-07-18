const { Vehicle, User, Type } = require('../models')


const authorizationEditVehicles = async (req, res, next) => {
    console.log('masuk ke authorisasi edit vehicle')
    try {
        const { idVehicles } = req.params;
        const user = await User.findOne({where: {id: req.additionalData.userId}})
        console.log(user, 'ini user');
        // console.log(user)

        const vehicle = await Vehicle.findOne({where: { id : idVehicles}})
        console.log(vehicle);
        // console.log(vehicle.dataValues, 'ini vehicle');
        if(!vehicle){
            throw {name: 'Not Found'}
        }

        if(!user){
            throw {name: 'Forbidden'}
        }


        if(user.dataValues.role === 'Staff' && user.id !== vehicle.dataValues.authorId){
            throw {name: 'Forbidden'}
        } 

        next()
    } catch (error) {
        next(error)
    }
}


module.exports = authorizationEditVehicles