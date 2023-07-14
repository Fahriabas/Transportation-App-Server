const express = require('express')
const Controller = require('../controllers/controller')
const VehicleController = require('../controllers/vehicleController')
const authentication = require('../middlewares/authentication')
const Router = express.Router()

//routing for admin and staff, after login get access token
Router.post("/register", Controller.register)
Router.post("/login", Controller.login)

//routing for vehicles
Router.get("/vehicles", authentication, VehicleController.getAllVehicle)
Router.get("/vehicles/:idVehicles", VehicleController.detailVehicles)
Router.post("/vehicles/add", VehicleController.createNewVehicles)
Router.delete("/vehicles/:idVehicles", VehicleController.deleteVehicleById)
Router.put("/vehicles/:idVehicles", VehicleController.updateVehicleById)



module.exports = Router