const { User, Vehicle, Type } = require("../models")

class VehicleController{
    static async getAllVehicle(req, res, next){
        try {

            const vehicles = await Vehicle.findAll()
            res.status(200).json({
                statusCode: 200,
                data: vehicles
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async detailVehicles(req, res, next){
        try {
            const { idVehicles } = req.params
            const detailVehicles = await Vehicle.findOne({ where : {id: idVehicles}})

            res.status(200).json({
                statusCode: 200,
                data: detailVehicles
            })

        } catch (error) {
            console.log(error);
        }
    }

    static async createNewVehicles(req, res, next){
        try {
            const { name, description, imgUrl, location, price, TypeId, AuthorId } = req.body

            let body = {
                name: name,
                description: description,
                imgUrl: imgUrl,
                location: location,
                price: price,
                TypeId: TypeId,
                AuthorId: AuthorId
            }

            const newVehicle = await Vehicle.create(body)

            res.status(201).json({
                statusCode: 201,
                message: "success create new vehicle",
                data: newVehicle
            })

            console.log(body, '<<<<<');
        } catch (error) {
           console.log(error); 
        }
    }

    static async deleteVehicleById(req, res, next){
        try {
            console.log('masuk kerouter delete nih');
            const { idVehicles } = req.params

            const deletedVehicle = await Vehicle.findOne({
                where: {
                    id: idVehicles
                }
            })

            if(!deletedVehicle){
                throw {name: "Not Found"}
            }

            const destroyVehicle = await Vehicle.destroy({
                where: {
                    id: idVehicles
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: "successfully deleted vehicle",
                data: deletedVehicle
            })

        } catch (error) {
            console.log(error);
        }
    }


    static async updateVehicleById(req, res, next){
        try {
            console.log('masuk kedalam edit vehicle');
            const { name, description, imgUrl, location, price, TypeId, AuthorId } = req.body
            const { idVehicles } = req.params



            const vehicleDetail = await Vehicle.findOne({where: {id: idVehicles}})


            const updatedVehicle = await Vehicle.update({
                name: name,
                description: description,
                imgUrl: imgUrl,
                location: location,
                price: price,
                TypeId: TypeId
            },
            {
                where: {
                    id: idVehicles
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: "successfully updatedVehicle"
            })

            console.log(vehicleDetail, '><><><><>');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = VehicleController