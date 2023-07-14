
const { verivyToken } = require("../helpers/jwt");
const { User } = require("../models")

const authentication = async (req, res, next) => {
    try {

        console.log('masuk kedalam authentikasi nih');
        const {access_token} = req.headers;
        if(!access_token){
            throw {name: "unauthenticated"}
        }
        const payload = verivyToken(access_token)
        let user = {}
        user = await User.findOne({where : {id: payload.id}})

        if(!user){
            throw {name: "unauthenticated"}
        }

        req.additionalData = {
            userId: user.id,
            userName: user.userName,
            role: user.role
        }

        console.log(req.additionalData, 'isi dari req.additionaldata nih');


        next()
    } catch (error) {
        console.log(error);
    }
}


module.exports = authentication
