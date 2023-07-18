function errorHandling(err, req, res, next){
    console.log('xixixixxi masuk error handling')
    console.log({name: err.name})


    switch (err.name){
        case 'LoginError':
            res.status(401).json({message: 'Invalid Email Or Password'})
            break;

        case 'SequelizeValidationError':
            res.status(400).json({
                statusCode: 400,
                message: err.errors[0].message
            })
            break;
        case 'unauthenticated':
            res.status(401).json({
                statusCode: 401,
                message: err.name
            })
            break;
        case 'Not Found':
            res.status(404).json({
                statusCode: 404,
                message: 'Data Not Found'
            })
            break;
        case 'JsonWebTokenError':
            res.status(401).json({
                statusCode: 401,
                message: 'unauthenticated'
            })
            break;
        case 'TypeError':
            res.status(404).json({
                statusCode: 404,
                message: 'Data Not Found'
            })
            break;
        case 'Forbidden':
            res.status(403).json({
                statusCode: 403,
                message: 'You are not authorized'
            })
            break;
        default:
            res.status(401).json({message: 'Internal Server Error'})
            break;
    }
}

module.exports = errorHandling

