const { Vehicle, User, Type, History } = require('../models')


class Controller {
    static async getVehicles(req, res){
        try {
            const vehicles = await Vehicle.findAll({
                include: [{
                    model: User
                }, {
                    model: Type
                }],
                attributes: {
                    exclude: ["createdAt"]
                }
            })

            console.log(vehicles, 'ini isi dari');


            if(!vehicles){
                throw {name : 'Not Found'}
            }

            res.status(200).json({
                statusCode: 200,
                data: vehicles
            })
        } catch (error) {
            next(error)

        }
    }


    static async detailVehicles(req, res, next){
        try {
            const { idVehicles } = req.params;
            const vehicle = await Vehicle.findOne({
                where: {id: idVehicles},
                include: [Type, User]
            });

            if(!vehicle){
                throw {name : 'Not Found'}
            }
    
            res.status(200).json({
                statusCode: 200,
                data: vehicle
            });

    
        } catch (error) {
            next(error)
        }
    }
    
    

    static async addNewVehicles(req, res, next){
        const { name, description, imgUrl, location, price, typeId } = req.body

        const id = req.additionalData.userId

        const user = await User.findOne({where : {id : id}})

        // console.log(user,'<<<');
        try {

            let body = {
                name : name,
                description : description,
                imgUrl : imgUrl,
                location : location,
                price: price,
                typeId :typeId,
                authorId : id
            }
            console.log(req.additionalData, '<<<');


            const newVehicle = await Vehicle.create(body)

            if(!newVehicle){
                throw{name: 'error'}
            }
            const history = await History.create({
                name : newVehicle.name ,
                description: 'Add New Product',
                updatedBy: user.dataValues.email
            })


            
            res.status(201).json({
                statusCode: 201,
                message: 'Vehicle creted Succsessfully',
                data: newVehicle
            })


        } catch (error) {
            console.log(error, 'disini error nya >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            next(error)

         }
    }

    // static async deleteById(req, res){
    //     try {
    //         const { idVehicles } = req.params;
    //         const deletedVehicle = await Vehicle.findOne({ where: { id: idVehicles } });
    //         console.log(deletedVehicle);
    
    //         if (deletedVehicle) {
    //             await Vehicle.destroy({ where: { id: idVehicles } });
    //             res.status(200).json({
    //                 statusCode: 200,
    //                 message: 'Vehicle successfully deleted',
    //                 data: deletedVehicle
    //             });
    //         } else {
    //             throw { name: "Data not Found"}
    //         }
    //     } catch (error) {
    //         next(error)
 
    //     }
    // }

    static async readTypes(req, res){
        try {
            const types = await Type.findAll()
            res.status(200).json({
                statusCode: 200,
                data: types
            })

        } catch (error) {
            // console.log(err);
            res.status(500).json({
                statusCode: 500,
                error: error
            })
        }
    }

    static async deleteTypes(req, res, next){
        try {
            const { idTypes } = req.params
            const deletedType = await Type.findOne({where : {id : idTypes}})

            if(deletedType){
                await Type.destroy({where : {id: idTypes}})
                res.status(200).json({
                    statusCode: 200,
                    message: "Type Sucsessfully deleted",
                    data: deletedType
                })
            } else {
                throw { name: "Data not Found"}
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async addTypes(req, res, next){
        try {
            const { name } = req.body

            const newType = await Type.create({name})
            const user = await User.findOne({where: {id: req.additionalData.userId}})


            if(!newType){
                throw{name: 'error'}
            }

            const newHistory = await History.create({
                name: newType.name,
                description: 'Add New Type',
                updatedBy: user.dataValues.email
            })

            res.status(201).json({
                statusCode: 201,
                message: 'type created Succsessfully',
                data: newType
            })


        } catch (error) {
            next(error)
        }
    }

    static async readVehiclesTypes(req, res, next){
        try {
            const vehicles = (await Vehicle.findAll()).length
            const types = (await Type.findAll()).length
            
            res.status(200).json({
                statusCode: 200,
                message: {
                    vehicles: vehicles,
                    types: types
                }
            })

          } catch (error) {
            next(error)
        }
    }

    static async statusVehicles(req, res, next){
        try {
            const { idVehicles } = req.params
            const {status} = req.body
            const vehicle = await Vehicle.findOne({where : {id : idVehicles}})
            const user = await User.findOne({where: {id: req.additionalData.userId}})



            if(!vehicle){
                throw {name: "Not Found"}
            }
            const updatedVehicle = await Vehicle.update({
                "status" : status
            }, { where : {
                id : idVehicles 
            }})

            if(!updatedVehicle){
                throw{name: 'error'}
            }

            const newHistory = await History.create({
                name: vehicle.dataValues.name,
                description: `Product Status With Id ${idVehicles} has been Updated to ${status}`,
                updatedBy: user.dataValues.email
            })

            res.status(200).json({
                statusCode: 200,
                message: `sucsess update to ${status}`
            })

            console.log(vehicle)
            
        } catch (error) {
            next(error)
        }
    }

    static async editVehicles(req, res, next){
        try {
            // console.log(req.body);
            const { idVehicles } = await req.params
            const { name, description, typeId, imgUrl, location, price } = req.body
            const {userId} = req.additionalData

            const vehicles = await Vehicle.findOne({where: {id: idVehicles}})
            const user = await User.findOne({where: {id: userId}})

            if(!vehicles){
                throw { name: 'Not Found'}
            }


            const updated = await Vehicle.update({
                
                name : name,
                description: description,
                imgUrl: imgUrl,
                location: location,
                price: price,
                typeId: typeId

            }, { where : {
                id : idVehicles,
            }})

            if(!updated){
                throw{name: 'error'}
            }
            const newHistory = await History.create({
                name: vehicles.dataValues.name,
                description: 'success do update',
                updatedBy: user.dataValues.email
            })


            res.status(200).json({
                statusCode: 200,
                message: 'successfully do update'
            })

        } catch (error) {
            next(error)
        }
    }

    static async listHistory(req, res, next) {
        try {
          const histories = await History.findAll({
            order: [['id', 'DESC']] // Menambahkan opsi order untuk mengurutkan berdasarkan id secara menurun (DESC)
          });
      
          if (!histories) {
            throw { name: 'Not Found' };
          }
      
          res.status(200).json({
            statusCode: 200,
            data: histories
          });
        } catch (error) {
          next(error);
        }
    }

    static async detailTypes(req, res, next){
        try {
            // const type = await 
        } catch (error) {
            
        }
    }
    
}


module.exports = Controller