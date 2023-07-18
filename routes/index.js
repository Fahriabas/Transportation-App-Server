const express = require('express')
const Controller = require('../controllers/controller')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const authorizationDeleteType = require('../middlewares/authorizationDeleteType')
const authorizationUpdateStatus = require('../middlewares/authorizationUpdateStatus')
const authorizationEditVehicles = require('../middlewares/authorizationEditVehicles')
const CustomerController = require('../controllers/customerContoller')
const customerAuthentication = require('../middlewares/customerAuthentication')
// const authorizationRegister = require('../middlewares/authorizationRegister')
const Router = express.Router()

Router.get('/', (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: 'Aman'
    })
})
//Staff and Admin 
Router.post('/login',UserController.login)
Router.get('/vehicles', authentication, Controller.getVehicles)
Router.get('/dashboard', authentication, Controller.readVehiclesTypes)
Router.post('/register', UserController.register)
Router.post('/googleLogin', UserController.loginGoogle)


//Customers Register
Router.post('/customers/register', CustomerController.register)
Router.post('/customers/login', CustomerController.login)
Router.get('/pub/vehicles', CustomerController.vehicles)
Router.get('/pub/vehicles/:idVehicle', CustomerController.detailVehicles)
Router.post('/pub/googleLogin', CustomerController.googleLogin)
Router.post('/pub/bookmarks/:idVehicle', customerAuthentication, CustomerController.bookmarks)
Router.delete('/pub/bookmarks/:idBookmark',customerAuthentication, CustomerController.deleteBookmarks)
Router.get('/pub/bookmarks',customerAuthentication, CustomerController.listBookmark)


//khusus admin dan staff
Router.post('/vehicles/add',authentication, Controller.addNewVehicles)
Router.patch('/vehicles/:idVehicles', authentication, authorizationUpdateStatus, Controller.statusVehicles)
Router.put('/vehicles/:idVehicles', authentication, authorizationEditVehicles, Controller.editVehicles)
Router.get('/vehicles/:idVehicles',authentication, Controller.detailVehicles)
Router.get('/types', authentication, Controller.readTypes)
Router.delete('/types/:idTypes', authentication, authorizationDeleteType, Controller.deleteTypes)
Router.get('/types/:idTypes', authentication, Controller.detailTypes)
Router.post('/types/add', authentication, Controller.addTypes)
Router.get('/histories', authentication, Controller.listHistory)









module.exports = Router