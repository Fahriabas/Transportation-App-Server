const { verivyToken } = require("../helpers/jwt");
const { User } = require('../models')


const customerAuthentication = async (req, res, next) => {
    try {

        const {access_token} = req.headers;
        console.log(access_token, 'isi dari access token didalam authentikasi<<');


        if(!access_token){
            throw {name: "unauthenticated"}
        }

        const payload = verivyToken(access_token)


        req.additionalData = {
            userId : payload.id,
            email: payload.email,
            role: payload.role
        }


        next()
    } catch (error) {
        next(error)
    }
}


module.exports = customerAuthentication