import EErrors from "../utils/errors/enums.js";


export default (error,req,res,next) => {

    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"error",error:error.name})
            break;
        case EErrors.INVALID_PARAM:
            res.send({status:"error",error:error.cause})
            break
        default:
            res.send({status:"error",error:"Unhandled error"})
    }

}