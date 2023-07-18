const { checkPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { Vehicle, User, Type } = require('../models')
const { OAuth2Client } = require('google-auth-library')

class UserController{
    static async register(req, res, next){
        // console.log('masuk kedalam register');
        try {
            const {userName, email, password, phoneNumber, address } = req.body
            const user = await User.create({
                userName : userName,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                address: address,
                role: "Admin"
            })
            console.log(req.body);
            res.status(201).json({
                statusCode: 201,
                data: req.body
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next){
        // console.log('masuk dalam login');

        try {
            const { email, password } = req.body

            if(!email || !password){
                throw {name : 'LoginError'}
            }

            const user = await User.findOne({where: {email}})

            if(!user){
                throw {name : 'LoginError'}
            } 

            if(!checkPassword(password, user.password)){
                throw {name : 'LoginError'}
            }

            const access_token = generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            res.status(200).json({access_token, userName: user.userName, role:user.role, id:user.id})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async loginGoogle(req, res, next){

  
        try {
            const { google_token } =  await req.headers;

            const client = new OAuth2Client({
              clientId: process.env.CLIENT_ID,
            });
            const ticket = await client.verifyIdToken({
              idToken: google_token,
              audience: process.env.CLIENT_ID,
            });
      
            const payload = ticket.getPayload();
            const userName = payload.name;
            const email = payload.email;
            const password = 123456;
            const role = "Staff";
            console.log(payload, 'isi dari payload');
      
            const [user, create] = await User.findOrCreate({
              where: { email },
              defaults: { userName, password, role, phoneNumber:'082322222222', address:'Jl.Indonesia'},
              hooks: false,
            });
            
            const token = generateToken({
              id: user.id,
              email: user.email,
            });
      
            res.status(200).json({
              statusCode: 200,
              message: "Login sukses",
              data : {
                token, email, role
              },
            });
      
        } catch (error) {
            
        }
    }
}

module.exports = UserController