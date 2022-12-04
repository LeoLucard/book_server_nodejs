const ErrorResponse = (message,statusCode)=>{
    return {
        "statusCode" : statusCode,
        "message" : message,
    }
}

module.exports = ErrorResponse;