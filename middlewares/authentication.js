const { verivyToken } = require("../helpers/jwt");
const { User } = require('../models')


const authentication = async (req, res, next) => {
    console.log('street house<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    // console.log(req.body)

    // console.log('masuk kedalam authentication =============================');
    try {
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


        next()
    } catch (error) {
        console.log('masuk error disini nih')
        next(error)
    }

}

module.exports = authentication



