const ErrorResponse = require('../utils/errorHandler')

const errorHandler = (err, req, res, next)=>{
    let error = { ...err }
    error.message = err.message

    console.log(err.stack)


    if(error.name === 'ValidationError'){
        const message = `Please fill in the required details before creating account`
        error = new ErrorResponse(message, 404)
    }

    if(err.code === 11000){
        const message = `duplicate keys found please ensure you use a unique email`
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500 ).json({
        success: false,
        error: error.message
    }) 
}

module.exports = errorHandler