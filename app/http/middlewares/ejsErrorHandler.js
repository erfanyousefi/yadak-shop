import { validationResult } from "express-validator"

export default (req, res, next) => {
    const result = validationResult(req);
    const messages = {};
    if(result?.errors?.length > 0){
        Object.values(result.errors).forEach(error => {
            messages[error["param"]] = error["msg"];
        });
        
        req.body.errors = messages
    }
    next();
}