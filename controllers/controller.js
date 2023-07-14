const { checkPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User, Type, Vehicle } = require("../models")

class Controller{
    static async register(req, res, next){
        try {
            console.log('masuk ke async register nih');
            console.log(req.body);
            const { userName, email, password, role, phoneNumber, address } = req.body

            const newUser = await User.create({
                userName: userName,
                email: email,
                password: password,
                phoneNumber: phoneNumber,
                address: address, 
                role: 'Admin'
            })

            res.status(201).json({
                statusCode: 201,
                data: newUser
            })
            


        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next){
        try {
            console.log('masuk kelogin nih');
            const { email, password } = req.body
            console.log(req.body);

            const userLogin = await User.findOne({
                where: {
                    email: email
                }
            })

            if(!userLogin){
                throw {name: "LoginError"}
            }

            if(!checkPassword(password, userLogin.password)){
                throw {name : 'LoginError'}
            }
            console.log(userLogin, 'isi dari userLogin');


            const access_token = generateToken({
                id: userLogin.id,
                email: userLogin.email,
                role: userLogin.role
            })
            res.status(200).json({
                statusCode: 200,
                message: "login succes",
                access_token
            })

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Controller