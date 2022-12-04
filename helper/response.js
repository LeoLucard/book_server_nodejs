const Response = (statusCode,data)=>{
    return {
        "statusCode" : statusCode,
        "data" : data,
    }
}

module.exports = Response;