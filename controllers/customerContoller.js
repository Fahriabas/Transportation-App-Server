
const { Op } = require('sequelize');
const { checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { Customer, Bookmark, Vehicle, Type } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const axios = require('axios')
class CustomerController{
    static async register(req, res, next){
        console.log('masuk kedalam customer controller');
        try {
            const { email, password } = req.body
            const newCustomer = await Customer.create({
                email: email,
                password: password
            })

            res.status(200).json({
                statusCode: 200,
                message: 'successfully register to customer'
            })

        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next){
        console.log('masuk ketempat login');
        try {
            console.log(req.body, 'isi dari req.body');
            const { email, password } = req.body

            if(!email || !password){
                throw {name : 'LoginError'}
            }

            const customer = await Customer.findOne({
                where: {
                    email: email
                }
            })

            if(!customer){
                throw {name : 'LoginError'}
            } 

            if(!checkPassword(password, customer.password)){
                throw {name : 'LoginError'}
            }

            console.log(customer, 'isi dari customer');

            const access_token = generateToken({
                id: customer.id,
                email: customer.email,
                role: customer.role
            })

            console.log(access_token, 'isi dari access token nih');

            res.status(200).json({
                statusCode: 200,
                access_token,
                email: customer.email,
                id:customer.id,
                role: customer.role
            })



        } catch (error) {
            next(error)
        }
    }

    static async vehicles(req, res, next){

        try {
            const { search, page } = req.query
            console.log(req.query, 'isi dari req.query');

            let count = 9
            const option = {
                include: {
                    model: Type
                }
            }

            if(search){
                option.where = {
                    name : {
                        [Op.iLike] : `%${search}%`
                    }
                }
            }

            if(count && page){
                option.limit = count
                option.offset = (page - 1) * count;
            }

            const vehicles = await Vehicle.findAndCountAll(option)
            console.log(vehicles, 'isi vehicles dari server');

            const totalPages = await Math.ceil(vehicles.count / count)


            res.status(200).json({
                statusCode: 200,
                data: {
                    totalVehicles: vehicles.count,
                    totalPages: totalPages,
                    limit: count,
                    vehicles: vehicles.rows
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async detailVehicles(req, res,next){
        try {
            const { idVehicle } = req.params
            const BASE_URL = 'http://localhost:3000'

            const urlForApi = `${BASE_URL}/pub/vehicles/${idVehicle}`

            

            const data = {
                'frame_name': 'no-frame',
                'qr_code_text': urlForApi,
                'image_format': 'SVG',
                'qr_code_logo': 'scan-me-square'
            }
            const qr = await axios.post('https://api.qr-code-generator.com/v1/create?access-token=5P_uBvxY8wTbjNpHT_fW366N1CMZL7hxW9EU2O7qFv7Tjyp87YpIBQ0jCUk3n-Nf', data)


            const vehicle = await Vehicle.findOne({
                where: {
                    id: idVehicle,
                }
            })

            res.status(200).json({
                statusCode: 200,
                data:{
                    ...vehicle.dataValues,
                },
                qr: qr.data
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async googleLogin(req, res, next){
        console.log('masuk kedalam google login di customer controller');
        try {

            const { google_token } = await req.headers;
            console.log(google_token);
            
            const client = new OAuth2Client({
                clientId: process.env.CLIENT_ID,
            })
            console.log(client, 'isi dari client<<<<<<<<<');
            
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,
            })

            console.log(ticket, 'isi dari ticket<<<<<<<<');

            const payload = ticket.getPayload()
            const email = payload.email
            const password = 123456
            const role = 'customer'

            const [customer, create] = await Customer.findOrCreate({
                where: { email },
                default: { 
                    email : email, 
                    password: 123456, 
                    role : role
                },
                hooks: false
            })

            const access_token = generateToken({
                id: customer.id,
                email: customer.email
            })

            console.log(access_token, 'access_token');

            res.status(200).json({
                statusCode: 200,
                message: "Login success",
                data: {
                    access_token : access_token,
                    email: email
                }
            })
        } catch (error) {
            next(error)
        }
        
    }

    static async bookmarks(req, res, next){
        try {
            const { idVehicle } = req.params
            const vehicle = await Vehicle.findOne({
                where: {
                    id: idVehicle
                }
            })

            if(!vehicle){
                throw {name: 'Not Found'}
            }

            const { userId } = req.additionalData

            const newBookmark = await Bookmark.create({
                CustomerId: userId,
                VehicleId: vehicle.id
            })


            res.status(200).json({
                statusCode: 200,
                message: 'success make Bookmarks',
                data: newBookmark
            })

        } catch (error) {
            next(error)
        }
    }

    static async listBookmark(req, res, next) {
        try {
          console.log('masuk ke list bookmark');
          const { userId } = req.additionalData;
          const bookmarks = await Bookmark.findAll({ 
            where: { CustomerId: userId },
            include: [
                {
                    model: Vehicle
                },
                {
                    model: Customer,
                    attributes: { exclude: ['password'] }
                }
            ]
        });
          // Melakukan sesuatu dengan data bookmark yang ditemukan
          res.status(200).json({
            statusCode: 200,
            data: bookmarks
          })
          console.log(bookmarks, '<<<<<<<<<< isi dari bookmarks');
        } catch (error) {
          next(error)
        }
      }

      static async deleteBookmarks(req, res, next){
        try {
            // console.log(req.params);
            const { idBookmark } = req.params

            const deletedBookmark = await Bookmark.findAll({where: { id: idBookmark}})

            if(!deletedBookmark){
                throw {name: "Data not Found"}
            }

            const destroyBookmark = await Bookmark.destroy({where: {id: idBookmark}})

            res.status(200).json({
                statusCode: 200,
                message: "Bookmark successfully deleted",
                data: deletedBookmark
            })

            console.log(deletedBookmark, 'isi dari id deletedBookmark');

        } catch (error) {
            next(error)
        }
      }
      
}



module.exports = CustomerController



